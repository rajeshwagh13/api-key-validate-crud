"use client";

/**
 * Sidebar toggle button (visible when sidebar is closed)
 * @param {Object} props
 * @param {Function} props.onOpen - Function to open sidebar
 */
export function SidebarToggle({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="btn position-fixed d-flex align-items-center justify-content-center"
      style={{
        top: "20px",
        left: "20px",
        width: "44px",
        height: "44px",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        zIndex: 1050,
        transition: "all 0.3s ease",
      }}
      title="Open Sidebar"
    >
      <i className="bi bi-list text-white" style={{ fontSize: "22px" }}></i>
    </button>
  );
}
