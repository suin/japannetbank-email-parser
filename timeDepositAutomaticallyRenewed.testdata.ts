import { TestDataset } from './testDataset.testkit'
import { TimeDepositAutomaticallyRenewed } from './timeDepositAutomaticallyRenewed'

export const testDataset: TestDataset<TimeDepositAutomaticallyRenewed> = [
  {
    input: {
      subject: '定期預金自動継続のご案内',
      text: `
いつもご利用いただきありがとうございます。
下記の定期預金が継続されましたので、ご案内いたします。

定期契約番号: 0077
継続日: 2020/04/01

詳細は、以下よりご確認ください。`,
    },
    output: {
      type: 'timeDepositAutomaticallyRenewed',
      number: '0077',
      renewalDate: '2020-04-01',
    },
  },
]

export default { testDataset }
