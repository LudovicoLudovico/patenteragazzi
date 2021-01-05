import React, { useState } from 'react';
import { Button } from '@material-ui/core';
const TopicQuizSelec = ({ filters, setFilters, text }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <Button
      className='topic-list-item'
      variant='contained'
      endIcon={isSelected ? <img src='/check.svg' /> : ''}
      onClick={() => {
        if (!isSelected) {
          setFilters((filters) => [...filters, text]);
          setIsSelected(true);
        } else {
          const filterCopy = [...filters];
          const removedCopy = filterCopy.filter((item) => {
            return item !== text;
          });

          setFilters(removedCopy);
          setIsSelected(false);
        }
      }}
    >
      {text}
    </Button>
  );
};

export default TopicQuizSelec;
