import { JapannetbankNotification } from './index'

export type Parser<
  T extends JapannetbankNotification = JapannetbankNotification
> = (input: ParserInput) => T | undefined

export type ParserInput = {
  readonly subject: string
  readonly text: string
}

export const buildParser = (...parsers: ReadonlyArray<Parser>): Parser => {
  return input => {
    for (const parser of parsers) {
      const result = parser(input)
      if (result) {
        return result
      }
    }
    return undefined
  }
}
