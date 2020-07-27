# @suin/japannetbank-email-parser

ジャパンネット銀行からの通知メールをパースしてオブジェクトにして返す関数。

## 通知対応状況

以下の通知をパースすることができます。

**自動振込サービス**

- ✅ 自動振込サービスのご確認 - [automaticTransferRegistrationCreated](./automaticTransferRegistrationCreated.ts)
- ✅ 自動振込サービス登録削除のご連絡 - [automaticTransferRegistrationDeleted](./automaticTransferRegistrationDeleted.ts)
- ✅ 自動振込サービス登録内容変更のご連絡 - [automaticTransferRegistrationUpdated](./automaticTransferRegistrationUpdated.ts)

**WEB 総振**

- ✅ ＷＥＢ総振の振込実施のお知らせ - [bulkTransferCompleted](./bulkTransferCompleted.ts)
- ✅ ＷＥＢ総振手数料引落のお知らせ - [bulkTransferUpcoming](./bulkTransferUpcoming.ts)
- ✅ ＷＥＢ総振実施の事前連絡 - [bulkTransferUpcoming](./bulkTransferUpcoming.ts)

**ペイジー**

- ✅ ペイジー払い込みのご確認 - [payeasyPaid](./payeasyPaid.ts)

**定期預金**

- ✅ 定期預金自動継続のご案内 - [timeDepositAutomaticallyRenewed](./timeDepositAutomaticallyRenewed.ts)
- ✅ 定期預金新約のご案内 - [timeDepositCreated](./timeDepositCreated.ts)
- ✅ 定期預金の満期を迎えたお客さまへ - [timeDepositMatured](./timeDepositMatured.ts)
- ✅ 定期預金の満期を迎えるお客さまへ - [timeDepositWillMature](./timeDepositWillMature.ts)

**振込**

- ✅ 振込入金のご連絡 - [transferDeposited](./transferDeposited.ts)
- ✅ 振込先口座の登録のご確認 - [transferDestinationRegistered](./transferDestinationRegistered.ts)
- ✅ 振込限度額変更のご確認 - [transferWithdrawalLimitChanged](./transferWithdrawalLimitChanged.ts)
- ✅ 振込予約のご確認 - [transferWithdrawalScheduled](./transferWithdrawalScheduled.ts)
- ✅ 振り込みのご確認 - [transferWithdrawn](./transferWithdrawn.ts)

**VISA デビット**

- ✅ 【重要】Ｖｉｓａデビット利用停止のご連絡 - [visaFrozen](./visaFrozen.ts)
- ✅ 【ＪＮＢ／Ｖｉｓａデビット】利用限度額変更のお知らせ - [visaLimitChanged](./visaLimitChanged.ts)
- ✅ 【Ｖｉｓａデビット】ご利用代金ご返金のお知らせ - [visaRefunded](./visaRefunded.ts)
- ✅ 【Ｖｉｓａデビット】ご利用代金お引き落としのお知らせ - [visaWithdrawn](./visaWithdrawn.ts)

## インストール方法

```bash
yarn add @suin/japannetbank-email-parser
# or
npm install @suin/japannetbank-email-parser
```

## 用法

基本的な用法としては、`parseJapannetbankNotification`関数にメールの題名と本文を渡します。この関数は題名と本文をパースします。パースが成功した場合は[JapannetbankNotification](./index.ts)を返します。未対応な通知の場合は`undefined`を返します。

```typescript
import { parseJapannetbankNotification } from '@suin/japannetbank-email-parser'

const notification = parseJapannetbankNotification({
  subject: '【Ｖｉｓａデビット】ご利用代金お引き落としのお知らせ',
  text: `
いつもジャパンネット銀行をご利用いただきありがとうございます。
JNB Visaデビットのご利用代金を普通預金口座よりお引き落としいたしました。

お引落日時：2020/07/27 02:47:20
お引落金額：2,205円
加盟店名：ＧＩＴＨＵＢ
取引明細番号：1A209002

▽JNB Visaデビットは還元率25％のマイナポイント事業の対象です！`,
})

console.log(notification)
//=> {
//     type: 'visaWithdrawn',
//     withdrawnOn: '2020-07-27T02:47:20+09:00',
//     useOfDate: undefined,
//     amount: 2205,
//     shop: 'ＧＩＴＨＵＢ',
//     number: '1A209002'
//   }
```

通知種別ごとに分岐処理する場合は、`JapannetbankNotification`の`type`プロパティをヒントにしてください。

## API リファレンス

https://suin.github.io/japannetbank-email-parser/
