import { transferWithdrawalScheduledParser } from './transferWithdrawalScheduled'
import { testDataset } from './transferWithdrawalScheduled.testdata'

describe('transferWithdrawalScheduledParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = transferWithdrawalScheduledParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns TransferWithdrawalScheduled if the input is parsable',
    ({ input, output }) => {
      const result = transferWithdrawalScheduledParser(input)
      expect(result).toEqual(output)
    },
  )
})
