import {useRef, useEffect} from 'react';
import leaflet, {Icon, Marker, LayerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {Offers, Offer} from '../../types/offers.ts';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import {Nullable} from 'vitest';
import {City} from '../../types/cities.ts';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

type MapProps = {
  offers: Offers;
  className: string;
  selectedPoint: Nullable<Offer>;
  selectedCity: City;
};
function Map ({offers, className, selectedPoint, selectedCity}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  //const city: OfferCity = offers[0]['city'];
  const map = useMap(mapRef, selectedCity);
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  // console.log(selectedPoint);
  // console.log(selectedCity);

  useEffect(() => {
    if (map) {
      map.setView([selectedCity.location.latitude, selectedCity.location.longitude], selectedCity.location.zoom);
      markerLayer.current.clearLayers();
      markerLayer.current.addTo(map);
    }
  }, [map, selectedCity]);

  useEffect(() => {
    if (map) {
      //const markerLayer = leaflet.layerGroup().addTo(map);
      offers.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && selectedPoint !== null && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer.current);
      });

      return () => {
        // map.removeLayer(markerLayer.current);
      };
    }
  }, [map, offers, selectedPoint]);

  return <section style={{height: '500px'}} className={className} ref={mapRef}></section>;
}

export default Map;
