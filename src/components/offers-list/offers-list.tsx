import {Offer, Offers, OffersListTemplate} from '../../types/offers.ts';

import OfferCard from '../offer-card';
import {useState} from 'react';
import {Nullable} from 'vitest';

type OffersParams = {
  offersList: Offers;
  offersListTemplate: OffersListTemplate;
  onMouseOffer: (offer?: Offer) => void;
};

function OffersList ({offersList, offersListTemplate, onMouseOffer}: OffersParams): JSX.Element {

  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);

  if (activeOffer !== undefined && activeOffer !== null) {
    onMouseOffer(activeOffer);
  }

  return (
    <>
      {
        offersList.map((offer: Offer): JSX.Element => (
          <OfferCard
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
