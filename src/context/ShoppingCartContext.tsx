import { createContext } from "react";
import { ReactNode, useEffect, useState } from "react";

import { IProduct } from "../domain/Product";

interface CartProps {
  valueTotal: number
  productSize: number
  productList: IProduct[]
  removeToCart: (id: string) => void
  addToCart: (newProduct: IProduct) => void
  changeQuantityItem: (id: string, quantity: number) => void
}

interface ContextProps {
  children: ReactNode
}

export const ShoppingCart = createContext({} as CartProps)

export function ShoppingCartProvider({ children }: ContextProps) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [valueTotal, setValueTotal] = useState<number>(0)

  function addToCart(newProduct: IProduct) {
    setProducts((state) => {
      const newProductId = newProduct.id
      const productExists = state.find((product) => product.id === newProductId)

      if (productExists) {
        return state.map((product) => product.id === newProductId && product)
      }

      return [
        ...state,
        {
          ...newProduct,
          quantity: 1,
        },
      ]
    })
  }

  function removeToCart(id: string) {
    const newProductList = products.filter((item) => item.id !== id)

    setProducts(newProductList)
  }

  function changeQuantityItem(id: string, quantity: number) {
    setProducts((state) => {
      const productExists = state.find((product) => product.id === id)

      if (productExists) {
        return state.map((product) =>
          product.id === id
            ? {
                ...product,
                quantity: quantity,
              }
            : product,
        )
      }

      return [...state]
    })
  }

  function calculateTotalValueInChart() {
    if (products.length <= 0) {
      return setValueTotal(0)
    }

    const valueTotalItems = products.reduce((acc, index) => {
      return acc + Number(index.price) * index.quantity
    }, 0)

    setValueTotal(valueTotalItems)
  }

  useEffect(() => {
    calculateTotalValueInChart()
  }, [products])

  const productSize = products.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)

  return (
    <ShoppingCart.Provider
      value={{
        productList: products,
        valueTotal,
        productSize,
        addToCart,
        removeToCart,
        changeQuantityItem,
      }}
    >
      {children}
    </ShoppingCart.Provider>
  )
}
