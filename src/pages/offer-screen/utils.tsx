import {memo} from 'react';
import {MaxCountLimit} from '../../const.ts';

type OfferGalleriesType = {
  images: string[];
  title: string;
}

type OfferGoodsType = {
  goods: string[];
}

function OfferGalleries ({images, title}: OfferGalleriesType): JSX.Element | null {

  const imagesLimit = images !== undefined ? images.slice(0, MaxCountLimit.OfferImages) : [];
  const imagesCount = imagesLimit.length;

  return (
    imagesCount > 0 ?
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {imagesLimit.map((image) => (
            <div className="offer__image-wrapper" key={image}>
              <img className="offer__image" src={image} alt={title} />
            </div>
          ))}
        </div>
      </div>
      : null
  );
}
const MemorizedOfferGalleries = memo(OfferGalleries);

function GoodsListItem ({goods}:OfferGoodsType): JSX.Element | null {
  return (
    goods !== undefined && goods.length > 0 ?
      <div className="offer__inside">
        <h2 className="offer__inside-title">What&apos;s inside</h2>
        <ul className="offer__inside-list">
          {
            goods.map((good) => (
              <li className="offer__inside-item" key={good}>{good}</li>
            ))
          }
        </ul>
      </div>
      : null
  );
}

const MemorizedGoodsList = memo(GoodsListItem);

export {MemorizedOfferGalleries, MemorizedGoodsList};
