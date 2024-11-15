
import { ApolloClient, InMemoryCache } from "@apollo/client"

const uri = 'http://localhost:3000/'

export const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache()
})

// const searchAds = async (ad:string): Promise <Ad[]> => {
//     let data
//     client.query({
//         query: GET_ALL_ADS
//     })
//     .then((result) => data = result)
//     return data
// }