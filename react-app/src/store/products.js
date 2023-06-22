const ALL_PRODUCTS = 'products/allProduct'
const USER_PRODUCTS = 'products/currentProducts'
const SINGLE_PRODUCT = 'products/singleProduct'
const CREATE_PRODUCT = 'products/createProduct'
const EDIT_PRODUCT = 'products/editProduct'
const DELETE_PRODUCT = 'products/deleteProduct'

const allProducts = (products) => ({
  type: ALL_PRODUCTS,
  payload: products
})

const userProducts = (products) => ({
  type: USER_PRODUCTS,
  payload: products
})

const singleProduct = (product) => ({
  type: SINGLE_PRODUCT,
  payload: product
})

const createProduct = (product) => ({
  type: CREATE_PRODUCT,
  payload: product
})

const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  payload: product
})

const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId
})

export const allProductsThunk = () => async dispatch => {
  const res = await fetch('/api/products/');
  if (res.ok) {
    const products = await res.json()
    await dispatch(allProducts(products.products))
    return products
  } else return null
}

export const currentProductsThunk = () => async dispatch => {
  const res = await fetch('/api/products/current');
  if (res.ok) {
    const products = await res.json()
    await dispatch(userProducts(products.products))
    return products
  } else return null
}

export const singleProductsThunk = (productId) => async dispatch => {
  const res = await fetch(`/api/products/${productId}`);
  if (res.ok) {
    const product = await res.json()
    await dispatch(singleProduct(product))
    return product
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const createProductThunk = (product) => async dispatch => {
  const res = await fetch('/api/products/new', {
    method: 'POST',
    body: product
  })

  if (res.ok) {
    const newProduct = await res.json();
    await dispatch(createProduct(newProduct))
    return newProduct;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const editProductThunk = (product, id) => async dispatch => {
  console.log('👺~👺~👺~👺~~~~~~~~~~edited product~~~~~~~>', product)
  const res = await fetch(`/api/products/${id}/edit`, {
    method: 'PUT',
    body: product
  })

  if (res.ok) {
    const newProduct = await res.json();
    await dispatch(editProduct(newProduct))
    return newProduct;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const deleteProductThunk = (id) => async dispatch => {
  const res = await fetch(`/api/products/${id}/delete`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const deleted = await res.json()
    await dispatch(deleteProduct(id))
    return deleted
  } else {
    const errors = await res.json();
    return errors;
  }
}




const initialState = { allProducts: {}, singleProduct: {}, userProducts: {} }
export default function productsReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case ALL_PRODUCTS:
      newState = { ...state, allProducts: {} };
      action.payload.forEach(el => newState.allProducts[el.id] = el)
      return newState;
    case USER_PRODUCTS:
      newState = { ...state, userProducts: {} };
      action.payload.forEach(el => newState.userProducts[el.id] = el)
      return newState;
    case SINGLE_PRODUCT:
      newState = { ...state, singleProduct: { ...action.payload } }
      return newState
    case CREATE_PRODUCT:
      newState = { ...state, allProducts: { ...state.allProducts }, singleProduct: { ...action.payload }, userProducts: { ...action.payload } }
      newState.allProducts[action.payload.id] = action.payload
      newState.userProducts[action.payload.id] = action.payload
      return newState
    case EDIT_PRODUCT:
      newState = { ...state, allProducts: { ...state.allProducts }, singleProduct: { ...action.payload }, userProducts: { ...state.userProducts } }
      newState.allProducts[action.payload.id] = action.payload
      newState.userProducts[action.payload.id] = action.payload
      return newState
    case DELETE_PRODUCT:
      newState = { ...state, allProducts: { ...state.allProducts }, userProducts: { ...state.userProducts } }
      console.log('👿~~~~~~~~~~~~~~~~delete action payload', action.payload)
      delete newState.allProducts[action.payload];
      delete newState.userProducts[action.payload];
      return newState
    default:
      return state
  }
}