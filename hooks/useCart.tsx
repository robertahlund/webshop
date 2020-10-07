import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../slices";
import { ICartItem } from "../types/types";

const useCart = (): [ICartItem[], string] => {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [cartSum, setCartSum] = useState<string>("");

  const reduxCart: ICartItem[] = useSelector((state: RootState) => state.cart);

  const reduxCartSum: string = useMemo(() => {
    return parseFloat(
      String(
        reduxCart.reduce(
          (accumulator: number, currentValue: ICartItem) =>
            accumulator + Number(currentValue.price),
          0
        )
      )
    ).toFixed(2);
  }, [reduxCart]);

  useEffect(() => {
    setCart(reduxCart);
    setCartSum(reduxCartSum);
  }, [reduxCart, reduxCartSum]);

  return [cart, cartSum];
};

export default useCart;
