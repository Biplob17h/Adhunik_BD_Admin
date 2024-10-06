import React from "react";
import OrderPageDetails from "./OrderPageDetails";
import useOrders from "../../Hooks/getOrdersHook";

const Order = () => {
  const { orders, orderLoading } = useOrders(); // Destructure orderLoading from the hook

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Orders ({orders.length})
      </h1>

      {/* Loading state */}
      {orderLoading ? (
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" />
          <p className="mt-2 text-gray-500">Loading orders...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <OrderPageDetails key={index} order={order}></OrderPageDetails>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No orders available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
