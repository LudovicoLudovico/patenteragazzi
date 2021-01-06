import React from 'react';
import TheoryItem from './TheoryItem';

const Theory1 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={"Definizioni generali e doveri nell'uso dell strada"}
    />
  );
};

export default Theory1;
