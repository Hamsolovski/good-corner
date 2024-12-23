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

export const CREATE_AD = gql`
  mutation createAd($data: AdInput!) {
    createAd(data: $data) {
      id
    }
  }
`
export const EDIT_AD_BY_ID = gql`
  mutation replaceAdById($data: AdInput!, $id: String!) {
    replaceAdById(data: $data, id: $id) {
      id
    }
  }
`

export const GET_ADS_BY_CATEGORY = gql`
  query GetAdsByCategory($id: String!) {
    getAdsByCategory(id: $id) {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
      tags {
        name
        id
      }
    }
  }
`