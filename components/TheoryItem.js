import React from 'react';
import { decrypt } from '../lib/enc';
import Link from 'next/link';
import slugify from 'slugify';
import { unslugify } from 'unslugify';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const TheoryItem = ({ theory, category }) => {
  return (
    <>
      <div className='theoryList-item' id={category}>
        <h2>{category}</h2>
        {theory
          .filter((ti) => {
            return ti.category == category;
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
    </>
  );
};

export default TheoryItem;
