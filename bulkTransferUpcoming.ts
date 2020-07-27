import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * ＷＥＢ総振実施の事前連絡
 */
const bulkTransferUpcomingSchema = z.object({
  type: z.literal('bulkTransferUpcoming'),
  /**
   * 振込指定日
   */
  transferDate: z.string(),
  /**
   * 受付番号
   */
  number: z.string(),
})

export type BulkTransferUpcoming = z.infer<typeof bulkTransferUpcomingSchema>

export const bulkTransferUpcomingParser: Parser<BulkTransferUpcoming> = ({
  subject,
  text,
}) => {
  if (subject !== 'ＷＥＢ総振実施の事前連絡') {
    return
  }
  const transferDate = extract(
    text,
    /振込指定日:(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})/,
  )
    .map(_ => `${_.year}-${_.month}-${_.day}`)
    .pop()
  const number = extract(text, /受付番号:(?<number>\d+-\d+)/)
    .map(_ => _.number)
    .pop()

  if (typeof transferDate === 'string' && typeof number === 'string') {
    return {
      type: 'bulkTransferUpcoming',
      transferDate,
      number,
    }
  }
  return
}
