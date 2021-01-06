import React from 'react';
import TheoryItem from './TheoryItem';
const Theory23 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={
        'Guida in relazione alle qualità e condizioni fisiche e psichiche, alcool, droga, farmaci e primo soccorso'
      }
    />
  );
};

export default Theory23;
