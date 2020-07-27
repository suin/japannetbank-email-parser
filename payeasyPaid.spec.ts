import { payeasyPaidParser } from './payeasyPaid'
import { testDataset } from './payeasyPaid.testdata'

describe('payeasyPaidParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = payeasyPaidParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns PayeasyPaid if the input is parsable',
    ({ input, output }) => {
      const result = payeasyPaidParser(input)
      expect(result).toEqual(output)
    },
  )
})
