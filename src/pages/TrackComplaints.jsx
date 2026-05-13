import React, { useEffect, useState } from "react";

import SectionHeading from "../components/SectionHeading";
import ComplaintCard from "../components/ComplaintCard";
import EmptyState from "../components/EmptyState";
import Modal from "../components/Modal";

import {
  getComplaints,
  deleteComplaint as removeComplaint,
} from "../services/complaintService";

export default function TrackComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] =
    useState("all");

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  // Fetch complaints from backend
  useEffect(() => {
    const loadComplaints = async () => {
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

  // Delete complaint
  const handleDelete = async (id) => {
    try {
      await removeComplaint(id);

      const updatedComplaints =
        complaints.filter(
          (complaint) =>
            complaint.id !== id
        );

      setComplaints(updatedComplaints);

    } catch (error) {
      console.error(error);
    }
  };

  // Search + filter
  const filteredComplaints =
    complaints.filter((complaint) => {

      const matchesSearch =
        complaint.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        complaint.category
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =
        filterStatus === "all" ||
        complaint.status ===
          filterStatus;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  return (
    <div className="max-w-6xl mx-auto">

      <SectionHeading
        title="Track Complaints"
        subtitle="Monitor submitted civic issues and resolution progress."
      />

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mt-8">

        <input
          type="text"
          placeholder="Search complaints..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value
            )
          }
          className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">
            All Status
          </option>

          <option value="open">
            Open
          </option>

          <option value="in_progress">
            In Progress
          </option>

          <option value="resolved">
            Resolved
          </option>

        </select>
      </div>

      {/* Complaints */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">

        {filteredComplaints.length >
        0 ? (

          filteredComplaints.map(
            (complaint) => (
              <ComplaintCard
                key={complaint.id}
                id={complaint.id}
                title={
                  complaint.title
                }
                description={
                  complaint.description
                }
                category={
                  complaint.category
                }
                status={
                  complaint.status
                }
                imageUrl={
                  complaint.image
                }
                date={
                  complaint.created_at
                }
                onDelete={
                  handleDelete
                }
                onView={(id) => {
                  const complaint =
                    complaints.find(
                      (c) =>
                        c.id === id
                    );

                  setSelectedComplaint(
                    complaint
                  );
                }}
              />
            )
          )

        ) : (

          <div className="col-span-full">
            <EmptyState
              title="No Complaints Found"
              description="You haven't submitted any complaints yet."
            />
          </div>

        )}

      </div>

      {/* Modal */}
      <Modal
        isOpen={
          !!selectedComplaint
        }
        onClose={() =>
          setSelectedComplaint(
            null
          )
        }
        title="Complaint Details"
      >

        {selectedComplaint && (
          <div className="space-y-4">

            {selectedComplaint.image && (
              <img
                src={
                  selectedComplaint.image
                }
                alt={
                  selectedComplaint.title
                }
                className="w-full h-64 object-cover rounded-xl"
              />
            )}

            <div>
              <h3 className="text-xl font-semibold">
                {
                  selectedComplaint.title
                }
              </h3>

              <p className="text-gray-600 mt-2">
                {
                  selectedComplaint.description
                }
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">

              <div>
                <span className="font-semibold">
                  Category:
                </span>

                <p>
                  {
                    selectedComplaint.category
                  }
                </p>
              </div>

              <div>
                <span className="font-semibold">
                  Status:
                </span>

                <p>
                  {
                    selectedComplaint.status
                  }
                </p>
              </div>

              <div>
                <span className="font-semibold">
                  Latitude:
                </span>

                <p>
                  {selectedComplaint.latitude?.toFixed(
                    4
                  )}
                </p>
              </div>

              <div>
                <span className="font-semibold">
                  Longitude:
                </span>

                <p>
                  {selectedComplaint.longitude?.toFixed(
                    4
                  )}
                </p>
              </div>

            </div>
          </div>
        )}

      </Modal>
    </div>
  );
}