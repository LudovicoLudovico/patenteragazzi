import React from 'react';
import Link from 'next/link';
import IndexTheoryCard from './IndexTheoryCard';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import '../../style/indexTheory.min.css';

const IndexTheory = () => {
  return (
    <div className='index_theory index_section'>
      <div className='container-full'>
        <div className='index_theory_top'>
          <h2>TEORIA</h2>

          <Link href='/teoria' passHref={true}>
            <a className='theory_link' title='Vai alla teoria'>
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
  );
};

export default IndexTheory;
