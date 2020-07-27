import { BulkTransferFeeCharged } from './bulkTransferFeeCharged'
import { TestDataset } from './testDataset.testkit'

export const testDataset: TestDataset<BulkTransferFeeCharged> = [
  {
    input: {
      subject: 'ＷＥＢ総振手数料引落のお知らせ',
      text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。
WEB総振月額手数料のお引き落としをさせていただきました。

手数料引落日:2020/07/22

詳細は、以下よりご確認ください。`,
    },
    output: {
      type: 'bulkTransferFeeCharged',
      chargeDate: '2020-07-22',
    },
  },
]

export default { testDataset }
