export const clientUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://orderx.up.railway.app'
    : 'http://localhost:3000'
