import {memo} from 'react';

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

//export default memo(OfferGallery);

function GoodListItem ({good}:GoogsType): JSX.Element {
  return (
    <li className="offer__inside-item">{good}</li>
  );
}

const MemorizedGoodListItem = memo(GoodListItem);

export {MemorizedOfferGallery, MemorizedGoodListItem};
