import { useDispatch, useSelector } from "react-redux";
import { ProductStore } from "../../types";
import { setCategories } from "../redux/slices/products";
import { useEffect } from "react";
import getProductsCategories from "../utils/getProductsCategories";
import { toast } from "sonner";

export default function useProductCategories(options?: { refresh?: boolean }) {
  const categories = useSelector<any, ProductStore["categories"]>((state: any) => state.products.categories);
  const dispatch = useDispatch();

  if (options?.refresh) dispatch(setCategories(null));

  useEffect(() => {
    if (!categories) {
      (function getCategories() {
        getProductsCategories()
          .then((categories) => dispatch(setCategories(categories)))
          .catch(() => (toast.error("Error while getting products categories. Retry..."), getCategories()));
      })();
    }
  }, [categories]);

  return categories;
}
