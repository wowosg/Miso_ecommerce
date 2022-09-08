import React from 'react'
import { AiFillInstagram, AiOutlineFacebook } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 Miso Headphones All rights reserved</p>
      <p className='icons'>
        <AiOutlineFacebook />
        <AiFillInstagram />
      </p>
    </div>
  )
}

export default Footer