import React from 'react';
import TheoryItem from './TheoryItem';

const Theory8 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Segnali di indicazione'}
    />
  );
};

export default Theory8;
