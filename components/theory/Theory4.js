import React from 'react';
import TheoryItem from './TheoryItem';

const Theory4 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Segnali di obbligo'}
    />
  );
};

export default Theory4;
