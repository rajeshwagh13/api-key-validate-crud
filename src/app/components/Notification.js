"use client";

import { useEffect } from "react";

/**
 * Notification popup component
 * @param {Object} props
 * @param {boolean} props.show - Whether to show the notification
 * @param {string} props.message - Notification message
 * @param {string} props.type - Notification type: "success" | "error" | "warning" | "info"
 * @param {Function} props.onClose - Function to close notification
 * @param {number} props.duration - Auto-close duration in ms (default: 4000)
 */
export function Notification({ show, message, type = "success", onClose, duration = 4000 }) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const getStyles = () => {
    switch (type) {
      case "success":
        return {
          backgroundColor: "#10b981",
          icon: "bi-check-circle-fill",
        };
      case "error":
        return {
          backgroundColor: "#ef4444",
          icon: "bi-x-circle-fill",
        };
      case "warning":
        return {
          backgroundColor: "#f59e0b",
          icon: "bi-exclamation-triangle-fill",
        };
      case "info":
      default:
        return {
          backgroundColor: "#3b82f6",
          icon: "bi-info-circle-fill",
        };
    }
  };

  const { backgroundColor, icon } = getStyles();

  return (
    <div
      className="position-fixed d-flex align-items-center gap-3 px-4 py-3 shadow-lg"
      style={{
        top: "20px",
        right: "20px",
        backgroundColor,
        color: "#ffffff",
        borderRadius: "12px",
        zIndex: 9999,
        minWidth: "300px",
        maxWidth: "450px",
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <i className={`bi ${icon}`} style={{ fontSize: "24px" }}></i>
      <span style={{ flex: 1, fontSize: "14px", fontWeight: "500" }}>{message}</span>
      <button
        onClick={onClose}
        className="btn p-0 d-flex align-items-center justify-content-center"
        style={{
          width: "24px",
          height: "24px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          border: "none",
          borderRadius: "6px",
          color: "#ffffff",
        }}
      >
        <i className="bi bi-x" style={{ fontSize: "16px" }}></i>
      </button>
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
