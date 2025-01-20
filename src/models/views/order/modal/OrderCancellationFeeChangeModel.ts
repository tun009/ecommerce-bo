export interface OrderCancellationFeeChangeProps {
  cancellationFee: number
  finalPaymentAmount: number
  onCheck: (changedFee: number) => void
  onCancel?: () => void
}
