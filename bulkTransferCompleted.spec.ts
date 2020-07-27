import { bulkTransferCompletedParser } from './bulkTransferCompleted'
import { testDataset } from './bulkTransferCompleted.testdata'

describe('bulkTransferCompletedParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = bulkTransferCompletedParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns BulkTransferCompleted if the input is parsable',
    ({ input, output }) => {
      const result = bulkTransferCompletedParser(input)
      expect(result).toEqual(output)
    },
  )
})
