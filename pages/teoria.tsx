import React, { useState } from 'react';
import Navbar from '../components/general/Navbar';
import { getTheory } from '../fetchData/getTheory';

import dynamic from 'next/dynamic';

const SearchBox = dynamic(() => import('../components/theory/SearchBox'), {
  ssr: false,
  loading: () => <p>Caricamento...</p>,
});
const Theory1 = dynamic(() => import('../components/theory/Theory1'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory2 = dynamic(() => import('../components/theory/Theory2'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory3 = dynamic(() => import('../components/theory/Theory3'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory4 = dynamic(() => import('../components/theory/Theory4'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory5 = dynamic(() => import('../components/theory/Theory5'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory6 = dynamic(() => import('../components/theory/Theory6'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory7 = dynamic(() => import('../components/theory/Theory7'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory8 = dynamic(() => import('../components/theory/Theory8'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory9 = dynamic(() => import('../components/theory/Theory9'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory10 = dynamic(() => import('../components/theory/Theory10'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory11 = dynamic(() => import('../components/theory/Theory11'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory12 = dynamic(() => import('../components/theory/Theory12'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory13 = dynamic(() => import('../components/theory/Theory13'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory14 = dynamic(() => import('../components/theory/Theory14'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory15 = dynamic(() => import('../components/theory/Theory15'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory16 = dynamic(() => import('../components/theory/Theory16'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory17 = dynamic(() => import('../components/theory/Theory17'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory18 = dynamic(() => import('../components/theory/Theory18'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory19 = dynamic(() => import('../components/theory/Theory19'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory20 = dynamic(() => import('../components/theory/Theory20'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory21 = dynamic(() => import('../components/theory/Theory21'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory22 = dynamic(() => import('../components/theory/Theory22'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory23 = dynamic(() => import('../components/theory/Theory23'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory24 = dynamic(() => import('../components/theory/Theory24'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory25 = dynamic(() => import('../components/theory/Theory25'), {
  loading: () => <p>Caricamento...</p>,
});
const Theory26 = dynamic(() => import('../components/theory/Theory26'), {
  loading: () => <p>Caricamento...</p>,
});

import Seo from '../components/general/Seo';
import '../style/theory.min.css';

const teoria = ({ theory }) => {
  const [filteredTheory, setFilteredTheory] = useState([...theory]);
  const [filters, setFilters] = useState('');
  return (
    <>
      <Seo
        title='Teoria'
        description="Tutta la teoria necessaria a passare l'esame di teoria"
        canonical='https://patenteragazzi.it/teoria'
      />
      <Navbar active={'teoria'} isAdminNav={false} />
      <div className='container theoryList main_content'>
        <h1>Teoria</h1>
        <br />
        <SearchBox
          filters={filters}
          setFilters={(e) => setFilters(e.charAt(0).toUpperCase() + e.slice(1))}
        />
        <br />
        <br />
        <Theory1 filteredTheory={filteredTheory} filters={filters} />
        <Theory2 filteredTheory={filteredTheory} filters={filters} />
        <Theory3 filteredTheory={filteredTheory} filters={filters} />
        <Theory4 filteredTheory={filteredTheory} filters={filters} />
        <Theory5 filteredTheory={filteredTheory} filters={filters} />
        <Theory6 filteredTheory={filteredTheory} filters={filters} />
        <Theory7 filteredTheory={filteredTheory} filters={filters} />
        <Theory8 filteredTheory={filteredTheory} filters={filters} />
        <Theory9 filteredTheory={filteredTheory} filters={filters} />
        <Theory10 filteredTheory={filteredTheory} filters={filters} />
        <Theory11 filteredTheory={filteredTheory} filters={filters} />
        <Theory12 filteredTheory={filteredTheory} filters={filters} />
        <Theory13 filteredTheory={filteredTheory} filters={filters} />
        <Theory14 filteredTheory={filteredTheory} filters={filters} />
        <Theory15 filteredTheory={filteredTheory} filters={filters} />
        <Theory16 filteredTheory={filteredTheory} filters={filters} />
        <Theory17 filteredTheory={filteredTheory} filters={filters} />
        <Theory18 filteredTheory={filteredTheory} filters={filters} />
        <Theory19 filteredTheory={filteredTheory} filters={filters} />
        <Theory20 filteredTheory={filteredTheory} filters={filters} />
        <Theory21 filteredTheory={filteredTheory} filters={filters} />
        <Theory22 filteredTheory={filteredTheory} filters={filters} />
        <Theory23 filteredTheory={filteredTheory} filters={filters} />
        <Theory24 filteredTheory={filteredTheory} filters={filters} />
        <Theory25 filteredTheory={filteredTheory} filters={filters} />
        <Theory26 filteredTheory={filteredTheory} filters={filters} />
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
