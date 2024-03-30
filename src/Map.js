import React from 'react'
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


export default function Map() {

    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_API_GOOGLE_MAPS_KEY,
      
      
     
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
    console.log("cal.route");
   }
 
   function clearRoute() {
    console.log("CLr route");
   }
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
      {/*google map box*/}
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
      
        
      <Input type='text' placeholder='Origin' ref={originRef} libraries= {['places']}/>
     
          <Input type="text" placeholder="Destination" ref={destiantionRef} />
      

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
        <Text>Distance: </Text>
        <Text>Duration: </Text>
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
}
  

