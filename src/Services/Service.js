export const GetAllProducts = (payload) => {
  const endpoint = `https://dummyjson.com/products?limit=${payload.limit}&skip=${payload.skip}`;
  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then((data) => data.json())
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e.error.message || "Something went wrong please try again!!");
      });
  });
};

export const GetAllCategories = (payload) => {
  const endpoint = `https://dummyjson.com/products/categories`;
  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then((data) => data.json())
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e.error.message || "Something went wrong please try again!!");
      });
  });
};

export const GetProductsByCategory = (payload) => {
  const endpoint = `https://dummyjson.com/products/category/${payload.category}?limit=${payload.limit}&skip=${payload.skip}`;
  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then((data) => data.json())
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e.error.message || "Something went wrong please try again!!");
      });
  });
};

export const GetProductsBySearchQuery = (payload) => {
  const endpoint = `https://dummyjson.com/products/search/?limit=${payload.limit}&skip=${payload.skip}&q=${payload.search}`;
  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then((data) => data.json())
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e.error.message || "Something went wrong please try again!!");
      });
  });
};

export const AddNewProduct = (payload) => {
  const endpoint = `https://dummyjson.com/products/add`;
  return new Promise((resolve, reject) => {
    fetch(endpoint,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((data) => data.json())
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e.error.message || "Something went wrong please try again!!");
      });
  });
};

export const UpdateProduct = (payload, productID) => {
  const endpoint = `https://dummyjson.com/products/${productID}`;
  return new Promise((resolve, reject) => {
    fetch(endpoint,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((data) => data.json())
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e.error.message || "Something went wrong please try again!!");
      });
  });
};

export const DeleteProduct = (productID) => {
  const endpoint = `https://dummyjson.com/products/${productID}`;
  return new Promise((resolve, reject) => {
    fetch(endpoint,{
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((data) => data.json())
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e.error.message || "Something went wrong please try again!!");
      });
  });
};

export const GetProductByID = (productID) => {
  const endpoint = `https://dummyjson.com/products/${productID}`;
  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then((data) => data.json())
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e.error.message || "Something went wrong please try again!!");
      });
  });
};