import React from 'react';
import { TextField } from '@material-ui/core';

interface SearchBoxProps {
  filters: string[];
  setFilters: (string: string) => void;
}

const SearchBox = ({ setFilters, filters }: SearchBoxProps) => {
  return (
    <>
      <TextField
        id='outlined-basic'
        label='Trova teoria...'
        variant='outlined'
        style={{ width: '100%', maxWidth: 800 }}
        inputProps={{
          autoComplete: 'off',
        }}
        onChange={(e) => {
          setFilters(e.target.value);
        }}
        value={filters}
      />
    </>
  );
};

export default SearchBox;
