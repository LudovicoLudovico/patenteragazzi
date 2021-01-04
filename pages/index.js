import Head from 'next/head';
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';

import { useUser } from '../context/userContext';

import useDarkMode from 'use-dark-mode';

import { Button } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Brightness4Icon from '@material-ui/icons/Brightness4';

//Componentsv
import Footer from '../components/Footer';
import IndexTheoryCard from '../components/IndexTheoryCard';
import FaqAccordion from '../components/FaqAccordion';

export default function Home() {
  const darkMode = useDarkMode(false);
  const [loading, setLoading] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingSim, setLoadingSim] = useState(false);
  const { user, login, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (!isOpen) {
      document.querySelector('.index_menu').classList += ' open';
      document.querySelector('.index_navbar_hamburger').classList += ' open';
      setIsOpen(true);
    } else {
      document.querySelector('.index_menu').classList = 'index_menu';
      document.querySelector('.index_navbar_hamburger').classList =
        'index_navbar_hamburger';
      setIsOpen(false);
    }
  };
  return (
    <>
      <NextSeo
        title='Patenteragazzi - Quiz Patente Online AM/B'
        description="Più di 7000 domande della patente AM/B, su cui allenarsi per passare al meglio l'esame di teoria. Puoi trovare anche tutta la teoria di cui hai bisogno"
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

      <div className='index'>
        <div className='container'>
          <div className='index_navbar'>
            <div className='index_logo'>
              <img src='/patenteragazzi.png' alt='Logo' />
              <h1>Patenteragazzi</h1>
            </div>

            <div className='index_menu'>
              <Link href='/'>
                <a className='active'>HOME</a>
              </Link>
              <Link href='/quiz'>
                <a>QUIZ</a>
              </Link>
              <Link href='/'>
                <a className='disabled'>FAQ</a>
              </Link>
              <Link href='/'>
                <a className='disabled'>POST</a>
              </Link>
              <Link href='/teoria'>
                <a>TEORIA</a>
              </Link>
              {/* <Brightness4Icon
                onClick={darkMode.value ? darkMode.disable : darkMode.enable}
                style={{
                  cursor: 'pointer',
                }}
              /> */}

              <span></span>
              <a
                aria-label='Tiktok link'
                target='_blank'
                href='https://www.tiktok.com/@patenteragazzi?_d=secCgsIARCbDRgBIAMoARI%2BCjwsj44V9oynClqip6A4ZSRxXQ7IMbrbj0dcklcqsrDMDvXA6SQeKXZUJJ6Jvd9mYItFThRf0RLwXwuGhlsaAA%3D%3D&language=en&sec_uid=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&sec_user_id=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&share_app_name=musically&share_author_id=6870055060148929542&share_link_id=304e3355-7227-4486-b53c-9ad57578e237&timestamp=1599646252&u_code=deb73gifajfmm5&user_id=6870055060148929542&utm_campaign=client_share&utm_medium=android&utm_source=copy&source=h5_m'
                rel='noopener noreferrer'
                aria-label='Tiktok'
                className='social'
              >
                <Image src='/tiktok.svg' alt='Tiktok' width={22} height={22} />
              </a>
              <a
                aria-label='Instagram'
                href='https://www.instagram.com/patenteragazzi/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
                className='social'
              >
                <Image
                  src='/instagram.svg'
                  alt='Instagram'
                  width={25}
                  height={25}
                />
              </a>
              <span></span>
              {!user && <div onClick={login}>Accedi</div>}
              {user && user.picture && (
                <Image
                  src={user.picture}
                  alt='Instagram'
                  width={40}
                  height={40}
                  onClick={logout}
                  className='profile_image'
                />
              )}
            </div>
            <div className='index_navbar_hamburger' onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className='index_hero'>
            <div className='index_hero_button'>
              <Link href='/quiz'>
                <a>
                  <Button
                    variant='contained'
                    onClick={(e) => {
                      setLoading(true);
                    }}
                  >
                    {!loading ? 'INIZIA QUIZ PATENTE A/B' : 'CARICAMENTO...'}
                  </Button>
                </a>
              </Link>

              <Link href='/simulazione-quiz'>
                <a>
                  <Button
                    variant='contained'
                    style={{
                      background: '#b35600',
                    }}
                    onClick={(e) => {
                      setLoadingSim(true);
                    }}
                  >
                    {!loadingSim
                      ? "SIMULAZIONE QUIZ D'ESAME"
                      : 'CARICAMENTO...'}
                  </Button>
                </a>
              </Link>

              <Link href='/quiz-argomenti'>
                <a>
                  <Button
                    variant='contained'
                    style={{
                      background: '#06690d',
                    }}
                    onClick={(e) => {
                      setLoadingTopics(true);
                    }}
                  >
                    {!loadingTopics
                      ? 'INIZIA QUIZ ARGOMENTI'
                      : 'CARICAMENTO...'}
                  </Button>
                </a>
              </Link>
            </div>
            <p>
              Per ogni quiz avrai 30 minuti di tempo in cui dovrai rispondere a
              40 domande con risposta <br /> VERO o FALSO
            </p>
          </div>
        </div>
        <div className='index_theory index_section'>
          <div className='container-full'>
            <div className='index_theory_top'>
              <h2>TEORIA</h2>

              <Link href='/teoria'>
                <a className='theory_link'>
                  Vai alla teoria
                  <ArrowForwardIcon />
                </a>
              </Link>
            </div>

            <div className='index_theory_card_container'>
              <IndexTheoryCard
                title={'Segnali di pericolo'}
                image={'/segnali di pericolo.svg'}
                slug={`Segnali di pericolo`}
              />
              <IndexTheoryCard
                title={'Patenti'}
                image={'/patente.svg'}
                slug={
                  'Patenti di guida, sistema sanzionatorio, documenti di circolazione, obblighi verso agenti'
                }
              />
              <IndexTheoryCard
                title={'Assicurazioni'}
                image={'/assicurazione.svg'}
                slug={
                  'Responsabilità civile, penale e amministrativa, assicurazione r.c.a. e altre forme assicurative legate al veicolo'
                }
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
