/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query BrowseAds {\n    browseAds {\n    id\n    title\n    description\n    owner\n    price\n    picture\n    location\n    createdAt\n    category {\n      id\n      name\n    }\n    tags {\n      id\n      name\n    }\n  }\n  }\n": types.BrowseAdsDocument,
    "\nquery GetAdById($id: String!) {\n  getAdById(id: $id) {\n    id\n    title\n    description\n    owner\n    price\n    picture\n    location\n    createdAt\n    category {\n      id\n      name\n    }\n    tags {\n      id\n      name\n    }\n  }\n}\n": types.GetAdByIdDocument,
    "\n  mutation DeleteAdById($id: String!) {\n  deleteAdById(id: $id)\n  }\n": types.DeleteAdByIdDocument,
    "\n  mutation createAd($data: AdInput!) {\n    createAd(data: $data) {\n      id\n    }\n  }\n": types.CreateAdDocument,
    "\n  mutation replaceAdById($data: AdInput!, $id: String!) {\n    replaceAdById(data: $data, id: $id) {\n      id\n    }\n  }\n": types.ReplaceAdByIdDocument,
    "\n  query GetAdsByCategory($id: String!) {\n    getAdsByCategory(id: $id) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      tags {\n        name\n        id\n      }\n    }\n  }\n": types.GetAdsByCategoryDocument,
    "\n    mutation Login($data: UserInput!) {\n        login(data: $data)\n    }\n": types.LoginDocument,
    "\n    query BrowseCategories {\n    browseCategories {\n      id\n      name\n    }\n  }\n": types.BrowseCategoriesDocument,
    "\n    query BrowseTags {\n    browseTags {\n      ads {\n        createdAt\n        description\n        id\n        location\n        owner\n        picture\n        price\n        title\n      }\n      name\n      id\n    }\n    }\n": types.BrowseTagsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query BrowseAds {\n    browseAds {\n    id\n    title\n    description\n    owner\n    price\n    picture\n    location\n    createdAt\n    category {\n      id\n      name\n    }\n    tags {\n      id\n      name\n    }\n  }\n  }\n"): (typeof documents)["\n  query BrowseAds {\n    browseAds {\n    id\n    title\n    description\n    owner\n    price\n    picture\n    location\n    createdAt\n    category {\n      id\n      name\n    }\n    tags {\n      id\n      name\n    }\n  }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetAdById($id: String!) {\n  getAdById(id: $id) {\n    id\n    title\n    description\n    owner\n    price\n    picture\n    location\n    createdAt\n    category {\n      id\n      name\n    }\n    tags {\n      id\n      name\n    }\n  }\n}\n"): (typeof documents)["\nquery GetAdById($id: String!) {\n  getAdById(id: $id) {\n    id\n    title\n    description\n    owner\n    price\n    picture\n    location\n    createdAt\n    category {\n      id\n      name\n    }\n    tags {\n      id\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteAdById($id: String!) {\n  deleteAdById(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteAdById($id: String!) {\n  deleteAdById(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createAd($data: AdInput!) {\n    createAd(data: $data) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createAd($data: AdInput!) {\n    createAd(data: $data) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation replaceAdById($data: AdInput!, $id: String!) {\n    replaceAdById(data: $data, id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation replaceAdById($data: AdInput!, $id: String!) {\n    replaceAdById(data: $data, id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAdsByCategory($id: String!) {\n    getAdsByCategory(id: $id) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      tags {\n        name\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAdsByCategory($id: String!) {\n    getAdsByCategory(id: $id) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      tags {\n        name\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation Login($data: UserInput!) {\n        login(data: $data)\n    }\n"): (typeof documents)["\n    mutation Login($data: UserInput!) {\n        login(data: $data)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query BrowseCategories {\n    browseCategories {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n    query BrowseCategories {\n    browseCategories {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query BrowseTags {\n    browseTags {\n      ads {\n        createdAt\n        description\n        id\n        location\n        owner\n        picture\n        price\n        title\n      }\n      name\n      id\n    }\n    }\n"): (typeof documents)["\n    query BrowseTags {\n    browseTags {\n      ads {\n        createdAt\n        description\n        id\n        location\n        owner\n        picture\n        price\n        title\n      }\n      name\n      id\n    }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;