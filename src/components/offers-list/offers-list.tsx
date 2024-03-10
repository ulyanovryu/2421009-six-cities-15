import {Offer, Offers, OffersListTemplate} from '../../types/offers.ts';

import OfferList from '../offer-list';
import {useState} from 'react';
import {Nullable} from 'vitest';

type OffersParams = {
  offersList: Offers;
  offersListTemplate: OffersListTemplate;
};

function OffersList ({offersList, offersListTemplate}: OffersParams): JSX.Element {

  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);


  // eslint-disable-next-line no-console
  console.log(activeOffer);

  return (
    <>
      {
        offersList.map((offer: Offer): JSX.Element => (
          <OfferList
            key={offer.id}
            offerParams={offer}
            offersListTemplate={offersListTemplate}
            onMouseOver={(activeOfferParams) => {
              setActiveOffer(activeOfferParams || null);
            }}
          />
        ))
      }
    </>
  );
}

export default OffersList;
