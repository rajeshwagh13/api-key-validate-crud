"use client";

import { forwardRef } from "react";

/**
 * Toast notification component
 * @param {Object} props
 * @param {Object} props.toast - Toast state {show, message, type}
 */
export const Toast = forwardRef(function Toast({ toast }, ref) {
  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return "bi-check-circle-fill";
      case "danger":
        return "bi-exclamation-triangle-fill";
      default:
        return "bi-info-circle-fill";
    }
  };

  const getTitle = () => {
    switch (toast.type) {
      case "success":
        return "Success";
      case "danger":
        return "Error";
      default:
        return "Warning";
    }
  };

  const getBgClass = () => {
    switch (toast.type) {
      case "success":
        return "bg-success";
      case "danger":
        return "bg-danger";
      default:
        return "bg-warning";
    }
  };

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1055 }}>
      <div
        ref={ref}
        className={`toast ${toast.show ? "show" : ""}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className={`toast-header ${getBgClass()} text-white`}>
          <i className={`bi me-2 ${getIcon()}`}></i>
          <strong className="me-auto">{getTitle()}</strong>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{toast.message}</div>
      </div>
    </div>
  );
});
