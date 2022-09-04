import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import { getPostsData } from '../lib/post'
import styles from '../styles/Home.module.css'
import utilStyle from '../styles/utils.module.css'

// Static Site Generator(SSG)の場合
// 外部のデータを1度のみ取得するNEXT.jsの関数
export async function getStaticProps() {
  const allPostsData = getPostsData(); // id, title, date, thumbnail
  console.log(allPostsData)

  return {
    props: {
      allPostsData,
    },
  };
};

// // Server Side Rendering(SSR)の場合
// 毎回リクエストするデータを取得するNEXT.jsの関数
// export async function getServerSideProps(context) {
//   const data = await getData(); // この中でawaitとかでfetchしてくる感じ。
//   return {
//     props: {
//       data,
//     }
//   }
// };

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={ utilStyle.headingMd }>
        <p>devブランチで開発した内容をマージします。</p>
      </section>

      <section>
        <h2>エンジニアのブログ</h2>
        <div className={ styles.grid }>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={ id }>
              <Link href={`posts/${id}`}>
                <img src={`${thumbnail}`} className={ styles.thumbnailImage } />
              </Link>
              <Link href={`posts/${id}`}>
                <a className={ utilStyle.boldText }>{ title }</a>
              </Link>
              <br />
              <small className={ utilStyle.lightText }>{ date }</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
