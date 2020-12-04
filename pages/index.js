import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuestions } from '../context/questionsContext';

//Componentsv
import Navbar from '../components/Navbar';
import QuizHero from '../components/QuizHero';

export default function Home() {
  const router = useRouter();
  const { getQuestionsClient, questions } = useQuestions();

  useEffect(() => {
    router.prefetch('/quiz');
    getQuestionsClient();
    console.log(questions);
  }, []);

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
              url: 'https://patenteragazzi.it/patenteragazzi.png',
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
      <div className='container'>
        <Navbar />
        <QuizHero />

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
