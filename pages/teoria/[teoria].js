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

const teoria = ({ theoryItem }) => {
  return (
    <>
      <NextSeo
        title={`${decrypt(theoryItem.title)} - Patenteragazzi`}
        description="Tutta la teoria necessaria a passare l'esame di teoria"
        canonical={`https://patenteragazzi.it/teoria/${slugify(
          decrypt(theoryItem.title)
        )}`}
        openGraph={{
          url: `https://patenteragazzi.it/teoria/${slugify(
            decrypt(theoryItem.title)
          )}`,
          title: 'Patenteragazzi',
          description: "Tutta la teoria necessaria a passare l'esame di teoria",
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
      <div className='container-full'>
        <div className='theory'>
          {theoryItem && (
            <>
              <h2>{decrypt(theoryItem.title)}</h2>
              {theoryItem.image && (
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
  );
};

export async function getStaticPaths() {
  const theoryRaw = await getTheory();

  const paths = theoryRaw.map((theoryItem) => ({
    params: {
      teoria: decrypt(theoryItem.slug),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const theoryItem = await getTheoryItem(context.params.teoria);

  return {
    revalidate: 60 * 15,
    props: {
      theoryItem: theoryItem || null,
    },
  };
}
export default teoria;
