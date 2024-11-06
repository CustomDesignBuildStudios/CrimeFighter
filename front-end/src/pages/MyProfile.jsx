import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext.jsx";

function MyProfile() {
  const { user } = useAuth();
  console.log("user object in myprofile page: ", user);
  const [firstname, setFirstName] = useState(
    localStorage.getItem("firstname") || (user ? user.firstName : "")
  );
  const [lastname, setLastName] = useState(
    localStorage.getItem("lastname") || (user ? user.lastName : "")
  );
  const [phone, setPhone] = useState(
    localStorage.getItem("phone") || user?.phone || ""
  );
  const [email, setEmail] = useState(
    localStorage.getItem("email") || user?.email || ""
  );
  const [biography, setBiography] = useState(
    localStorage.getItem("biography") || user?.bio || ""
  );

  // Simulated user data fetch (replace with your data fetching logic)
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhone(user.phone || "");
      setEmail(user.email);
      setBiography(user.bio || "");

      // Save to localStorage
      localStorage.setItem("firstname", user.firstName || "");
      localStorage.setItem("lastname", user.lastName || "");
      localStorage.setItem("phone", user.phone || "");
      localStorage.setItem("email", user.email || "");
      localStorage.setItem("biography", user.bio || "");
    }
  }, [user]);

  const handleUpdate = (event) => {
    event.preventDefault();
    // Logic to handle updating the profile in the database
    console.log("Profile updated:", {
      firstname,
      lastname,
      phone,
      email,
      biography,
    });

    // this might be removed here
    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);
    localStorage.setItem("biography", biography);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-4xl font-bold">My Profile</h1>
      <div className="w-1/3 p-4 mb-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold">User Information</h2>
        <p className="mt-2 text-gray-700">
          <strong>First Name:</strong> {firstname}
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Last Name:</strong> {lastname}
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Phone Number:</strong> {phone || "N/A"}
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Email:</strong> {email}
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Biography:</strong> {biography || "N/A"}
        </p>
      </div>

      {/* Update Information Section */}
      <h1 className="mb-4 text-2xl font-bold">Update Information</h1>
      <form
        className="w-1/3 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        onSubmit={handleUpdate}
      >
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="firstname"
          >
            First Name
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="firstname"
            type="text"
            placeholder="Enter your first name"
            value={firstname || ""}
            onChange={(e) => setFirstName(e.target.value)} // update first name state
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="lastname"
          >
            Last Name
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="lastname"
            type="text"
            placeholder="Enter your last name"
            value={lastname || ""}
            onChange={(e) => setLastName(e.target.value)} // update last name state
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={phone || ""}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="biography"
          >
            Biography
          </label>
          <textarea
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="biography"
            placeholder="Enter your biography"
            rows="4"
            value={biography || ""}
            onChange={(e) => setBiography(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyProfile;
