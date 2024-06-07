"use client";
import { useToast } from "@/components/ui/use-toast";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FetchCart } from "../configs/helper";
import { loadStripe } from "@stripe/stripe-js";

const PixieContext = createContext();

const PixieProvider = ({ children }) => {
  const { toast } = useToast();
  const [loading, SetLoading] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [LoggedUser, SetLoggedUser] = useState();
  const [cart, Setcart] = useState([]);
  const [order, setorder] = useState([]);
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON?.stringify(cart));
  // }, [cart]);
  // () => {
  //   if (typeof window !== "undefined") {
  //     const storedCart = localStorage.getItem("cart");
  //     try {
  //       const parsedCart = JSON.parse(storedCart);
  //       return Array.isArray(parsedCart) ? parsedCart : [];
  //     } catch (error) {
  //       console.error("Error parsing cart from localStorage", error);
  //       return [];
  //     }
  //   }
  //   return [];
  // }
  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        SetLoggedUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  const GetCartItems = useCallback(async () => {
    if (!LoggedUser) return;
    try {
      const data = await FetchCart(LoggedUser);
      if (data) {
        Setcart(data);
      }
    } catch (error) {
      console.error("Error fetching cart items", error);
    }
  }, [LoggedUser]);

  useEffect(() => {
    GetCartItems();
  }, [GetCartItems]);

  const EmptyCart = () => {
    localStorage.setItem("cart", []);
    Setcart([]);
  };
  const AddToCart = async (payload) => {
    try {
      const res = await fetch(`/api/cart`, {
        method: "POST",
        body: JSON.stringify({
          product: payload.product,
          quantity: payload.quantity,
          size: payload.size,
          color: payload.color,
          user: payload.user,
          quantity: payload?.quantity,
        }),
      });
      const data = await res.json();
      GetCartItems();
      console.log(data);
      if (res.status === 409) {
        toast({ title: data?.msg });
      }
      if (res.status === 401) {
        toast({ title: data?.msg });
      } else {
        toast({ title: data?.msg });
      }
    } catch (error) {}
  };
  const onRemove = async (ProductId, userId) => {
    //
    try {
      const res = await fetch(`/api/cart/${userId}`, {
        method: "DELETE",
        body: JSON.stringify({ itemId: ProductId }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 409) {
        toast({ title: data?.msg });
      }
      if (res.status === 401) {
        toast({ title: data?.msg });
      } else {
        GetCartItems();
        toast({ title: data?.msg });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onUpdateQuantity = async (CartId, product, newquantity, user) => {
    try {
      const res = await fetch(`/api/cart/${user || LoggedUser}`, {
        method: "PUT",
        body: JSON.stringify({
          itemId: CartId,
          productId: product,
          quantity: newquantity,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 409) {
        toast({ title: data?.msg });
      }
      if (res.status === 401) {
        toast({ title: data?.msg });
      } else {
        GetCartItems();
        toast({ title: data?.msg });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AddProducttoWishlist = async (payload) => {
    try {
      const res = await fetch(`/api/wishlist`, {
        method: "POST",
        body: JSON.stringify({
          user: payload.user,
          productId: payload.productId,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 409) {
        toast({ title: data?.msg });
      }
      if (res.status === 401) {
        toast({ title: data?.msg });
      } else {
        toast({ title: data?.msg });
      }
    } catch (error) {
      toast({ title: "FAILED TO PRODUCT IN WISHLIST !!" });
    }
  };
  const Checkout = async (payload) => {
    SetLoading(true);
    const stripe = await loadStripe("pk_test_51NkhTqSBY0hxZ5lMDhRqhjZ1tqaXyfMCTq40vzkQuvoxh1OqwAZUmeCSHvkKl4l1mQ2mQEdJBEqsnUKLqlqg6QMT002ewNTI1t");
    try {
      const res = await fetch(`/api/checkout-stripe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload,
        }),
      });
      const session = await res.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session?.id,
      });
      EmptyCart();
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false);
    }
  };

  const totalofCart = useMemo(() => {
    if (cart.length <= 0) {
      return 0;
    }
    return cart.reduce((total, item) => {
      const itemPrice = parseFloat(item?.product?.finalPrice);
      const itemQuantity = parseInt(item?.quantity);
      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        const itemTotal = itemPrice * itemQuantity;
        return total + itemTotal;
      } else {
        console.warn("Invalid price or quantity for item:", item);
        return total;
      }
    }, 0);
  }, [cart]);

  const Data = {
    cart,
    Setcart,
    AddToCart,
    onRemove,
    onUpdateQuantity,
    totalofCart,
    order,
    Checkout,
    setorder,
    GetCartItems,
    LoggedUser,
    SetLoggedUser,
    loading,
    SetLoading,
    AddProducttoWishlist,
    wishlistItems,
    setWishlistItems,
  };
  return <PixieContext.Provider value={Data}>{children}</PixieContext.Provider>;
};
const UsePixie = () => {
  const context = useContext(PixieContext);

  if (!context) {
    throw new Error("usePixie must be used within a PixieProvider");
  }

  return context;
};

export { PixieProvider, UsePixie };
