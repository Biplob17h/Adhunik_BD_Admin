import React, { useContext, useEffect, useState } from "react";
import { MainApiLink } from "../../App";
import { Link, Outlet } from "react-router-dom";

const VendorApplication = () => {
  const [vendors, setVendors] = useState([]);
  const [applications, setApplications] = useState([]);

  console.log(applications);

  useEffect(() => {
    fetch(`${MainApiLink}/api/v1/application/getAllApplication`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApplications(data.applications);
      });
  }, []);
  return (
    <div>
      <h1 className="text-center mt-10 text-4xl font-bold">
        Vendor application
      </h1>
      {/* main div */}
      <div className="flex">
        {/* first section */}
        <section className="mt-20 mx-5 flex w-4/12">
          <div className="overflow-x-auto">
            <table className="table">
              <tbody className="flex flex-col">
                {applications.map((application) => (
                  <Link
                    className="cursor-pointer pt-5"
                    to={`/application/single/${application?._id}`}
                  >
                    <tr key={application?._id} className="">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={
                                  application.vendor?.vendorPhoto
                                    ? application.vendor.vendorPhoto
                                    : "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png"
                                }
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="font-bold">
                            {application.vendor?.vendorName}
                          </div>
                        </div>
                      </td>
                      <td>
                        <button
                          className={`font-bold ${
                            application.vendor?.status === "active"
                              ? "text-green-600"
                              : application.vendor?.status === "rejected"
                              ? "text-red-600"
                              : ""
                          }`}
                        >
                          {application.vendor?.status}
                        </button>
                      </td>
                    </tr>
                  </Link>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="min-h-[80vh] w-8/12 mt-20 border-2 mr-5 "></section>
      </div>
    </div>
  );
};

export default VendorApplication;
