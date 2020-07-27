import { timeDepositCreatedParser } from './timeDepositCreated'
import { testDataset } from './timeDepositCreated.testdata'

describe('timeDepositCreatedParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = timeDepositCreatedParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns TimeDepositCreated if the input is parsable',
    ({ input, output }) => {
      const result = timeDepositCreatedParser(input)
      expect(result).toEqual(output)
    },
  )
})
