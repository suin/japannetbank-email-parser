import { TestDataset } from './testDataset.testkit'
import { VisaRefunded } from './visaRefunded'

export const testDataset: TestDataset<VisaRefunded> = [
  {
    input: {
      subject: '【Ｖｉｓａデビット】ご利用代金ご返金のお知らせ',
      text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。
JNB Visaデビットのご利用代金をご返金いたしました。

ご返金日時：2001/02/03 04:05:06
ご返金額：1,234円
加盟店名：ＡＭＡＺＯＮ　ＣＯ　ＪＰ
取引明細番号：1A199004

「残高確認アプリ」でご利用明細が簡単に確認できます。`,
    },
    output: {
      type: 'visaRefunded',
      refundedOn: '2001-02-03T04:05:06+09:00',
      amount: 1234,
      shop: 'ＡＭＡＺＯＮ　ＣＯ　ＪＰ',
      number: '1A199004',
    },
  },
]

export default { testDataset }
