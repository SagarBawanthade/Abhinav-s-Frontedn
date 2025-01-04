import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
   // Handle form submission
   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword) {
     toast.error("Both email and new password are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://192.168.1.33:5000/api/auth/reset-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password updated successfully. Please login.");
        setEmail("");
        setNewPassword("");
        navigate("/login");
      } else {
        toast.error(data.error || "Failed to update the password. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [location]);
  



  return (
    <section className="font-forumNormal bg-headerBackGround dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
        <div className="w-full bg-headerBackGround rounded-lg border border-gray-400 md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-3xl text-center gap 7 font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white">
              Forgot Password
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-lg text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-headerBackGround border border-gray-8900 text-gray-900 text-sm rounded-lg focus:ring-primary-800 focus:border-primary-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="new-password" className="block mb-2 text-lg text-gray-900 dark:text-white">
                  New Password
                </label>
                <input
                  type="password"
                  name="new-password"
                  id="new-password"
                  placeholder="Your new password"
                  className="bg-headerBackGround border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-homePage text-xl hover:bg-[#0f302f] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
               {loading ? <Spinner className="flex items-center justify-center h-screen"/> : "Update Password"}
              </button>
              <div className="flex items-center justify-between">
                <Link
                  to="/login"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Remembered your password? Login
                </Link>
              </div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-900">
                Don’t have an account yet?{" "}
                <Link to="/register" className="font-bold text-primary-700 hover:underline dark:text-primary-900">
                  Sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;


