export const useTitle = (title: string, description: string = title) =>
  useHead({
    title,
    meta: [{ name: 'description', content: description }],
  })
