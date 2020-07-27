import { transferDestinationRegisteredParser } from './transferDestinationRegistered'
import { testDataset } from './transferDestinationRegistered.testdata'

describe('transferDestinationRegisteredParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = transferDestinationRegisteredParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns TransferDestinationRegistered if the input is parsable',
    ({ input, output }) => {
      const result = transferDestinationRegisteredParser(input)
      expect(result).toEqual(output)
    },
  )
})
