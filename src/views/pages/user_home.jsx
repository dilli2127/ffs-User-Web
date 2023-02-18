import {
  Box,
  Center,
  Heading,
  Hidden,
  HStack,
  Pressable,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import LandingPage from "@views/components/home/landingpage";
import PhotoComponent from "@views/components/home/photoccomponet";
import Card from "@views/components/home/card";
import Slider from "@views/components/home/slider";



const UserHome = () => {
  return (
    <>
     <ScrollView>
      <Box>
        <Slider/>
        {/* <LandingPage/> */}
        {/* <PhotoComponent/> */}
        {/* <Card/> */}
      </Box>
      </ScrollView>
    </>
  );
};
export default UserHome;
