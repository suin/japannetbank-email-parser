import { automaticTransferRegistrationDeletedParser } from './automaticTransferRegistrationDeleted'
import { testDataset } from './automaticTransferRegistrationDeleted.testdata'

describe('automaticTransferRegistrationDeletedParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = automaticTransferRegistrationDeletedParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns AutomaticTransferRegistrationDeleted if the input is parsable',
    ({ input, output }) => {
      const result = automaticTransferRegistrationDeletedParser(input)
      expect(result).toEqual(output)
    },
  )
})
