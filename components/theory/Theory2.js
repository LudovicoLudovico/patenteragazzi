import React from 'react';
import TheoryItem from './TheoryItem';

const Theory2 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Segnali di pericolo'}
    />
  );
};

export default Theory2;
