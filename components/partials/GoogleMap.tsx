
import GoogleMapReact from "google-map-react";
import { useEffect, useRef } from "react";

export default function GoogleMap({ data }: any) {
  const mapRef = useRef<any>(null);
  const mapsRef = useRef<any>(null);

  const defaultProps = {
    center: {
      lat: data?.start_location?.latitude,
      lng: data?.start_location?.longitude,
    },
    zoom: 12,
  };

  // Draw route when map loads
  const handleApiLoaded = (map: any, maps: any) => {
    mapRef.current = map;
    mapsRef.current = maps;

    if (!data?.start_location || !data?.end_location) return;

    const directionsService = new maps.DirectionsService();
    const directionsRenderer = new maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    directionsService.route(
      {
        origin: {
          lat: data.start_location.latitude,
          lng: data.start_location.longitude,
        },
        destination: {
          lat: data.end_location.latitude,
          lng: data.end_location.longitude,
        },
        travelMode: maps.TravelMode.DRIVING,
      },
      (result: any, status: any) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        } else {
          console.error("Error fetching directions", result);
        }
      }
    );
  };

  return (
    <div style={{ height: "350px", width: "100%", borderRadius:20 }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        draggable={false}

      />
    </div>
  );
}

