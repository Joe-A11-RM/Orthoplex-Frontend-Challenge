import React from "react";

export default function Cards({ list, title }) {
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="metric-card">
          <h4 className="text-capitalize">total {title}</h4>
          <p>{list?.length || 0}</p>
        </div>
      </div>
    </>
  );
}
