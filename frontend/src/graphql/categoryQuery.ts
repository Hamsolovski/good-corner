import { gql } from "@apollo/client";

const GET_ALL_CATEGORIES = gql`
    query BrowseCategories {
    browseCategories {
      id
      name
    }
  }
`

export default GET_ALL_CATEGORIES