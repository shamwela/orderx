import { UseFetchOptions } from '#app'
import { NitroFetchRequest } from 'nitropack'
import { KeyOfRes } from 'nuxt/dist/app/composables/asyncData'

export function useMyFetch<T>(
  request: NitroFetchRequest,
  options?:
    | UseFetchOptions<
        T extends void ? unknown : T,
        (res: T extends void ? unknown : T) => T extends void ? unknown : T,
        KeyOfRes<
          (res: T extends void ? unknown : T) => T extends void ? unknown : T
        >
      >
    | undefined
) {
  const jwt = localStorage.getItem('jwt') as string
  const headers = {
    jwt,
    ...options?.headers,
  }

  return useFetch<T>(request, {
    baseURL: serverUrl,
    headers,
    server: false,
    ...options,
  })
}
