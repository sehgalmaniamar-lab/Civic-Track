import React, { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
 Popup,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import SectionHeading from "../components/SectionHeading";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const storedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    setComplaints(storedComplaints);
  }, []);

  // Dynamic map center
  const defaultCenter =
    complaints.length > 0 &&
    complaints[0].latitude &&
    complaints[0].longitude
      ? [
          complaints[0].latitude,
          complaints[0].longitude,
        ]
      : [28.6139, 77.2090];

  return (
    <div className="space-y-8">
      <SectionHeading
        title="City Issue Map"
        subtitle="View reported civic complaints across the city."
      />

      <div className="rounded-2xl overflow-hidden shadow-card">
        <MapContainer
          center={defaultCenter}
          zoom={12}
          scrollWheelZoom={true}
          className="h-[600px] w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {complaints.map((complaint) => {
            // Skip complaints without coordinates
            if (
              !complaint.latitude ||
              !complaint.longitude
            ) {
              return null;
            }

            return (
              <Marker
                key={complaint.id}
                position={[
                  complaint.latitude,
                  complaint.longitude,
                ]}
              >
                <Popup>
                  <div className="space-y-2 min-w-[200px]">
                    <h3 className="font-semibold text-lg">
                      {complaint.title}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {complaint.description}
                    </p>

                    <div className="flex justify-between text-sm">
                      <span className="font-medium">
                        Category:
                      </span>

                      <span>{complaint.category}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="font-medium">
                        Status:
                      </span>

                      <span>{complaint.status}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}