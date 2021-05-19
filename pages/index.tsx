// General imports
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useUser } from '../context/userContext';

const StatBar = dynamic(() => import('../components/home/StatBar'));
const IndexTheory = dynamic(() => import('../components/home/IndexTheory'));
const IndexFooter = dynamic(() => import('../components/home/IndexFooter'));

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
      let quizCounter = stats.quizErrors.length;
      console.log(quizCounter.length);
      setStats({
        quizErrors,
        quizCounter,
        average,
      });
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setStats(null);
    }
  }, [user]);

  const loadStats = async () => {
    localStorage.removeItem('stats');
    if (user) {
      const firebase = (await import('../firebase/clientApp')).default;

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
              quizCounter: doc.data().quizErrors.length,
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
                <Link href='/posts' prefetch={false}>
                  <a>Posts</a>
                </Link>
                <Link href='/teoria' prefetch={false}>
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

                <Link href='/quiz?tipo=simulazione' prefetch={false}>
                  <button>INIZIA SIMULAZIONE</button>
                </Link>
                <Link href='/quiz?tipo=argomenti' prefetch={false}>
                  <button>INIZIA QUIZ ARGOMENTI</button>
                </Link>
                <Link href='/quiz?tipo=super' prefetch={false}>
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

        <IndexTheory />

        <IndexFooter />
      </div>
    </>
  );
}
