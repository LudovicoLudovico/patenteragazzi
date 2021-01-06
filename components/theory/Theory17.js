import React from 'react';
import TheoryItem from './TheoryItem';
const Theory17 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Fermata, sosta, arresto'}
    />
  );
};

export default Theory17;
