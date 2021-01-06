import React from 'react';
import TheoryItem from './TheoryItem';

const Theory15 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Ordine di precedenza agli incroci'}
    />
  );
};

export default Theory15;
