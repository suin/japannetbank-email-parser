import { TestDataset } from './testDataset.testkit'
import { TransferWithdrawalLimitChanged } from './transferWithdrawalLimitChanged'

export const testDataset: TestDataset<TransferWithdrawalLimitChanged> = [
  {
    input: {
      subject: '振込限度額変更のご確認',
      text: `
いつもご利用いただきありがとうございます。
下記日時に振込限度額変更の手続きが完了いたしました。

変更日時: 2018/11/28 13:47:57

詳細は、以下よりご確認ください。`,
    },
    output: {
      type: 'transferWithdrawalLimitChanged',
      changedOn: '2018-11-28T13:47:57+09:00',
    },
  },
]

export default { testDataset }
