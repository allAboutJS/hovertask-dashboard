const user = JSON.parse(localStorage.getItem("user"));

if (!user?.data) window.location.assign("https://hovertask-pi.vercel.app/signin");

const nameElem = document.getElementById("name");
const usernameElem = document.getElementById("username");
const fullnameElem = document.getElementById("full-name");

if (nameElem) nameElem.textContent = user.data.lname;
if (usernameElem) usernameElem.textContent = "@" + user.data.username;
if (fullnameElem) fullnameElem.textContent = `${user.data.lname + " " + user.data.fname}`;