import { TestDataset } from './testDataset.testkit'
import { TransferDeposited } from './transferDeposited'

export const testDataset: TestDataset<TransferDeposited> = [
  {
    input: {
      subject: '振込入金のご連絡',
      text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。
下記日時に、振り込みによる入金がございました。

入金日時:2019/03/29 10:14:16

詳細は、以下よりご確認ください。`,
    },
    output: {
      type: 'transferDeposited',
      depositedOn: '2019-03-29T10:14:16+09:00',
    },
  },
]

export default { testDataset }
