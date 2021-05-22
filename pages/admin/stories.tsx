import React, { useState, useEffect } from 'react';
import Navbar from '../../components/general/Navbar';
import Head from 'next/head';
import { getQuestions } from '../../fetchData/getQuestions';
import { decrypt } from '../../lib/enc';
import '../../style/admin.min.css';
import { useUser } from '../../context/userContext';

const stories = ({
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  i,
  j,
  k,
  l,
  m,
  n,
  o,
  p,
  q,
  r,
  s,
  t,
  u,
  v,
  w,
  y,
  x,
}) => {
  const [question, setQuestion] = useState(undefined);
  const [fontSize, setFontSize] = useState(1);
  const [imageSize, setImageSize] = useState(15);
  const [topSpace, setTopSpace] = useState(10);
  const [questions] = useState([
    ...a,
    ...b,
    ...c,
    ...d,
    ...e,
    ...f,
    ...g,
    ...h,
    ...i,
    ...j,
    ...k,
    ...l,
    ...m,
    ...n,
    ...o,
    ...p,
    ...q,
    ...r,
    ...s,
    ...t,
    ...u,
    ...v,
    ...w,
    ...y,
    ...x,
  ]);

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

        <div className='main_content container' style={{ marginTop: 10 }}>
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
                  <img src='/patenteragazzi.svg' />

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
  const a = await getQuestions(
    "Definizioni generali e doveri nell'uso della strada"
  );
  const b = await getQuestions('Segnali di pericolo');
  const c = await getQuestions('Segnali di divieto');
  const d = await getQuestions('Segnali di obbligo');
  const e = await getQuestions('Segnali di precedenza');
  const f = await getQuestions(
    'Segnaletica orizzontale e segni sugli ostacoli'
  );
  const g = await getQuestions(
    'Segnalazioni semaforiche e degli agenti del traffico'
  );
  const h = await getQuestions('Segnali di indicazione');
  const i = await getQuestions(
    'Segnali complementari, segnali temporanei e di cantiere'
  );
  const j = await getQuestions('Pannelli integrativi dei segnali');
  const k = await getQuestions(
    'Limiti di velocità, pericolo e intralcio alla circolazione'
  );
  const l = await getQuestions('Distanza di sicurezza');
  const m = await getQuestions('Norme sulla circolazione dei veicoli');
  const n = await getQuestions('Ordine di precedenza agli incroci');
  const o = await getQuestions('Fermata, sosta, arresto');
  const p = await getQuestions('Norme varie');
  const q = await getQuestions(
    'Uso delle luci e dei dispositivi acustici, spie e simboli'
  );
  const r = await getQuestions(
    'Dispositivi di equipaggiamento, funzione ed uso: cinture di sicurezza, sistemi di ritenuta per bambini, casco protettivo e abbigliamento di sicurezza'
  );
  const s = await getQuestions(
    'Patenti di guida, sistema sanzionatorio, documenti di circolazione, obblighi verso agenti'
  );
  const t = await getQuestions(
    'Incidenti stradali e comportamenti in caso di incidente'
  );
  const u = await getQuestions(
    'Guida in relazione alle qualità e condizioni fisiche e psichiche, alcool, droga, farmaci e primo soccorso'
  );
  const v = await getQuestions(
    'Responsabilità civile, penale e amministrativa, assicurazione r.c.a. e altre forme assicurative legate al veicolo'
  );
  const w = await getQuestions(
    "Limitazione dei consumi, rispetto dell'ambiente e inquinamento"
  );
  const y = await getQuestions(
    'Elementi costitutivi del veicolo, manutenzione ed uso, stabilità e tenuta di strada, comportamenti e cautele di guida'
  );
  const x = await getQuestions('Norme sul sorpasso');

  return {
    props: {
      a: JSON.parse(JSON.stringify(a)),
      b: JSON.parse(JSON.stringify(b)),
      c: JSON.parse(JSON.stringify(c)),
      d: JSON.parse(JSON.stringify(d)),
      e: JSON.parse(JSON.stringify(e)),
      f: JSON.parse(JSON.stringify(f)),
      g: JSON.parse(JSON.stringify(g)),
      h: JSON.parse(JSON.stringify(h)),
      i: JSON.parse(JSON.stringify(i)),
      j: JSON.parse(JSON.stringify(j)),
      k: JSON.parse(JSON.stringify(k)),
      l: JSON.parse(JSON.stringify(l)),
      m: JSON.parse(JSON.stringify(m)),
      n: JSON.parse(JSON.stringify(n)),
      o: JSON.parse(JSON.stringify(o)),
      p: JSON.parse(JSON.stringify(p)),
      q: JSON.parse(JSON.stringify(q)),
      r: JSON.parse(JSON.stringify(r)),
      s: JSON.parse(JSON.stringify(s)),
      t: JSON.parse(JSON.stringify(t)),
      u: JSON.parse(JSON.stringify(u)),
      v: JSON.parse(JSON.stringify(v)),
      w: JSON.parse(JSON.stringify(w)),
      y: JSON.parse(JSON.stringify(y)),
      x: JSON.parse(JSON.stringify(x)),
    },
  };
}
export default stories;
