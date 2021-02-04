import React from 'react';
import slugify from 'slugify';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@material-ui/core';

interface IndexTheoryCardProps {
  title: string;
  image: string | null;
  slug: string;
}

const IndexTheoryCard = ({ title, image, slug }: IndexTheoryCardProps) => {
  return (
    <div className='index_theory_card'>
      <div className='index_theory_card_image'>
        <Image
          src={image}
          alt={title}
          layout={'intrinsic'}
          width={250}
          height={250}
        />
      </div>
      <div className='index_theory_card_content'>
        <h3>{title}</h3>
        <Link
          href={`/teoria#${slugify(slug, { lower: true })}`}
          prefetch={false}
        >
          <a title={slugify(slug, { lower: true })}>
            <Button variant='contained' aria-label={`Scopri di più: ${title}`}>
              Scopri di più
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default IndexTheoryCard;
