import { visaRefundedParser } from './visaRefunded'
import { testDataset } from './visaRefunded.testdata'

describe('visaRefundedParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = visaRefundedParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns VisaRefunded if the input is parsable',
    ({ input, output }) => {
      const result = visaRefundedParser(input)
      expect(result).toEqual(output)
    },
  )
})
