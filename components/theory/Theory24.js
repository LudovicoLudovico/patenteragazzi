import React from 'react';
import TheoryItem from './TheoryItem';

const Theory24 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={
        'Responsabilità civile, penale e amministrativa, assicurazione r.c.a. e altre forme assicurative legate al veicolo'
      }
    />
  );
};

export default Theory24;
