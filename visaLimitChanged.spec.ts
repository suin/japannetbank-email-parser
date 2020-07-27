import { visaLimitChangedParser } from './visaLimitChanged'
import { testDataset } from './visaLimitChanged.testdata'

describe('visaLimitChangedParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = visaLimitChangedParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns VisaLimitChanged if the input is parsable',
    ({ input, output }) => {
      const result = visaLimitChangedParser(input)
      expect(result).toEqual(output)
    },
  )
})
