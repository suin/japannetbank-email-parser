import { BulkTransferCompleted } from './bulkTransferCompleted'
import { TestDataset } from './testDataset.testkit'

export const testDataset: TestDataset<BulkTransferCompleted> = [
  {
    input: {
      subject: 'ＷＥＢ総振の振込実施のお知らせ',
      text: `
ジャパンネット銀行からWEB総振に関するお知らせです。

下記の振り込みを実施いたしましたので、ご確認をお願いいたします。

振込日:2020/07/22
受付番号:200721-002

詳細は、パソコンまたはスマートフォンでログイン後、
「明細・振込・振替」＞「WEB総振取引」＞「振込結果一覧」をご覧ください。`,
    },
    output: {
      type: 'bulkTransferCompleted',
      transferDate: '2020-07-22',
      number: '200721-002',
    },
  },
]

export default { testDataset }
