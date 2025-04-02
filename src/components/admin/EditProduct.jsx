import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const returnCategory = location.state?.category;
 

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Hoodies",
    gender: "Unisex",
    price: 0,
    stock: 0,
    size: [],
    color: [], 
    tags: [],
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://backend.abhinavsofficial.com/api/product/getproduct/${productId}`
        );
        
        const productData = response.data;
       // Handle color data, ensuring it's always an array
      const colorArray = Array.isArray(productData.color) 
      ? productData.color 
      : productData.color?.split(',').map(c => c.trim()) || [];

       // Handle tags data, ensuring it's always an array
       const tagsArray = Array.isArray(productData.tags)
       ? productData.tags
       : productData.tags?.split(',').map(t => t.trim()) || [];
     
     setFormData({
       ...productData,
       color: colorArray,
       size: Array.isArray(productData.size) ? productData.size : [],
       tags: tagsArray
     });
      } catch (err) {
        toast.error("Failed to fetch product details");
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData(prev => {
      if (type === "checkbox") {
        const currentArray = Array.isArray(prev[name]) ? prev[name] : [];
        const updatedArray = checked
          ? [...currentArray, value]
          : currentArray.filter(item => item !== value);
        return { ...prev, [name]: updatedArray };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploadingImage(true);
    try {
      const uploadFormData = new FormData();
      Array.from(files).forEach((file) => uploadFormData.append("images", file));

      const response = await axios.post(
        "https://backend.abhinavsofficial.com/api/product/image-upload",
        uploadFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...response.data.imageUrls],
        }));
        toast.success("Image Uploaded successfully");
      }
    } catch (err) {
      toast.error("Failed to upload images.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageDelete = (imageToDelete) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image !== imageToDelete),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Convert color array to string for API submission
      const submissionData = {
        ...formData,
        
      };

      const response = await axios.put(
        `https://backend.abhinavsofficial.com/api/product/updateproduct/${productId}`,
        submissionData
      );

      if (response.status === 200) {
        toast.success("Product Updated successfully");
        navigate(`/admin/category/${formData.category}`, {
          state: {
            updatedProductId: productId,
            scrollToProduct: true
          }
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.errors?.map(e => e.msg).join(', ') ||
                          "Error updating product.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
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
    <div className="container mx-auto p-8">
      <h2 className="text-3xl text-center mb-6">Edit Product</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-4"
      >
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="Hoodies">Hoodies</option>
            <option value="Tshirt">Tshirt</option>
            <option value="Oversize-Tshirt">Oversize-Tshirt</option>
            <option value="Couple-Tshirt">Couple Tshirt</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-semibold mb-2">
            Price (₹)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block text-sm font-semibold mb-2">
            Stock Quantity
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Size Options */}
        <div>
          <label className="block text-sm font-semibold mb-2">Sizes</label>
          <div className="flex flex-wrap gap-4">
            {["S", "M", "L", "XL","XXL"].map((size) => (
              <label key={size} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="size"
                  value={size}
                  checked={Array.isArray(formData.size) && formData.size.includes(size)}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2">{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Options */}
        <div>
          <label className="block text-sm font-semibold mb-2">Colors</label>
          <div className="flex flex-wrap gap-4">
            {["kiwi-green", "royal-blue", "red", "yellow", "navy-blue", "black", "white","cyan","umber"].map((color) => (
              <label key={color} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="color"
                  value={color}
                  checked={Array.isArray(formData.color) && formData.color.includes(color)}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2">{color}</span>
              </label>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Selected colors: {Array.isArray(formData.color) ? formData.color.join(', ') : 'None'}
          </p>
        </div>

        {/* Tags */}
        {/* Tags Options */}
        <div>
          <label className="block text-sm font-semibold mb-2">Tags</label>
          <div className="flex flex-wrap gap-4">
          {["doraemon", "marvel", "dc", "adventure", "trending-talks", "spider-man", "pikachu","minions", "typography","bear","stay-wild","pooh","shinchan","mickey-mouse","panda","explore","duck","goku", "i-am-groot","ride","ghost","snoopy"].map((tag) => (
          <label key={tag} className="inline-flex items-center">
            <input
              type="checkbox"
              name="tags"
              value={tag}
              checked={Array.isArray(formData.tags) && formData.tags.includes(tag)}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">{tag}</span>
          </label>
        ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Selected tags: {Array.isArray(formData.tags) ? formData.tags.join(', ') : 'None'}
          </p>
        </div>

        

        {/* Images */}
        <div>
          <label htmlFor="images" className="block text-sm font-semibold mb-2">
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded"
            multiple
          />
          {uploadingImage && <p className="text-blue-500 mt-2">Uploading images...</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Uploaded Preview ${index + 1}`}
                  className="w-20 h-20 object-cover border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(image)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>

      
      </form>
    </div>
  );
};

export default EditProduct;