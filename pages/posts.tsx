import React from 'react';
import Navbar from '../components/Navbar';
import { getPosts } from '../fetchData/getPosts';
import Seo from '../components/Seo';
import { decrypt } from '../lib/enc';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Link from 'next/link';

interface PostProps {
  title: string;
  text: string;
  slug: string;
}
interface PostsProps {
  posts: PostProps[];
}
const post = ({ posts }: PostsProps) => {
  return (
    <>
      <Seo
        title='Posts'
        description="Coi nostri post puoi imparare gli argomenti più svariati riguardanti la patente, come il modo migliore per prepararsi all'esame!"
        canonical='https://patenteragazzi.it/posts'
      />
      <Navbar isAdminNav={false} active={'post'} />
      <div className='container main_content'>
        {posts.map((post) => {
          const text = decrypt(post.text).slice(0, 150) + '...';

          return (
            <div key={post.slug}>
              <h2>{post.title}</h2>

              <div dangerouslySetInnerHTML={{ __html: text }}></div>

              <Link href='/posts/[slug]' as={`/posts/${post.slug}`}>
                <a
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    background: ' #00408b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    padding: 10,
                    width: 150,
                  }}
                >
                  Vai al post
                  <ArrowForwardIosIcon />
                </a>
              </Link>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};

export async function getStaticProps(context) {
  const posts = await getPosts();
  return {
    props: {
      posts: posts,
    },
  };
}

export default post;
