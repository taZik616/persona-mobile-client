export type helpDetailKey =
  | 'exchange_and_return'
  | 'terms_of_sale'
  | 'privacy_policy'
  | 'payment_policy'
  | 'contacts'
  | 'delivery'

export type sheetPointsT = [number, number]

export type ArrayElementType<
  ArrayType extends readonly unknown[] | null | undefined,
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never
