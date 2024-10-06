import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useOrders from "../../Hooks/getOrdersHook";

const OrderPageSingle = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  const { orderRefresh, setOrderRefresh } = useOrders();

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/order/single/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setOrder(data?.order);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const price = form.price.value;
    const customerName = form.customerName.value;
    const customerPhone = form.customerPhone.value;
    const customerEmail = form.customerEmail.value;
    const date = form.date.value;
    const time = form.time.value;
    const location = form.location.value;
    const area = form.area.value;
    const rode = form.rode.value;
    const house = form.house.value;
    const problem = form.problem.value;
    const discount = form.discount.value;
    const coupon = form.coupon.value;

    const totalPrice = parseInt(price) - parseInt(discount);

    const updatedOrder = {
      customerName,
      customerPhone,
      customerEmail,
      date,
      time,
      location,
      area,
      rode,
      house,
      problem,
      discount,
      coupon,
      totalPrice,
    };

    fetch(`http://localhost:5000/api/v1/order/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          navigate("/order");
          toast.success("Order updated successfully!");
          setOrderRefresh(orderRefresh + 1);
        } else {
          toast.error("Failed to update order!");
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-md">
      <div className="flex justify-between mx-10">
        <h2 className="text-3xl font-bold mb-4">Order Details</h2>
        <Link to={"/order"} className="btn btn-ghost w-[100px]">
          Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Service Info (Read-only) */}
        <div>
          <label className="block font-semibold mb-2">Service Name</label>
          <input
            type="text"
            defaultValue={order?.service?.name}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Price</label>
          <input
            readOnly
            type="text"
            name="price"
            defaultValue={order?.service?.price}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Customer Info (Editable) */}
        <div>
          <label className="block font-semibold mb-2">Customer Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            defaultValue={order?.customerName || ""}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Total Price</label>
          <input
            type="number"
            id="totalPrice"
            name="totalPrice"
            readOnly
            defaultValue={order?.totalPrice || ""}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Customer Phone</label>
          <input
            type="text"
            id="customerPhone"
            name="customerPhone"
            defaultValue={order?.customerPhone || ""}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Customer Email</label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            defaultValue={order?.customerEmail || ""}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Order Details (Editable) */}
        <div>
          <label className="block font-semibold mb-2">Date</label>
          <input
            type="text"
            id="date"
            name="date"
            defaultValue={order?.date || ""}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Time</label>
          <input
            type="text"
            id="time"
            name="time"
            defaultValue={order?.time || ""}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={order?.location || ""}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Area</label>
          <input
            type="text"
            id="area"
            name="area"
            defaultValue={order?.area || ""}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Road</label>
          <input
            type="text"
            id="rode"
            name="rode"
            defaultValue={order?.rode || ""}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">House</label>
          <input
            type="text"
            id="house"
            name="house"
            defaultValue={order?.house || ""}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Problem</label>
          <textarea
            id="problem"
            name="problem"
            defaultValue={order?.problem || ""}
            className="w-full border border-gray-300 rounded-md p-2"
            rows="3"
          />
        </div>

        {/* Additional Fields */}
        <div>
          <label className="block font-semibold mb-2">Discount</label>
          <input
            type="number"
            id="discount"
            name="discount"
            defaultValue={order?.discount}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Vendor Section */}
        <div>
          <label className="block font-semibold mb-2">Vendor</label>
          {order?.vendor ? (
            <input
              type="text"
              readOnly
              defaultValue={order?.vendor?.shopName || ""}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          ) : (
            <button
              type="button"
              className="bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Assign Vendor
            </button>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2">Coupon Code</label>
          <input
            type="text"
            id="coupon"
            name="coupon"
            defaultValue={order?.coupon || ""}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Order Status */}
        <div>
          <label className="block font-semibold mb-2">Order Status</label>
          <input
            type="text"
            readOnly
            defaultValue={order?.status || ""}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md mt-4"
          >
            Update Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderPageSingle;
