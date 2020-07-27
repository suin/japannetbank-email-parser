import { TestDataset } from './testDataset.testkit'
import { TransferWithdrawalScheduled } from './transferWithdrawalScheduled'

export const testDataset: TestDataset<TransferWithdrawalScheduled> = [
  {
    input: {
      subject: '振込予約のご確認',
      text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。
下記の振込予約を受け付けいたしました。

振込指定日の【前日】までに予約分の資金を普通預金口座へご入金ください。
※振込指定日当日の早朝に普通預金残高が不足していた場合、
振り込みは実行されませんのでご注意ください。

振込指定日:2019/09/24
受付番号:201909230117897
受取人名:カ）　クラフトマンソフトウエ．．
※受取人名は一部のみ表示しております。
振込金額:2,401,000円

詳細は、以下よりご確認ください。`,
    },
    output: {
      type: 'transferWithdrawalScheduled',
      scheduledDate: '2019-09-24',
      number: '201909230117897',
      recipient: 'カ）　クラフトマンソフトウエ．．',
      amount: 2_401_000,
    },
  },
]

export default { testDataset }
