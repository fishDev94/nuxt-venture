import type { Product } from '~/types/Products';
import products from '~/assets/data/products.json'

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  if (query.type) {
    return products.filter((item) => item.type === query.type) as Product[]
  }
  
  return products as Product[]
})
