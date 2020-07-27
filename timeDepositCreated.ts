import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * 定期預金新約のご案内
 */
const timeDepositCreatedSchema = z.object({
  type: z.literal('timeDepositCreated'),
  /**
   * 定期契約番号
   */
  number: z.string(),
})

export type TimeDepositCreated = z.infer<typeof timeDepositCreatedSchema>

export const timeDepositCreatedParser: Parser<TimeDepositCreated> = ({
  subject,
  text,
}) => {
  if (subject !== '定期預金新約のご案内') {
    return
  }
  const number = extract(text, /定期契約番号：(?<number>\d+)/)
    .map(_ => _.number)
    .pop()

  if (typeof number === 'string') {
    return { type: 'timeDepositCreated', number }
  }
  return
}
