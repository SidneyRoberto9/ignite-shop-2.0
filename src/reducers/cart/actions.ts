import { IProduct } from "../../domain/Product";

export enum ActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
}

export function addToCartAction(newProduct: IProduct) {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: {
      newProduct,
    },
  }
}

export function removeFromCartAction(id: string) {
  return {
    type: ActionTypes.REMOVE_FROM_CART,
    payload: {
      id,
    },
  }
}
