import React from 'react';
import TheoryItem from './TheoryItem';

const Theory22 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={'Incidenti stradali e comportamenti in caso di incidente'}
    />
  );
};

export default Theory22;
