import {memo} from 'react';
import {MaxCountLimit} from '../../const.ts';

type OfferGalleriesType = {
  images: string[];
  title: string;
}
type OfferGalleryImagesType = {
  src: string;
  alt: string;
}

type GoogsType = {
  good: string;
}

function OfferGallery ({src, alt}: OfferGalleryImagesType): JSX.Element {
  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={src} alt={alt} />
    </div>
  );
}
const MemorizedOfferGallery = memo(OfferGallery);

function OfferGalleries ({images, title}: OfferGalleriesType): JSX.Element | null {

  const imagesLimit = images !== undefined ? images.slice(0, MaxCountLimit.OfferImages) : [];
  const imagesCount = imagesLimit.length;

  return (
    imagesCount > 0 ?
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {imagesLimit.map((image) => (
            <MemorizedOfferGallery key={image} src={image} alt={title} />
          ))}
        </div>
      </div>
      : null
  );
}
const MemorizedOfferGalleries = memo(OfferGalleries);

function GoodListItem ({good}:GoogsType): JSX.Element {
  return (
    <li className="offer__inside-item">{good}</li>
  );
}

const MemorizedGoodListItem = memo(GoodListItem);

export {MemorizedOfferGalleries, MemorizedGoodListItem};
