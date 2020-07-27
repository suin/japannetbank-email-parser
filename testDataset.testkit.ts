import { JapannetbankNotification } from '.'
import { ParserInput } from './parser'

export type TestDataset<T extends JapannetbankNotification> = TestData<T>[]
type TestData<T extends JapannetbankNotification> = {
  readonly input: ParserInput
  readonly output: T
}
