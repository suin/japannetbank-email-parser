import { TestDataset } from './testDataset.testkit'
import { TimeDepositWillMature } from './timeDepositWillMature'

export const testDataset: TestDataset<TimeDepositWillMature> = [
  {
    input: {
      subject: '定期預金の満期を迎えるお客さまへ',
      text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。
下記の定期預金が満期となりますので、ご案内いたします。

定期契約番号: 0143
満期日: 2020/07/01

詳細は、以下よりご確認ください。`,
    },
    output: {
      type: 'timeDepositWillMature',
      number: '0143',
      maturityDate: '2020-07-01',
    },
  },
]

export default { testDataset }
