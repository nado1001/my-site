import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      title
      date
      tags
      updatedAt
      slug
    }
  }
`
export const GET_POST = gql`
  query getPost($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      tags
      slug
      content {
        html
      }
      updatedAt
      seo {
        title
        description
        keywords
      }
    }
  }
`
