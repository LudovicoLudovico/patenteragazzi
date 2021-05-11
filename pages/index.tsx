// General imports
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useUser } from '../context/userContext';
import firebase from '../firebase/clientApp';
const StatBar = dynamic(() => import('../components/home/StatBar'));

// Seo
import Seo from '../components/general/Seo';

// Styling
import '../style/index.min.css';

//Home Component
export default function Home() {
  const { user, login, logout } = useUser();

  const [stats, setStats] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [canRefresh, setCanRefresh] = useState(true);
  useEffect(() => {
    let stats = JSON.parse(localStorage.getItem('stats'));
    if (stats) {
      let sum = 0;
      for (let i = 0; i < stats.quizErrors.length; i++) {
        sum += stats.quizErrors[i];
      }

      let average = sum / stats.quizErrors.length;

      let quizErrors = stats.quizErrors;
      if (quizErrors.length > 10) {
        quizErrors = stats.quizErrors.slice(
          stats.quizErrors.length - 10,
          stats.quizErrors.length
        );
      }

      setStats({
        quizErrors,
        quizCounter: stats.quizCounter,
        average: average,
      });
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setStats(null);
    }
  }, [user]);

  const loadStats = () => {
    localStorage.removeItem('stats');
    if (user) {
      firebase
        .firestore()
        .collection('users')
        .doc(user.user_id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            let sum = 0;
            for (let i = 0; i < doc.data().quizErrors.length; i++) {
              sum += doc.data().quizErrors[i];
            }

            let average = sum / doc.data().quizErrors.length;

            let quizErrors = doc.data().quizErrors;
            if (quizErrors.length > 10) {
              quizErrors = quizErrors.slice(
                quizErrors.length - 10,
                quizErrors.length
              );
            }

            setStats({
              quizErrors,
              quizCounter: doc.data().quizCounter,
              average,
            });
            localStorage.setItem('stats', JSON.stringify(doc.data()));
          } else {
            // doc.data() will be undefined in this case
            alert(
              'Non ci sono statistiche, fai un quiz per cominciare a vederle'
            );
          }
        });
    } else {
      alert('Per vedere le statistiche devi fare il login');
    }
  };

  const toggleMenu = () => {
    const menu = document.querySelector('.menu');

    if (!isMenuOpen) {
      menu.classList.add('open');
      setIsMenuOpen(true);
    } else {
      menu.classList.remove('open');
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* SEO Init  */}
      <Seo
        title='Quiz Patente Online AM/B'
        description="Più di 7000 domande della patente AM/B, su cui allenarsi per passare al meglio l'esame di teoria. Puoi trovare anche tutta la teoria di cui hai bisogno"
        canonical='https://patenteragazzi.it/'
      />

      <div className='index'>
        <div className='index_background'>
          <div className='container'>
            {/* Navbar */}
            <div className='index_navbar'>
              <div className='index_navbar_hamburger' onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <h1 className='index_navbar_title'>PatenteRagazzi</h1>

              <div className='menu'>
                <div className='index_navbar_close' onClick={toggleMenu}>
                  <span></span>
                  <span></span>
                </div>

                <Link href='/'>
                  <a className='active'>Home</a>
                </Link>
                <Link href='/posts'>
                  <a>Posts</a>
                </Link>
                <Link href='/teoria'>
                  <a>Teoria</a>
                </Link>
              </div>
              <div className='index_navbar_login'>
                {!user && <p onClick={login}>Accedi</p>}
                {user && user.picture && (
                  <Image
                    src={user.picture}
                    alt='Foto'
                    width={40}
                    height={40}
                    onClick={logout}
                    className='index_navbar_profile'
                  />
                )}
              </div>
            </div>

            {/* Hero section */}
            <div className='index_hero'>
              {/* Buttons Section */}
              <p>Inizia ad esercitarti con i nostri quiz patente!</p>

              <div className='index_buttons'>
                <Link href='/quiz'>
                  <button>INIZIA QUIZ AM/B</button>
                </Link>

                <Link href='/quiz?tipo=simulazione'>
                  <button>INIZIA SIMULAZIONE</button>
                </Link>
                <Link href='/quiz?tipo=argomenti'>
                  <button>INIZIA QUIZ ARGOMENTI</button>
                </Link>
                <Link href='/quiz?tipo=super'>
                  <button>INIZIA SUPER QUIZ</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='index_stats'>
          <div className='container'>
            <div className='index_stats_top'>
              <div className='index_stats_title'>
                <h2>STATISTICHE</h2>
                <Image
                  src={'/stats.svg'}
                  height={20}
                  width={20}
                  alt='Icona statistiche'
                />
              </div>

              {stats && canRefresh && (
                <div
                  onClick={() => {
                    if (canRefresh) {
                      loadStats();
                      setCanRefresh(false);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <Image
                    src={'/reload.svg'}
                    height={20}
                    width={20}
                    alt='Ricarica'
                  />
                </div>
              )}
            </div>

            <div className='index_stats_content'>
              {!stats && user && (
                <div className='index_stats_button'>
                  <button onClick={loadStats}>Carica statistiche</button>
                </div>
              )}

              {!user && (
                <div className='index_stats_button'>
                  Per vedere le statistiche devi fare il login
                  <button
                    onClick={() => {
                      login();
                    }}
                  >
                    Accedi
                  </button>
                </div>
              )}
              {stats && user && (
                <>
                  <h3>Quiz svolti: {stats.quizCounter}</h3>
                  <br />
                  <div style={{ padding: 10 }}>
                    <StatBar stats={stats} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className='index_theory'>
          <div className='container'>
            <div className='index_theory_title'>
              <h2>TEORIA</h2>
              <Image
                src={'/book-dark.svg'}
                height={26}
                width={26}
                alt='Icona teoria'
              />
            </div>

            <div className='index_theory_cards_container'>
              <div className='index_theory_card'>
                <h3>Segnali di pericolo</h3>
                <Image
                  src={'/segnali di pericolo.svg'}
                  height={150}
                  width={150}
                />
                <Link href='/teoria#segnali-di-pericolo'>
                  <button>Scopri di più</button>
                </Link>
              </div>
              <div className='index_theory_card'>
                <h3>Assicurazioni</h3>
                <Image src={'/assicurazione.svg'} height={150} width={150} />

                <Link href='/teoria#patenti-di-guida-sistema-sanzionatorio-documenti-di-circolazione-obblighi-verso-agenti'>
                  <button>Scopri di più</button>
                </Link>
              </div>
              <div className='index_theory_card'>
                <h3>Patenti</h3>
                <Image src={'/patente.svg'} height={150} width={150} />
                <Link href='/teoria#responsabilita-civile-penale-e-amministrativa-assicurazione-r.c.a.-e-altre-forme-assicurative-legate-al-veicolo'>
                  <button>Scopri di più</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <footer className='index_footer'>
          <div className='container'>
            <p>Copryright 2021</p>
            <div className='footer_contact'>
              <a
                href='https://www.instagram.com/patenteragazzi/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
              >
                <Image
                  src='/instagram.svg'
                  alt='Footer - Instagram'
                  layout={'intrinsic'}
                  width={25}
                  height={25}
                  quality={1}
                />
              </a>
              <a
                target='_blank'
                href='https://www.tiktok.com/@patenteragazzi?_d=secCgsIARCbDRgBIAMoARI%2BCjwsj44V9oynClqip6A4ZSRxXQ7IMbrbj0dcklcqsrDMDvXA6SQeKXZUJJ6Jvd9mYItFThRf0RLwXwuGhlsaAA%3D%3D&language=en&sec_uid=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&sec_user_id=MS4wLjABAAAArAPVVnxxdhUkBCzdBjVK7ua1WngkYyHh4L12ghvAJ1aTHZADdxi68jsXNgpJ1pOm&share_app_name=musically&share_author_id=6870055060148929542&share_link_id=304e3355-7227-4486-b53c-9ad57578e237&timestamp=1599646252&u_code=deb73gifajfmm5&user_id=6870055060148929542&utm_campaign=client_share&utm_medium=android&utm_source=copy&source=h5_m'
                rel='noopener noreferrer'
              >
                <Image
                  src='/tiktok.svg'
                  alt='Footer - Tiktok'
                  aria-label='Tiktok'
                  layout={'intrinsic'}
                  width={22}
                  height={22}
                  quality={1}
                />
              </a>

              <a href='mailto:patenteragazzi@gmail.com' aria-label='Email'>
                <Image
                  src='/mail.svg'
                  alt='Footer - Email'
                  layout={'intrinsic'}
                  width={22}
                  height={22}
                  quality={1}
                />
              </a>

              <a
                href='https://www.iubenda.com/privacy-policy/49097191'
                className='iubenda-white iubenda-embed'
                title='Privacy Policy '
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
