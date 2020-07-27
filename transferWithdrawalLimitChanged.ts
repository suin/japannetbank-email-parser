import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * 振込限度額変更のご確認
 */
const transferWithdrawalLimitChangedSchema = z.object({
  type: z.literal('transferWithdrawalLimitChanged'),
  /**
   * 変更日時
   */
  changedOn: z.string(),
})

export type TransferWithdrawalLimitChanged = z.infer<
  typeof transferWithdrawalLimitChangedSchema
>

export const transferWithdrawalLimitChangedParser: Parser<TransferWithdrawalLimitChanged> = ({
  subject,
  text,
}) => {
  if (subject !== '振込限度額変更のご確認') {
    return
  }
  const changedOn = extract(
    text,
    /変更日時: (?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})\s(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})/,
  )
    .map(
      _ =>
        `${_.year}-${_.month}-${_.day}T${_.hour}:${_.minute}:${_.second}+09:00`,
    )
    .pop()

  if (typeof changedOn === 'string') {
    return { type: 'transferWithdrawalLimitChanged', changedOn }
  }
  return
}
