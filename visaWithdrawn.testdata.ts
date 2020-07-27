import { TestDataset } from './testDataset.testkit'
import { VisaWithdrawn } from './visaWithdrawn'

export const testDataset: TestDataset<VisaWithdrawn> = [
  {
    input: {
      subject: '【Ｖｉｓａデビット】ご利用代金お引き落としのお知らせ',
      text: `カ）クラフトマンソフトウェア様

いつもジャパンネット銀行をご利用いただきありがとうございます。
JNB Visaデビットのご利用代金を普通預金口座よりお引き落としいたしました。

お引落日時：2001/02/03 04:05:06
お引落金額：2,760円
加盟店名：ＡＭＡＺＯＮ　ＣＯ　ＪＰ
取引明細番号：1A165002


[...略...]`,
    },
    output: {
      type: 'visaWithdrawn',
      withdrawnOn: '2001-02-03T04:05:06+09:00',
      amount: 2760,
      shop: 'ＡＭＡＺＯＮ　ＣＯ　ＪＰ',
      number: '1A165002',
    },
  },
  {
    input: {
      subject: '【Ｖｉｓａデビット】ご利用代金お引き落としのお知らせ',
      text: `カ）クラフトマンソフトウェア様

いつもジャパンネット銀行をご利用いただきありがとうございます。
JNB Visaデビットのご利用代金を普通預金口座よりお引き落としいたしました。

お引落日時：2001/02/03 04:05:06
ご利用日：2000/01/02
お引落金額：1円
加盟店名：ＧＩＴＨＵＢ
取引明細番号：1A165001

[...略...]`,
    },
    output: {
      type: 'visaWithdrawn',
      withdrawnOn: '2001-02-03T04:05:06+09:00',
      useOfDate: '2000-01-02',
      amount: 1,
      shop: 'ＧＩＴＨＵＢ',
      number: '1A165001',
    },
  },
]

export default { testDataset }
