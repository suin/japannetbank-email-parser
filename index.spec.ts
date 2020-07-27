import automaticTransferRegistrationCreated from './automaticTransferRegistrationCreated.testdata'
import automaticTransferRegistrationDeleted from './automaticTransferRegistrationDeleted.testdata'
import automaticTransferRegistrationUpdated from './automaticTransferRegistrationUpdated.testdata'
import bulkTransferCompleted from './bulkTransferCompleted.testdata'
import bulkTransferFeeCharged from './bulkTransferFeeCharged.testdata'
import bulkTransferUpcoming from './bulkTransferUpcoming.testdata'
import { parseJapannetbankNotification } from './index'
import payeasyPaid from './payeasyPaid.testdata'
import timeDepositAutomaticallyRenewed from './timeDepositAutomaticallyRenewed.testdata'
import timeDepositCreated from './timeDepositCreated.testdata'
import timeDepositMatured from './timeDepositMatured.testdata'
import timeDepositWillMature from './timeDepositWillMature.testdata'
import transferDeposited from './transferDeposited.testdata'
import transferDestinationRegistered from './transferDestinationRegistered.testdata'
import transferWithdrawalLimitChanged from './transferWithdrawalLimitChanged.testdata'
import transferWithdrawalScheduled from './transferWithdrawalScheduled.testdata'
import transferWithdrawn from './transferWithdrawn.testdata'
import visaFrozen from './visaFrozen.testdata'
import visaLimitChanged from './visaLimitChanged.testdata'
import visaRefunded from './visaRefunded.testdata'
import visaWithdrawn from './visaWithdrawn.testdata'

const testDataset = [
  ...automaticTransferRegistrationCreated.testDataset,
  ...automaticTransferRegistrationDeleted.testDataset,
  ...automaticTransferRegistrationUpdated.testDataset,
  ...bulkTransferCompleted.testDataset,
  ...bulkTransferFeeCharged.testDataset,
  ...bulkTransferUpcoming.testDataset,
  ...payeasyPaid.testDataset,
  ...timeDepositAutomaticallyRenewed.testDataset,
  ...timeDepositCreated.testDataset,
  ...timeDepositMatured.testDataset,
  ...timeDepositWillMature.testDataset,
  ...transferDeposited.testDataset,
  ...transferDestinationRegistered.testDataset,
  ...transferWithdrawalLimitChanged.testDataset,
  ...transferWithdrawalScheduled.testDataset,
  ...transferWithdrawn.testDataset,
  ...visaFrozen.testDataset,
  ...visaLimitChanged.testDataset,
  ...visaRefunded.testDataset,
  ...visaWithdrawn.testDataset,
]

describe('usage examples', () => {
  test('example1', () => {
    const notification = parseJapannetbankNotification({
      subject: '【Ｖｉｓａデビット】ご利用代金お引き落としのお知らせ',
      text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。
JNB Visaデビットのご利用代金を普通預金口座よりお引き落としいたしました。

お引落日時：2020/07/27 02:47:20
お引落金額：2,205円
加盟店名：ＧＩＴＨＵＢ
取引明細番号：1A209002

▽JNB Visaデビットは還元率25％のマイナポイント事業の対象です！`,
    })
    if (!notification) {
      fail('Notification must be parsed')
      return
    }
    switch (notification.type) {
      case 'visaWithdrawn':
        expect(notification.shop).toBe('ＧＩＴＨＵＢ')
        break
      default:
        fail('Notification type must be visaWithdrawn')
        break
    }
  })
})

describe('parseJapannetbankNotification', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = parseJapannetbankNotification({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })
  it.each(testDataset)(
    'returns JapannetbankNotification if the input is parsable',
    ({ input, output }) => {
      const result = parseJapannetbankNotification(input)
      expect(result).toEqual(output)
    },
  )
})
