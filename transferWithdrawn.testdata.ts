import { TestDataset } from './testDataset.testkit'
import { TransferWithdrawn } from './transferWithdrawn'

export const testDataset: TestDataset<TransferWithdrawn> = [
  {
    input: {
      subject: '振り込みのご確認',
      text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。
下記のお振り込みを受け付けいたしました。

振込受付日時:2019/03/27 10:40:46
受付番号:201903270057989
受取人名:カ）クラフトマンソフトウエ．．
※受取人名は一部のみ表示しております。
振込金額:47,000円

＜振込明細の確認はこちら＞`,
    },
    output: {
      type: 'transferWithdrawn',
      withdrawnOn: '2019-03-27T10:40:46+09:00',
      number: '201903270057989',
      recipient: 'カ）クラフトマンソフトウエ．．',
      amount: 47_000,
    },
  },
]

export default { testDataset }
