import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../ContextApi/UserContext";

const Login = () => {
  const [error, setError] = useState("");
  const { refresh, setRefresh } = useContext(AuthContext);
  const handleSubmit = (event) => {
    setError("");
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const user = {
      email,
      password,
    };

    fetch("http://localhost:5000/api/v1/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Admin login successful");
          localStorage.setItem("adhunikAdmin", JSON.stringify(data?.adminData));
          setRefresh(!refresh);
        }
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Admin Login</h1>
        </div>
        <div className="card bg-base-100  w-[400px] shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
