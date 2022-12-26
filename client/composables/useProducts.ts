import type { Product } from '~~/types/Product'

export const useProducts = () => useMyFetch<Product[]>('/product')
