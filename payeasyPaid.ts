import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * ペイジー払い込みのご確認
 */
const payeasyPaidSchema = z.object({
  type: z.literal('payeasyPaid'),
  /**
   * 受付番号
   */
  receiptNumber: z.string(),
  /**
   * 払込日時
   */
  paidOn: z.string(),
  /**
   * 払込先
   */
  payee: z.string(),
  /**
   * お客さま番号
   */
  customerNumber: z.string().optional(),
  /**
   * 納付番号
   */
  paymentNumber: z.string().optional(),
  /**
   * お名前
   */
  name: z.string(),
  /**
   * 払込内容
   */
  detail: z.string(),
  /**
   * 払込金額
   */
  amount: z.number(),
  /**
   * 払込手数料
   */
  fee: z.number(),
})

export type PayeasyPaid = z.infer<typeof payeasyPaidSchema>

export const payeasyPaidParser: Parser<PayeasyPaid> = ({ subject, text }) => {
  if (subject !== 'ペイジー払い込みのご確認') {
    return
  }
  const receiptNumber = extract(text, /受付番号: (?<receiptNumber>\d+)/)
    .map(_ => _.receiptNumber)
    .pop()
  const paidOn = extract(
    text,
    /払込日時: (?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})\s(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})/,
  )
    .map(
      _ =>
        `${_.year}-${_.month}-${_.day}T${_.hour}:${_.minute}:${_.second}+09:00`,
    )
    .pop()
  const payee = extract(text, /払込先: (?<payee>.+)/)
    .map(_ => _.payee)
    .pop()
  const customerNumber = extract(text, /お客さま番号: (?<customerNumber>\d+)/)
    .map(_ => _.customerNumber)
    .pop()
  const paymentNumber = extract(text, /納付番号: (?<paymentNumber>\d+)/)
    .map(_ => _.paymentNumber)
    .pop()
  const name = extract(text, /お名前: (?<name>.*)/)
    .map(_ => _.name)
    .pop()
  const detail = extract(text, /払込内容: (?<detail>.+)/)
    .map(_ => _.detail)
    .pop()
  const amount = extract(text, /払込金額: (?<amount>[\d,]+)円/)
    .map(_ => parseInt(_.amount.replace(/,/g, '')))
    .filter(_ => !Number.isNaN(_))
    .pop()
  const fee = extract(text, /払込手数料: (?<fee>[\d,]+)円/)
    .map(_ => parseInt(_.fee.replace(/,/g, '')))
    .filter(_ => !Number.isNaN(_))
    .pop()

  if (
    typeof receiptNumber === 'string' &&
    typeof paidOn === 'string' &&
    typeof payee === 'string' &&
    typeof detail === 'string' &&
    typeof amount === 'number' &&
    typeof fee === 'number'
  ) {
    return {
      type: 'payeasyPaid',
      receiptNumber,
      paidOn,
      payee,
      customerNumber,
      paymentNumber,
      name: name ?? '',
      detail,
      amount,
      fee,
    }
  }
  return
}
