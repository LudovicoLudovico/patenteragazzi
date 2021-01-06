import React from 'react';
import TheoryItem from './TheoryItem';
const Theory9 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Segnali complementari, segnali temporanei e di cantiere'}
    />
  );
};

export default Theory9;
