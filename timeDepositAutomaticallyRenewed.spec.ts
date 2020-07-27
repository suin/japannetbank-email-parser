import { timeDepositAutomaticallyRenewedParser } from './timeDepositAutomaticallyRenewed'
import { testDataset } from './timeDepositAutomaticallyRenewed.testdata'

describe('timeDepositCreatedParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = timeDepositAutomaticallyRenewedParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns TimeDepositAutomaticallyRenewed if the input is parsable',
    ({ input, output }) => {
      const result = timeDepositAutomaticallyRenewedParser(input)
      expect(result).toEqual(output)
    },
  )
})
