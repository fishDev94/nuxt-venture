import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCart } from "~/composables/useCart";

const mockUseCookie = vi.fn(() => {
  let cartItems = [];
  return {
    get value() {
      return cartItems;
    },
    set value(newItems) {
      cartItems = [...newItems];
    },
    watch: true,
    maxAge: 604800,
  };
});

vi.mock("#app", () => ({
  useCookie: mockUseCookie,
}));

vi.mock("~/constants", () => ({
  ONE_WEEK_IN_SECONDS: 604800,
  UNIT: 1,
}));

describe("useCart", () => {
  beforeEach(() => {
    const mockInstance = mockUseCookie.mock.results[0]?.value;
    if (mockInstance) {
      mockInstance.value = [];
    }
  });

  it("should init with empty cart", () => {
    const { cart, totalItems, totalPrice } = useCart();

    expect(cart.value).toEqual([]);
    expect(totalItems.value).toBe(0);
    expect(totalPrice.value).toBe(0);
  });

  it("should add a product in cart", () => {
    const { addToCart, cart, totalItems, totalPrice } = useCart();

    addToCart(1, 10.99);

    expect(cart.value).toEqual([{ id: 1, quantity: 1, price: 10.99 }]);
    expect(totalItems.value).toBe(1);
    expect(totalPrice.value).toBe(10.99);
  });

  it("should update quantity of existent product", () => {
    const { addToCart, clearCart, cart, totalItems, totalPrice } = useCart();

    clearCart();

    addToCart(1, 10.99);
    addToCart(1, 10.99, 2);

    expect(cart.value).toEqual([{ id: 1, quantity: 3, price: 10.99 }]);
    expect(totalItems.value).toBe(3);
    expect(totalPrice.value).toBe(32.97);
  });

  it("should remove a product from cart", () => {
    const { addToCart, removeFromCart, clearCart, cart } = useCart();

    clearCart();

    addToCart(1, 10.99, 2);
    removeFromCart(1, 1);

    expect(cart.value).toEqual([{ id: 1, quantity: 1, price: 10.99 }]);
  });

  it("should remove the object if the quanity is 0", () => {
    const { addToCart, clearCart, removeFromCart, cart } = useCart();

    clearCart();

    addToCart(1, 10.99);
    removeFromCart(1);

    expect(cart.value).toEqual([]);
  });

  it("should calculate correctly the price", () => {
    const { addToCart, clearCart, totalPrice } = useCart();

    clearCart();

    addToCart(1, 10.99, 2);
    addToCart(2, 5.5, 3);

    expect(totalPrice.value).toBe(38.48);
  });

  it("should clear all cart", () => {
    const { addToCart, clearCart, cart } = useCart();

    clearCart();

    addToCart(1, 10.99);
    addToCart(2, 5.5);
    clearCart();

    expect(cart.value).toEqual([]);
  });
});
