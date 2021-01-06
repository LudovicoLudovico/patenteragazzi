import React from 'react';
import TheoryItem from './TheoryItem';

const Theory6 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Segnaletica orizzontale e segni sugli ostacoli'}
    />
  );
};

export default Theory6;
