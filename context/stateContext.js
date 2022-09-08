import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = React.createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct
    let index

    const incQty = () => setQty(qty + 1)
    const decQty = () => setQty((prevQty) => (prevQty == 1 ? 1 : prevQty - 1))

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)

        setTotalPrice(totalPrice + product.price * quantity)
        setTotalQuantities(totalQuantities + quantity)

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                // 跑迴圈直到找到相同id 才修改該數據
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct, quantity: cartProduct.quantity + quantity
                    }
                }
            })
            setCartItems(updatedCartItems)
        } else {
            product.quantity = quantity
            setCartItems([...cartItems, { ...product }])
        }
        toast.success(`${qty} 個 ${product.name} 已加入購物車`)

        setQty(1)
    }

    const onRemove = (id) => {
        foundProduct = cartItems.find((item) => item._id === id)
        const newCartItems = cartItems.filter((item) => item._id !== id)

        setTotalPrice(totalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities(totalQuantities - foundProduct.quantity)
        setCartItems(newCartItems)
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        const newCartItems = cartItems.filter((item) => item._id !== id)

        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }])
            setTotalPrice(totalPrice + foundProduct.price)
            setTotalQuantities(totalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
                setTotalPrice(totalPrice - foundProduct.price)
                setTotalQuantities(totalQuantities - 1)
            }
        }
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)