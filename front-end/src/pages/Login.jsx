import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { InputField } from "../Components/InputField";

function Login({ className }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    if (!email || !password) return;
    try {
      setIsLoading(true);
      {
        /*insert here the try catch finally logic for handling the login info in oracle DB */
      }
    } catch (error) {
      alert("ERROR: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`w-1/2 ${className}`}>
      <h1 className="text-4xl text-center font-abrilfatface">Login</h1>
      <form className="flex flex-col gap-6 mt-4" onSubmit={handleLogin}>
        <InputField
          labelName="Email Address"
          type="email"
          placeholder="Your-email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

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

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 text-xl font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
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
