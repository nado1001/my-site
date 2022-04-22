import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query getPosts($stage: Stage! = PUBLISHED) {
    posts(stage: $stage, orderBy: createdAt_DESC) {
      id
      title
      description
      date
      updatedAt
      slug
      icon
    }
  }
`

export const GET_POST = gql`
  query getPost($slug: String!, $stage: Stage! = PUBLISHED) {
    post(where: { slug: $slug }, stage: $stage) {
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
  query getTags($stage: Stage! = PUBLISHED) {
    tags(stage: $stage, orderBy: createdAt_DESC) {
      tagName
      tagSlug
    }
  }
`

export const GET_POSTS_BY_TAG_NAME = gql`
  query getPostsByTagName($tag: String!, $stage: Stage! = PUBLISHED) {
    posts(where: { tag_some: { AND: { tagSlug: $tag } } }, stage: $stage) {
      id
      title
      date
      updatedAt
      slug
      icon
    }
    tags(where: { AND: { tagSlug: $tag } }, stage: $stage) {
      tagName
      tagSlug
    }
  }
`
