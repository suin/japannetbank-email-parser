import { AutomaticTransferRegistrationUpdated } from './automaticTransferRegistrationUpdated'
import { TestDataset } from './testDataset.testkit'

export const testDataset: TestDataset<AutomaticTransferRegistrationUpdated> = [
  {
    input: {
      subject: '自動振込サービス登録内容変更のご連絡',
      text: `
いつもご利用いただきありがとうございます。
下記の自動振込サービスの登録内容を変更いたしましたので、ご確認をお願いいたします。

振込名称：　テスト
振込指定日：月末日

詳細は、パソコン・スマートフォンからログイン後、
「明細・振込・振替」＞「自動振込サービス」でご確認いただけます。`,
    },
    output: {
      type: 'automaticTransferRegistrationUpdated',
      name: 'テスト',
      transferDate: '月末日',
    },
  },
]

export default { testDataset }
