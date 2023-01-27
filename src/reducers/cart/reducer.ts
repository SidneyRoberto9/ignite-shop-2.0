import produce from "immer";

import { IProduct } from "../../domain/Product";
import { ActionTypes } from "./actions";

interface ShoppingCartState {
  products: IProduct[]
  productsSize: number
  productsTotalValue: number
}

export function shoppingCartReducers(state: ShoppingCartState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      const productAlreadyExist = state.products.find(
        (product) => product.id === action.payload.newProduct.id,
      )

      if (productAlreadyExist !== undefined) {
        return state
      }

      return produce(state, (draft) => {
        draft.products.push(action.payload.newProduct)
        draft.productsSize = draft.products.length
        draft.productsTotalValue = draft.products.reduce(
          (total, product) => total + product.price,
          0,
        )
      })

    case ActionTypes.REMOVE_FROM_CART: {
      const currentProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id,
      )

      if (currentProductIndex > 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.products = draft.products.filter(
          (product) => product.id !== action.payload.id,
        )
        draft.productsSize = draft.products.length
        draft.productsTotalValue = draft.products.reduce(
          (total, product) => total + product.price,
          0,
        )
      })
    }

    default:
      return state
  }
}
