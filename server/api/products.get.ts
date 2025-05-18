import type { Product } from '~/types/Products';
import products from '~/assets/data/products.json'

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  if (query.type) {
    return products.filter((item) => item.type === query.type) as Product[]
  }

  if (!products) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Products not found'
    })
  }
  
  return products as Product[]
})
