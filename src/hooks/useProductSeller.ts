import { useEffect, useState } from "react";
import apiEndpointBaseURL from "../utils/apiEndpointBaseURL";
import { AuthUserDAO } from "../../types";

const sellersCache = new Map<string, AuthUserDAO>();

export default function useSeller(productId: string) {
  const [seller, setSeller] = useState<AuthUserDAO | null>(sellersCache.get(productId) || null);

  useEffect(() => {
    console.log(seller);

    if (!seller) {
      (function fetchSellerInfo() {
        fetch(apiEndpointBaseURL + "/products/contact-seller/" + productId, {
          headers: { authorization: `Bearer ${localStorage.getItem("auth_token")}` },
          method: "post"
        })
          .then((response) => response.json())
          .then((data) => (setSeller(data.user), sellersCache.set(productId, data.user)))
          .catch(fetchSellerInfo);
      })();
    }
  }, [productId, seller]);

  return seller;
}
