export const serverUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://orderx-server.up.railway.app/'
    : 'http://localhost:2000/'
