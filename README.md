https://ecommerce-sanity-sigma.vercel.app/

這是一個使用 **Next.js** 搭配 **Sanity Studio** 製作的購物車網站，具備商品展示、購物車管理、後台內容維護等功能。

## 說明

- **Next.js**
  - 採用 File-based routing 架構
  - 使用 `getServerSideProps` 將 Sanity 的資料預先渲染至頁面（SSR）

- **Sanity Studio**
  - 快速搭建可視化 CMS 後台
  - 只需撰寫 schema，即可在 Studio 中建構與管理資料
  - 所有商品資訊皆由 Sanity 管理

- **狀態管理**
  - 使用 `useContext` 管理購物車狀態，避免 props 傳遞過深

- **CSS 動畫**
  - 自行撰寫簡單動畫，提升使用者體驗（如加入購物車時的 Toast 提示）

## 前置需求

請先安裝 Sanity CLI https://www.sanity.io/docs/getting-started-with-sanity-cli

## 啟動

npm install -g @sanity/cli

npm install

cd sanity_ecommerce

npx sanity start
