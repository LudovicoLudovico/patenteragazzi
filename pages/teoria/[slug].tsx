import { useState } from 'react';
import { getTheorySlug } from '../../fetchData/getTheorySlug';
import { getTheoryItem } from '../../fetchData/getTheoryItem';
import { getTheoryQuestions } from '../../fetchData/getTheoryQuestions';
import slugify from 'slugify';
import Navbar from '../../components/general/Navbar';
import MDEditor from '@uiw/react-md-editor';
import Link from 'next/link';
import Seo from '../../components/general/Seo';
import { Button, Modal, FormControlLabel, Checkbox } from '@material-ui/core';
import firebase from 'firebase/app';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const AdBanner = dynamic(() => import('../../components/general/AdBanner'), {
  ssr: false,
});
const TheoryQuestions = dynamic(
  () => import('../../components/theory/TheoryQuestions')
);

interface SlugProps {
  questions: Question[];
  theoryItem: TheoryItem;
}
interface Question {}
interface TheoryItem {
  id: string;
  theory: string;
  title: string;
  category: string;
  image: string | null;
}
const slug = ({ theoryItem, questions }: SlugProps) => {
  const [canReport, setCanReport] = useState(true);
  const [hasProblemImage, setHasProblemImage] = useState(false);
  const [hasProblemTypo, setHasProblemTypo] = useState(false);
  const [hasProblemContent, setHasProblemContent] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const setProblem = () => {
    if (canReport) {
      firebase
        .firestore()
        .collection('problems')
        .add({
          type: 'theory',
          theoryId: theoryItem.id,
          theory: theoryItem.theory,
          title: theoryItem.title,
          category: theoryItem.category,
          image: theoryItem.image,
          hasProblemImage,
          hasProblemTypo,
          hasProblemContent,
        })
        .then(() => {
          setCanReport(false);
          setOpenModal(false);
        });
    }
  };

  const reportPopup = (
    <div
      className='report_popup'
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'white',
        padding: 20,
        width: '100%',
        height: '50%',
        maxWidth: 500,
        maxHeight: 300,
      }}
    >
      <h2>Segnala errore nella teoria:</h2>
      <FormControlLabel
        control={
          <Checkbox
            name='image'
            checked={hasProblemImage}
            onChange={() => {
              setHasProblemImage(!hasProblemImage);
            }}
          />
        }
        label='Immagine'
      />
      <FormControlLabel
        control={
          <Checkbox
            name='question'
            checked={hasProblemTypo}
            onChange={() => {
              setHasProblemTypo(!hasProblemTypo);
            }}
          />
        }
        label='Errore di battitura'
      />
      <FormControlLabel
        control={
          <Checkbox
            name='content'
            checked={hasProblemContent}
            onChange={() => {
              setHasProblemContent(!hasProblemContent);
            }}
          />
        }
        label='Contenuto'
      />

      <br />
      <br />

      <Button
        className={`quiz_problem active`}
        onClick={setProblem}
        disabled={!canReport}
        variant='contained'
        aria-label={`Conferma Segnalazione della teoria`}
        style={{
          background: 'red',
          color: 'white',
        }}
      >
        <p style={{ marginRight: 15 }}>Invia segnalazione</p>
        <Image src={'/danger.svg'} height={24} width={24} layout={'fixed'} />
      </Button>
    </div>
  );

  return (
    <>
      {theoryItem && (
        <>
          <Seo
            title={`${theoryItem.title} - Patenteragazzi`}
            description={theoryItem.title}
            canonical={`https://patenteragazzi.it/teoria/${slugify(
              theoryItem.title
            )}`}
          />

          <Navbar isAdminNav={false} active={''} />
          <div className='container main_content'>
            <div className='theory'>
              <Link
                href={`/teoria#${slugify(theoryItem.category, {
                  lower: true,
                })}`}
                scroll={false}
              >
                <a className='theory_back'>
                  <>
                    <Image
                      src={'/black-right-arrow.svg'}
                      height={24}
                      width={24}
                      layout={'fixed'}
                      className='rotated-image'
                    />
                    <p style={{ marginLeft: 10 }}>Torna indietro</p>
                  </>
                </a>
              </Link>

              {theoryItem && (
                <>
                  <h2>{theoryItem.title}</h2>

                  {theoryItem.image && (
                    <img src={theoryItem.image} alt={theoryItem.title} />
                  )}
                  <h3>Teoria</h3>
                  <MDEditor.Markdown source={theoryItem.theory} />
                </>
              )}

              <br />
              <br />
              <br />

              <Button
                className={`quiz_problem  'active`}
                onClick={() => setOpenModal(true)}
                disabled={!canReport}
                variant='contained'
                aria-label={`Segnala teoria`}
                style={{
                  background: 'red',
                  color: 'white',
                }}
              >
                <p style={{ marginRight: 15 }}>Segnala Problema Nella Teoria</p>
                <Image
                  src={'/danger.svg'}
                  height={24}
                  width={24}
                  layout={'fixed'}
                />
              </Button>

              <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby='Segnalazione errore domanda'
                aria-describedby='Puoi segnalarci un errore nella domanda'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  outline: 'none',
                }}
              >
                {reportPopup}
              </Modal>

              <br />
              <br />
              <br />
              <AdBanner />

              <h2>Domande</h2>

              <TheoryQuestions questions={questions} />
              <AdBanner />
            </div>
          </div>
        </>
      )}
      {!theoryItem && <div>Error</div>}
    </>
  );
};

export async function getStaticPaths() {
  const theoryRaw = await getTheorySlug();
  const paths = [];

  theoryRaw.map((theoryItem) => {
    paths.push({
      params: {
        slug: theoryItem,
      },
    });
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let theoryItem;
  theoryItem = await getTheoryItem(params.slug);
  let questions = [];
  if (theoryItem) {
    questions = await getTheoryQuestions(theoryItem.id);
  }

  return {
    props: {
      theoryItem: theoryItem || null,
      questions: questions || null,
    },
  };
}
export default slug;
