import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      title
      date
      updatedAt
      slug
      icon
    }
  }
`

export const GET_POST = gql`
  query getPost($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      tag {
        tagName
        tagSlug
      }
      slug
      content
      date
      updatedAt
      description
      keywords
      tableofcontent
    }
  }
`

export const GET_TAGS = gql`
  query getTags {
    tags {
      tagName
      tagSlug
    }
  }
`

export const GET_POSTS_BY_TAG_NAME = gql`
  query getPostsByTagName($tag: String!) {
    posts(where: { tag_some: { AND: { tagSlug: $tag } } }) {
      id
      title
      date
      updatedAt
      slug
    }
    tags(where: { AND: { tagSlug: $tag } }) {
      tagName
      tagSlug
    }
  }
`
