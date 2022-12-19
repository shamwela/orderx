type Role = 'admin' | 'cashier' | 'cook'
export const useRole = () => useCookie('role').value as Role
