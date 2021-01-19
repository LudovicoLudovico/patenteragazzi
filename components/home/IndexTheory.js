// import React, { useEffect } from 'react';
// import Link from 'next/link';
// import IndexTheoryCard from './IndexTheoryCard';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import '../../indexTheory.min.css';

// const IndexTheory = () => {
//   return (
//     <div className='index_theory index_section'>
//       <div className='container-full'>
//         <div className='index_theory_top'>
//           <h2>TEORIA</h2>

//           <Link href='/teoria'>
//             <a className='theory_link' title='Vai alla teoria'>
//               Vai alla teoria
//               <ArrowForwardIcon />
//             </a>
//           </Link>
//         </div>

//         <div className='index_theory_card_container'>
//           <IndexTheoryCard
//             title={"Doveri nell'uso della strada"}
//             image={'/car.svg'}
//             slug={`Definizioni generali e doveri nell'uso della strada`}
//           />
//           <IndexTheoryCard
//             title={'Segnali di pericolo'}
//             image={'/segnali di pericolo.svg'}
//             slug={`Segnali di pericolo`}
//           />
//           <IndexTheoryCard
//             title={'Segnali di obbligo'}
//             image={'/Segnali di obbligo.svg'}
//             slug={`Segnali di obbligo`}
//           />
//           <IndexTheoryCard
//             title={'Segnali di precedenza'}
//             image={'/dare precedenza.svg'}
//             slug={`Segnali di precedenza`}
//           />
//           <IndexTheoryCard
//             title={'Segnaletica orizzontale'}
//             image={'/dare precedenza.svg'}
//             slug={`Segnaletica orizzontale e segni sugli ostacoli`}
//           />
//           <IndexTheoryCard
//             title={'Segnalazioni semaforiche e degli agenti del traffico'}
//             image={'/dare precedenza.svg'}
//             slug={`Segnalazioni semaforiche e degli agenti del traffico`}
//           />
//           <IndexTheoryCard
//             title={'Segnali di indicazione'}
//             image={'/dare precedenza.svg'}
//             slug={`Segnali di indicazione`}
//           />
//           <IndexTheoryCard
//             title={'Segnali complementari, segnali temporanei e di cantiere'}
//             image={'/dare precedenza.svg'}
//             slug={`Segnali complementari, segnali temporanei e di cantiere`}
//           />
//           <IndexTheoryCard
//             title={'Pannelli integrativi dei segnali'}
//             image={'/dare precedenza.svg'}
//             slug={`Pannelli integrativi dei segnali`}
//           />
//           <IndexTheoryCard
//             title={'Limiti di velocità, pericolo e intralcio alla circolazione'}
//             image={'/dare precedenza.svg'}
//             slug={`Limiti di velocità, pericolo e intralcio alla circolazione`}
//           />
//           <IndexTheoryCard
//             title={'Distanza di sicurezza'}
//             image={'/dare precedenza.svg'}
//             slug={`Distanza di sicurezza`}
//           />
//           <IndexTheoryCard
//             title={'Norme sulla circolazione dei veicoli'}
//             image={'/dare precedenza.svg'}
//             slug={`Norme sulla circolazione dei veicoli`}
//           />
//           <IndexTheoryCard
//             title={'Esempi di precedenza (ordine di precedenza agli incroci)'}
//             image={'/dare precedenza.svg'}
//             slug={`Esempi di precedenza (ordine di precedenza agli incroci)`}
//           />
//           <IndexTheoryCard
//             title={'Norme sul sorpasso'}
//             image={'/dare precedenza.svg'}
//             slug={`Norme sul sorpasso`}
//           />
//           <IndexTheoryCard
//             title={'Fermata, sosta, arresto e partenza'}
//             image={'/dare precedenza.svg'}
//             slug={`Fermata, sosta, arresto e partenza`}
//           />
//           <IndexTheoryCard
//             title={'Norme varie'}
//             image={'/dare precedenza.svg'}
//             slug={`Norme varie`}
//           />
//           <IndexTheoryCard
//             title={'Uso delle luci e dei dispositivi acustici, spie e simboli'}
//             image={'/dare precedenza.svg'}
//             slug={`Uso delle luci e dei dispositivi acustici, spie e simboli`}
//           />
//           <IndexTheoryCard
//             title={'Dispositivi di equipaggiamento, funzione ed uso'}
//             image={'/dare precedenza.svg'}
//             slug={`Dispositivi di equipaggiamento, funzione ed uso: cinture di sicurezza, sistemi di ritenuta per bambini, casco protettivo e abbigliamento di sicurezza`}
//           />
//           <IndexTheoryCard
//             title={'Patenti'}
//             image={'/patente.svg'}
//             slug={
//               'Patenti di guida, sistema sanzionatorio, documenti di circolazione, obblighi verso agenti'
//             }
//           />
//           <IndexTheoryCard
//             title={'Incidenti stradali e comportamenti in caso di incidente'}
//             image={'/patente.svg'}
//             slug={'Incidenti stradali e comportamenti in caso di incidente'}
//           />
//           <IndexTheoryCard
//             title={
//               'Guida in relazione alle qualità e condizioni fisiche e psichiche'
//             }
//             image={'/patente.svg'}
//             slug={
//               'Guida in relazione alle qualità e condizioni fisiche e psichiche, alcool, droga, farmaci e primo soccorso'
//             }
//           />
//           <IndexTheoryCard
//             title={'Assicurazioni'}
//             image={'/assicurazione.svg'}
//             slug={
//               'Responsabilità civile, penale e amministrativa, assicurazione r.c.a. e altre forme assicurative legate al veicolo'
//             }
//           />
//           <IndexTheoryCard
//             title={
//               "Limitazione dei consumi, rispetto dell'ambiente e inquinamento"
//             }
//             image={'/assicurazione.svg'}
//             slug={
//               "Limitazione dei consumi, rispetto dell'ambiente e inquinamento"
//             }
//           />
//           <IndexTheoryCard
//             title={'Elementi costitutivi del veicolo'}
//             image={'/assicurazione.svg'}
//             slug={
//               'Elementi costitutivi del veicolo, manutenzione ed uso, stabilità e tenuta di strada, comportamenti e cautele di guida'
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IndexTheory;

import React from 'react';
import Link from 'next/link';
import IndexTheoryCard from './IndexTheoryCard';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import '../../indexTheory.min.css';

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
