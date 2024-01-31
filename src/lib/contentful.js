const SPACE = import.meta.env.CONTENTFUL_SPACE_ID
const TOKEN = import.meta.env.CONTENTFUL_DELIVERY_TOKEN

async function apiCall(query, variables) {
  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/master`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  }
  return await fetch(fetchUrl, options)
}

// Get all blog posts from Contentful
async function getAllBlogPosts() {

  const query = `
    {
      blogPostCollection {
        items {
          title,
          image {
            url
          },
          id,
          sys {
            id
          }
        }
      }
    }`;
  const response = await apiCall(query);
  const json = await response.json()
  return await json.data.blogPostCollection.items;
}

// Get a specific single blog post from Contentful
async function getSinglePost(id) {
  const query = `
    query ($id: String!) {
        blogPost(id: $id) {
          title,
          longContent,
          id,
          image {
            url
          }
          sys {
            id
          }
        }
      }
    `;
  const variables = {
    id: id
  };
  const response = await apiCall(query, variables);
  const json = await response.json();
  return await json.data.blogPost;
}

export const client = { getAllBlogPosts, getSinglePost }