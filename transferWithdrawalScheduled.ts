import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * 振込予約のご確認
 */
const transferWithdrawalScheduledSchema = z.object({
  type: z.literal('transferWithdrawalScheduled'),
  /**
   * 振込指定日
   */
  scheduledDate: z.string(),
  /**
   * 受付番号
   */
  number: z.string(),
  /**
   * 受取人名
   */
  recipient: z.string(),
  /**
   * 振込金額
   */
  amount: z.number(),
})

export type TransferWithdrawalScheduled = z.infer<
  typeof transferWithdrawalScheduledSchema
>

export const transferWithdrawalScheduledParser: Parser<TransferWithdrawalScheduled> = ({
  subject,
  text,
}) => {
  if (subject !== '振込予約のご確認') {
    return
  }
  const scheduledDate = extract(
    text,
    /振込指定日:(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})/,
  )
    .map(_ => `${_.year}-${_.month}-${_.day}`)
    .pop()
  const number = extract(text, /受付番号:(?<number>\d+)/)
    .map(_ => _.number)
    .pop()
  const recipient = extract(text, /受取人名:(?<name>.+)/)
    .map(_ => _.name)
    .pop()
  const amount = extract(text, /振込金額:(?<amount>[\d,]+)円/)
    .map(_ => parseInt(_.amount.replace(/,/g, '')))
    .filter(_ => !Number.isNaN(_))
    .pop()
  if (
    typeof scheduledDate === 'string' &&
    typeof number === 'string' &&
    typeof recipient === 'string' &&
    typeof amount === 'number'
  ) {
    return {
      type: 'transferWithdrawalScheduled',
      scheduledDate,
      number,
      recipient,
      amount,
    }
  }
  return
}
