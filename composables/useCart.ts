import { ONE_WEEK_IN_SECONDS, UNIT } from "~/constants";

type CartItem = {
  id: number;
  quantity: number;
  price: number;
};

export const useCart = () => {
  const cart = useCookie<CartItem[]>("cart", {
    default: () => [],
    watch: true,
    maxAge: ONE_WEEK_IN_SECONDS,
  });

  const addToCart = (id: number, price: number, quantity: number = 1) => {
    const currentCart = [...cart.value];
    const existingItemIndex = currentCart.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += quantity;
      currentCart[existingItemIndex].price = price;
    } else {
      currentCart.push({ id, quantity, price });
    }

    cart.value = currentCart;
  };

  const removeFromCart = (id: number, quantity: number = 1) => {
    const currentCart = [...cart.value];
    const existingItemIndex = currentCart.findIndex((item) => item.id === id);

    if (existingItemIndex !== -UNIT) {
      if (currentCart[existingItemIndex].quantity <= quantity) {
        currentCart.splice(existingItemIndex, UNIT);
      } else {
        currentCart[existingItemIndex].quantity -= quantity;
      }

      cart.value = currentCart;
    }
  };

  const clearCart = () => {
    cart.value = [];
  };

  const totalPrice = computed(() => {
    const total = cart.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return parseFloat(total.toFixed(2));
  });

  const totalItems = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalPrice,
    totalItems,
  };
};
