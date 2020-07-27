import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * ＷＥＢ総振の振込実施のお知らせ
 */
const bulkTransferCompletedSchema = z.object({
  type: z.literal('bulkTransferCompleted'),
  /**
   * 振込日
   */
  transferDate: z.string(),
  /**
   * 受付番号
   */
  number: z.string(),
})

export type BulkTransferCompleted = z.infer<typeof bulkTransferCompletedSchema>

export const bulkTransferCompletedParser: Parser<BulkTransferCompleted> = ({
  subject,
  text,
}) => {
  if (subject !== 'ＷＥＢ総振の振込実施のお知らせ') {
    return
  }
  const transferDate = extract(
    text,
    /振込日:(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})/,
  )
    .map(_ => `${_.year}-${_.month}-${_.day}`)
    .pop()
  const number = extract(text, /受付番号:(?<number>\d+-\d+)/)
    .map(_ => _.number)
    .pop()

  if (typeof transferDate === 'string' && typeof number === 'string') {
    return { type: 'bulkTransferCompleted', transferDate, number }
  }
  return
}
