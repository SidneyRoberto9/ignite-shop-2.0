import { createContext, ReactNode, useEffect, useReducer, useState } from "react";

import { IProduct } from "../domain/Product";
import { addToCartAction, removeFromCartAction } from "../reducers/cart/actions";
import { shoppingCartReducers } from "../reducers/cart/reducer";

interface CartProps {
  valueTotal: number
  productSize: number
  productList: IProduct[]
  removeToCart: (id: string) => void
  addToCart: (newProduct: IProduct) => void
}

interface ContextProps {
  children: ReactNode
}

export const ShoppingCart = createContext({} as CartProps)

export function ShoppingCartProvider({ children }: ContextProps) {
  const [productState, dispatch] = useReducer(
    shoppingCartReducers,
    {
      products: [],
      productsSize: 0,
      productsTotalValue: 0,
    },
    () => {
      return {
        products: [],
        productsSize: 0,
        productsTotalValue: 0,
      }
    },
  )

  const { products, productsSize, productsTotalValue } = productState

  function addToCart(newProduct: IProduct) {
    dispatch(addToCartAction(newProduct))
  }

  function removeToCart(id: string) {
    dispatch(removeFromCartAction(id))
  }

  // function changeQuantityItem(id: string, quantity: number) {
  //   setProducts((state) => {
  //     const productExists = state.find((product) => product.id === id)

  //     if (productExists) {
  //       return state.map((product) =>
  //         product.id === id
  //           ? {
  //               ...product,
  //               quantity: quantity,
  //             }
  //           : product,
  //       )
  //     }

  //     return [...state]
  //   })
  // }

  // function calculateTotalValueInChart() {
  //   if (products.length <= 0) {
  //     return setValueTotal(0)
  //   }

  //   const valueTotalItems = products.reduce((acc, index) => {
  //     return acc + Number(index.price) * index.quantity
  //   }, 0)

  //   setValueTotal(valueTotalItems)
  // }

  // useEffect(() => {
  //   calculateTotalValueInChart()
  // }, [products])

  // const productSize = products.reduce((acc, item) => {
  //   return acc + item.quantity
  // }, 0)

  return (
    <ShoppingCart.Provider
      value={{
        productList: products,
        valueTotal: productsTotalValue,
        productSize: productsSize,
        addToCart,
        removeToCart,
      }}
    >
      {children}
    </ShoppingCart.Provider>
  )
}
