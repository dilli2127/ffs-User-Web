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


const UserHome = () => {
  return (
    <>
     <ScrollView>
      <Box>
        <LandingPage/>
        <PhotoComponent/>
      </Box>
      </ScrollView>
    </>
  );
};
export default UserHome;
