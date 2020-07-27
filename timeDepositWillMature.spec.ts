import { timeDepositWillMatureParser } from './timeDepositWillMature'
import { testDataset } from './timeDepositWillMature.testdata'

describe('timeDepositWillMatureParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = timeDepositWillMatureParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns TimeDepositWillMature if the input is parsable',
    ({ input, output }) => {
      const result = timeDepositWillMatureParser(input)
      expect(result).toEqual(output)
    },
  )
})
