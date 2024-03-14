import {useRef, useEffect} from 'react';
import {Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {Offers} from '../../types/offers.ts';

type OfferCity = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

type MapProps = {
  offers: Offers;
};
function Map ({offers}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const city: OfferCity = offers[0]['city'];
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers]);

  return <section style={{height: '600px'}} className="cities__map map" ref={mapRef}></section>;
}

export default Map;
