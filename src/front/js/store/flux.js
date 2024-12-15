const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		message: null,
		user: null,
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white"
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white"
		  }
		]
	  },
	  actions: {
		// Example function
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
  
		// Fetch message from the backend
		getMessage: async () => {
		  try {
			const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
			const data = await resp.json();
			setStore({ message: data.message });
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
  
		// Change color in demo
		changeColor: (index, color) => {
		  const store = getStore();
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
		  setStore({ demo: demo });
		},
  
		signup: async (email, password) => {
			try {
			  const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify({
				  email,
				  password,
				  is_active: true, 
				}),
			  });
		  
			  if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.msg || "Failed to sign up.");
			  }
		  
			  const data = await response.json();
			  setStore({
				message: "User created successfully!",
				
				// user: data.user
			  });
			  return true; 
			} catch (error) {
			  console.error("Signup error:", error.message);
			  setStore({ message: error.message });
			  return false;
			}
		  },		  
  
		// Login function for user authentication
		login: async (email, password) => {
		  try {
			const response = await fetch(process.env.BACKEND_URL + "/api/login", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json"
			  },
			  body: JSON.stringify({
				email,
				password
			  })
			});
  
			if (!response.ok) {
			  const errorData = await response.json();
			  throw new Error(errorData.msg || "Invalid email or password.");
			}
  
			const data = await response.json();
			
			sessionStorage.setItem("authToken", data.token); // Store the token
			sessionStorage.setItem("user", JSON.stringify(data.user)); // Store user data
  
			setStore({
			  message: "Login successful!",
			  user: data.user 
			});
  
			return true; 
		  } catch (error) {
			console.error("Login error:", error.message);
			setStore({ message: error.message });
			return false; 
		  }
		},
  
		// Logout function
		logout: () => {
		  
		  sessionStorage.removeItem("authToken");
		  sessionStorage.removeItem("user");
  
		  setStore({
			user: null, 
			message: "User logged out successfully!" 
		  });
  
		  console.log("User logged out successfully");
		},
  
		// Fetch data with Authorization header
		fetchDataWithToken: async () => {
		  try {
			const token = sessionStorage.getItem("authToken");
  
			if (!token) {
			  throw new Error("No authentication token found.");
			}
  
			const response = await fetch(process.env.BACKEND_URL + "/api/protected-endpoint", {
			  method: "GET",
			  headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}` // Include the token in the Authorization header
			  }
			});
  
			if (!response.ok) {
			  const errorData = await response.json();
			  throw new Error(errorData.msg || "Error fetching data.");
			}
  
			const data = await response.json();
			return data;
		  } catch (error) {
			console.error("Error fetching protected data:", error.message);
		  }
		}
	  }
	};
  };
  
  export default getState;