import * as z from 'zod'
import { extract } from './extract'
import { Parser } from './parser'

/**
 * 自動振込サービス登録削除のご連絡
 */
const automaticTransferRegistrationDeletedSchema = z.object({
  type: z.literal('automaticTransferRegistrationDeleted'),
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

export type AutomaticTransferRegistrationDeleted = z.infer<
  typeof automaticTransferRegistrationDeletedSchema
>

export const automaticTransferRegistrationDeletedParser: Parser<AutomaticTransferRegistrationDeleted> = ({
  subject,
  text,
}) => {
  if (subject !== '自動振込サービス登録削除のご連絡') {
    return
  }
  const name = extract(text, /振込名称：(?<name>.+)/)
    .map(_ => _.name)
    .pop()
  const transferDate = extract(text, /振込指定日：(?<transferDate>.+)/)
    .map(_ => _.transferDate)
    .pop()

  if (typeof name === 'string' && typeof transferDate === 'string') {
    return { type: 'automaticTransferRegistrationDeleted', name, transferDate }
  }
  return
}
