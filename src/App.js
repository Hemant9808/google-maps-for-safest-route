import {
  Box,
  Button,
  ButtonGroup,
  chakra,
  Flex,
  HStack,
  IconButton,
  Input,
  
  SkeletonText,
  
  Text,
  
} from "@chakra-ui/react";

import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState,useRef } from "react";
const center = { lat: 28.4731, lng: 77.4829 };
const REACT_API_GOOGLE_MAPS_KEY = "AIzaSyCr-biVpk_b4OyV7fwp_a8z2Mo3YBb5nlM"

function App() {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: REACT_API_GOOGLE_MAPS_KEY,
    
    libraries: ['places'],
   
  });
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
   /** @type React.MutableRefObject<HTMLInputElement> */
   const originRef = useRef()
   /** @type React.MutableRefObject<HTMLInputElement> */
   const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }
  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }
  if(isLoaded){
  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      bgColor="blue.200"
      bgImage="https://images.unsplash.com/photo-1647117181799-0ac3e50a548a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      bgPos="bottom"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
       
        <GoogleMap
          center={center}
          zoom={15}
          options={{
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          <Marker position={center} />
         
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        minW="sm"
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        min="container.md"
        zIndex="1"
      >
        <HStack spacing={4}>
        <Autocomplete>
            
        <Input type='text' placeholder='Origin' ref={originRef} libraries= {['places']}/>
          
          </Autocomplete>
          <Autocomplete>
            <Input type="text" placeholder="Destination" ref={destiantionRef} />
          </Autocomplete>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <Button>Clear</Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance:{distance} </Text>
          <Text>Duration:{duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
}}
export default App;
