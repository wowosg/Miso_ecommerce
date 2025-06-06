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
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity
                    }
                } else {
                    return cartProduct
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
    const updatedCartItems = cartItems.map((item) => {
        if (item._id === id) {
            const newQuantity =
            value === 'inc' ? item.quantity + 1 :
            value === 'dec' && item.quantity > 1 ? item.quantity - 1 : item.quantity;
            return { ...item, quantity: newQuantity };
        }
        return item;
    });

    const foundProduct = cartItems.find((item) => item._id === id)
    if (!foundProduct) return

    if (value === 'inc') {
        setTotalPrice(totalPrice + foundProduct.price)
        setTotalQuantities(totalQuantities + 1)
    } else if (value === 'dec' && foundProduct.quantity > 1) {
        setTotalPrice(totalPrice - foundProduct.price)
        setTotalQuantities(totalQuantities - 1)
    }

    setCartItems(updatedCartItems)
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
