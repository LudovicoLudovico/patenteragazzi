import React from 'react';
import { Button } from '@material-ui/core';
const TopicQuizSelec = ({ filters, setFilters, text }) => {
  return (
    <Button
      className='topic-list-item'
      endIcon={filters.includes(text) ? <img src='/check.svg' /> : ''}
      onClick={() => {
        if (!filters.includes(text)) {
          setFilters((filters) => [...filters, text]);
        } else {
          const filterCopy = [...filters];
          const removedCopy = filterCopy.filter((item) => {
            return item !== text;
          });

          setFilters(removedCopy);
        }
      }}
    >
      {text}
    </Button>
  );
};

export default TopicQuizSelec;
