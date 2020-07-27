import { visaWithdrawnParser } from './visaWithdrawn'
import { testDataset } from './visaWithdrawn.testdata'

describe('visaWithdrawnParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = visaWithdrawnParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns VisaWithdrawn if the input is parsable',
    ({ input, output }) => {
      const result = visaWithdrawnParser(input)
      expect(result).toEqual(output)
    },
  )
})
