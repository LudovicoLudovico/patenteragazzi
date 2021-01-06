import React from 'react';
import TheoryItem from './TheoryItem';

const Theory12 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Limiti di velocità, pericolo e intralcio alla circolazione'}
    />
  );
};

export default Theory12;
