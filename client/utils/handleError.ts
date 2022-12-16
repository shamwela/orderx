export function handleError(error: any) {
  const errorMessage = error.value?.response?._data.message || 'Unknown error'
  if (process.client) {
    alert(errorMessage)
  }
  console.error(error.value)
}
