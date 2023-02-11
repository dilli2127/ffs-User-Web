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
import Header from "@views/components/header";
import LandingPage from "@views/components/home/landingpage";
import PhotoComponent from "@views/components/home/photoccomponet";


const UserHome = (props) => {
  return (
    <>
     <ScrollView>
      <Box>
        <Header />
        <LandingPage/>
        <PhotoComponent/>
      </Box>
      </ScrollView>
    </>
  );
};
export default UserHome;
