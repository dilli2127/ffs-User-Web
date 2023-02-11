import { gql } from "@apollo/client";

export const registerOTPRequest = gql`
  query registerOTPRequest($mobile: String!) {
    register_opt_request: registerOTPRequest(mobile: $mobile) {
      status
      mobile_status

      error {
        status_code
        message
      }
    }
  }
`;

export const registerUser = gql`
  mutation registerUser($data: register_user_input) {
    register_user: registerUser(data: $data) {
      status
      user_id
      gender
      name
      token
      profile_id
      is_profile_added
      is_preference_added
      session_id
      credentials_duplicate_error {
        status
        mobile_status
      }
      error {
        status_code
        message
      }
    }
  }
`;

export const userLogin = gql`
  query userLogin($username: String!, $password: String!) {
    user_login: userLogin(username: $username, password: $password) {
      status
      user_id
      name
      gender
      token
      profile_id
      is_profile_added
      is_preference_added
      session_id
      main_photo

      error {
        status_code
        message
      }
    }
  }
`;

export const userNewToken = gql`
  query userNewToken {
    user_new_token: userNewToken {
      token
      error {
        status_code
        message
      }
    }
  }
`;

export const getUserTokenByAdmin = gql`
  query getUserTokenByAdmin($username: String!, $otp: String!) {
    get_user_token_by_admin: getUserTokenByAdmin(
      username: $username
      otp: $otp
    ) {
      user_id
      name
      token
      profile_id
      is_profile_added
      is_preference_added
      session_id
      error {
        status_code
        message
      }
    }
  }
`;

export const requestForgotPasswordOTP = gql`
  query requestForgotPasswordOTP($username: String!) {
    request_forgot_password_otp: requestForgotPasswordOTP(username: $username) {
      status
      error {
        status_code
        message
      }
    }
  }
`;

export const updateForgotPassword = gql`
  mutation updateForgotPassword(
    $username: String!
    $otp: String!
    $new_password: String!
  ) {
    update_forgot_password: updateForgotPassword(
      username: $username
      otp: $otp
      new_password: $new_password
    ) {
      gender
      user_id
      name
      token
      profile_id
      is_profile_added
      is_preference_added
      session_id
      error {
        status_code
        message
      }
    }
  }
`;

export const updateChangePassword = gql`
  mutation updateChangePassword(
    $current_password: String!
    $new_password: String!
  ) {
    update_change_password: updateChangePassword(
      current_password: $current_password
      new_password: $new_password
    ) {
      gender
      user_id
      name
      token
      profile_id
      is_profile_added
      is_preference_added
      session_id
      error {
        status_code
        message
      }
    }
  }
`;

export const admin_login_query = gql`
  query login($username: String!, $password: String!) {
    admin_login: login(username: $username, password: $password) {
      user_id
      name
      token
      profile_id
      is_profile_added
      is_preference_added
      session_id
      district_id
      district {
        id
        name
      }
      roles {
        id
        name
      }
    }
  }
`;
