import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { InputField } from "../Components/InputField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Register() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  async function handleLogin(event) {
    event.preventDefault();
    const newErrors = {};

    // Validate fields
    if (!firstName) newErrors.firstName = "First Name is required";
    if (!lastName) newErrors.lastName = "Last Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if validation fails
      return;
    } else {
      setErrors({});
    }
    try {
      setIsLoading(true);

      axios
        .post("http://localhost:8080/register", {
          password: password,
          email: email,
          firstName: firstName,
          lastName: lastName,
        })
        .then((results) => {
          if (results.data) {
            console.log("Successfully logged in", results.data);
            localStorage.setItem("user", JSON.stringify(results.data));

            login(JSON.parse(JSON.stringify(results.data))); // Set user data in context
            navigate("/myprofile");
          } else {
            alert(
              "Error: Either the email or password is incorrect/not a user."
            );
          }
        });
    } catch (error) {
      alert("ERROR: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-4xl font-bold">Register</h1>
      <form
        className="w-1/3 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        onSubmit={handleLogin}
      >
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="firstName"
          >
            First Name
          </label>
          <InputField
            id="firstName"
            labelName="First Name"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <InputField
            id="lastName"
            labelName="Last Name"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500">{errors.lastName}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <InputField
            id="email"
            labelName="Email Address"
            type="email"
            placeholder="Your-email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <InputField
            id="password"
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
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
          <div className="flex items-center ml-4">
            <span className="text-sm text-gray-600">
              Already have an account?
            </span>
            <Link
              to="/login"
              className="ml-1 font-bold text-blue-500 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
