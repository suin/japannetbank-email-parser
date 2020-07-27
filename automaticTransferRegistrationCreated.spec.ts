import { automaticTransferRegistrationCreatedParser } from './automaticTransferRegistrationCreated'
import { testDataset } from './automaticTransferRegistrationCreated.testdata'

describe('automaticTransferRegistrationCreatedParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = automaticTransferRegistrationCreatedParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns AutomaticTransferRegistrationCreated if the input is parsable',
    ({ input, output }) => {
      const result = automaticTransferRegistrationCreatedParser(input)
      expect(result).toEqual(output)
    },
  )
})
