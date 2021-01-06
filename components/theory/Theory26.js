import React from 'react';
import TheoryItem from './TheoryItem';

const Theory26 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={
        'Elementi costitutivi del veicolo, manutenzione ed uso, stabilità e tenuta di strada, comportamenti e cautele di guida'
      }
    />
  );
};

export default Theory26;
