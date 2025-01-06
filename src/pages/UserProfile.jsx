import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { BsArrowRightCircle } from "react-icons/bs";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.id);
  const userRole = useSelector((state) => state.auth.role);

  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [location]);
  

  const [updatedUserData, setUpdatedUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://backend.abhinavsofficial.com/api/auth/getuser/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setUpdatedUserData(data);
        } else {
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
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://backend.abhinavsofficial.com/api/auth/updateuser/${userId}`, {
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
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }


  return (
    <section className="font-forumNormal  bg-headerBackGround">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full max-w-lg bg-headerBackGround rounded-xl shadow-md border border-gray-200">
          <div className="p-6 space-y-6">
            <h1 className="text-4xl font-semibold font-forumNormal text-center text-gray-700">Your Profile</h1>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-xl font-medium text-gray-600">
                  First Name
                </label>
                <div className="flex items-center gap-2 w  bg-headerBackGround p-2 rounded-md border text-gray-800">
                  <FaUser className="text-gray-800" />
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={updatedUserData.firstName}
                    onChange={handleInputChange}
                    className=" font-semibold flex-grow bg-transparent outline-none text-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-xl font-medium text-gray-600">
                  Last Name
                </label>
                <div className="flex items-center gap-2 bg-headerBackGround p-2 rounded-md border">
                  <FaUser className="text-gray-800" />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={updatedUserData.lastName}
                    onChange={handleInputChange}
                    className="flex-grow font-semibold bg-transparent outline-none text-gray-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-xl font-medium text-gray-600">
                  Email
                </label>
                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md border">
                  <FaEnvelope className="text-gray-800" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={updatedUserData.email}
                    onChange={handleInputChange}
                    className="flex-grow font-semibold bg-transparent outline-none text-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-xl font-medium text-gray-600">
                  Password
                </label>
                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md border">
                  <FaLock className="text-gray-800" />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={updatedUserData.password}
                    onChange={handleInputChange}
                    className="flex-grow font-semibold bg-transparent outline-none text-gray-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
              >
                Update Details
              </button>

              {userRole === "admin" && (
                <Link to="/admin-panel">
                  <button
                    type="button"
                    className="w-full bg-green-500 text-white py-2 mt-2 rounded-md hover:bg-green-600 transition duration-200 flex items-center justify-center gap-2"
                  >
                    <BsArrowRightCircle />
                    Admin Panel
                  </button>
                </Link>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
