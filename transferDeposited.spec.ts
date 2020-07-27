import { transferDepositedParser } from './transferDeposited'
import { testDataset } from './transferDeposited.testdata'

describe('transferDepositedParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = transferDepositedParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns TransferDeposited if the input is parsable',
    ({ input, output }) => {
      const result = transferDepositedParser(input)
      expect(result).toEqual(output)
    },
  )
})
