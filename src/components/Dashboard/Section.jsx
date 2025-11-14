import React from "react";

export default function Section({ title, items }) {
  return (
    <div className="mb-5">
      <h3 className="section-title">{title}</h3>
      <div className="row">
        {items.map((item) => (
          <div
            className="col-lg-3 col-md-6 col-sm-12 mb-4"
            key={item.id || item._id}
          >
            <div className="card modern-card h-100">
              {(item.image || item.imageCover) && (
                <img
                  src={item.image ? item.image : item.imageCover}
                  className="card-img-top"
                  alt={item.name}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{item.name || item.title}</h5>
                <p className="card-text text-muted">{item.slug}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
