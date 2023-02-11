import { v4 as uuidv4 } from "uuid";
import { gql } from "@apollo/client";

const SUPABASE_URL = "https://ruqvddcnftakjtfcfiur.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1cXZkZGNuZnRha2p0ZmNmaXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMwNjI0NzMsImV4cCI6MTk3ODYzODQ3M30.fpOCuSvPx0ArIoCAt3zR9N5ruxG7HawnLEvqRsCNx4Y";
export default async function fileUpload(file, storageName) {
  // let result = await getToken();
  // const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  // supabase.auth.setAuth(result.getUploadToken.access_token);
  // let filenameuuid = uuidv4();
  // let ext = file.name?.split(".")[1];
  // let fileName = `${filenameuuid}.${ext}`;
  // const { data } = await supabase.storage
  //   .from(storageName)
  //   .upload(fileName, file, {
  //     contentType: "image/png",
  //     cacheControl: "3600",
  //     upsert: true,
  //   });
  // let baseUrl =
  //   "https://qredjhrqmjsmpcoeqovt.supabase.co/storage/v1/object/public/";
  // let imageUrl = `${baseUrl}${data?.Key}`;
  // return imageUrl;
}
async function getToken() {
  let { data } = await QueryRequest(fileQuery);
  return data;
}

const fileQuery = gql`
  query getUploadToken($type: String, $fileName: String) {
    getUploadToken(type: $type, fileName: $fileName) {
      status
      accessToken
      error {
        status
        message
      }
    }
  }
`;
