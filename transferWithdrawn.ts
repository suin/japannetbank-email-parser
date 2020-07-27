import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * 振り込みのご確認
 */
const transferWithdrawnSchema = z.object({
  type: z.literal('transferWithdrawn'),
  /**
   * 振込受付日時
   */
  withdrawnOn: z.string(),
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

export type TransferWithdrawn = z.infer<typeof transferWithdrawnSchema>

export const transferWithdrawnParser: Parser<TransferWithdrawn> = ({
  subject,
  text,
}) => {
  if (subject !== '振り込みのご確認') {
    return
  }
  const withdrawnOn = extract(
    text,
    /振込受付日時:(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})\s(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})/,
  )
    .map(
      _ =>
        `${_.year}-${_.month}-${_.day}T${_.hour}:${_.minute}:${_.second}+09:00`,
    )
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
    typeof withdrawnOn === 'string' &&
    typeof number === 'string' &&
    typeof recipient === 'string' &&
    typeof amount === 'number'
  ) {
    return {
      type: 'transferWithdrawn',
      withdrawnOn,
      number,
      recipient,
      amount,
    }
  }
  return
}
