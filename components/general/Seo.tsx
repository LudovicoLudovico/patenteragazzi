import Head from 'next/head';

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
}
const Seo = ({ title, description, canonical }: SeoProps) => {
  return (
    <>
      <Head>
        <link rel='shortcut icon' href='/patenteragazzi.ico' />

        <title>{`${title} - PatenteRagazzi`}</title>
        <meta name='title' content={`${title} - PatenteRagazzi`} />
        <meta name='description' content={description} />

        <meta property='og:type' content='website' />
        <meta property='og:url' content={canonical} />
        <meta property='og:title' content={`${title} - PatenteRagazzi`} />
        <meta property='og:description' content={description} />
        <meta
          property='og:image'
          content='https://patenteragazzi.it/patenteragazzi-square.png'
        />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={canonical} />
        <meta property='twitter:title' content={`${title} - PatenteRagazzi`} />
        <meta property='twitter:description' content={description} />
        <meta
          property='twitter:image'
          content='https://patenteragazzi.it/patenteragazzi-square.png'
        />
      </Head>
    </>
  );
};

export default Seo;
