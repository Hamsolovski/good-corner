import { gql } from "@apollo/client";

const GET_ALL_TAGS = gql`
    query BrowseTags {
    browseTags {
      ads {
        createdAt
        description
        id
        location
        owner
        picture
        price
        title
      }
      name
      id
    }
    }
`

export default GET_ALL_TAGS