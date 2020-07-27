import { bulkTransferUpcomingParser } from './bulkTransferUpcoming'
import { testDataset } from './bulkTransferUpcoming.testdata'

describe('bulkTransferUpcomingParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = bulkTransferUpcomingParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns BulkTransferUpcoming if the input is parsable',
    ({ input, output }) => {
      const result = bulkTransferUpcomingParser(input)
      expect(result).toEqual(output)
    },
  )
})
