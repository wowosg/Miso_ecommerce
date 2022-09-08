import React from 'react'
import { client } from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '../components'

const Home = ({ products, bannerData }) => {
    return (
        <>
            <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
            <div className='products-heading'>
                <h2>最高級的聽覺饗宴</h2>
                <p>所有商品</p>
            </div>
            <hr/><br/>

            <div className='products-container'>
                {products?.map((product) => <Product key={product._id} product={product} />)}
            </div>
            <br/><hr/>

            <FooterBanner footerBanner={bannerData && bannerData[0]} />
        </>
    )
}

// 需要用獲得的資料來渲染頁面用SSR(server side rendering), 
// 不需要則用SSG(static site generation)
export const getServerSideProps = async () => {
    const query = '*[_type == "product"]'
    const products = await client.fetch(query)

    const bannerQuery = '*[_type == "banner"]'
    const bannerData = await client.fetch(bannerQuery)

    return {
        props: { products, bannerData }
    }
}

export default Home