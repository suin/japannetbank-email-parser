import { timeDepositMaturedParser } from './timeDepositMatured'
import { testDataset } from './timeDepositMatured.testdata'

describe('timeDepositMaturedParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = timeDepositMaturedParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns TimeDepositMatured if the input is parsable',
    ({ input, output }) => {
      const result = timeDepositMaturedParser(input)
      expect(result).toEqual(output)
    },
  )
})
