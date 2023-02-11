import { gql } from "@apollo/client";

export const get_roles_query = gql`
  query getRoles {
    roles: getRoles {
      items {
        id
        name
      }
    }
  }
`;

export const create_role_mutation = gql`
  mutation createRole($data: role_input) {
    create_role: createRole(data: $data) {
      id
      status
      error {
        message
      }
    }
  }
`;

export const update_role_mutation = gql`
  mutation updateRole($id: String!, $data: role_input) {
    update_role: updateRole(id: $id, data: $data) {
      id
      status
      error {
        message
      }
    }
  }
`;

export const delete_role_mutation = gql`
  mutation deleteRole($id: String!) {
    delete_role: deleteRole(id: $id) {
      id
      status
      error {
        message
      }
    }
  }
`;

export const get_ui_modules_query = gql`
  query getUiModules {
    pages: getUiModules {
      items {
        id
        name
      }
    }
  }
`;

export const create_ui_module_mutation = gql`
  mutation createUiModule($data: ui_module_input) {
    create_page: createUiModule(data: $data) {
      id
      status
      error {
        message
      }
    }
  }
`;

export const update_ui_module_mutation = gql`
  mutation updateUiModule($id: String!, $data: ui_module_input) {
    update_page: updateUiModule(id: $id, data: $data) {
      id
      status
      error {
        message
      }
    }
  }
`;

export const delete_ui_module_mutation = gql`
  mutation deleteUiModule($id: String!) {
    delete_page: deleteUiModule(id: $id) {
      id
      status
      error {
        message
      }
    }
  }
`;
