import Image from 'next/image';
import Link from 'next/link';

const IndexTheory = () => {
  return (
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
              alt='Segnali di pericolo'
              quality={10}
            />
            <Link href='/teoria#segnali-di-pericolo'>
              <button>Scopri di più</button>
            </Link>
          </div>
          <div className='index_theory_card'>
            <h3>Assicurazioni</h3>
            <Image
              src={'/assicurazione.svg'}
              height={150}
              width={150}
              alt='Assicurazione'
              quality={10}
            />

            <Link
              href='/teoria#patenti-di-guida-sistema-sanzionatorio-documenti-di-circolazione-obblighi-verso-agenti'
              prefetch={false}
            >
              <button>Scopri di più</button>
            </Link>
          </div>
          <div className='index_theory_card'>
            <h3>Patenti</h3>
            <Image
              src={'/patente.svg'}
              height={150}
              width={150}
              alt='Patente'
              quality={10}
            />
            <Link
              href='/teoria#responsabilita-civile-penale-e-amministrativa-assicurazione-r.c.a.-e-altre-forme-assicurative-legate-al-veicolo'
              prefetch={false}
            >
              <button>Scopri di più</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexTheory;
