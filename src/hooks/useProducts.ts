import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../types";
import { useEffect } from "react";
import getProducts from "../utils/getProducts";
import { setProducts } from "../redux/slices/products";

export default function useProducts(options?: { refresh: boolean }) {
  const products = useSelector<any, Product[] | null>((state: any) => state.products.value);
  const authUserId = useSelector<any, string>((state: any) => state.auth.value.id);
  const dispatch = useDispatch();

  if (options?.refresh) dispatch(setProducts(null));

  useEffect(() => {
    if (!products) {
      getProducts()
        .then((products) => dispatch(setProducts(products)))
        .catch(getProducts);
    }
  }, [products]);

  return products?.filter((product) => product.user_id != authUserId);
}
