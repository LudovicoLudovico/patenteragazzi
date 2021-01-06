import React from 'react';
import TheoryItem from './TheoryItem';

const Theory21 = ({ filteredTheory, filters }) => {
  return (
    <TheoryItem
      theory={filteredTheory}
      filters={filters}
      category={
        'Patenti di guida, sistema sanzionatorio, documenti di circolazione, obblighi verso agenti'
      }
    />
  );
};

export default Theory21;
