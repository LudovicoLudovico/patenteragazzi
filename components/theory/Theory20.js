import React from 'react';
import TheoryItem from './TheoryItem';

const Theory20 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={
        'Dispositivi di equipaggiamento, funzione ed uso: cinture di sicurezza, sistemi di ritenuta per bambini, casco protettivo e abbigliamento di sicurezza'
      }
    />
  );
};

export default Theory20;
