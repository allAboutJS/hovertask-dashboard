import apiEndpointBaseURL from "./apiEndpointBaseURL";

export default async function getProductsCategories() {
  return await (
    await (
      await fetch(apiEndpointBaseURL + "/categories/all-categories", {
        headers: { authorization: `Bearer ${localStorage.getItem("auth_token")}` }
      })
    ).json()
  ).map(({ key, name }: any) => {
    return { key, label: name };
  });
}
