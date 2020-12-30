import React from 'react';
import Navbar from '../components/Navbar';
import { NextSeo } from 'next-seo';
import { getTheory } from '../fetchData/getTheory';

import TheoryItem from '../components/TheoryItem';

const teoria = ({ theory }) => {
  return (
    <>
      <NextSeo
        title='Patenteragazzi - Teoria'
        description="Tutta la teoria necessaria a passare l'esame di teoria"
        canonical='https://patenteragazzi.it/teoria'
        openGraph={{
          url: 'https://patenteragazzi.it/teoria',
          title: 'Patenteragazzi',
          description: "Tutta la teoria necessaria a passare l'esame di teoria",
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
      <div className='container theoryList'>
        <h1>Teoria</h1>

        <TheoryItem
          theory={theory}
          category={"Definizioni generali e doveri nell'uso dell strada"}
        />
        <TheoryItem theory={theory} category={'Segnali di pericolo'} />
        <TheoryItem theory={theory} category={'Segnali di divieto'} />
        <TheoryItem theory={theory} category={'Segnali di obbligo'} />
        <TheoryItem theory={theory} category={'Segnali di precedenza'} />
        <TheoryItem
          theory={theory}
          category={'Segnaletica orizzontale e segni sugli ostacoli'}
        />
        <TheoryItem
          theory={theory}
          category={'Segnalazioni semaforiche e degli agenti del traffico'}
        />
        <TheoryItem theory={theory} category={'Segnali di indicazione'} />
        <TheoryItem
          theory={theory}
          category={'Segnali complementari, segnali temporanei e di cantiere'}
        />
        <TheoryItem
          theory={theory}
          category={'Pannelli integrativi dei segnali'}
        />
        <TheoryItem
          theory={theory}
          category={
            'Limiti di velocità, pericolo e intralcio alla circolazione'
          }
        />
        <TheoryItem theory={theory} category={'Distanza di sicurezza'} />
        <TheoryItem
          theory={theory}
          category={'Norme sulla circolazione dei veicoli'}
        />
        <TheoryItem
          theory={theory}
          category={'Ordine di precedenza agli incroci'}
        />
        <TheoryItem theory={theory} category={'Norme sul sorpasso'} />
        <TheoryItem theory={theory} category={'Fermata, sosta, arresto'} />
        <TheoryItem theory={theory} category={'Norme varie'} />
        <TheoryItem
          theory={theory}
          category={'Uso delle luci e dei dispositivi acustici, spie e simboli'}
        />
        <TheoryItem
          theory={theory}
          category={
            'Dispositivi di equipaggiamento, funzione ed uso: cinture di sicurezza, sistemi di ritenuta per bambini, casco protettivo e abbigliamento di sicurezza'
          }
        />
        <TheoryItem
          theory={theory}
          category={
            'Patenti di guida, sistema sanzionatorio, documenti di circolazione, obblighi verso agenti'
          }
        />
        <TheoryItem
          theory={theory}
          category={'Incidenti stradali e comportamenti in caso di incidente'}
        />
        <TheoryItem
          theory={theory}
          category={
            'Guida in relazione alle qualità e condizioni fisiche e psichiche, alcool, droga, farmaci e primo soccorso'
          }
        />
        <TheoryItem
          theory={theory}
          category={
            'Responsabilità civile, penale e amministrativa, assicurazione r.c.a. e altre forme assicurative legate al veicolo'
          }
        />
        <TheoryItem
          theory={theory}
          category={
            "Limitazione dei consumi, rispetto dell'ambiente e inquinamento"
          }
        />
        <TheoryItem
          theory={theory}
          category={
            'Elementi costitutivi del veicolo, manutenzione ed uso, stabilità e tenuta di strada, comportamenti e cautele di guida'
          }
        />
      </div>
    </>
  );
};

export async function getStaticProps(context) {
  const theoryRaw = await getTheory();

  return {
    props: {
      theory: JSON.parse(JSON.stringify(theoryRaw)),
    },
  };
}

export default teoria;
