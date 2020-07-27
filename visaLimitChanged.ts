import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * VISAデビット利用限度額変更のお知らせ
 */
const visaLimitChangedSchema = z.object({
  type: z.literal('visaLimitChanged'),
  /**
   * 変更日時
   */
  changedOn: z.string(),
  /**
   * Visaデビットお取引合計
   */
  newLimit: z.number(),
})

export type VisaLimitChanged = z.infer<typeof visaLimitChangedSchema>

export const visaLimitChangedParser: Parser<VisaLimitChanged> = ({
  subject,
  text,
}) => {
  if (
    !subject.includes('Ｖｉｓａデビット') ||
    !subject.includes('利用限度額変更のお知らせ')
  ) {
    return
  }
  const changedOn = extract(
    text,
    /変更日時：(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})\s(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})/,
  )
    .map(
      _ =>
        `${_.year}-${_.month}-${_.day}T${_.hour}:${_.minute}:${_.second}+09:00`,
    )
    .pop()
  const newLimit = extract(text, /Visaデビットお取引合計：(?<amount>[\d,]+)円/)
    .map(_ => parseInt(_.amount.replace(/,/g, '')))
    .filter(_ => !Number.isNaN(_))
    .pop()

  if (typeof changedOn === 'string' && typeof newLimit === 'number') {
    return { type: 'visaLimitChanged', changedOn, newLimit }
  }
  return
}
