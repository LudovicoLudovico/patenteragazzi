import React from 'react';
import TheoryItem from './TheoryItem';

const Theory14 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Norme sulla circolazione dei veicoli'}
    />
  );
};

export default Theory14;
