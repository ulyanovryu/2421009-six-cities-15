import {Offer, Offers, OffersListTemplate} from '../../types/offers.ts';

import OfferList from '../offer-list';
import {useState} from 'react';

type OffersParams = {
  offersList: Offers;
  offersListTemplate: OffersListTemplate;
};

// type CityOffers = {string:Offers};
// type CitiesOffers = CityOffers[];

function OffersList ({offersList, offersListTemplate}: OffersParams): JSX.Element {

  const [activeOffer, setActiveOffer] = useState('');

  // const citiesOffersList = (offers: Offers) => {
  //   const citiesOffers: CitiesOffers = [];
  //   offers.forEach((offer: Offer) => {
  //
  //     const city = offer.city.name;
  //
  //     if (!citiesOffers[city]) {
  //       citiesOffers[city] = [];
  //     }
  //     citiesOffers[city].push(offer);
  //   });
  //
  //   return citiesOffers;
  // };
  //
  // const citiesOffersL= citiesOffersList(offersList);


  //console.log(citiesOffersL);

  return (
    <>

      <div style={{'display':'none'}}>{activeOffer}</div>

      {
        offersList.map((offer: Offer): JSX.Element => (
          <OfferList
            key={offer.id}
            offerParams={offer}
            offersListTemplate={offersListTemplate}
            onMouseOver={(activeOfferId) => {
              setActiveOffer(activeOfferId);
            }}
          />
        ))
      }
    </>
    /*offersListTemplate === 'mainScreen' ?
      offersList.map((offer: Offer): JSX.Element => (
        <OfferList
          key={offer.id}
          offerParams={offer}
          offersListTemplate={offersListTemplate}
          onMouseOver={(activeOfferId) => {
            setActive(activeOfferId);
          }}
        />
      ))
      : (
        offersListTemplate === 'favoritesScreen' ?
          ''
          : null
      )*/


  );
}

export default OffersList;
