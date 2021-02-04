import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { getPostItem } from '../../fetchData/getPostItem';
import { getPostsSlug } from '../../fetchData/getPostsSlug';
import { decrypt } from '../../lib/enc';
import MDEditor from '@uiw/react-md-editor';
import Seo from '../../components/Seo';
import cheerio from 'cheerio';

interface PostProps {
  post: Post;
}

interface Post {
  text: string;
  title: string;
  slug: string;
}

const post = ({ post }: PostProps) => {
  if (post) {
    let $ = cheerio.load(decrypt(post.text));
    //Adding ads
    $('pre').each(function () {
      const ad = `   <script>(adsbygoogle = window.adsbygoogle || []).push({})</script>
        <ins
          className='adsbygoogle'
          style={{
            display: 'inline-block',
            width: '100%',
            height: 90,
          }}
          data-ad-client='ca-pub-7942078481061905'
          data-ad-slot='5732008523'
        ></ins>`;
      $(ad).insertBefore($(this));
    });

    $('pre').each(function () {
      $(this).replaceWith('');
    });
  }

  return (
    <>
      <Seo
        title={post.title}
        description=''
        canonical={`https://patenteragazzi.it/posts/${post.slug}`}
      />
      <Navbar isAdminNav={false} active={'post'} />
      <div className='main_content container'>
        <h1>{post.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: $.html(),
          }}
        ></div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const slugs = await getPostsSlug();

  let paths = [];

  slugs.map((slug: string) => {
    paths.push({
      params: { slug: slug },
    });
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const post = await getPostItem(context.params.slug);
  return {
    props: {
      post: post,
    },
  };
}

export default post;
