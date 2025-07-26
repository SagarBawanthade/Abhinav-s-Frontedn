import React, { useState, useEffect } from "react";
import { UploadCloud, ImagePlus, CheckCircle, Clock, Shield, Sparkles, Star, Heart } from "lucide-react";
import { useSelector } from "react-redux";

const CustomStyle = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadError, setUploadError] = useState(null);
  
  const userId = useSelector((state) => state.auth.id);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://backend.abhinavsofficial.com/api/auth/getuser/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
          console.log("User data fetched:", data);
        } else {
          console.error(data.error || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    // Reset any previous errors
    setUploadError(null);
    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please upload an image first!");
      return;
    }

    if (!userId) {
      alert("User authentication required!");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', selectedFile); // Single image field
      formData.append('userId', userId);
      formData.append('firstName', userData?.firstName || 'Anonymous User');
      formData.append('email', userData?.email || 'no-email@provided.com');

      const response = await fetch('https://backend.abhinavsofficial.com/api/custom-style/submit', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header, let browser set it with boundary for FormData
      });

      const result = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          // Reset form
          setImagePreview(null);
          setSelectedFile(null);
          // Reset file input
          const fileInput = document.getElementById('file-upload');
          if (fileInput) fileInput.value = '';
        }, 4000);
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="forum-regular min-h-screen bg-headerBackGround text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4 mx-auto"></div>
          <p className="text-xl">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="forum-regular min-h-screen bg-headerBackGround text-white">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0c3937] via-[#0c3937] to-[#0c3937] text-white py-12 sm:py-16 md:py-20 px-4">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c3937] to-blue-[#0c3937]"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-300 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6 border border-white/30">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            Create Your Dream Style
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed px-4">
            Turn your imagination into wearable art ✨
          </p>
          
          {/* Welcome user if data is available */}
          {userData && (
            <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg inline-block">
              <p className="text-sm">Welcome back, {userData.name || userData.email}! 👋</p>
            </div>
          )}
          
          <div className="flex items-center justify-center mt-6 space-x-6 text-sm sm:text-base">
            <div className="flex items-center">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 mr-2" />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300 mr-2" />
              <span>Made with Love</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="font-forumNormal max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Upload Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-headerBackground rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0c3937] to-[#0c3937] rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-[#0c3937] rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0c3937] mb-2 flex items-center">
                  <ImagePlus className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-[#0c3937]" />
                  Upload Your Design
                </h2>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  Share your creative vision and we'll bring it to life on premium fabric
                </p>
                
                {/* Error message */}
                {uploadError && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                    {uploadError}
                  </div>
                )}
                
                <div className="border-2 border-dashed border-purple-200 rounded-2xl bg-gradient-to-br from-gray-50/50 to-gray-50/50 hover:from-gray-50 hover:to-gray-50 transition-all duration-300 p-6 sm:p-8 relative group">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    {imagePreview ? (
                      <div className="w-full">
                        <div className="relative group">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full max-h-64 sm:max-h-80 object-contain rounded-xl border border-purple-200 shadow-lg"
                          />
                          <div className="absolute inset-0 bg-gray-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-[#0c3937] font-semibold bg-white/90 px-4 py-2 rounded-full text-sm">
                              Click to change
                            </span>
                          </div>
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-4">
                          Looking great! Click anywhere to change your design
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-gray-500 group-hover:text-[#0c3937] transition-colors duration-300">
                        <div className="relative">
                          <UploadCloud className="w-16 h-16 sm:w-20 sm:h-20 mb-4 text-[#0c3937] group-hover:text-[#0c3937] transition-colors duration-300" />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                          Drop your design here
                        </p>
                        <p className="text-sm sm:text-base text-gray-500 mb-2">
                          or tap to browse your gallery
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-gray-400">
                          <span className="bg-gray-100 px-3 py-1 rounded-full">JPG</span>
                          <span className="bg-gray-100 px-3 py-1 rounded-full">PNG</span>
                          <span className="bg-gray-100 px-3 py-1 rounded-full">Max 5MB</span>
                        </div>
                      </div>
                    )}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!selectedFile || isUploading}
                  className={`w-full mt-6 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-300 relative overflow-hidden ${
                    selectedFile && !isUploading
                      ? "bg-gradient-to-r from-[#0c3937] via-[#0c3937] to-[#0c3937] hover:from-[#0c3937] hover:via-[#0c3937] hover:to-[#0c3937] text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-2"></div>
                        Uploading Your Design...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                        Request Your Custom Style
                      </>
                    )}
                  </span>
                  {selectedFile && !isUploading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Info Section - Takes 1 column on large screens */}
          <div className="space-y-6">
            {/* How It Works */}
            <div className="bg-headerBackground rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
                ✨ How It Works
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#0c3937] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm sm:text-base">Upload Your Vision</h4>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">Share your creative ideas with us</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#0c3937] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm sm:text-base">Design Magic</h4>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">Our artists work their magic</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#0c3937] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm sm:text-base">Your Masterpiece</h4>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">Receive your custom creation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-headerBackground rounded-3xl shadow-2xl p-6 border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-4 text-center text-lg">Why Choose Us? 🎨</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 bg-white/60 rounded-xl p-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">Premium Quality Guaranteed</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 rounded-xl p-3">
                  <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">24 Hour Response Time</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 rounded-xl p-3">
                  <Shield className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">100% Secure Process</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 rounded-xl p-3">
                  <Heart className="w-5 h-5 text-pink-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">Unlimited Revisions</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-headerBackground rounded-3xl shadow-2xl p-6 border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-4 text-center text-lg">
                💬 We're Here to Help
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3 p-3 rounded-xl">
                  <span className="text-lg">📧</span>
                  <span className="text-gray-600">Email updates on your registered address</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl">
                  <span className="text-lg">🎨</span>
                  <span className="text-gray-600">Professional design consultation</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl">
                  <span className="text-lg">⚡</span>
                  <span className="text-gray-600">Fast-track custom orders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="font-forumNormal fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#0c3937] to-blue-100 rounded-full -translate-y-12 translate-x-12"></div>
            
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0c3937] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                🎉 Request Received!
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                Your custom style request is now in our creative queue! Our design team will work their magic and contact you within 24 hours.
              </p>
              <div className="bg-gradient-to-r from-gray-50 to-gray-50 rounded-2xl p-4 sm:p-6 text-sm sm:text-base">
                <p className="font-bold text-gray-800 mb-3">What's Next:</p>
                <div className="text-left space-y-2 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-[#0c3937] rounded-full"></span>
                    <span>Design team reviews your vision</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-[#0c3937] rounded-full"></span>
                    <span>We create stunning design concepts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-[#0c3937] rounded-full"></span>
                    <span>Preview sent to your email</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-[#0c3937] rounded-full"></span>
                    <span>Free revisions until perfect!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomStyle;