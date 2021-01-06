import React from 'react';
import TheoryItem from './TheoryItem';

const Theory3 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Segnali di divieto'}
    />
  );
};

export default Theory3;
