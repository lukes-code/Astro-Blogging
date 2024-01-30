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

async function getAllBooks() {

  const query = `
    {
        bookReferencePageCollection {
          items {
            sys {
                id
            }
            title
            author {
              name
            }
            coverImage {
              url
            }
          }
        }
      }`;
  const response = await apiCall(query);
  const json = await response.json()
  return await json.data.bookReferencePageCollection.items;
}

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

async function getSingleBook(id) {
  const query = `
    query ($id: String!) {
        bookReferencePage(id: $id) {
          title
          coverImage {
            url
          }
          description {
            json
          }
          author {
            sys {
              id
            }
            name
          }
        }
      }
    `;
  const variables = {
    id: id
  };
  const response = await apiCall(query, variables);
  const json = await response.json();
  return await json.data.bookReferencePage
}

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


async function getAuthor(id) {
  const query = `
    query ($id: String!) {
      bookAuthor(id:$id) {
        name
        avatar {
          url
          description
        }
        bio {
          json
        }
        linkedFrom {
          bookReferencePageCollection {
            items {
              title
            }
          }
        }
      }
    }
    `;
  const variables = {
    id: id
  };
  const response = await apiCall(query, variables);
  const json = await response.json();
  return await json.data.bookAuthor
}

export const client = { getAllBooks, getAllBlogPosts, getSinglePost, getSingleBook, getAuthor }