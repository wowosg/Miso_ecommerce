import React, { useRef } from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'

import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'

import { useStateContext } from '../context/stateContext'
import { urlFor } from '../lib/client'

const Cart = () => {
  const cartRef = useRef()
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext()

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <div className='heading'>你的購物車</div>
          <div className='cart-num-items'>({totalQuantities} 個物品)</div>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>您還沒有添加商品到購物車喔..</h3>
            <Link href='/'>
              <button
                type='button'
                className='btn'
                onClick={() => setShowCart(false)}
              >
                繼續購物去
              </button>
            </Link>
          </div>
        )}
        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} className='cart-product-image' />
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>$ {item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                        <AiOutlineMinus />
                      </span>
                      <span className='num'>{item.quantity}</span>
                      <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button
                    type='button'
                    className='remove-item'
                    onClick={()=>onRemove(item._id)}
                  >
                    <TiDeleteOutline size={35} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>總計：</h3>
              <h3>$ {totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button
                type='button'
                className='btn'

              >
                立即付款
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart