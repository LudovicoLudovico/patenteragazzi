import React from 'react';
import TheoryItem from './TheoryItem';

const Theory11 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Pannelli integrativi dei segnali'}
    />
  );
};

export default Theory11;
