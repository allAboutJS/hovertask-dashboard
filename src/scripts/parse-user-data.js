(function() {
	const params = new URLSearchParams(window.location.search);
	const userData = params.get("user");

	if (!userData && !window.localStorage.get("user")) {
		window.location.assign("https://hovertask-pi.vercel.app/signin");
	} else if (userData) {
		try {
			const parsedUserData = atob(decodeURIComponent(userData));
			window.localStorage.setItem("user", parsedUserData);
		} catch (error) {
			console.error("Error decoding user data:", error);
			window.location.assign("https://hovertask-pi.vercel.app/signin");
		}
	}
})();
