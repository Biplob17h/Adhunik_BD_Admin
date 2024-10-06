import React, { useEffect, useState } from "react";

const Vendors = () => {
  const [vendors, setVendors] = useState([]); 
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Fetch vendor data from the API
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/auth/vendor/allVendors`)
      .then((res) => res.json())
      .then((data) => {
        // Assuming the API returns a structure like { vendors: [...] }
        setVendors(data?.vendors || []); // Set vendors or empty array if data is not as expected
      })
      .catch((error) => console.error('Error fetching vendors:', error)); // Handle errors
  }, []);

  const openModal = (vendor) => {
    setSelectedVendor(vendor);
  };

  const closeModal = () => {
    setSelectedVendor(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Vendors List</h1>

      {/* Check if vendors exist */}
      {vendors.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table-auto w-full border-collapse border rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-sm font-semibold text-gray-700 border">Vendor Name</th>
                <th className="p-4 text-sm font-semibold text-gray-700 border">Shop Name</th>
                <th className="p-4 text-sm font-semibold text-gray-700 border">Status</th>
                <th className="p-4 text-sm font-semibold text-gray-700 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="p-4 text-sm text-gray-700 border">{vendor.vendorName}</td>
                  <td className="p-4 text-sm text-gray-700 border">{vendor.shopName}</td>
                  <td className="p-4 text-sm text-gray-700 border">
                    {vendor.status === "active" ? (
                      <span className="text-green-600">Active</span>
                    ) : (
                      <span className="text-red-600">Inactive</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-700 border">
                    <button
                      onClick={() => openModal(vendor)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No vendors found.</p>
      )}

      {/* Modal for viewing vendor details */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-lg">
            <h2 className="text-xl font-bold mb-4">{selectedVendor.vendorName}</h2>
            <p className="mb-2">
              <strong>Shop Name:</strong> {selectedVendor.shopName}
            </p>
            <p className="mb-2">
              <strong>Shop Address:</strong> {selectedVendor.shopAddress}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {selectedVendor.phone}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {selectedVendor.email}
            </p>
            <p className="mb-4">
              <strong>Services:</strong>
              <ul className="list-disc list-inside mt-2">
                {selectedVendor.service?.map((s, i) => (
                  <li key={i}>{s.serviceName}</li>
                ))}
              </ul>
            </p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendors;
