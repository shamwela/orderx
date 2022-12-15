export function handleError(error: any) {
  const errorMessage = error.value?.response?._data.message
  if (process.client) {
    alert(errorMessage)
  }
  console.error(errorMessage)
}
