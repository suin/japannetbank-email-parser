import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * 振込入金のご連絡
 */
const transferDepositedSchema = z.object({
  type: z.literal('transferDeposited'),
  /**
   * 入金日時
   */
  depositedOn: z.string(),
})

export type TransferDeposited = z.infer<typeof transferDepositedSchema>

export const transferDepositedParser: Parser<TransferDeposited> = ({
  subject,
  text,
}) => {
  if (subject !== '振込入金のご連絡') {
    return
  }
  const depositedOn = extract(
    text,
    /入金日時:(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})\s(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})/,
  )
    .map(
      _ =>
        `${_.year}-${_.month}-${_.day}T${_.hour}:${_.minute}:${_.second}+09:00`,
    )
    .pop()

  if (typeof depositedOn === 'string') {
    return { type: 'transferDeposited', depositedOn }
  }
  return
}
