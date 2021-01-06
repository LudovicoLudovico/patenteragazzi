import React from 'react';
import TheoryItem from './TheoryItem';
const Theory13 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Distanza di sicurezza'}
    />
  );
};

export default Theory13;
