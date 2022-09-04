import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false, // paths以外のページアクセスを禁止
  }
}

// getStaticPathで取得したpropを受け取る
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    }
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head><title>{postData.title}</title></Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        {/* dangerouslySetInnerHTMLは本来使うときはデータをサニタイズすること。 */}
        <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML}} />
      </article>
    </Layout>
  );
}