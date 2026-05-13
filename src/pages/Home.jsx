import React from "react";

import {
  MapPin,
  AlertTriangle,
  ShieldCheck,
  ClipboardList,
  CheckCircle,
  Users,
} from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";

const stats = [
  {
    label: "Issues Reported",
    value: "1,245",
    icon: ClipboardList,
  },

  {
    label: "Issues Resolved",
    value: "932",
    icon: CheckCircle,
  },

  {
    label: "Active Citizens",
    value: "3,500+",
    icon: Users,
  },
];

const features = [
  {
    title: "Instant Reporting",
    description:
      "Upload civic issues with live location and images in seconds.",

    icon: AlertTriangle,
  },

  {
    title: "Live Tracking",
    description:
      "Track complaint progress from submission to resolution transparently.",

    icon: MapPin,
  },

  {
    title: "Verified Resolution",
    description:
      "Citizens can monitor government action and accountability in real-time.",

    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <div className="space-y-24">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-500 text-white rounded-3xl px-6 md:px-16 py-20 shadow-card overflow-hidden relative">
        
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Build Smarter Cities Together
          </h1>

          <p className="text-lg md:text-xl mt-6 text-blue-100">
            Report potholes, broken streetlights, garbage issues,
            and infrastructure problems directly from your phone.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            
            <a
              href="/report"
              className="bg-white text-primary-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Report an Issue
            </a>

            <a
              href="/track"
              className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-700 transition"
            >
              Track Complaints
            </a>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <SectionHeading
          title="Platform Impact"
          subtitle="Empowering citizens through transparent civic reporting."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              Icon={stat.icon}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section>
        <SectionHeading
          title="Why CivicTrack?"
          subtitle="A smarter way to connect citizens with local authorities."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl shadow-card p-8 hover:shadow-xl transition"
            >
              <feature.icon className="w-12 h-12 text-primary-600 mb-4" />

              <h3 className="text-2xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 text-white rounded-3xl p-12 text-center shadow-card">
        
        <h2 className="text-4xl font-bold">
          Start Improving Your City Today
        </h2>

        <p className="text-lg text-blue-100 mt-4 max-w-2xl mx-auto">
          Every report contributes toward safer roads,
          cleaner neighborhoods, and better infrastructure.
        </p>

        <a
          href="/report"
          className="inline-block mt-8 bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Submit Complaint
        </a>
      </section>

    </div>
  );
}