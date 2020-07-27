import { TestDataset } from './testDataset.testkit'
import { VisaFrozen } from './visaFrozen'

export const testDataset: TestDataset<VisaFrozen> = [
  {
    input: {
      subject: '【重要】Ｖｉｓａデビット利用停止のご連絡',
      text: `
ジャパンネット銀行から重要なお知らせです。
お客さまのJNB Visaデビットが一時的に利用停止となりました。

＜利用停止の主な理由＞
下記のいずれかが一定回数以上続いたため
・残高不足（ご利用時、月額利用サービス登録時など）
・利用限度額オーバー
・ご入力内容の相違（Visaデビット暗証番号（PIN）、暗証番号、有効期限など）

＜利用再開方法＞
パソコンまたはスマートフォンで以下のURLからログイン後、カード番号のステータスをご確認いただき、利用停止を解除してください。
https://login.japannetbank.co.jp/wctx/LoginAction.do?screen=VisaNum&aatc=vi1702jb04c
※ログイン後、該当の画面が表示できない場合、またはBA-PLUSをご契約のお客さまは、Welcome Pageから、「Visaデビット」＞「カード番号照会・停止・再開」より変更いただけます。

＜利用停止日時＞
2020/06/18 16:29:23

------------------------------------`,
    },
    output: {
      type: 'visaFrozen',
      frozenOn: '2020-06-18T16:29:23+09:00',
    },
  },
]

export default { testDataset }
