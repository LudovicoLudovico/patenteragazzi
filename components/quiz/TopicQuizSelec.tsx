import { useState } from 'react';
import Image from 'next/image';

interface TopicQuizSelecProps {
  filters: string[];
  setFilters: (filterCopy: string[]) => void;
  text: string;
}

const TopicQuizSelec = ({ filters, setFilters, text }: TopicQuizSelecProps) => {
  const [isSelected, setIsSelected] = useState(false);
  console.log('rendered');

  return (
    <>
      <button
        className='topic-list-item'
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
        <p>{text}</p>

        {isSelected && (
          <div style={{ height: 25, width: 25 }}>
            <Image src={'/check.svg'} height={25} width={25} layout={'fixed'} />
          </div>
        )}
      </button>
    </>
  );
};

export default TopicQuizSelec;
