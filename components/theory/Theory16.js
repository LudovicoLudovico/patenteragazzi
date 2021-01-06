import React from 'react';
import TheoryItem from './TheoryItem';

const Theory16 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Norme sul sorpasso'}
    />
  );
};

export default Theory16;
