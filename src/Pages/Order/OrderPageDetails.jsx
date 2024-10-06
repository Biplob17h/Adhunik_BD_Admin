import React from "react";
import { Link } from "react-router-dom";

const OrderPageDetails = ({ order }) => {
  return (
    <Link
      to={`/order/${order._id}`}
      className="bg-white shadow-md rounded-lg p-6 border border-gray-200 cursor-pointer"
    >
      {/* User Information (Updated) */}
      <p className="mb-2 text-xl">
        <strong className="">C. Name:</strong>{" "}
        <span className="font-semibold">{order?.customerName}</span>
      </p>
      <p className="mb-2">
        <strong>C. Phone:</strong> {order?.customerPhone}
      </p>
      <p className="mb-2">
        <strong>C. Email:</strong> {order?.customerEmail}
      </p>

      {/* Service Information */}
      <p className="mb-2">
        <strong>Service Name:</strong> {order?.service?.name}
      </p>
      <p className="mb-2">
        <strong>Service Price:</strong> {order?.service?.price} BDT
      </p>

      {/* Order Information */}
      <p className="mb-2">
        <strong>Date & Time:</strong> {order?.date}, {order?.time}
      </p>
      <p className="mb-2">
        <strong>Location:</strong> {order?.location}, {order?.area},{" "}
        {order?.rode}, House: {order?.house}
      </p>
      {/* this will modify later */}
      <p className="mb-2">
        <strong>Coupon:</strong> {`no coupon available`}
      </p>

      {/* Order Status */}
      <p className="mb-2">
        <strong>Status:</strong>{" "}
        <span
          className={`${
            order.status === "new" ? "text-green-600" : "text-yellow-600"
          } font-semibold`}
        >
          {order?.status}
        </span>
      </p>

      {/* Additional Information */}
      <p className="mb-2">
        <strong>Discount:</strong> {order?.discount} BDT
      </p>
      <p className="mb-2">
        <strong>Total Price:</strong> {order?.totalPrice} BDT
      </p>

      <p className="mt-4 text-sm text-gray-500">
        Ordered on: {new Date(order?.orderAt).toLocaleDateString()}
      </p>
    </Link>
  );
};

export default OrderPageDetails;
