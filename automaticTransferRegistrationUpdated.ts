import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * 自動振込サービス登録内容変更のご連絡
 */
const automaticTransferRegistrationUpdatedSchema = z.object({
  type: z.literal('automaticTransferRegistrationUpdated'),
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

export type AutomaticTransferRegistrationUpdated = z.infer<
  typeof automaticTransferRegistrationUpdatedSchema
>

export const automaticTransferRegistrationUpdatedParser: Parser<AutomaticTransferRegistrationUpdated> = ({
  subject,
  text,
}) => {
  if (subject !== '自動振込サービス登録内容変更のご連絡') {
    return
  }
  const name = extract(text, /振込名称：\s+(?<name>.+)/)
    .map(_ => _.name)
    .pop()
  const transferDate = extract(text, /振込指定日：(?<transferDate>.+)/)
    .map(_ => _.transferDate)
    .pop()

  if (typeof name === 'string' && typeof transferDate === 'string') {
    return { type: 'automaticTransferRegistrationUpdated', name, transferDate }
  }
  return
}
