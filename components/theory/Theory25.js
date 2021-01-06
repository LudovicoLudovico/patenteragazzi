import React from 'react';
import TheoryItem from './TheoryItem';

const Theory25 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={
        "Limitazione dei consumi, rispetto dell'ambiente e inquinamento"
      }
    />
  );
};

export default Theory25;
