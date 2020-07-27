import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * VISAデビット利用停止のご連絡
 */
const visaFrozen = z.object({
  type: z.literal('visaFrozen'),
  /**
   * 利用停止日時
   */
  frozenOn: z.string(),
})

export type VisaFrozen = z.infer<typeof visaFrozen>

export const visaFrozenParser: Parser<VisaFrozen> = ({ subject, text }) => {
  if (
    !subject.includes('Ｖｉｓａデビット') ||
    !subject.includes('利用停止のご連絡')
  ) {
    return
  }
  const frozenOn = extract(
    text,
    /＜利用停止日時＞\s+(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})\s(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})/,
  )
    .map(
      _ =>
        `${_.year}-${_.month}-${_.day}T${_.hour}:${_.minute}:${_.second}+09:00`,
    )
    .pop()
  if (typeof frozenOn === 'string') {
    return { type: 'visaFrozen', frozenOn }
  }
  return
}
