import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * 定期預金の満期を迎えたお客さまへ
 */
const timeDepositMaturedSchema = z.object({
  type: z.literal('timeDepositMatured'),
  /**
   * 定期契約番号
   */
  number: z.string(),
})

export type TimeDepositMatured = z.infer<typeof timeDepositMaturedSchema>

export const timeDepositMaturedParser: Parser<TimeDepositMatured> = ({
  subject,
  text,
}) => {
  if (subject !== '定期預金の満期を迎えたお客さまへ') {
    return
  }
  const number = extract(text, /定期契約番号：(?<number>\d+)/)
    .map(_ => _.number)
    .pop()

  if (typeof number === 'string') {
    return { type: 'timeDepositMatured', number }
  }
  return
}
