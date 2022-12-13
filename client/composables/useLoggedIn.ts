export function useLoggedIn() {
  const jwt = useCookie('jwt')
  const loggedIn = Boolean(jwt.value)
  return loggedIn
}
