import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { MainApiLink } from "../../App";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

const VendorApplicationSingle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [application, setApplication] = useState({});
  if (id) {
    useEffect(() => {
      fetch(`http://localhost:5000/api/v1/application/single/${id}`)
        .then((res) => res.json())
        .then((data) => setApplication(data?.data));
    }, []);
  }

  const confirmApplication = () => {
    const newStatus = "active";
    const phone = application?.vendorPhone;

    const update = {
      newStatus,
      phone,
    };

    fetch(`${MainApiLink}/api/v1/application/updateApplicationStatus`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Application Confirmed Successfully");
          navigate("/application");
        }
      });
  };
  const rejectApplication = () => {
    const newStatus = "rejected";
    const phone = application?.vendorPhone;

    const update = {
      newStatus,
      phone,
    };

    fetch(`${MainApiLink}/api/v1/application/updateApplicationStatus`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Application rejected Successfully");
          navigate("/application");
        }
      });
  };

  const handleDeleteApplication = () => {
    const confirmation = window.confirm(
      "Are you sure to delete this application?"
    );
    if (confirmation) {
      fetch(`${MainApiLink}/api/v1/application/deleteApplication/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            toast.success("Application deleted successfully");
            navigate("/application");
          }
        });
    }
  };

  return (
    <div className="card bg-base-100 min-h-screen flex justify-center items-center flex-col shadow-xl">
      <div className="flex">
        <div className="avatar flex justify-center items-center mr-20 ">
          <div className="w-24 rounded-full">
            <img
              src={
                application?.vendor?.vendorPhoto
                  ? application?.vendor?.vendorPhoto
                  : "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png"
              }
            />
          </div>
        </div>
        <div>
          <h1>Vendor Name : {application?.vendor?.vendorName}</h1>
          <h1>Shop Name : {application?.vendor?.shopName}</h1>
          <h1>Shop Address : {application?.vendor?.shopAddress}</h1>
          <h1>email : {application?.vendor?.email}</h1>
          <h1>phone : {application?.vendor?.phone}</h1>
          <h1>NID : {application?.vendor?.nid}</h1>
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center flex-col">
          <div className="flex mt-5">
            {application?.vendor?.shopPhoto <= 0 ? (
              <div className="w-[130px] h-[130px] border-2 flex justify-center items-center cursor-pointer">
                <FaPlus className="" size={30} />
              </div>
            ) : (
              application?.vendor?.shopPhoto.map((photo) => (
                <img
                  className="w-[130px] h-[130px] border-2 "
                  src={photo?.shopPhoto}
                  alt=""
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className=" mt-20">
        {application?.vendor?.status === "pending" && (
          <div className="flex">
            <div className="card-actions ">
              <button
                onClick={() => {
                  confirmApplication();
                }}
                className="btn btn-primary"
              >
                Confirm
              </button>
            </div>
            <div className="card-actions ml-10">
              <button
                onClick={() => {
                  rejectApplication();
                }}
                className="btn btn-primary"
              >
                Reject
              </button>
            </div>
          </div>
        )}
        {application?.vendor?.status === "active" && (
          <div className="flex">
            <div className="card-actions ">
              <button disabled className="btn btn-primary">
                Application Confirmed
              </button>
            </div>
            <div className="card-actions">
              <button
                onClick={() => {
                  handleDeleteApplication();
                }}
                className="btn btn-error ml-5"
              >
                Delete Application
              </button>
            </div>
          </div>
        )}
        {application?.vendor?.status === "rejected" && (
          <div className="flex">
            <div className="card-actions ">
              <button disabled className="btn btn-primary">
                Application Rejected
              </button>
            </div>
            <div className="card-actions ">
              <button
                onClick={() => {
                  handleDeleteApplication();
                }}
                className="btn btn-error ml-5"
              >
                Delete Application
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorApplicationSingle;
