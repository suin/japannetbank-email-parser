import { transferWithdrawalLimitChangedParser } from './transferWithdrawalLimitChanged'
import { testDataset } from './transferWithdrawalLimitChanged.testdata'

describe('transferWithdrawalLimitChangedParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = transferWithdrawalLimitChangedParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns TransferWithdrawalLimitChanged if the input is parsable',
    ({ input, output }) => {
      const result = transferWithdrawalLimitChangedParser(input)
      expect(result).toEqual(output)
    },
  )
})
