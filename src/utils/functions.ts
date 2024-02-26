
export function withPayloadType<T>() {
  return (t: T) => ({ payload: t })
}

export const phoneMask = (value: string) => {
  if (!value) return ""
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{2})(\d)/, "($1) $2")
  value = value.replace(/(\d)(\d{4})$/, "$1-$2")
  return value
}