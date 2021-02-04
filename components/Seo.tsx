import React from 'react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
}
const Seo = ({ title, description, canonical }: SeoProps) => {
  return (
    <>
      <NextSeo
        title={`${title} - Patenteragazzi`}
        description={description}
        canonical={canonical}
        openGraph={{
          url: canonical,
          title: title,
          description: description,
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
      <Head>
        <link rel='shortcut icon' href='/patenteragazzi.ico' />
      </Head>
    </>
  );
};

export default Seo;
