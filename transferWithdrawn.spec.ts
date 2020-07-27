import { transferWithdrawnParser } from './transferWithdrawn'
import { testDataset } from './transferWithdrawn.testdata'

describe('transferWithdrawnParser', () => {
  it('returns undefined if the email is unknown type', () => {
    const result = transferWithdrawnParser({
      subject: 'unknown email type',
      text: 'unknown email type',
    })
    expect(result).toBeUndefined()
  })

  test.each(testDataset)(
    'returns TransferWithdrawn if the input is parsable',
    ({ input, output }) => {
      const result = transferWithdrawnParser(input)
      expect(result).toEqual(output)
    },
  )
})
