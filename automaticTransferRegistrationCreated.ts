import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * 自動振込サービスのご確認
 */
const automaticTransferRegistrationCreatedSchema = z.object({
  type: z.literal('automaticTransferRegistrationCreated'),
  /**
   * 振込名称
   */
  name: z.string(),
  /**
   * 振込指定日
   *
   * 例: "月末日"や"25日"など
   */
  transferDate: z.string(),
})

export type AutomaticTransferRegistrationCreated = z.infer<
  typeof automaticTransferRegistrationCreatedSchema
>

export const automaticTransferRegistrationCreatedParser: Parser<AutomaticTransferRegistrationCreated> = ({
  subject,
  text,
}) => {
  if (subject !== '自動振込サービスのご確認') {
    return
  }
  const name = extract(text, /振込名称：(?<name>.+)/)
    .map(_ => _.name)
    .pop()
  const transferDate = extract(text, /振込指定日：(?<transferDate>.+)/)
    .map(_ => _.transferDate)
    .pop()

  if (typeof name === 'string' && typeof transferDate === 'string') {
    return { type: 'automaticTransferRegistrationCreated', name, transferDate }
  }
  return
}
