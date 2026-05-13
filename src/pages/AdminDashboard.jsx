import React, {
  useEffect,
  useState,
} from "react";

import SectionHeading from "../components/SectionHeading";

import {
  getComplaints,
  deleteComplaint,
  updateComplaintStatus,
} from "../services/complaintService";

export default function AdminDashboard() {
  const [complaints, setComplaints] =
    useState([]);

  // Fetch complaints
  useEffect(() => {
    const loadComplaints =
      async () => {
        try {
          const data =
            await getComplaints();

          setComplaints(data);

        } catch (error) {
          console.error(error);
        }
      };

    loadComplaints();
  }, []);

  // Update status
  const handleStatusUpdate =
    async (id, status) => {
      try {
        await updateComplaintStatus(
          id,
          status
        );

        const updatedComplaints =
          complaints.map(
            (complaint) =>
              complaint.id === id
                ? {
                    ...complaint,
                    status,
                  }
                : complaint
          );

        setComplaints(
          updatedComplaints
        );

      } catch (error) {
        console.error(error);
      }
    };

  // Delete complaint
  const handleDelete =
    async (id) => {
      try {
        await deleteComplaint(id);

        const updatedComplaints =
          complaints.filter(
            (complaint) =>
              complaint.id !== id
          );

        setComplaints(
          updatedComplaints
        );

      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="space-y-8">

      <SectionHeading
        title="Admin Dashboard"
        subtitle="Manage and monitor reported civic issues."
      />

      <div className="overflow-x-auto bg-white rounded-2xl shadow-card">

        <table className="w-full text-left border-collapse">

          <thead className="bg-primary-600 text-white">
            <tr>
              <th className="p-4">
                Issue
              </th>

              <th className="p-4">
                Category
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {complaints.length >
            0 ? (

              complaints.map(
                (complaint) => (
                  <tr
                    key={
                      complaint.id
                    }
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="p-4">

                      <div>
                        <h3 className="font-semibold">
                          {
                            complaint.title
                          }
                        </h3>

                        <p className="text-sm text-gray-500">
                          {
                            complaint.description
                          }
                        </p>
                      </div>

                    </td>

                    <td className="p-4">
                      {
                        complaint.category
                      }
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          complaint.status ===
                          "open"
                            ? "bg-yellow-100 text-yellow-700"

                            : complaint.status ===
                              "in_progress"
                            ? "bg-blue-100 text-blue-700"

                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {
                          complaint.status
                        }
                      </span>

                    </td>

                    <td className="p-4">

                      <div className="flex flex-wrap gap-2">

                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              complaint.id,
                              "in_progress"
                            )
                          }
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                        >
                          In Progress
                        </button>

                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              complaint.id,
                              "resolved"
                            )
                          }
                          className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                        >
                          Resolve
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              complaint.id
                            )
                          }
                          className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                        >
                          Delete
                        </button>

                      </div>

                    </td>
                  </tr>
                )
              )

            ) : (

              <tr>
                <td
                  colSpan="4"
                  className="text-center p-8 text-gray-500"
                >
                  No complaints found.
                </td>
              </tr>

            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}