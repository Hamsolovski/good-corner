import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  category: Category;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  location: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
};

export type AdInput = {
  category: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  tags: Array<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  ads: Array<Ad>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAd: Ad;
  deleteAdById: Scalars['Boolean']['output'];
  replaceAdById: Ad;
};


export type MutationCreateAdArgs = {
  data: AdInput;
};


export type MutationDeleteAdByIdArgs = {
  id: Scalars['String']['input'];
};


export type MutationReplaceAdByIdArgs = {
  data: AdInput;
  id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  browseAds: Array<Ad>;
  browseCategories: Array<Category>;
  browseTags: Array<Tag>;
  getAdById: Ad;
  getAdsByCategory: Array<Ad>;
};


export type QueryGetAdByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetAdsByCategoryArgs = {
  id: Scalars['String']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  ads: Array<Ad>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type BrowseAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type BrowseAdsQuery = { __typename?: 'Query', browseAds: Array<{ __typename?: 'Ad', id: string, title: string, description: string, owner: string, price: number, picture: string, location: string, createdAt: any, category: { __typename?: 'Category', id: string, name: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string }> }> };

export type GetAdByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAdByIdQuery = { __typename?: 'Query', getAdById: { __typename?: 'Ad', id: string, title: string, description: string, owner: string, price: number, picture: string, location: string, createdAt: any, category: { __typename?: 'Category', id: string, name: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string }> } };

export type DeleteAdByIdMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteAdByIdMutation = { __typename?: 'Mutation', deleteAdById: boolean };

export type CreateAdMutationVariables = Exact<{
  data: AdInput;
}>;


export type CreateAdMutation = { __typename?: 'Mutation', createAd: { __typename?: 'Ad', id: string } };

export type ReplaceAdByIdMutationVariables = Exact<{
  data: AdInput;
  id: Scalars['String']['input'];
}>;


export type ReplaceAdByIdMutation = { __typename?: 'Mutation', replaceAdById: { __typename?: 'Ad', id: string } };

export type GetAdsByCategoryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAdsByCategoryQuery = { __typename?: 'Query', getAdsByCategory: Array<{ __typename?: 'Ad', id: string, title: string, description: string, owner: string, price: number, picture: string, location: string, createdAt: any, tags: Array<{ __typename?: 'Tag', name: string, id: number }> }> };

export type BrowseCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type BrowseCategoriesQuery = { __typename?: 'Query', browseCategories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type BrowseTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type BrowseTagsQuery = { __typename?: 'Query', browseTags: Array<{ __typename?: 'Tag', name: string, id: number, ads: Array<{ __typename?: 'Ad', createdAt: any, description: string, id: string, location: string, owner: string, picture: string, price: number, title: string }> }> };


export const BrowseAdsDocument = gql`
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
    `;

/**
 * __useBrowseAdsQuery__
 *
 * To run a query within a React component, call `useBrowseAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrowseAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrowseAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBrowseAdsQuery(baseOptions?: Apollo.QueryHookOptions<BrowseAdsQuery, BrowseAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BrowseAdsQuery, BrowseAdsQueryVariables>(BrowseAdsDocument, options);
      }
export function useBrowseAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrowseAdsQuery, BrowseAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BrowseAdsQuery, BrowseAdsQueryVariables>(BrowseAdsDocument, options);
        }
export function useBrowseAdsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BrowseAdsQuery, BrowseAdsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BrowseAdsQuery, BrowseAdsQueryVariables>(BrowseAdsDocument, options);
        }
export type BrowseAdsQueryHookResult = ReturnType<typeof useBrowseAdsQuery>;
export type BrowseAdsLazyQueryHookResult = ReturnType<typeof useBrowseAdsLazyQuery>;
export type BrowseAdsSuspenseQueryHookResult = ReturnType<typeof useBrowseAdsSuspenseQuery>;
export type BrowseAdsQueryResult = Apollo.QueryResult<BrowseAdsQuery, BrowseAdsQueryVariables>;
export const GetAdByIdDocument = gql`
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
    `;

/**
 * __useGetAdByIdQuery__
 *
 * To run a query within a React component, call `useGetAdByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAdByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables> & ({ variables: GetAdByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
      }
export function useGetAdByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export function useGetAdByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export type GetAdByIdQueryHookResult = ReturnType<typeof useGetAdByIdQuery>;
export type GetAdByIdLazyQueryHookResult = ReturnType<typeof useGetAdByIdLazyQuery>;
export type GetAdByIdSuspenseQueryHookResult = ReturnType<typeof useGetAdByIdSuspenseQuery>;
export type GetAdByIdQueryResult = Apollo.QueryResult<GetAdByIdQuery, GetAdByIdQueryVariables>;
export const DeleteAdByIdDocument = gql`
    mutation DeleteAdById($id: String!) {
  deleteAdById(id: $id)
}
    `;
export type DeleteAdByIdMutationFn = Apollo.MutationFunction<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>;

/**
 * __useDeleteAdByIdMutation__
 *
 * To run a mutation, you first call `useDeleteAdByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdByIdMutation, { data, loading, error }] = useDeleteAdByIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAdByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>(DeleteAdByIdDocument, options);
      }
export type DeleteAdByIdMutationHookResult = ReturnType<typeof useDeleteAdByIdMutation>;
export type DeleteAdByIdMutationResult = Apollo.MutationResult<DeleteAdByIdMutation>;
export type DeleteAdByIdMutationOptions = Apollo.BaseMutationOptions<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>;
export const CreateAdDocument = gql`
    mutation createAd($data: AdInput!) {
  createAd(data: $data) {
    id
  }
}
    `;
export type CreateAdMutationFn = Apollo.MutationFunction<CreateAdMutation, CreateAdMutationVariables>;

/**
 * __useCreateAdMutation__
 *
 * To run a mutation, you first call `useCreateAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdMutation, { data, loading, error }] = useCreateAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAdMutation(baseOptions?: Apollo.MutationHookOptions<CreateAdMutation, CreateAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAdMutation, CreateAdMutationVariables>(CreateAdDocument, options);
      }
export type CreateAdMutationHookResult = ReturnType<typeof useCreateAdMutation>;
export type CreateAdMutationResult = Apollo.MutationResult<CreateAdMutation>;
export type CreateAdMutationOptions = Apollo.BaseMutationOptions<CreateAdMutation, CreateAdMutationVariables>;
export const ReplaceAdByIdDocument = gql`
    mutation replaceAdById($data: AdInput!, $id: String!) {
  replaceAdById(data: $data, id: $id) {
    id
  }
}
    `;
export type ReplaceAdByIdMutationFn = Apollo.MutationFunction<ReplaceAdByIdMutation, ReplaceAdByIdMutationVariables>;

/**
 * __useReplaceAdByIdMutation__
 *
 * To run a mutation, you first call `useReplaceAdByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplaceAdByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replaceAdByIdMutation, { data, loading, error }] = useReplaceAdByIdMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReplaceAdByIdMutation(baseOptions?: Apollo.MutationHookOptions<ReplaceAdByIdMutation, ReplaceAdByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReplaceAdByIdMutation, ReplaceAdByIdMutationVariables>(ReplaceAdByIdDocument, options);
      }
export type ReplaceAdByIdMutationHookResult = ReturnType<typeof useReplaceAdByIdMutation>;
export type ReplaceAdByIdMutationResult = Apollo.MutationResult<ReplaceAdByIdMutation>;
export type ReplaceAdByIdMutationOptions = Apollo.BaseMutationOptions<ReplaceAdByIdMutation, ReplaceAdByIdMutationVariables>;
export const GetAdsByCategoryDocument = gql`
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
    `;

/**
 * __useGetAdsByCategoryQuery__
 *
 * To run a query within a React component, call `useGetAdsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdsByCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAdsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables> & ({ variables: GetAdsByCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>(GetAdsByCategoryDocument, options);
      }
export function useGetAdsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>(GetAdsByCategoryDocument, options);
        }
export function useGetAdsByCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>(GetAdsByCategoryDocument, options);
        }
export type GetAdsByCategoryQueryHookResult = ReturnType<typeof useGetAdsByCategoryQuery>;
export type GetAdsByCategoryLazyQueryHookResult = ReturnType<typeof useGetAdsByCategoryLazyQuery>;
export type GetAdsByCategorySuspenseQueryHookResult = ReturnType<typeof useGetAdsByCategorySuspenseQuery>;
export type GetAdsByCategoryQueryResult = Apollo.QueryResult<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>;
export const BrowseCategoriesDocument = gql`
    query BrowseCategories {
  browseCategories {
    id
    name
  }
}
    `;

/**
 * __useBrowseCategoriesQuery__
 *
 * To run a query within a React component, call `useBrowseCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrowseCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrowseCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useBrowseCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<BrowseCategoriesQuery, BrowseCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BrowseCategoriesQuery, BrowseCategoriesQueryVariables>(BrowseCategoriesDocument, options);
      }
export function useBrowseCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrowseCategoriesQuery, BrowseCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BrowseCategoriesQuery, BrowseCategoriesQueryVariables>(BrowseCategoriesDocument, options);
        }
export function useBrowseCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BrowseCategoriesQuery, BrowseCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BrowseCategoriesQuery, BrowseCategoriesQueryVariables>(BrowseCategoriesDocument, options);
        }
export type BrowseCategoriesQueryHookResult = ReturnType<typeof useBrowseCategoriesQuery>;
export type BrowseCategoriesLazyQueryHookResult = ReturnType<typeof useBrowseCategoriesLazyQuery>;
export type BrowseCategoriesSuspenseQueryHookResult = ReturnType<typeof useBrowseCategoriesSuspenseQuery>;
export type BrowseCategoriesQueryResult = Apollo.QueryResult<BrowseCategoriesQuery, BrowseCategoriesQueryVariables>;
export const BrowseTagsDocument = gql`
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
    `;

/**
 * __useBrowseTagsQuery__
 *
 * To run a query within a React component, call `useBrowseTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrowseTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrowseTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBrowseTagsQuery(baseOptions?: Apollo.QueryHookOptions<BrowseTagsQuery, BrowseTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BrowseTagsQuery, BrowseTagsQueryVariables>(BrowseTagsDocument, options);
      }
export function useBrowseTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrowseTagsQuery, BrowseTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BrowseTagsQuery, BrowseTagsQueryVariables>(BrowseTagsDocument, options);
        }
export function useBrowseTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BrowseTagsQuery, BrowseTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BrowseTagsQuery, BrowseTagsQueryVariables>(BrowseTagsDocument, options);
        }
export type BrowseTagsQueryHookResult = ReturnType<typeof useBrowseTagsQuery>;
export type BrowseTagsLazyQueryHookResult = ReturnType<typeof useBrowseTagsLazyQuery>;
export type BrowseTagsSuspenseQueryHookResult = ReturnType<typeof useBrowseTagsSuspenseQuery>;
export type BrowseTagsQueryResult = Apollo.QueryResult<BrowseTagsQuery, BrowseTagsQueryVariables>;