import { LOGIN_PASSWORD, LOGIN_USERNAME, auth } from "@/app/constants";
import { createJWT, decodeJWT } from "@/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const Login = ({
  setIsLoggedIn,
}: {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem(auth);
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    const decoded = decodeJWT(token);
    if (
      decoded &&
      decoded.username === LOGIN_USERNAME &&
      decoded.password === LOGIN_PASSWORD
    ) {
      setIsLoggedIn(true);
    } else {
      alert("Token expired. Kindly login again.");
    }
  }, []);

  const handleLogin = () => {
    if (username !== LOGIN_USERNAME || password !== LOGIN_PASSWORD) {
      alert("Password not matching");
      return;
    }
    const jwt = createJWT(username, password);
    sessionStorage.setItem(auth, jwt);
    setIsLoggedIn(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
