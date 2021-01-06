import React from 'react';
import TheoryItem from './TheoryItem';

const Theory19 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Uso delle luci e dei dispositivi acustici, spie e simboli'}
    />
  );
};

export default Theory19;
