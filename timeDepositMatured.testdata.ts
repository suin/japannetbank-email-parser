import { TestDataset } from './testDataset.testkit'
import { TimeDepositMatured } from './timeDepositMatured'

export const testDataset: TestDataset<TimeDepositMatured> = [
  {
    input: {
      subject: '定期預金の満期を迎えたお客さまへ',
      text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。

下記の定期預金が満期を迎えましたので、ご案内いたします。
満期日までお預け入れいただき、誠にありがとうございました。

定期契約番号：0140

元金とお利息は普通預金口座へ入金しております。

詳細は、以下よりご確認ください。`,
    },
    output: {
      type: 'timeDepositMatured',
      number: '0140',
    },
  },
]

export default { testDataset }
