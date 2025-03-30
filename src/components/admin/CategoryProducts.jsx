import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CategoryProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const productRefs = useRef({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://backend.abhinavsofficial.com/api/product/getproducts");
        const categoryProducts = response.data.filter(
          product => product.category === category
        );
        setProducts(categoryProducts);

        // Scroll to updated product if needed
        if (location.state?.scrollToProduct && location.state?.updatedProductId) {
          setTimeout(() => {
            const productElement = productRefs.current[location.state.updatedProductId];
            if (productElement) {
              productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              // Add highlight effect
              productElement.classList.add('transition-all', 'duration-1000');
              productElement.classList.add('bg-yellow-100');
              setTimeout(() => {
                productElement.classList.remove('bg-yellow-100');
              }, 2000);
            }
          }, 100);
        }
      } catch (error) {
        toast.error(error.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, location.state]);

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
      setProducts(products.filter((product) => product._id !== productToDelete));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Error deleting product");
    } finally {
      closeDialog();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="loader border-t-4 border-b-4 border-gray-800 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">{category} Products</h2>
        <button 
          onClick={() => navigate('/admin/products')} 
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Back to Products
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            ref={el => productRefs.current[product._id] = el}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4 transition-all duration-300"
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
                state={{ category }}
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

export default CategoryProductsPage;