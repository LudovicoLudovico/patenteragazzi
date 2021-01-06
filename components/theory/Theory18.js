import React from 'react';
import TheoryItem from './TheoryItem';

const Theory18 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Norme varie'}
    />
  );
};

export default Theory18;
