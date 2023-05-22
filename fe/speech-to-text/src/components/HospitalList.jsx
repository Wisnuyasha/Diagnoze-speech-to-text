import React from "react";

export default function HospitalList({ hospitals }) {
  return (
    <div>
      {hospitals
            ? hospitals
                .sort((a, b) => a.distance - b.distance)
                .map((h) => (
                  <>
                    <p>{h.display_name}</p>
                    <p>Jarak : {h.distance.toFixed(2)} km</p>
                  </>
                ))
            : null}
    </div>
  );
}
