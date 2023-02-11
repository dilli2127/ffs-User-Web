import { gql } from "@apollo/client";

export const get_all_products_query = gql`
 query {
  get_all_products:getAllProducts {
    items {
      id
      name
      description
      stock_keeping_unit
      icon
      banner_image
      gallery
      is_deleted
      created_at
      updated_at
      category {
        parent_category_id
        sub_categories {
          products {
            name
          }
        }
      }
      vendor_products {
        id
        vendor_id
        product_id
        icon
        banner_image
        gallery
        is_deleted
        vendor_product_variants {
          id
          name
          description
          vendor_product_id
          product_tax_id
          stock_keeping_unit
          base_price
          stock_count
          value
          time_to_ship
          discount
          gallery
          created_at
          updated_at
          is_approved
          selling_price
          vendor_product {
            vendor {
              id
              name
              contact_person_name
              description
              logo
              contact_number
              vendor_address {
                door_no
                mobile_no
                address_line1
                address_line2
                title
                city
                state_id
                country_id
                zipcode
                country {
                  states {
                    districts {
                      state {
                        name
                      }
                    }
                  }
                }
              }
              customer_order_line_items {
                customer_order_id
                vendor_id
                vendor_product_variant_id
                amount
                quantity
                status
              }
            }
          }
        }
      }
    }
  }
}

`;
