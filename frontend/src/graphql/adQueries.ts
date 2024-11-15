import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query BrowseAds {
    browseAds {
    id
    title
    description
    owner
    price
    picture
    location
    createdAt
    category {
      id
      name
    }
    tags {
      id
      name
    }
  }
  }
`

export const GET_AD_BY_ID = gql`
query GetAdById($id: String!) {
  getAdById(id: $id) {
    id
    title
    description
    owner
    price
    picture
    location
    createdAt
    category {
      id
      name
    }
    tags {
      id
      name
    }
  }
}
`

export const DELETE_AD_BY_ID = gql`
  mutation DeleteAdById($id: String!) {
  deleteAdById(id: $id)
  }
`