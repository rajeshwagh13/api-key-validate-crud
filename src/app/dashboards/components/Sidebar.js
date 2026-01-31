"use client";

import Link from "next/link";

/**
 * Sidebar navigation component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether sidebar is visible
 * @param {Function} props.onClose - Function to close sidebar
 */
export function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { icon: "bi-house-door-fill", label: "Overview", active: true, href: "/dashboards" },
    { icon: "bi-stars", label: "Research Assistant", active: false, href: null },
    { icon: "bi-file-text", label: "Research Reports", active: false, href: null },
    { icon: "bi-code-slash", label: "API Playground", active: false, href: "/playground" },
    { icon: "bi-receipt", label: "Invoices", active: false, href: null },
    { icon: "bi-book", label: "Documentation", active: false, href: null },
  ];

  return (
    <>
      {/* Sidebar Overlay (for mobile) */}
      {isOpen && (
        <div
          className="d-md-none position-fixed"
          onClick={onClose}
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1040,
          }}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className="d-flex flex-column"
        style={{
          width: "280px",
          background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          position: "fixed",
          height: "100vh",
          overflowY: "auto",
          boxShadow: "4px 0 20px rgba(0, 0, 0, 0.15)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          zIndex: 1045,
        }}
      >
        {/* Logo */}
        <div
          className="p-4 d-flex align-items-center justify-content-between"
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          <Link href="/" className="text-decoration-none d-flex align-items-center">
            <div
              className="d-flex align-items-center justify-content-center me-3"
              style={{
                width: "42px",
                height: "42px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              }}
            >
              <i className="bi bi-key-fill text-white" style={{ fontSize: "20px" }}></i>
            </div>
            <div>
              <span className="fw-bold text-white" style={{ fontSize: "18px", letterSpacing: "0.5px" }}>
                API Manager
              </span>
              <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.5)", marginTop: "2px" }}>
                Dashboard v1.0
              </div>
            </div>
          </Link>
          {/* Close Sidebar Button */}
          <button
            onClick={onClose}
            className="btn p-0 d-flex align-items-center justify-content-center"
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "none",
              borderRadius: "8px",
              transition: "all 0.2s ease",
            }}
            title="Close Sidebar"
          >
            <i className="bi bi-chevron-left text-white" style={{ fontSize: "16px" }}></i>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-grow-1 py-4 px-3">
          {navItems.map((item, index) => {
            const navItemContent = (
              <>
                <i
                  className={`bi ${item.icon} me-3`}
                  style={{
                    color: item.active ? "#a78bfa" : "rgba(255, 255, 255, 0.5)",
                    fontSize: "18px",
                  }}
                ></i>
                <span
                  style={{
                    fontSize: "14px",
                    color: item.active ? "#a78bfa" : "rgba(255, 255, 255, 0.7)",
                    fontWeight: item.active ? "500" : "normal",
                  }}
                >
                  {item.label}
                </span>
              </>
            );

            const navItemStyle = {
              borderRadius: "8px",
              backgroundColor: item.active ? "rgba(139, 92, 246, 0.15)" : "transparent",
              cursor: "pointer",
              transition: "all 0.2s ease",
              textDecoration: "none",
            };

            if (item.href) {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="d-flex align-items-center px-3 py-2 mb-1"
                  style={navItemStyle}
                >
                  {navItemContent}
                </Link>
              );
            }

            return (
              <div
                key={index}
                className="d-flex align-items-center px-3 py-2 mb-1"
                style={navItemStyle}
              >
                {navItemContent}
              </div>
            );
          })}
        </div>

        {/* Upgrade Card */}
        <div className="px-3 pb-3">
          <div
            className="p-3"
            style={{
              background: "linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-stars text-warning me-2" style={{ fontSize: "18px" }}></i>
              <span className="fw-bold text-white" style={{ fontSize: "14px" }}>
                Upgrade Plan
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "12px" }}>
              Get more API calls and premium features
            </p>
            <button
              className="btn w-100"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "10px",
                fontSize: "13px",
                fontWeight: "600",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              }}
            >
              Upgrade Now
            </button>
          </div>
        </div>

        {/* User Section */}
        <div
          className="p-3"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="d-flex align-items-center">
            <div
              className="d-flex align-items-center justify-content-center me-3"
              style={{
                width: "44px",
                height: "44px",
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(240, 147, 251, 0.3)",
              }}
            >
              <span className="text-white fw-bold" style={{ fontSize: "16px" }}>
                JD
              </span>
            </div>
            <div className="flex-grow-1">
              <div className="text-white fw-medium" style={{ fontSize: "14px" }}>
                John Doe
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}>
                john@example.com
              </div>
            </div>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <i className="bi bi-three-dots-vertical" style={{ color: "rgba(255, 255, 255, 0.6)" }}></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
