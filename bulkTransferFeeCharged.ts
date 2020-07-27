import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * ＷＥＢ総振手数料引落のお知らせ
 */
const bulkTransferFeeChargedSchema = z.object({
  type: z.literal('bulkTransferFeeCharged'),
  /**
   * 手数料引落日
   */
  chargeDate: z.string(),
})

export type BulkTransferFeeCharged = z.infer<
  typeof bulkTransferFeeChargedSchema
>

export const bulkTransferFeeChargedParser: Parser<BulkTransferFeeCharged> = ({
  subject,
  text,
}) => {
  if (subject !== 'ＷＥＢ総振手数料引落のお知らせ') {
    return
  }
  const chargeDate = extract(
    text,
    /手数料引落日:(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})/,
  )
    .map(_ => `${_.year}-${_.month}-${_.day}`)
    .pop()

  if (typeof chargeDate === 'string') {
    return { type: 'bulkTransferFeeCharged', chargeDate }
  }
  return
}
