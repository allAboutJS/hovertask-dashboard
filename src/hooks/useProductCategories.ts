import { useDispatch, useSelector } from "react-redux";
import { ProductStore } from "../../types";
import { setCategories } from "../redux/slices/products";
import { useEffect } from "react";
import getProductsCategories from "../utils/getProductsCategories";
import { toast } from "sonner";

export default function useProductCategories() {
  const categories = useSelector<any, ProductStore["categories"]>((state: any) => state.products.categories);
  const dispatch = useDispatch();

  function refresh() {
    dispatch(setCategories(null));
    getProductsCategories()
      .then((categories) => dispatch(setCategories(categories)))
      .catch(() => (toast.error("Error while getting products categories."), dispatch(setCategories(false))));
  }

  useEffect(() => {
    if (categories === null) {
      refresh();
    }
  }, []);

  return { categories, refresh };
}
