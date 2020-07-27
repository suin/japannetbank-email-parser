import { AutomaticTransferRegistrationDeleted } from './automaticTransferRegistrationDeleted'
import { TestDataset } from './testDataset.testkit'

export const testDataset: TestDataset<AutomaticTransferRegistrationDeleted> = [
  {
    input: {
      subject: '自動振込サービス登録削除のご連絡',
      text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。
自動振込サービスから下記お振り込みの登録を削除いたしましたので、ご確認をお願いいたします。

振込名称：テスト
振込指定日：月末日

詳細は、パソコン・スマートフォンからログイン後、「明細・振込・振替」＞「自動振込サービス」でご確認いただけます。`,
    },
    output: {
      type: 'automaticTransferRegistrationDeleted',
      name: 'テスト',
      transferDate: '月末日',
    },
  },
]

export default { testDataset }
