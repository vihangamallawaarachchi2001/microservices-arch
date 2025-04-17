
export const getToken = async (): Promise<string | null> => {
    return localStorage.getItem('authToken');
  };
  
  export const setToken = async (token: string): Promise<void> => {
    localStorage.setItem('authToken', token);
  };
  
  export const clearToken = async (): Promise<void> => {
    localStorage.removeItem('authToken');
  };

const getCartFromStorage = (): any[] => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };
  
  export const getCart = async (): Promise<any[]> => {
    return getCartFromStorage();
  };
  
  export const addToCart = async (item: any): Promise<void> => {
    const cart = getCartFromStorage();
  
    const existingItemIndex = cart.findIndex((cartItem: any) => cartItem._id === item._id);
  
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  export const removeFromCart = async (itemId: string): Promise<void> => {
    const cart = getCartFromStorage();
  
    const updatedCart = cart.filter((item: any) => item.id !== itemId);
  
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  export const updateCartItemQuantity = async (itemId: string, quantity: number): Promise<void> => {
    const cart = getCartFromStorage();
  
    const existingItemIndex = cart.findIndex((item: any) => item.id === itemId);
  
    if (existingItemIndex !== -1) {
      if (quantity > 0) {
        cart[existingItemIndex].quantity = quantity;
      } else {
        cart.splice(existingItemIndex, 1);
      }
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  export const clearCart = async (): Promise<void> => {
    localStorage.removeItem('cart');
  };