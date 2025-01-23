import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CategoryProducts = ({ category, products, onClose, onDeleteProduct }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const openDialog = (id) => {
    setProductToDelete(id);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setProductToDelete(null);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await axios.delete(`https://backend.abhinavsofficial.com/api/product/deleteproduct/${productToDelete}`);
      onDeleteProduct(productToDelete);
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Error deleting product");
    } finally {
      closeDialog();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">{category} Products</h2>
          <button 
            onClick={onClose} 
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h4 className="text-sm text-center mb-2">{product.name}</h4>
              <p className="text-xl font-bold text-gray-800">₹{product.price}</p>
              <p
                className={`text-sm font-semibold mt-2 px-3 py-1 rounded-full ${
                  product.stock ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {product.stock ? "In Stock" : "Out of Stock"}
              </p>
              <div className="flex justify-between mt-4 w-full">
                <Link
                  to={`/admin/update-product/${product._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => openDialog(product._id)}
                  className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-500 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDeleteProduct}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeDialog}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;