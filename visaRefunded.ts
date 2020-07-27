import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * VISAデビットご利用代金ご返金のお知らせ
 */
const visaRefundedSchema = z.object({
  type: z.literal('visaRefunded'),
  /**
   * ご返金日時
   */
  refundedOn: z.string(),
  /**
   * ご返金額
   */
  amount: z.number(),
  /**
   * 加盟店名
   */
  shop: z.string(),
  /**
   * 取引明細番号
   */
  number: z.string(),
})

export type VisaRefunded = z.infer<typeof visaRefundedSchema>

export const visaRefundedParser: Parser<VisaRefunded> = ({ subject, text }) => {
  if (
    !subject.includes('Ｖｉｓａデビット') ||
    !subject.includes('ご利用代金ご返金のお知らせ')
  ) {
    return
  }
  const refundedOn = extract(
    text,
    /ご返金日時：(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})\s(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})/,
  )
    .map(
      _ =>
        `${_.year}-${_.month}-${_.day}T${_.hour}:${_.minute}:${_.second}+09:00`,
    )
    .pop()
  const amount = extract(text, /ご返金額：(?<amount>[\d,]+)円/)
    .map(_ => parseInt(_.amount.replace(/,/g, '')))
    .filter(_ => !Number.isNaN(_))
    .pop()
  const shop = extract(text, /加盟店名：(?<shop>.+)/)
    .map(_ => _.shop)
    .pop()
  const number = extract(text, /取引明細番号：(?<number>.+)/)
    .map(_ => _.number)
    .pop()
  if (
    typeof refundedOn === 'string' &&
    typeof amount === 'number' &&
    typeof shop === 'string' &&
    typeof number === 'string'
  ) {
    return {
      type: 'visaRefunded',
      refundedOn,
      amount,
      shop,
      number,
    }
  }
  return
}
