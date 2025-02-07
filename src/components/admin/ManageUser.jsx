import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalUserId, setModalUserId] = useState(null); // State for managing modal visibility

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://backend.abhinavsofficial.com/api/auth/getusers");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`https://backend.abhinavsofficial.com/api/auth/deleteuser/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== id));
        toast.success("User Deleted Successfully");
      } else {
        console.error("Failed to delete user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setModalUserId(null); // Close modal
    }
  };

  // Format date (DD/MM/YYYY)
  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getDate().toString().padStart(2, "0")}/${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${newDate.getFullYear()}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="loader border-t-4 border-b-4 border-gray-800 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">Manage Users</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white text-left text-sm font-medium">
              <th className="p-4">First Name</th>
              <th className="p-4">Last Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Password</th>
              <th className="p-4">Role</th>
              <th className="p-4">Creation Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-200 transition">
                <td className="p-4">{user.firstName}</td>
                <td className="p-4">{user.lastName}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 italic text-gray-500">Encrypted</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{formatDate(user.createdAt)}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => setModalUserId(user._id)}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {modalUserId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModalUserId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteUser(modalUserId)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
