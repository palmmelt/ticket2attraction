import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

interface CartContextType {
  cartItems: cartItemsType[];
  addToCart: (item: any) => void;
  removeFromCart: (key: string) => void;
  manangeTicket: (id:string,action:boolean) => void;
  clearCart: () => void;
}

export type cartItemsType = {
  id: string;
  place: string;
  price: string;
  picture: string;
  information: string;
  amount?:number;
  key?: string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<cartItemsType[]>([]);

  useEffect(() => {
    const cartItemsFromCookie = Cookies.get("cartItems");
    if (cartItemsFromCookie) {
      const parsedCartItems = JSON.parse(cartItemsFromCookie);
      setCartItems(parsedCartItems);
    }
  }, []);

  const addToCart = (item: cartItemsType) => {
    const uuid = uuidv4();
    const checkCartList = cartItems.filter((cart) => cart.id === item.id).length > 0;
    if (checkCartList) {
      alert("There are already tickets in the cart.");
    } else {
      const newCartItems = [...cartItems, { ...item,amount:1,key: uuid }];
      setCartItems(newCartItems);
      Cookies.set("cartItems", JSON.stringify(newCartItems), { expires: 7 }); 
    }
  };

  const removeFromCart = (key: string) => {
    const newCartItems = cartItems.filter((x) => x.key !== key);
    setCartItems(newCartItems);
    Cookies.set("cartItems", JSON.stringify(newCartItems), { expires: 7 }); 
  };


  /**
   * @param {string} id id place ticket 
   * @param {boolean} action if acction == true amout function will increase the amount || if acction == false function will decrease the amount
   * @returns {void}
   * ? update this.cartItems
   */
  const manangeTicket = async (id:string,action:boolean) =>{
    try{
        const updatedCartItems = await cartItems.map((item) => {
            if (item.id === id) {
                if(action){
                    return { ...item, amount: item.amount && item.amount+1 }; 
                } else {
                    return { ...item, amount: item.amount && item.amount-1}; 
                }
            }
            return item;
          });
          
          const newCartItems = updatedCartItems.filter((x) => x.amount !== 0);
          setCartItems(newCartItems);
          Cookies.set("cartItems", JSON.stringify(newCartItems), { expires: 7 }); 
    } catch(error) {
        console.log(error)
    }
  }

  const clearCart = ():void =>{
    setCartItems([]);
    Cookies.remove('cartItems');
}

  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart ,manangeTicket,clearCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
