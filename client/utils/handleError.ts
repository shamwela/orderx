export function handleError(error: any) {
  const errorMessage = error.value?.response?._data.message
  alert(errorMessage)
  console.error(errorMessage)
}
