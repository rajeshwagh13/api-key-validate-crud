"use client";

/**
 * Top navigation bar component
 */
export function TopBar() {
  return (
    <div
      className="d-flex justify-content-between align-items-center p-4 border-bottom"
      style={{ backgroundColor: "#ffffff", borderColor: "#e0e0e0" }}
    >
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0" style={{ fontSize: "14px" }}>
            <li className="breadcrumb-item text-muted">Pages</li>
            <li className="breadcrumb-item active">Overview</li>
          </ol>
        </nav>
        <h1 className="h4 mb-0 mt-1 fw-bold">Overview</h1>
      </div>
      <div className="d-flex align-items-center gap-3">
        <span className="d-flex align-items-center text-muted small">
          <span
            className="rounded-circle me-2"
            style={{ width: "8px", height: "8px", backgroundColor: "#4caf50" }}
          ></span>
          Operational
        </span>
      </div>
    </div>
  );
}
