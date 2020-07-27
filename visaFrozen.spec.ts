import { visaFrozenParser } from './visaFrozen'
import { testDataset } from './visaFrozen.testdata'

describe('visaFrozenParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = visaFrozenParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns VisaFrozen if the input is parsable',
    ({ input, output }) => {
      const result = visaFrozenParser(input)
      expect(result).toEqual(output)
    },
  )
})
