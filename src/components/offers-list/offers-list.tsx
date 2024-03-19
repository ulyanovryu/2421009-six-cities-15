import {Offer, Offers, OffersListTemplate} from '../../types/offers.ts';

import OfferCard from '../offer-card';

type OffersParams = {
  offersList: Offers;
  offersListTemplate: OffersListTemplate;
  getMouseOverOfferList: (offer?: Offer) => void;
};

function OffersList ({offersList, offersListTemplate, getMouseOverOfferList}: OffersParams): JSX.Element {
  return (
    <>
      {
        offersList.map((offer: Offer): JSX.Element => (
          <OfferCard
            key={offer.id}
            offerParams={offer}
            offersListTemplate={offersListTemplate}
            getMouseOverOffer={(activeOfferParams) => {
              getMouseOverOfferList(activeOfferParams);
            }}
          />
        ))
      }
    </>
  );
}

export default OffersList;
