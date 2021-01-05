import React from 'react';
import { decrypt } from '../lib/enc';
import Link from 'next/link';
import slugify from 'slugify';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const TheoryItem = ({ theory, category, filters }) => {
  const isDisplayed = theory.filter((ti) => {
    return ti.category == category && decrypt(ti.title).includes(filters);
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
              let title = decrypt(ti.title).toString().toLowerCase();
              return ti.category == category && title.includes(filters);
            })
            .map((theoryItem, index) => {
              return (
                <div key={index}>
                  <Link
                    href='/teoria/[teoria]'
                    as={`/teoria/${slugify(decrypt(theoryItem.title))}`}
                  >
                    <a className='theoryList-item-link'>
                      {decrypt(theoryItem.title)} <ArrowForwardIosIcon />
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
