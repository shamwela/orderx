import type { Role } from '~~/types/Role'

export const useRole = () => localStorage.getItem('role') as Role
