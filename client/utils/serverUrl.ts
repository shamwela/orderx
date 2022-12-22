export const serverUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://orderx-server.onrender.com'
    : 'http://localhost:2000'
