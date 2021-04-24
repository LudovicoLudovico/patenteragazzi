import React, { useState, useEffect } from 'react';
import Navbar from '../../components/general/Navbar';
import Head from 'next/head';
import { getQuestions } from '../../fetchData/getQuestions';
import { decrypt } from '../../lib/enc';
import '../../style/admin.min.css';
import { useUser } from '../../context/userContext';

const stories = ({ questions }) => {
  const [question, setQuestion] = useState(undefined);
  const [fontSize, setFontSize] = useState(1);
  const [imageSize, setImageSize] = useState(15);
  const [topSpace, setTopSpace] = useState(10);

  const { isAdmin } = useUser();

  const selectQuestion = () => {
    const num = Math.floor(Math.random() * questions.length);
    setQuestion(questions[num]);
  };

  useEffect(() => {
    selectQuestion();
    const el = document.querySelector<HTMLElement>('.screen_text');
    const image = document.querySelector<HTMLElement>('.screen_image');
    const screen = document.querySelector<HTMLElement>('.screen');
    setFontSize(1.2);
    if (el) {
      el.style.fontSize = `${fontSize}rem`;
    }
    setImageSize(19);
    if (image) {
      image.style.width = `${imageSize}vh`;
    }

    setTopSpace(10);
    if (screen) {
      screen.style.paddingTop = `${topSpace}vh`;
    }
  }, []);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>('.screen_text');
    if (el) {
      el.style.fontSize = `${fontSize}rem`;
    }
  }, [fontSize]);

  useEffect(() => {
    const image = document.querySelector<HTMLElement>('.screen_image');
    if (image) {
      image.style.width = `${imageSize}vh`;
    }
  }, [imageSize]);
  useEffect(() => {
    const screen = document.querySelector<HTMLElement>('.screen');
    if (screen) {
      screen.style.paddingTop = `${topSpace}vh`;
    }
  }, [topSpace]);

  if (isAdmin) {
    return (
      <>
        <Head>
          <title>Admin - Stories</title>
        </Head>
        <Navbar isAdminNav={true} active='stories' />

        <div className='main_content container-full'>
          <div className='admin-stories'>
            {question && (
              <div
                className={`screen ${
                  decrypt(question.image) ? 'image' : 'no-image'
                }`}
              >
                {question.image && (
                  <img
                    className='screen_image'
                    src={decrypt(question.image)}
                    alt=''
                  />
                )}

                <p className='screen_text'>{decrypt(question.question)}</p>

                <div className='screen_response'>
                  {question.response ? 'Vero' : 'Falso'}
                </div>

                <div className='screen_bottom'>
                  <img src='/patenteragazzi.png' />

                  <p>patenteragazzi.it</p>
                </div>
              </div>
            )}

            <div className='controls'>
              <button onClick={selectQuestion}>Rigenera</button>

              <br />
              <br />
              <br />
              <br />
              <button
                onClick={() => {
                  setFontSize((prevState) => prevState - 0.1);
                }}
              >
                Diminuisci Font
              </button>

              <button
                onClick={() => {
                  setFontSize((prevState) => prevState + 0.1);
                }}
              >
                Aumenta Font
              </button>
              <br />
              <br />
              <button
                onClick={() => {
                  setImageSize((prevState) => prevState - 1);
                }}
              >
                Diminuisci Dimensioni Immagine
              </button>
              <button
                onClick={() => {
                  setImageSize((prevState) => prevState + 1);
                }}
              >
                Aumenta Dimensioni Immagine
              </button>
              <br />
              <br />
              <button
                onClick={() => {
                  setTopSpace((prevState) => prevState - 1);
                }}
              >
                Diminuisci Spazio Superiore
              </button>
              <button
                onClick={() => {
                  setTopSpace((prevState) => prevState + 1);
                }}
              >
                Aumenta Spazio Superiore
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div>Non sei un admin non rompere le balle</div>;
  }
};

export async function getStaticProps() {
  const questionsRaw = await getQuestions();

  return {
    props: {
      questions: JSON.parse(JSON.stringify(questionsRaw)),
    },
  };
}
export default stories;
