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
          date,
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

// Get all portfolio posts from Contentful
async function getAllPortfolioPosts() {

  const query = `
    {
      portfolioCollection {
        items {
          title,
          image {
            url
          },
          id,
          date,
          sys {
            id
          }
        }
      }
    }`;
  const response = await apiCall(query);
  const json = await response.json()
  return await json.data.portfolioCollection.items;
}

// Get a specific single blog post from Contentful
async function getSingleBlogPost(id) {
  const query = `
    query ($id: String!) {
        blogPost(id: $id) {
          title,
          longContent,
          id,
          date
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

// Get a specific single portfolio post from Contentful
async function getSinglePortfolioPost(id) {
  const query = `
    query ($id: String!) {
        portfolio(id: $id) {
          title,
          longContent,
          id,
          date,
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
  return await json.data.portfolio;
}

export const client = { getAllBlogPosts, getSingleBlogPost, getAllPortfolioPosts, getSinglePortfolioPost }