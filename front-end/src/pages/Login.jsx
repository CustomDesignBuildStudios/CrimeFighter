import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { InputField } from "../Components/InputField";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    if (!email || !password) return;
    try {
      setIsLoading(true);

      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      if (response.data) {
        console.log("Successfully logged in", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        login(response.data); // Set user data in context
        navigate("/myprofile");
      } else {
        alert("Error: Either the email or password is incorrect/not a user.");
      }
    } catch (error) {
      alert("ERROR: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-4xl font-bold">Login</h1>
      <form
        className="w-1/3 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        onSubmit={handleLogin}
      >
        <InputField
          labelName="Email Address"
          type="email"
          placeholder="Your-email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          ></label>
          <InputField
            labelName="Password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            <FontAwesomeIcon
              className="absolute right-0 p-1 cursor-pointer"
              icon={isPasswordVisible ? faEye : faEyeSlash}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </InputField>
        </div>

        <div className="flex justify-between mb-4">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>

        <div className="text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-blue-500 hover:underline"
          >
            Register for Account!
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
