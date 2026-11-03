export function formatDateMask(value: string) {
  const cleanValue = value.replace(/\D/g, '');
  let formatted = '';

  if (cleanValue.length > 0) {
    formatted = cleanValue.substring(0, 2);
  }
  if (cleanValue.length > 2) {
    formatted += '/' + cleanValue.substring(2, 4);
  }
  if (cleanValue.length > 4) {
    formatted += '/' + cleanValue.substring(4, 8);
  }
  return formatted;
}

export function formatTimeMask(value: string) {
  const cleanValue = value.replace(/\D/g, '');
  let formatted = '';

  if (cleanValue.length > 0) {
    formatted = cleanValue.substring(0, 2);
  }
  if (cleanValue.length > 2) {
    formatted += ':' + cleanValue.substring(2, 4);
  }
  return formatted;
}