import {
  AutomaticTransferRegistrationCreated,
  automaticTransferRegistrationCreatedParser,
} from './automaticTransferRegistrationCreated'
import {
  AutomaticTransferRegistrationDeleted,
  automaticTransferRegistrationDeletedParser,
} from './automaticTransferRegistrationDeleted'
import {
  AutomaticTransferRegistrationUpdated,
  automaticTransferRegistrationUpdatedParser,
} from './automaticTransferRegistrationUpdated'
import {
  BulkTransferCompleted,
  bulkTransferCompletedParser,
} from './bulkTransferCompleted'
import {
  BulkTransferFeeCharged,
  bulkTransferFeeChargedParser,
} from './bulkTransferFeeCharged'
import {
  BulkTransferUpcoming,
  bulkTransferUpcomingParser,
} from './bulkTransferUpcoming'
import { buildParser } from './parser'
import { PayeasyPaid, payeasyPaidParser } from './payeasyPaid'
import {
  TimeDepositAutomaticallyRenewed,
  timeDepositAutomaticallyRenewedParser,
} from './timeDepositAutomaticallyRenewed'
import {
  TimeDepositCreated,
  timeDepositCreatedParser,
} from './timeDepositCreated'
import {
  TimeDepositMatured,
  timeDepositMaturedParser,
} from './timeDepositMatured'
import {
  TimeDepositWillMature,
  timeDepositWillMatureParser,
} from './timeDepositWillMature'
import { TransferDeposited, transferDepositedParser } from './transferDeposited'
import {
  TransferDestinationRegistered,
  transferDestinationRegisteredParser,
} from './transferDestinationRegistered'
import {
  TransferWithdrawalLimitChanged,
  transferWithdrawalLimitChangedParser,
} from './transferWithdrawalLimitChanged'
import {
  TransferWithdrawalScheduled,
  transferWithdrawalScheduledParser,
} from './transferWithdrawalScheduled'
import { TransferWithdrawn, transferWithdrawnParser } from './transferWithdrawn'
import { VisaFrozen, visaFrozenParser } from './visaFrozen'
import { VisaLimitChanged, visaLimitChangedParser } from './visaLimitChanged'
import { VisaRefunded, visaRefundedParser } from './visaRefunded'
import { VisaWithdrawn, visaWithdrawnParser } from './visaWithdrawn'

export type JapannetbankNotification =
  | AutomaticTransferRegistrationCreated
  | AutomaticTransferRegistrationDeleted
  | AutomaticTransferRegistrationUpdated
  | BulkTransferCompleted
  | BulkTransferFeeCharged
  | BulkTransferUpcoming
  | PayeasyPaid
  | TimeDepositAutomaticallyRenewed
  | TimeDepositCreated
  | TimeDepositMatured
  | TimeDepositWillMature
  | TransferDeposited
  | TransferDestinationRegistered
  | TransferWithdrawalLimitChanged
  | TransferWithdrawalScheduled
  | TransferWithdrawn
  | VisaFrozen
  | VisaLimitChanged
  | VisaRefunded
  | VisaWithdrawn
export {
  AutomaticTransferRegistrationCreated,
  AutomaticTransferRegistrationDeleted,
  AutomaticTransferRegistrationUpdated,
  BulkTransferCompleted,
  BulkTransferFeeCharged,
  BulkTransferUpcoming,
  PayeasyPaid,
  TimeDepositAutomaticallyRenewed,
  TimeDepositCreated,
  TimeDepositMatured,
  TimeDepositWillMature,
  TransferDeposited,
  TransferDestinationRegistered,
  TransferWithdrawalLimitChanged,
  TransferWithdrawalScheduled,
  TransferWithdrawn,
  VisaFrozen,
  VisaRefunded,
  VisaLimitChanged,
  VisaWithdrawn,
}

export const parseJapannetbankNotification = buildParser(
  automaticTransferRegistrationCreatedParser,
  automaticTransferRegistrationDeletedParser,
  automaticTransferRegistrationUpdatedParser,
  bulkTransferCompletedParser,
  bulkTransferFeeChargedParser,
  bulkTransferUpcomingParser,
  payeasyPaidParser,
  timeDepositAutomaticallyRenewedParser,
  timeDepositCreatedParser,
  timeDepositMaturedParser,
  timeDepositWillMatureParser,
  transferDepositedParser,
  transferDestinationRegisteredParser,
  transferWithdrawalLimitChangedParser,
  transferWithdrawalScheduledParser,
  transferWithdrawnParser,
  visaFrozenParser,
  visaLimitChangedParser,
  visaRefundedParser,
  visaWithdrawnParser,
)
