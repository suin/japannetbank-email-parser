import { TestDataset } from './testDataset.testkit'
import { TransferDestinationRegistered } from './transferDestinationRegistered'

export const testDataset: TestDataset<TransferDestinationRegistered> = [
  {
    input: {
      subject: '振込先口座の登録のご確認',
      text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。
下記のとおり振込先口座の登録を受け付けいたしました。
ご確認をお願いいたします。

受付日時:2020/06/23 11:16:38
受取人名:クラフトマン（．．
※受取人名は一部のみ表示しております。
振込先銀行名:三菱ＵＦＪ銀行

詳細は、以下よりご確認ください。`,
    },
    output: {
      type: 'transferDestinationRegistered',
      registeredOn: '2020-06-23T11:16:38+09:00',
      recipient: 'クラフトマン（．．',
      bank: '三菱ＵＦＪ銀行',
    },
  },
]

export default { testDataset }
