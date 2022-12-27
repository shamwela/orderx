export const useTitle = (title: string) =>
  useHead({
    title,
    meta: [
      {
        name: 'description',
        // Use the title as description
        content: title,
      },
    ],
  })
