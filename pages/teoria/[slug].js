import React from 'react';
import { getTheory } from '../../fetchData/getTheory';
import { getTheoryItem } from '../../fetchData/getTheoryItem';
import { decrypt } from '../../lib/enc';
import slugify from 'slugify';
import { unslugify } from 'unslugify';
import Navbar from '../../components/Navbar';
import MDEditor from '@uiw/react-md-editor';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const slug = ({ theoryItem }) => {
  return (
    <>
      {theoryItem && (
        <>
          <NextSeo
            title={`${decrypt(theoryItem.title)} - Patenteragazzi`}
            description={decrypt(theoryItem.title)}
            canonical={`https://patenteragazzi.it/teoria/${slugify(
              decrypt(theoryItem.title)
            )}`}
            openGraph={{
              url: `https://patenteragazzi.it/teoria/${slugify(
                decrypt(theoryItem.title)
              )}`,
              title: 'Patenteragazzi',
              description:
                "Tutta la teoria necessaria a passare l'esame di teoria",
              images: [
                {
                  url: 'https://patenteragazzi.it/patenteragazzi-square.png',
                  width: 600,
                  height: 600,
                  alt: 'Patenteragazzi Logo',
                },
              ],
              site_name: 'Patenteragazzi',
            }}
          />
          <Navbar />
          <div className='container-full main_content'>
            <div className='theory'>
              <Link href='/teoria'>
                <a className='theory_back'>
                  <ArrowBackIcon />
                  Torna indietro
                </a>
              </Link>

              {theoryItem && (
                <>
                  <h2>{decrypt(theoryItem.title)}</h2>

                  {decrypt(theoryItem.image) && (
                    <img
                      src={decrypt(theoryItem.image)}
                      alt={decrypt(theoryItem.title)}
                    />
                  )}
                  <h3>Teoria</h3>
                  <MDEditor.Markdown source={decrypt(theoryItem.theory)} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export async function getStaticPaths() {
  const theoryRaw = await getTheory();
  const paths = [];
  theoryRaw.map((theoryItem) => {
    paths.push({
      params: {
        slug: theoryItem.slug,
      },
    });
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const theoryItem = await getTheoryItem(params.slug);

  return {
    props: {
      theoryItem: theoryItem || null,
    },
    revalidate: 60 * 5,
  };
}
export default slug;
