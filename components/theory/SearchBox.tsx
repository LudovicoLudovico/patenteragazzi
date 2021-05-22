interface SearchBoxProps {
  filters?: string[] | string;
  setFilters: (string: string) => void;
}

const SearchBox = ({ setFilters, filters }: SearchBoxProps) => {
  return (
    <>
      <input
        type='text'
        value={filters}
        onChange={(e) => {
          setFilters(e.target.value);
        }}
        style={{
          width: '100%',
          maxWidth: 800,
          padding: 20,
          borderRadius: 5,
          outline: 'none',
        }}
        placeholder='Trova teoria...'
      />
    </>
  );
};

export default SearchBox;
