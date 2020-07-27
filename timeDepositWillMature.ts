import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * 定期預金の満期を迎えるお客さまへ
 */
const timeDepositWillMatureSchema = z.object({
  type: z.literal('timeDepositWillMature'),
  /**
   * 定期契約番号
   */
  number: z.string(),
  /**
   * 満期日
   */
  maturityDate: z.string(),
})

export type TimeDepositWillMature = z.infer<typeof timeDepositWillMatureSchema>

export const timeDepositWillMatureParser: Parser<TimeDepositWillMature> = ({
  subject,
  text,
}) => {
  if (subject !== '定期預金の満期を迎えるお客さまへ') {
    return
  }
  const number = extract(text, /定期契約番号: (?<number>\d+)/)
    .map(_ => _.number)
    .pop()
  const maturityDate = extract(
    text,
    /満期日: (?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})/,
  )
    .map(_ => `${_.year}-${_.month}-${_.day}`)
    .pop()

  if (typeof number === 'string' && typeof maturityDate === 'string') {
    return { type: 'timeDepositWillMature', number, maturityDate }
  }
  return
}
