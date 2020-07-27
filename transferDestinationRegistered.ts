import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * 振込先口座の登録のご確認
 */
const transferDestinationRegisteredSchema = z.object({
  type: z.literal('transferDestinationRegistered'),
  /**
   * 受付日時
   */
  registeredOn: z.string(),
  /**
   * 受取人名
   */
  recipient: z.string(),
  /**
   * 振込先銀行名
   */
  bank: z.string(),
})

export type TransferDestinationRegistered = z.infer<
  typeof transferDestinationRegisteredSchema
>

export const transferDestinationRegisteredParser: Parser<TransferDestinationRegistered> = ({
  subject,
  text,
}) => {
  if (subject !== '振込先口座の登録のご確認') {
    return
  }
  const registeredOn = extract(
    text,
    /受付日時:(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})\s(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})/,
  )
    .map(
      _ =>
        `${_.year}-${_.month}-${_.day}T${_.hour}:${_.minute}:${_.second}+09:00`,
    )
    .pop()
  const recipient = extract(text, /受取人名:(?<name>.+)/)
    .map(_ => _.name)
    .pop()
  const bank = extract(text, /振込先銀行名:(?<name>.+)/)
    .map(_ => _.name)
    .pop()
  if (
    typeof registeredOn === 'string' &&
    typeof recipient === 'string' &&
    typeof bank === 'string'
  ) {
    return {
      type: 'transferDestinationRegistered',
      registeredOn,
      recipient,
      bank,
    }
  }
  return
}
