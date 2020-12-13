import Head from 'next/head';
import { NextSeo } from 'next-seo';

//Componentsv
import Navbar from '../components/Navbar';
import QuizHero from '../components/QuizHero';
import Cards from '../components/Cards';
import Social from '../components/Social';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <NextSeo
        title='Patenteragazzi - Quiz Patente Online AM/B'
        description='Più di 7000 domande della patente AM/B'
        canonical='https://patenteragazzi.it/'
        openGraph={{
          url: 'https://patenteragazzi.it/',
          title: 'Patenteragazzi',
          description: 'Più di 7000 domande della patente AM/B',
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
        <script
          data-ad-client='ca-pub-7942078481061905'
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
        ></script>
      </Head>

      <div className='container'>
        <Navbar />
        <QuizHero />
        <Cards />
        <Social />
      </div>

      <Footer />
    </>
  );
}
