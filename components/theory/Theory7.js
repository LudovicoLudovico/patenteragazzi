import React from 'react';
import TheoryItem from './TheoryItem';

const Theory7 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Segnalazioni semaforiche e degli agenti del traffico'}
    />
  );
};

export default Theory7;
