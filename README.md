https://ecommerce-sanity-sigma.vercel.app/

這是一個利用Next.js 搭配 Sanity_studio 製作的購物車網站

Sanity能讓使用者更簡單的搭建資料庫，只要把schema寫好，便可直接於他們的頁面上直接管理網站後台創建Data

用CSS寫了一些簡單的動畫增加使用者體驗

使用 Next.js 建構 File-based 路由，並用SSR、SSG的方式將 Sanity_studio 裡的資料渲染在頁面上

避免傳遞參數過於複雜，利用useContext來管理狀態

目前的功能有

1.點擊商品進入動態配置路由的商品詳細頁面，點選數量加入購物車

2.右上角的圖標開啟購物車欄，並可直接在已被加入至此的商品修改數量或直接刪除

最近正在嘗試利用Stripe來添加立即購買的功能，希望未來能把這個網站做得更全面
