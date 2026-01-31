"use client";

import { forwardRef } from "react";

/**
 * Delete Confirmation Modal component
 * @param {Object} props
 * @param {Object|null} props.deleteConfirm - The key to delete {id, name}
 * @param {Function} props.onConfirm - Confirm delete handler
 */
export const DeleteConfirmModal = forwardRef(function DeleteConfirmModal(
  { deleteConfirm, onConfirm },
  ref
) {
  return (
    <div
      className="modal fade"
      ref={ref}
      tabIndex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content"
          style={{ border: "2px solid #dc3545", borderRadius: "12px", overflow: "hidden" }}
        >
          <div
            className="modal-header border-0"
            style={{ backgroundColor: "#dc3545", padding: "20px 24px" }}
          >
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <i className="bi bi-exclamation-triangle-fill text-white" style={{ fontSize: "20px" }}></i>
              </div>
              <h5 className="modal-title fw-bold text-white mb-0" id="deleteModalLabel">
                Delete API Key
              </h5>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body py-4 px-4">
            <div className="text-center mb-3">
              <i className="bi bi-trash3-fill" style={{ fontSize: "48px", color: "#dc3545" }}></i>
            </div>
            <p className="text-center mb-2" style={{ fontSize: "16px" }}>
              Are you sure you want to delete the API key{" "}
              <strong className="text-danger">&quot;{deleteConfirm?.name}&quot;</strong>?
            </p>
            <p className="text-center text-muted small mb-0">
              <i className="bi bi-exclamation-circle me-1"></i>
              This action cannot be undone and the key will be permanently removed.
            </p>
          </div>
          <div className="modal-footer border-top-0 justify-content-center pb-4" style={{ gap: "12px" }}>
            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              data-bs-dismiss="modal"
              style={{ borderRadius: "8px" }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger px-4"
              onClick={onConfirm}
              style={{
                borderRadius: "8px",
                backgroundColor: "#dc3545",
                border: "none",
                boxShadow: "0 2px 4px rgba(220, 53, 69, 0.3)",
              }}
            >
              <i className="bi bi-trash me-2"></i>
              Delete Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
