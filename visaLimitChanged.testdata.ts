import { TestDataset } from './testDataset.testkit'
import { VisaLimitChanged } from './visaLimitChanged'

export const testDataset: TestDataset<VisaLimitChanged> = [
  {
    input: {
      subject: '【ＪＮＢ／Ｖｉｓａデビット】利用限度額変更のお知らせ',
      text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。
JNB Visaデビットのご利用限度額が変更されました。

ご利用限度額は、JNB Visaデビットを使った
ショッピングおよび海外ATMでの現地通貨お引き出しの
合算金額となります。

変更日時：2020/02/21 12:46:11
ご利用限度額
Visaデビットお取引合計：2,200,000円
うちタッチ決済：-円

※ご利用限度額はショップから当社に到着する取引情報通知の
決済金額が対象となります。売上確定通知はご利用限度額の対象外に
なります。`,
    },
    output: {
      type: 'visaLimitChanged',
      changedOn: '2020-02-21T12:46:11+09:00',
      newLimit: 2_200_000,
    },
  },
]

export default { testDataset }
