import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext.jsx";
import axios from "axios";

function MyProfile() {
  const { user,setUser,login } = useAuth();
 

  const [firstName, setFirstName] = useState(
    user?.firstName || ""
  );
  const [lastName, setLastName] = useState(
    user?.lastName || ""
  );
  const [phone, setPhone] = useState(
    user?.phone || ""
  );
  const [biography, setBiography] = useState(
    user?.bio || ""
  );

  // Simulated user data fetch (replace with your data fetching logic)
  useEffect(() => {
      console.log(user);
      if (user) {
        setUserData(user);
      }
  }, [user]);


  async function handleUpdate(event) {
    event.preventDefault();
    try {
      
      let data = user;
      data['firstName'] = firstName;
      data['lastName'] = lastName;
      data['phone'] = phone;
      data['bio'] = biography;

      const response = await axios.post("http://localhost:8080/profile", {user:user});
      console.log(response.data);
      if (response.data) {
        setUser(response.data);
      } else {
        alert("Error");
      }
    } catch (error) {
      alert("ERROR: " + error.message);
    } finally {
    
    }
  }




  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-4xl font-bold">My Profile</h1>
      <div className="w-1/3 p-4 mb-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold">User Information</h2>
        <p className="mt-2 text-gray-700">
          <strong>First Name:</strong> {user['firstName']}
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Last Name:</strong> {user['lastName']}
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Phone Number:</strong> {user['phone'] || "N/A"}
        </p>
        {/* <p className="mt-2 text-gray-700">
          <strong>Email:</strong> {user['email']}
        </p> */}
        <p className="mt-2 text-gray-700">
          <strong>Biography:</strong> {user['bio'] || "N/A"}
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
            value={firstName || ""}
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
            value={lastName || ""}
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
        {/* <div className="mb-4">
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
        </div> */}
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
