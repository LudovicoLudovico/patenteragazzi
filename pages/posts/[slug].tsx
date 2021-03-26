import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { getPostItem } from '../../fetchData/getPostItem';
import { getPostsSlug } from '../../fetchData/getPostsSlug';
import { decrypt } from '../../lib/enc';
import Seo from '../../components/Seo';
import cheerio from 'cheerio';
import slugify from 'slugify';
import '../../style/post.min.css';
interface PostProps {
  post: Post;
}

interface Post {
  text: string;
  title: string;
  slug: string;
  titles: Title[];
}
interface Title {
  text: string;
  type: string;
}
interface Window {
  adsbygoogle: { [key: string]: unknown }[];
}

const post = (props: any) => {
  const { text, title, slug, titles } = props.post;
  let $;
  if (post) {
    $ = cheerio.load(decrypt(text));
    //Adding ads
    $('pre').each(function () {
      const ad = `   
     <ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-7942078481061905"
     data-ad-slot="5732008523"></ins>
      <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
      </script>`;
      $(ad).insertBefore($(this));
    });

    $('pre').each(function () {
      $(this).replaceWith('');
    });
  }

  useEffect(() => {
    let window: Window;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, [props.currentPath]);

  return (
    <>
      <Seo
        title={title}
        description=''
        canonical={`https://patenteragazzi.it/posts/${slug}`}
      />
      <Navbar isAdminNav={false} active={'post'} />
      <div className='main_content container post'>
        <h1>{title}</h1>

        <h2 className='post_index_title'>Indice</h2>
        <div className='post_index'>
          {titles.map((title: Title) => {
            return (
              <a
                key={title.text}
                href={`${slug}#${slugify(title.text, {
                  lower: true,
                  remove: /[*+~()#'"!:@]/g,
                })}`}
                className={`${
                  title.type == 'h2' ? 'post_link_big' : 'post_link_small'
                }`}
              >
                {title.text.charAt(0).toUpperCase() +
                  title.text.slice(1).toLowerCase()}
              </a>
            );
          })}
        </div>

        <div
          className='content'
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
    fallback: false,
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
