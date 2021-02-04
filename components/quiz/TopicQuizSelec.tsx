import React, { useState } from 'react';
import { Button } from '@material-ui/core';

interface TopicQuizSelecProps {
  filters: string[];
  setFilters: (filterCopy: string[]) => void;
  text: string;
}

const TopicQuizSelec = ({ filters, setFilters, text }: TopicQuizSelecProps) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <Button
      className='topic-list-item'
      variant='contained'
      endIcon={isSelected ? <img src='/check.svg' /> : ''}
      onClick={() => {
        if (!isSelected) {
          const filterCopy = [...filters];
          filterCopy.push(text);
          setFilters(filterCopy);
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
