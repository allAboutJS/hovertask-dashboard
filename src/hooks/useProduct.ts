import { useEffect, useState } from "react";
import { Product } from "../../types";
import apiEndpointBaseURL from "../utils/apiEndpointBaseURL";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import useProducts from "./useProducts";

const productsCache = new Map<string, Product>();

export default function useProduct(id: string): Product | null {
  const { products } = useProducts();
  const [product, setProduct] = useState<Product | null>(productsCache.get(id) || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!product) {
      (function () {
        fetch(apiEndpointBaseURL + `/products/show-product/${id}`, {
          headers: { authorization: `Bearer ${localStorage.getItem("auth_token")}` }
        })
          .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
          })
          .then((data: any) => {
            if (!data.success) {
              toast.error("The product you're looking for does not exist, or has been removed");
              navigate("/marketplace");
            } else {
              productsCache.set(id, data.product);
              setProduct(data.product);
            }
          })
          .catch(
            () => (
              toast.error("The product you're looking for does not exist, or has been removed"),
              navigate("/marketplace")
            )
          );
      })();
    }
  }, [product, products]);

  return product;
}
