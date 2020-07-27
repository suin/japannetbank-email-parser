import { automaticTransferRegistrationUpdatedParser } from './automaticTransferRegistrationUpdated'
import { testDataset } from './automaticTransferRegistrationUpdated.testdata'

describe('automaticTransferRegistrationUpdatedParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = automaticTransferRegistrationUpdatedParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns AutomaticTransferRegistrationUpdated if the input is parsable',
    ({ input, output }) => {
      const result = automaticTransferRegistrationUpdatedParser(input)
      expect(result).toEqual(output)
    },
  )
})
