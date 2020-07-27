import { bulkTransferFeeChargedParser } from './bulkTransferFeeCharged'
import { testDataset } from './bulkTransferFeeCharged.testdata'

describe('bulkTransferFeeChargedParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = bulkTransferFeeChargedParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns BulkTransferFeeCharged if the input is parsable',
    ({ input, output }) => {
      const result = bulkTransferFeeChargedParser(input)
      expect(result).toEqual(output)
    },
  )
})
