import { decrypt } from '../../lib/enc';
import Link from 'next/link';
import slugify from 'slugify';
import { unslugify } from 'unslugify';
import Image from 'next/image';

const TheoryItem = ({ theory, category, filters }) => {
  const isDisplayed = theory.filter((ti) => {
    return ti.category == category && unslugify(ti.slug).includes(filters);
  });

  return (
    <>
      {isDisplayed.length !== 0 && (
        <div
          id={slugify(category, { lower: true })}
          className={
            category == "Definizioni generali e doveri nell'uso dell strada"
              ? 'first theoryList-item'
              : 'theoryList-item'
          }
        >
          <h2>{category}</h2>
          {theory
            .filter((ti) => {
              return (
                ti.category == category &&
                unslugify(ti.slug).toLowerCase().includes(filters.slice(1))
              );
            })
            .map((theoryItem, index) => {
              const titleItem = decrypt(theoryItem.title);
              return (
                <div key={index}>
                  <Link
                    href='/teoria/[teoria]'
                    as={`/teoria/${theoryItem.slug}`}
                  >
                    <a className='theoryList-item-link'>
                      {titleItem}
                      <div style={{ height: 24, width: 24 }}>
                        <Image
                          src={'/right-arrow.svg'}
                          height={24}
                          width={24}
                          layout={'fixed'}
                        />
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default TheoryItem;
