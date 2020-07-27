import { AutomaticTransferRegistrationCreated } from './automaticTransferRegistrationCreated'
import { TestDataset } from './testDataset.testkit'

export const testDataset: TestDataset<AutomaticTransferRegistrationCreated> = [
  {
    input: {
      subject: '自動振込サービスのご確認',
      text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。
下記のお振り込みを、自動振込サービスに登録いたしました。

振込名称：テスト
振込指定日：月末日

※振込資金は、振込指定日の前日までに普通預金口座へご入金ください。
※登録時「次回以降の振り込み」で「実施しない」を選択した場合は、自動振込は行われません。
自動振込サービスを開始する際に「実施する」に変更してください。`,
    },
    output: {
      type: 'automaticTransferRegistrationCreated',
      name: 'テスト',
      transferDate: '月末日',
    },
  },
  {
    input: {
      subject: '自動振込サービスのご確認',
      text: `
いつもご利用いただきありがとうございます。
下記のお振り込みを、自動振込サービスに登録いたしました。

振込名称：テスト
振込指定日：25日

※振込資金は、振込指定日の前日までに普通預金口座へご入金ください。
※登録時「次回以降の振り込み」で「実施しない」を選択した場合は、
自動振込は行われません。自動振込サービスを開始する際に「実施する」に
変更してください。`,
    },
    output: {
      type: 'automaticTransferRegistrationCreated',
      name: 'テスト',
      transferDate: '25日',
    },
  },
]

export default { testDataset }
