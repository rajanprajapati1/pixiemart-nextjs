export const FetchCatgeory = async () => {
  try {
    const res = await fetch("/api/category", {
      method: "GET",
    });
    const data = await res?.json();
    return data?.category;
  } catch (error) {
    return error;
  }
};
export const FetchSubCatgeory = async () => {
  try {
    const res = await fetch("/api/category/subcategory", {
      method: "GET",
    });
    const data = await res?.json();
    return data?.category;
  } catch (error) {
    return error;
  }
};
export const FetchProduct = async (category) => {
  try {
    const res = await fetch(`/api/product?${category}`, {
      method: "GET"
    });
    const data = await res?.json();
    return data?.product;
  } catch (error) {
    return error;
  }
};
export const FetchSingleProduct = async (ProductId) => {
  try {
    const res = await fetch(`/api/product/${ProductId}`, {
      method: "GET"
    });
    const data = await res?.json();
    return data;
  } catch (error) {
    return error;
  }
};
export const FetchSpecificProduct = async (query,signal) => {
  try {
    const res = await fetch(`/api/product/featured?q=${query}`, {
      method: "GET" ,
      signal : signal
    });
    const data = await res?.json();
    return data?.product;
  } catch (error) {
    return error;
  }
};
export const FetchCart = async (userId) => {
  try {
    const res = await fetch(`/api/cart/${userId}`, {
      method: "GET"
    });
    const data = await res?.json();
    return data?.cart;
  } catch (error) {
    return error?.msg;
  }
};
export const FetchOrder = async (user) => {
  try {
    const res = await fetch(`/api/order/${user}`, {
      method: "GET"
    });
    const data = await res?.json();
    return data?.order;
  } catch (error) {
    return error?.msg;
  }
};
export const FetchSingleOrder = async (user,id) => {
  try {
    const res = await fetch(`/api/order/${user}/${id}`, {
      method: "GET"
    });
    const data = await res?.json();
    return data?.order;
  } catch (error) {
    return error?.msg;
  }
};
export const FetchWishlist = async (user,id) => {
  try {
    const res = await fetch(`/api/wishlist/${user}`, {
      method: "GET"
    });
    const data = await res?.json();
    return data?.item;
  } catch (error) {
    return error?.msg;
  }
};


