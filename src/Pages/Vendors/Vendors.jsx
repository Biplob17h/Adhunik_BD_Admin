import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch vendors on component mount
  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/v1/auth/vendor/allVendors`);
        const data = await res.json();
        setVendors(data.vendors);
      } catch (error) {
        toast.error("Failed to fetch vendors");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // Update Vendor Status Function
  const updateVendorStatus = async (vendorId, newStatus) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/auth/vendor/updateStatus`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vendorId, status: newStatus }),
      });

      if (res.ok) {
        toast.success("Vendor status updated successfully!");
        setVendors((prevVendors) =>
          prevVendors.map((vendor) =>
            vendor._id === vendorId ? { ...vendor, status: newStatus } : vendor
          )
        );
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Vendors List</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-sm font-semibold text-gray-700 border">Vendor Name</th>
                <th className="p-4 text-sm font-semibold text-gray-700 border">Shop Name</th>
                <th className="p-4 text-sm font-semibold text-gray-700 border">Shop Address</th>
                <th className="p-4 text-sm font-semibold text-gray-700 border">Phone</th>
                <th className="p-4 text-sm font-semibold text-gray-700 border">Email</th>
                <th className="p-4 text-sm font-semibold text-gray-700 border">Status</th>
                <th className="p-4 text-sm font-semibold text-gray-700 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 text-sm text-gray-700 border">{vendor.vendorName}</td>
                  <td className="p-4 text-sm text-gray-700 border">{vendor.shopName}</td>
                  <td className="p-4 text-sm text-gray-700 border">{vendor.shopAddress}</td>
                  <td className="p-4 text-sm text-gray-700 border">{vendor.phone}</td>
                  <td className="p-4 text-sm text-gray-700 border">{vendor.email}</td>
                  <td className="p-4 text-sm text-gray-700 border">
                    {vendor.status === "active" ? (
                      <span className="text-green-600">Active</span>
                    ) : (
                      <span className="text-red-600">Inactive</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-700 border">
                    {vendor.status === "active" ? (
                      <button
                        onClick={() => updateVendorStatus(vendor._id, "inactive")}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <FaTimesCircle size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => updateVendorStatus(vendor._id, "active")}
                        className="text-green-600 hover:text-green-800 transition"
                      >
                        <FaCheckCircle size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Vendors;

