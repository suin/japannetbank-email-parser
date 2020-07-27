import { BulkTransferUpcoming } from './bulkTransferUpcoming'
import { TestDataset } from './testDataset.testkit'

export const testDataset: TestDataset<BulkTransferUpcoming> = [
  {
    input: {
      subject: 'ＷＥＢ総振実施の事前連絡',
      text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。
下記の振込指定日に、振り込みを実施いたしますので、残高をご確認ください。

振込指定日:2020/06/25
受付番号:200619-001

詳細は、パソコンまたはスマートフォンでログイン後、
「明細・振込・振替」＞「WEB総振取引」＞「振込承認」をご覧ください。`,
    },
    output: {
      type: 'bulkTransferUpcoming',
      transferDate: '2020-06-25',
      number: '200619-001',
    },
  },
]

export default { testDataset }
