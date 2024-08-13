export { default as getPaginatedProductsWithImages } from './products/products-pagination'
export { default as getProductBySlug } from './product/get-produt-by-slug'
export { default as getStockBySlug } from './product/get-stock-by-slug'

export { authenticate, login } from './auth/login'
export { logout } from './auth/logout'
export { registerUser } from './auth/register'

export { getCountries } from './country/get-countries'

export { setUserAddress } from './address/set-user-address'
export { deleteUserAddress } from './address/delete-user-address'
export { getUserAddress } from './address/get-user-address'

export { placeOrder } from './order/place-order'
export { getOrderById } from './order/get-order-by-id'
export { getOrdersBySessionUser } from './order/get-orders-by-user'
export { getPaginatedOrders } from './order/get-paginated-orders'

export { setTransactionId } from './payments/set-transaction-id'
export { paypalCheckPayment } from './payments/paypal-check-payment'

export { getPaginatedUsers } from './user/get-paginated-users'
export { changeRole } from './user/change-user-role'

export { getCategories } from './category/get-categories'
