import { TestDataset } from './testDataset.testkit'
import { TimeDepositCreated } from './timeDepositCreated'

export const testDataset: TestDataset<TimeDepositCreated> = [
  {
    input: {
      subject: '定期預金新約のご案内',
      text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。
また、このたびは定期預金をお預け入れいただきありがとうございました。

下記のとおりお預かりいたしました。

定期契約番号：0160

詳細は、以下よりご確認ください。`,
    },
    output: {
      type: 'timeDepositCreated',
      number: '0160',
    },
  },
]

export default { testDataset }
