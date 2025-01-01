import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  // States for user data and loading state
  
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.id);
  const userRole = useSelector((state) => state.auth.role);

  const [updatedUserData, setUpdatedUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Fetch user data using userId
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Replace with your actual API endpoint for fetching user details
        const response = await fetch(`http://localhost:5000/api/auth/getuser/${userId}`);
        const data = await response.json();
        
        if (response.ok) {
          setUpdatedUserData(data);
        } else {
          // Handle errors if necessary
          console.error(data.error || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]); // Re-fetch if userId changes



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prev) => ({ ...prev, [name]: value }));
  };


  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/updateuser/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        const data = await response.json();
        setUpdatedUserData(data);
        toast.success("Profile updated successfully!");
        
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div> {/* Your loading spinner or style here */}
      </div>
    );
  }

  // Display user profile with the fetched data
  return (
    <section className="font-forumNormal bg-headerBackGround">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full max-w-lg bg-headerBackGround rounded-lg border border-gray-400 md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-3xl text-center gap 7 font-bold font-forumNormal leading-tight tracking-tight text-black md:text-4xl dark:text-white">
              Your Profile
            </h1>
            <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-xl  text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={updatedUserData.firstName}
                  onChange={handleInputChange}
                  className="bg-headerBackGround border border-gray-300 text-gray-900 text-lg font-semibold rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 
                 
                />
              </div>

              {/* Last Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-xl text-gray-900 dark:text-white"
                >
                  Your Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-headerBackGround border border-gray-300 font-semibold text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={updatedUserData.lastName}
                  onChange={handleInputChange}
                  
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xl text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-headerBackGround border font-semibold border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={updatedUserData.email}
                  onChange={handleInputChange}
                  
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-xl text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={updatedUserData.password}
                  onChange={handleInputChange}
                 // Static placeholder for security reasons
                  className="bg-headerBackGround border font-semibold border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  
                />
              </div>

              {/* Update button */}
              <div className="items-center justify-between">
              <button
                type="submit"
                className="w-full mb-3 text-white rounded-lg bg-homePage text-xl hover:bg-[#0f302f] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update Details
              </button>

              {/* Conditional Admin Panel Link */}
              {userRole === "admin" && (
                <Link to="/admin-panel">
                  <button className="w-full text-white  rounded-lg bg-primary-900 text-xl hover:bg-[#0f302f] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Admin Panel
                  </button>
                </Link>
              )}
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-800">
                Want to change your password?{" "}
                <Link
                  to="/password-reset"
                  className="font-bold text-primary-900 hover:underline dark:text-primary-900"
                >
                  Reset Password
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;


