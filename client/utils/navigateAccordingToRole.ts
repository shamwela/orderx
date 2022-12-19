export async function navigateAccordingToRole() {
  const role = useRole()
  switch (role) {
    case 'admin':
      await navigateTo('/product')
      break

    case 'cashier':
      await navigateTo('/cashier')
      break

    case 'cook':
      await navigateTo('/cook')
      break
  }
}
