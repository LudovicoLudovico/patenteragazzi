import React from 'react';
import TheoryItem from './TheoryItem';

const Theory5 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Segnali di precedenza'}
    />
  );
};

export default Theory5;
