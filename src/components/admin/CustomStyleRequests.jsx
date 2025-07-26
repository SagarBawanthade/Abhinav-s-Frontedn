import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Eye, Check, X, Trash2, Filter, Search, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const CustomStyleRequests = () => {
  const userId = useSelector((state) => state.auth.id);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [updating, setUpdating] = useState(null);

  // Fetch all custom style requests
  const fetchRequests = async (page = 1, status = 'all', search = '') => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(status !== 'all' && { status }),
        ...(search && { search })
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
        // Update the request in the local state
        setRequests(prevRequests => 
          prevRequests.map(req => 
            req._id === requestId 
              ? { ...req, status: newStatus, updatedAt: new Date().toISOString() }
              : req
          )
        );
        
        // Show success message (you can add a toast notification here)
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
        // Remove the request from local state
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
    fetchRequests(currentPage, statusFilter, searchTerm);
  }, [currentPage, statusFilter]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchRequests(1, statusFilter, searchTerm);
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200';
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

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Custom Style Requests
        </h1>
        <p className="text-gray-600">Manage and review custom design requests from users</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            onClick={() => fetchRequests(currentPage, statusFilter, searchTerm)}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex items-center">
            <X className="w-4 h-4 mr-2" />
            {error}
          </div>
        </div>
      )}

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading requests...</span>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Eye className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500 text-lg">No custom style requests found</p>
            <p className="text-gray-400 text-sm mt-2">Requests will appear here when users submit them</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Design Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((req) => (
                    <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                      {/* User Details */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">{req.firstname}</div>
                          <div className="text-sm text-gray-500">{req.email}</div>
                          {req.userId?.name && (
                            <div className="text-xs text-gray-400 mt-1">
                              Account: {req.userId.name}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Design Image */}
                      <td className="px-6 py-4">
                        {req.imageUrls?.length ? (
                          <div className="flex items-center space-x-2">
                            <img
                              src={req.imageUrls[0]}
                              alt="Design"
                              className="w-16 h-16 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => setSelectedImage(req.imageUrls[0])}
                            />
                            <button
                              onClick={() => setSelectedImage(req.imageUrls[0])}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">No image</span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>{formatDate(req.createdAt)}</div>
                        {req.updatedAt !== req.createdAt && (
                          <div className="text-xs text-gray-500 mt-1">
                            Updated: {formatDate(req.updatedAt)}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(req.status)}`}>
                          {req.status?.charAt(0).toUpperCase() + req.status?.slice(1) || 'Pending'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {req.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateStatus(req._id, 'in-progress')}
                                disabled={updating === req._id}
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <Check className="w-3 h-3 mr-1" />
                                Start
                              </button>
                              <button
                                onClick={() => updateStatus(req._id, 'cancelled')}
                                disabled={updating === req._id}
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </button>
                            </>
                          )}
                          
                          {req.status === 'in-progress' && (
                            <button
                              onClick={() => updateStatus(req._id, 'completed')}
                              disabled={updating === req._id}
                              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              Complete
                            </button>
                          )}

                          <button
                            onClick={() => deleteRequest(req._id)}
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={!pagination.hasPrevPage}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                    disabled={!pagination.hasNextPage}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{((currentPage - 1) * 10) + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(currentPage * 10, pagination.totalRequests)}
                      </span> of{' '}
                      <span className="font-medium">{pagination.totalRequests}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={!pagination.hasPrevPage}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      
                      {/* Page numbers */}
                      {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
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
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Full size design"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 right-4">
              <a
                href={selectedImage}
                download
                className="inline-flex items-center px-3 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomStyleRequests;