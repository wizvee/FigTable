import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const InfoMap = styled.div`
  width: 400px;
  height: 300px;
  border-radius: 3px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const GoogleMap = ({ lat, lng }) => {
  // 구글 맵 참조
  const googleMapRef = useRef(null);

  // 구글 맵 생성
  function createGoogleMap() {
    return new google.maps.Map(googleMapRef.current, {
      zoom: 16,
      center: { lat, lng },
      disableDefaultUI: true,
    });
  }

  // 맵 마커 생성
  function createMarker() {
    return new google.maps.Marker({
      position: { lat, lng },
    });
  }

  useEffect(() => {
    const googleScript = document.createElement('script');
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_APIKEY}`;
    window.document.body.appendChild(googleScript);

    googleScript.addEventListener('load', () => {
      let map = createGoogleMap();
      let marker = createMarker();
      marker.setMap(map);
    });
  }, []);

  return <InfoMap ref={googleMapRef} />;
};

export default React.memo(GoogleMap);
