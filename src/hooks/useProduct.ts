import { useEffect, useState } from "react";
import { Product } from "../../types";
import { useSelector } from "react-redux";
import apiEndpointBaseURL from "../utils/apiEndpointBaseURL";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function useProduct(id: string): Product | null {
  const products = useSelector<any, Product[]>((state: any) => state.products.value);
  const [product, setProduct] = useState<Product | undefined>(products.find((product) => product.id.toString() == id));
  const navigate = useNavigate();

  useEffect(() => {
    if (product === undefined) {
      (function fetchProduct() {
        fetch(apiEndpointBaseURL + `/products/show-product/${id}`, {
          headers: { authorization: `Bearer ${localStorage.getItem("auth_token")}` }
        })
          .then((response) => response.json())
          .then((data: any) => {
            if (!data.success) {
              toast.error("The product you're looking for does not exist, or has been removed");
              navigate("/marketplace");
            } else setProduct(data.data);
          })
          .catch((err: any) => (toast.error(err.message), fetchProduct()));
      })();
    }
  }, [product]);

  return product || null;
}
