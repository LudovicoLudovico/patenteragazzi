import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { NextSeo } from 'next-seo';
import { getTheory } from '../fetchData/getTheory';
import { decrypt } from '../lib/enc';
import TheoryItem from '../components/TheoryItem';
import { TextField } from '@material-ui/core';

const teoria = ({ theory }) => {
  const [filteredTheory, setFilteredTheory] = useState([...theory]);
  const [filters, setFilters] = useState('');
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
      <Navbar active={'teoria'} />
      <div className='container theoryList main_content'>
        <h1>Teoria</h1>
        <br />
        <TextField
          id='outlined-basic'
          label='Trova teoria...'
          variant='outlined'
          style={{ width: '100%', maxWidth: 800 }}
          onChange={(e) => {
            console.log(e.target.value);
            setFilters(e.target.value);
          }}
          value={filters}
        />

        <br />
        <br />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={"Definizioni generali e doveri nell'uso dell strada"}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Segnali di pericolo'}
        />
        <TheoryItem theory={filteredTheory} category={'Segnali di divieto'} />
        <TheoryItem theory={filteredTheory} category={'Segnali di obbligo'} />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Segnali di precedenza'}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Segnaletica orizzontale e segni sugli ostacoli'}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Segnalazioni semaforiche e degli agenti del traffico'}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Segnali di indicazione'}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Segnali complementari, segnali temporanei e di cantiere'}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Pannelli integrativi dei segnali'}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={
            'Limiti di velocità, pericolo e intralcio alla circolazione'
          }
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Distanza di sicurezza'}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Norme sulla circolazione dei veicoli'}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Ordine di precedenza agli incroci'}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Norme sul sorpasso'}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Fermata, sosta, arresto'}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Norme varie'}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Uso delle luci e dei dispositivi acustici, spie e simboli'}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={
            'Dispositivi di equipaggiamento, funzione ed uso: cinture di sicurezza, sistemi di ritenuta per bambini, casco protettivo e abbigliamento di sicurezza'
          }
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={
            'Patenti di guida, sistema sanzionatorio, documenti di circolazione, obblighi verso agenti'
          }
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={'Incidenti stradali e comportamenti in caso di incidente'}
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={
            'Guida in relazione alle qualità e condizioni fisiche e psichiche, alcool, droga, farmaci e primo soccorso'
          }
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={
            'Responsabilità civile, penale e amministrativa, assicurazione r.c.a. e altre forme assicurative legate al veicolo'
          }
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
          category={
            "Limitazione dei consumi, rispetto dell'ambiente e inquinamento"
          }
        />
        <TheoryItem
          theory={filteredTheory}
          filters={filters}
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
