import { useState, useEffect } from "react";

function MyProfile() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [biography, setBiography] = useState("");

  // Simulated user data fetch (replace with your data fetching logic)
  useEffect(() => {
    const fetchUserData = () => {
      // This should be replaced with the actual fetching logic from your database/API
      const userData = {
        name: "John Doe",
        phone: "123-456-7890",
        email: "john.doe@example.com",
        Biography: "pull bio info from database",
      };

      setName(userData.name);
      setPhone(userData.phone);
      setEmail(userData.email);
      setBiography(userData.Biography);
    };

    fetchUserData();
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();
    // Logic to handle updating the profile in the database
    console.log("Profile updated:", { name, phone, email, biography });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-4xl font-bold">My Profile</h1>
      <div className="w-1/3 p-4 mb-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold">User Information</h2>
        <p className="mt-2 text-gray-700">
          <strong>Name:</strong> {name}
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Phone Number:</strong> {phone}
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Email:</strong> {email}
        </p>
        <p className="mt-2 text-gray-700">
          <strong>Biography:</strong> {biography}
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
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={phone}
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
            value={email}
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
            value={biography}
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
