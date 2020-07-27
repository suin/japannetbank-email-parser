import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * 定期預金自動継続のご案内
 */
const timeDepositAutomaticallyRenewedSchema = z.object({
  type: z.literal('timeDepositAutomaticallyRenewed'),
  /**
   * 定期契約番号
   */
  number: z.string(),
  /**
   * 継続日
   */
  renewalDate: z.string(),
})

export type TimeDepositAutomaticallyRenewed = z.infer<
  typeof timeDepositAutomaticallyRenewedSchema
>

export const timeDepositAutomaticallyRenewedParser: Parser<TimeDepositAutomaticallyRenewed> = ({
  subject,
  text,
}) => {
  if (subject !== '定期預金自動継続のご案内') {
    return
  }
  const number = extract(text, /定期契約番号: (?<number>\d+)/)
    .map(_ => _.number)
    .pop()
  const renewalDate = extract(
    text,
    /継続日: (?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})/,
  )
    .map(_ => `${_.year}-${_.month}-${_.day}`)
    .pop()

  if (typeof number === 'string' && typeof renewalDate === 'string') {
    return { type: 'timeDepositAutomaticallyRenewed', number, renewalDate }
  }
  return
}
