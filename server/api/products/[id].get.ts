import type { Product } from '~/types/Products';
import products from '~/assets/data/products.json'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID should be a number'
    })
  }

  const product = products.find(item => item.id === id)

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    })
  }

  return product as Product
})
