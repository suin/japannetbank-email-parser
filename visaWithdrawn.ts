import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * VISAデビットご利用代金お引き落としのお知らせ
 */
const visaWithdrawnSchema = z.object({
  type: z.literal('visaWithdrawn'),
  /**
   * お引落日時
   */
  withdrawnOn: z.string(),
  /**
   * ご利用日
   */
  useOfDate: z.string().optional(),
  /**
   * お引落金額
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

export type VisaWithdrawn = z.infer<typeof visaWithdrawnSchema>

export const visaWithdrawnParser: Parser<VisaWithdrawn> = ({
  subject,
  text,
}) => {
  if (
    !subject.includes('Ｖｉｓａデビット') ||
    !subject.includes('ご利用代金お引き落としのお知らせ')
  ) {
    return
  }
  const withdrawnOn = extract(
    text,
    /お引落日時：(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})\s(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})/,
  )
    .map(
      _ =>
        `${_.year}-${_.month}-${_.day}T${_.hour}:${_.minute}:${_.second}+09:00`,
    )
    .pop()
  const amount = extract(text, /お引落金額：(?<amount>[\d,]+)円/)
    .map(_ => parseInt(_.amount.replace(/,/g, '')))
    .filter(_ => !Number.isNaN(_))
    .pop()
  const shop = extract(text, /加盟店名：(?<shop>.+)/)
    .map(_ => _.shop)
    .pop()
  const useOfDate = extract(
    text,
    /ご利用日：(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})/,
  )
    .map(_ => `${_.year}-${_.month}-${_.day}`)
    .pop()
  const number = extract(text, /取引明細番号：(?<number>.+)/)
    .map(_ => _.number)
    .pop()
  if (
    typeof withdrawnOn === 'string' &&
    typeof amount === 'number' &&
    typeof shop === 'string' &&
    typeof number === 'string'
  ) {
    return {
      type: 'visaWithdrawn',
      withdrawnOn,
      useOfDate,
      amount,
      shop,
      number,
    }
  }
  return
}
