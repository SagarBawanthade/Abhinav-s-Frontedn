import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Eye, 
  Check, 
  X, 
  Trash2, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Download,
  User,
  Package,
  Calendar,
  Mail,
  Palette,
  Ruler,
  Tag,
  Clock,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';

const CustomStyleRequests = () => {
  const userId = useSelector((state) => state.auth.id);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [updating, setUpdating] = useState(null);

  // Fetch all custom style requests
  const fetchRequests = async (page = 1, status = 'all') => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        ...(status !== 'all' && { status })
      });

      const res = await fetch(`https://backend.abhinavsofficial.com/api/custom-style/all?${queryParams}`);
      const data = await res.json();
      
      if (res.ok) {
        setRequests(data.requests || []);
        setPagination(data.pagination || {});
      } else {
        throw new Error(data.error || 'Failed to fetch requests');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // Update request status
  const updateStatus = async (requestId, newStatus) => {
    setUpdating(requestId);
    try {
      const res = await fetch(`https://backend.abhinavsofficial.com/api/custom-style/status/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setRequests(prevRequests => 
          prevRequests.map(req => 
            req._id === requestId 
              ? { ...req, status: newStatus, updatedAt: new Date().toISOString() }
              : req
          )
        );
        console.log(`Status updated to ${newStatus}`);
      } else {
        throw new Error(data.error || 'Failed to update status');
      }
    } catch (err) {
      console.error('Update status error:', err);
      setError(err.message);
    } finally {
      setUpdating(null);
    }
  };

  // Delete request
  const deleteRequest = async (requestId) => {
    if (!window.confirm('Are you sure you want to delete this request?')) {
      return;
    }

    try {
      const res = await fetch(`https://backend.abhinavsofficial.com/api/custom-style/${requestId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      
      if (res.ok) {
        setRequests(prevRequests => 
          prevRequests.filter(req => req._id !== requestId)
        );
        console.log('Request deleted successfully');
      } else {
        throw new Error(data.error || 'Failed to delete request');
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchRequests(currentPage, statusFilter);
  }, [currentPage, statusFilter]);

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-200',
      'in-progress': 'bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-200',
      completed: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-200'
    };
    
    return statusStyles[status] || 'bg-gray-50 text-gray-700 border-gray-200 ring-1 ring-gray-200';
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const openImageModal = (imageUrls, index = 0) => {
    setSelectedImage(imageUrls);
    setSelectedImageIndex(index);
  };

  const nextImage = () => {
    if (selectedImage && selectedImageIndex < selectedImage.length - 1) {
      setSelectedImageIndex(prev => prev + 1);
    }
  };

  const prevImage = () => {
    if (selectedImage && selectedImageIndex > 0) {
      setSelectedImageIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Custom Style Requests
              </h1>
              <p className="text-gray-600 text-lg mt-1">
                Manage and review custom design requests from users
              </p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {['pending', 'in-progress', 'completed', 'cancelled'].map((status) => {
              const count = requests.filter(req => req.status === status).length;
              const colors = {
                pending: 'from-amber-400 to-orange-500',
                'in-progress': 'from-blue-400 to-blue-600',
                completed: 'from-emerald-400 to-green-600',
                cancelled: 'from-red-400 to-red-600'
              };
              
              return (
                <div key={status} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                        {status.replace('-', ' ')}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${colors[status]} flex items-center justify-center`}>
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => fetchRequests(currentPage, statusFilter)}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
            <div className="flex items-center">
              <X className="w-5 h-5 mr-3" />
              {error}
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <span className="text-gray-600 text-lg">Loading requests...</span>
            </div>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-20">
            <div className="text-gray-400 mb-6">
              <Package className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-500 text-xl font-medium">No custom style requests found</p>
            <p className="text-gray-400 text-base mt-2">Requests will appear here when users submit them</p>
          </div>
        ) : (
          /* Cards View */
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
            {requests.map((req) => (
              <div key={req._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{req.firstName || req.firstname}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {req.email}
                        </p>
                        {req.userId?.name && (
                          <p className="text-xs text-gray-400 mt-1">Account: {req.userId.name}</p>
                        )}
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusBadge(req.status)}`}>
                      {req.status?.charAt(0).toUpperCase() + req.status?.slice(1) || 'Pending'}
                    </span>
                  </div>
                </div>

                {/* Product Images - Large Display */}
                {req.product?.images?.length > 0 && (
                  <div className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Product Images</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {req.product.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity shadow-sm"
                          onClick={() => openImageModal(req.product.images, index)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Design Images */}
                {req.imageUrls?.length > 0 && (
                  <div className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ImageIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Custom Design</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {req.imageUrls.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Design ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity shadow-sm"
                          onClick={() => openImageModal(req.imageUrls, index)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Info */}
                {req.product && (
                  <div className="px-6 py-4 bg-gray-50">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Product Details</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-gray-900">{req.product.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          {formatCurrency(req.product.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Specifications */}
                <div className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Ruler className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Specifications</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Size:</span>
                      <span className="text-sm font-medium text-gray-900">{req.selectedSize || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Color:</span>
                      <span className="text-sm font-medium text-gray-900">{req.selectedColor || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Timeline</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Submitted:</span>
                      <span className="text-sm font-medium text-gray-900">{formatDate(req.submittedAt || req.createdAt)}</span>
                    </div>
                    {req.updatedAt !== req.createdAt && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Updated:</span>
                        <span className="text-sm font-medium text-gray-900">{formatDate(req.updatedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-3">
                    {req.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(req._id, 'in-progress')}
                          disabled={updating === req._id}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Start Work
                        </button>
                        <button
                          onClick={() => updateStatus(req._id, 'cancelled')}
                          disabled={updating === req._id}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      </>
                    )}
                    
                    {req.status === 'in-progress' && (
                      <button
                        onClick={() => updateStatus(req._id, 'completed')}
                        disabled={updating === req._id}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Mark Complete
                      </button>
                    )}

                    <button
                      onClick={() => deleteRequest(req._id)}
                      className="inline-flex items-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 mt-8 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={!pagination.hasPrevPage}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                disabled={!pagination.hasNextPage}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{((currentPage - 1) * 12) + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * 12, pagination.totalRequests)}
                  </span> of{' '}
                  <span className="font-medium">{pagination.totalRequests}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={!pagination.hasPrevPage}
                    className="relative inline-flex items-center px-3 py-2 rounded-l-xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                    disabled={!pagination.hasNextPage}
                    className="relative inline-flex items-center px-3 py-2 rounded-r-xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-6xl max-h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-20 bg-black bg-opacity-50 rounded-full p-2"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Navigation Buttons */}
              {selectedImage.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    disabled={selectedImageIndex === 0}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-20 bg-black bg-opacity-50 rounded-full p-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={nextImage}
                    disabled={selectedImageIndex === selectedImage.length - 1}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-20 bg-black bg-opacity-50 rounded-full p-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}

              {/* Image */}
              <img
                src={selectedImage[selectedImageIndex]}
                alt={`Image ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">
                      Image {selectedImageIndex + 1} of {selectedImage.length}
                    </p>
                    <p className="text-lg font-medium">Design Gallery</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={selectedImage[selectedImageIndex]}
                      download
                      className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                    <a
                      href={selectedImage[selectedImageIndex]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomStyleRequests;