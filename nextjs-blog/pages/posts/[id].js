import Layout from "../../components/layout";
import {getAllPostIds, getPostData} from "../../lib/posts";
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps({params}) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>
                    {postData.title}
                </title>
            </Head>
            <div className="card">
                <article className="card-body">
                    <h1 className={utilStyles.headingXl + "card-title"}>{postData.title}</h1>
                    <div className={utilStyles.lightText}>
                        <Date dateString={postData.date}/>
                    </div>
                    <div className="card-text" dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
                </article>
            </div>

        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}