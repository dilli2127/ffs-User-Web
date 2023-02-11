import { getItem } from "@helpers/encrypt_storage";
import { createClient } from "@supabase/supabase-js";

const supabase_url = "https://ygzkdvsbzsdavlqfdgfq.supabase.co";
const supabase_anon_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnemtkdnNienNkYXZscWZkZ2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3NDc0MjIsImV4cCI6MTk3OTMyMzQyMn0._sFbhQMmjLnN5CyYZiuuZrDIS1cmKc9sPazomQEffdM";
const supabaseClient = createClient(supabase_url, supabase_anon_key);

export async function request(query) {
  try {
    // let access_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
    //   ?.currentSession?.access_token;
    let supabase = supabaseClient;
    // const { user, error } = supabase.auth.setAuth(access_token);
    // const { data: data1, error: err2 } = await supabase.from(
    //   "user_policy_view"
    // );
    const response = await eval(query.replace(/(\r\n|\n|\r)/gm, ""));
    return response;
  } catch (e) {
    return null;
  }
}
export async function createSupabaseUser(variables) {
  // let access_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
  //   ?.currentSession?.access_token;
  let supabase = supabaseClient;
  const { user, session, error } = await supabaseClient.auth.signUp(
    {
      email: "admin@matrimony.com",
      password: "123456",
    },
    {
      data: {
        name: "Admin",
      },
    }
  );
  await supabase.auth.signOut();
  let credentials = getItem("credentials");
  const { user: user1, error: error1 } = await supabase.auth.signIn({
    email: credentials.email,
    password: credentials.password,
  });
  let result = {
    user,
    error,
  };
  return result;
}
export async function loginSupabaseUser(variables) {
  const { user, session, error } = await supabaseClient.auth.signIn({
    email: variables.username,
    password: variables.password,
  });
  let result = {
    user,
    error,
  };
  return result;
}

export async function signOutSupabaseUser() {
  const result = await supabaseClient.auth.signOut();
  return result;
}
