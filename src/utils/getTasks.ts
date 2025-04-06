import apiEndpointBaseURL from "./apiEndpointBaseURL";

export default async function getTasks() {
  return (
    await (
      await fetch(apiEndpointBaseURL + "/tasks/show-all-task", {
        headers: { authorization: `Bearer ${localStorage.getItem("auth_token")}` }
      })
    ).json()
  ).data;
}
