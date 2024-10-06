import { useEffect, useState } from "react";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderRefresh, setOrderRefresh] = useState(false);

  useEffect(() => {
    setOrderLoading(true);
    fetch(`http://localhost:5000/api/v1/order/all`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders));
    setOrderLoading(false);
  }, [orderRefresh]);

  return { orders, orderRefresh, setOrderRefresh, orderLoading };
};

export default useOrders;
