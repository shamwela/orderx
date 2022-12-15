export function useLoggedIn() {
  const jwt = useCookie('jwt')
  const loggedIn = jwt.value?.length !== 0
  return loggedIn
}
