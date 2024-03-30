import {memo} from 'react';

import {OfferList, Offers, OffersListTemplate} from '../../types/offers.ts';
import MemorizedOfferCard from '../offer-card';

type OffersParams = {
  offersList: Offers;
  offersListTemplate: OffersListTemplate;
};

function OffersList ({offersList, offersListTemplate}: OffersParams): JSX.Element {
  return (
    <>
      {
        offersList.map((offer: OfferList): JSX.Element => (
          <MemorizedOfferCard
            key={offer.id}
            offerParams={offer}
            offersListTemplate={offersListTemplate}
            hovered
          />
        ))
      }
    </>
  );
}

const MemorizedOffersList = memo(OffersList);

export default MemorizedOffersList;
