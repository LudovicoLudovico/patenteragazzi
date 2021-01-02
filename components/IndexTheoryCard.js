import React from 'react';
import slugify from 'slugify';
import Link from 'next/link';
import { Button } from '@material-ui/core';

const IndexTheoryCard = ({ title, image, slug }) => {
  return (
    <div className='index_theory_card'>
      <img src={image} alt='' />
      <div>
        <h3>{title}</h3>
        <Link href={`/teoria#${slugify(slug, { lower: true })}`}>
          <a>
            <Button variant='contained'>Scopri di più</Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default IndexTheoryCard;
