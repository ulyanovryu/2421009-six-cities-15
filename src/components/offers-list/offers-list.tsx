import {OfferList, Offers, OffersListTemplate} from '../../types/offers.ts';

import OfferCard from '../offer-card';

type OffersParams = {
  offersList: Offers;
  offersListTemplate: OffersListTemplate;
};

function OffersList ({offersList, offersListTemplate}: OffersParams): JSX.Element {
  return (
    <>
      {
        offersList.map((offer: OfferList): JSX.Element => (
          <OfferCard
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

export default OffersList;
