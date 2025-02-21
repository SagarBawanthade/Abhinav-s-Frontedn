import { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Hoodies",
    gender: "Unisex",
    price: 0,
    stock: 0,
    size: [],
    color: [], // Keep as array
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

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
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(
        "https://backend.abhinavsofficial.com/api/product/image-upload",
        {
          method: 'POST',
          body: formData
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFormData((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...data.imageUrls],
        }));
        toast.success("Images uploaded successfully!");
      }
    } catch (err) {
      toast.error("Failed to upload images.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageDelete = (imageToDelete) => {
    setFormData((prevState) => ({
      ...prevState,
      images: prevState.images.filter((image) => image !== imageToDelete),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Keep color as array for API submission
      const submissionData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      };

      const response = await fetch(
        "https://backend.abhinavsofficial.com/api/product/addproduct"

         ,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        }
      );

      if (response.ok) {
        toast.success("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          category: "Hoodies",
          gender: "Unisex",
          price: 0,
          stock: 0,
          size: [],
          color: [],
          images: [],
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.msg || errorData.message || "Failed to add product");
      }
    } catch (err) {
      toast.error(err.message || "Error adding product.");
      setError(err.message || "Error adding product.");
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
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2"
              required
            >
              <option value="Hoodies">Hoodies</option>
              <option value="Tshirt">Tshirt</option>
              <option value="Oversize-Tshirt">Oversize-Tshirt</option>
              <option value="Couple-Tshirt">Couple Tshirt</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold">Gender</label>
            <div className="space-x-4">
              {["Unisex", "Male", "Female"].map((genderOption) => (
                <label key={genderOption} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={genderOption}
                    checked={formData.gender === genderOption}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">{genderOption}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-semibold">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-semibold">
              Stock Quantity
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2"
              required
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-semibold">Sizes</label>
            <div className="space-x-4">
              {["S", "M", "L", "XL","XXL"].map((size) => (
                <label key={size} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="size"
                    value={size}
                    checked={formData.size.includes(size)}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-semibold mb-2">Colors</label>
            <div className="flex flex-wrap gap-4">
              {["Purple", "Orange", "Yellow", "Pink", "Red", "Blue", "Green", "Black", "Lavender", "White"].map((color) => (
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

          {/* Images */}
          <div>
            <label htmlFor="images" className="block text-sm font-semibold">
              Upload Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2"
              multiple
            />
            {uploadingImage && <p className="text-blue-500 mt-2">Uploading images...</p>}
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Uploaded Preview ${index}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(image)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs p-1"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>

        
        </form>
      </div>
    </div>
  );
};

export default AddProduct;