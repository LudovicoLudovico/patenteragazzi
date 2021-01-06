import React, { useState } from 'react';
import { getTheory } from '../../fetchData/getTheory';
import { getTheoryItem } from '../../fetchData/getTheoryItem';
import { decrypt } from '../../lib/enc';
import slugify from 'slugify';
import { unslugify } from 'unslugify';
import Navbar from '../../components/Navbar';
import MDEditor from '@uiw/react-md-editor';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import firebase from 'firebase/app';
const slug = ({ theoryItem }) => {
  const [canReport, setCanReport] = useState(true);

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
        })
        .then(() => {
          setCanReport(false);
        });
    }
  };

  return (
    <>
      {theoryItem && (
        <>
          <NextSeo
            title={`${theoryItem.title} - Patenteragazzi`}
            description={theoryItem.title}
            canonical={`https://patenteragazzi.it/teoria/${slugify(
              theoryItem.title
            )}`}
            openGraph={{
              url: `https://patenteragazzi.it/teoria/${slugify(
                theoryItem.title
              )}`,
              title: 'Patenteragazzi',
              description:
                "Tutta la teoria necessaria a passare l'esame di teoria",
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
          <Navbar />
          <div className='container-full main_content'>
            <div className='theory'>
              <Link href='/teoria'>
                <a className='theory_back'>
                  <ArrowBackIcon />
                  Torna indietro
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
                className='quiz_problem active'
                onClick={setProblem}
                disabled={!canReport}
                variant='contained'
                style={{
                  background: 'red',
                  color: 'white',
                }}
              >
                <p>Segnala problema nella teoria</p>

                <WarningIcon style={{ marginLeft: 20 }} />
              </Button>
            </div>
          </div>
        </>
      )}
      {!theoryItem && <div>Error</div>}
    </>
  );
};

export async function getStaticPaths() {
  const theoryRaw = await getTheory();
  const paths = [];

  theoryRaw.map((theoryItem) => {
    paths.push({
      params: {
        slug: theoryItem.slug,
      },
    });
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const theoryItem = await getTheoryItem(params.slug);

  return {
    props: {
      theoryItem: theoryItem || null,
    },
    revalidate: 60 * 5,
  };
}
export default slug;
