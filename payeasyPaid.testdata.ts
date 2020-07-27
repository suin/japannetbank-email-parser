import { PayeasyPaid } from './payeasyPaid'
import { TestDataset } from './testDataset.testkit'

export const testDataset: TestDataset<PayeasyPaid> = [
  {
    input: {
      subject: 'ペイジー払い込みのご確認',
      text: `
いつもご利用いただきありがとうございます。
Pay-easy（ペイジー）の払い込みを受け付けいたしましたので、
ご確認をお願いいたします。

受付番号: 2020071002866599
払込日時: 2020/07/10 08:52:12
払込先: 地方税共同機構
納付番号: 18020622256625
お名前: クラフトマンソフトウエア
払込内容: 住民特徴０２年０６月
払込金額: 132,600円
払込手数料: 0円（消費税含）

お取引状況は、以下よりご確認ください。`,
    },
    output: {
      type: 'payeasyPaid',
      receiptNumber: '2020071002866599',
      paidOn: '2020-07-10T08:52:12+09:00',
      payee: '地方税共同機構',
      paymentNumber: '18020622256625',
      name: 'クラフトマンソフトウエア',
      detail: '住民特徴０２年０６月',
      amount: 132_600,
      fee: 0,
    },
  },
  {
    input: {
      subject: 'ペイジー払い込みのご確認',
      text: `
いつもご利用いただきありがとうございます。
Pay-easy（ペイジー）の払い込みを受け付けいたしましたので、
ご確認をお願いいたします。

受付番号: 2020062901837964
払込日時: 2020/06/29 15:02:22
払込先: ＮＴＴファイナンス
お客さま番号: 3010210958575
お名前:
払込内容: ２０２０年　６月分
払込金額: 12,963円
払込手数料: 0円（消費税含）

お取引状況は、以下よりご確認ください。`,
    },
    output: {
      type: 'payeasyPaid',
      receiptNumber: '2020062901837964',
      paidOn: '2020-06-29T15:02:22+09:00',
      payee: 'ＮＴＴファイナンス',
      customerNumber: '3010210958575',
      name: '',
      detail: '２０２０年　６月分',
      amount: 12_963,
      fee: 0,
    },
  },
]

export default { testDataset }
