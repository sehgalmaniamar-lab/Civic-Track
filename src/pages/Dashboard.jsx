import React, {
  useEffect,
  useState,
} from "react";

import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";
import ComplaintCard from "../components/ComplaintCard";

import {
  User,
  AlertCircle,
  ClipboardList,
} from "lucide-react";

import {
  getComplaints,
} from "../services/complaintService";

export default function Dashboard() {
  const [recentComplaints,
    setRecentComplaints] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  // Fetch complaints
  useEffect(() => {
    const loadComplaints =
      async () => {
        try {
          const data =
            await getComplaints();

          setTimeout(() => {
            setRecentComplaints(
              data.slice(0, 2)
            );

            setLoading(false);

          }, 800);

        } catch (error) {
          console.error(error);
        }
      };

    loadComplaints();
  }, []);

  // Stats
  const totalReports =
    recentComplaints.length;

  const pendingReports =
    recentComplaints.filter(
      (c) =>
        c.status === "open"
    ).length;

  const resolvedReports =
    recentComplaints.filter(
      (c) =>
        c.status === "resolved"
    ).length;

  const stats = [
    {
      label: "My Reports",
      value: totalReports,
      icon: ClipboardList,
    },

    {
      label: "Pending",
      value: pendingReports,
      icon: AlertCircle,
    },

    {
      label: "Resolved",
      value: resolvedReports,
      icon: User,
    },
  ];

  return (
    <div className="space-y-12 p-4 md:p-8">

      {/* Greeting */}
      <section className="bg-primary-600 text-white rounded-xl p-6">

        <h2 className="text-2xl font-semibold">
          Welcome back, Citizen!
        </h2>

        <p className="mt-2">
          Here’s a quick overview of your activity.
        </p>

      </section>

      {/* Stats */}
      <section>

        <SectionHeading
          title="My Statistics"
        />

        <div className="grid md:grid-cols-3 gap-6 mt-4">

          {stats.map((s) => (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
              Icon={s.icon}
            />
          ))}

        </div>
      </section>

      {/* Recent Complaints */}
      <section>

        <SectionHeading
          title="Recent Complaints"
        />

        {loading ? (

          <div className="grid md:grid-cols-2 gap-6 mt-4">

            {[1, 2].map(
              (item) => (
                <div
                  key={item}
                  className="bg-white rounded-2xl p-6 h-40 animate-pulse"
                />
              )
            )}

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6 mt-4">

            {recentComplaints.map(
              (c) => (
                <ComplaintCard
                  key={c.id}
                  id={c.id}
                  title={c.title}
                  description={c.description}
                  category={c.category}
                  status={c.status}
                  imageUrl={c.image}
                  date={c.created_at}
                />
              )
            )}

          </div>

        )}

      </section>
    </div>
  );
}