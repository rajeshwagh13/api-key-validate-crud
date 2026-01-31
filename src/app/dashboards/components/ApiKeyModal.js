"use client";

import { forwardRef } from "react";

/**
 * API Key Create/Edit Modal component
 * @param {Object} props
 * @param {Object|null} props.editingKey - The key being edited (null for create)
 * @param {Object} props.formData - Form data state
 * @param {Function} props.setFormData - Function to update form data
 * @param {boolean} props.submitting - Submission loading state
 * @param {Function} props.onSubmit - Form submission handler
 */
export const ApiKeyModal = forwardRef(function ApiKeyModal(
  { editingKey, formData, setFormData, submitting, onSubmit },
  ref
) {
  const isEditing = !!editingKey;

  return (
    <div
      className="modal fade"
      ref={ref}
      tabIndex="-1"
      aria-labelledby="createModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "500px" }}>
        <div className="modal-content" style={{ border: "1px solid #e0e0e0", borderRadius: "12px" }}>
          <div className="modal-header border-0 pb-0" style={{ padding: "24px 24px 8px 24px" }}>
            <div className="w-100">
              <h5 className="modal-title fw-bold mb-2" id="createModalLabel" style={{ fontSize: "20px" }}>
                {isEditing ? "Edit API Key" : "Create a new API key"}
              </h5>
              {!isEditing && (
                <p className="text-muted small mb-0" style={{ fontSize: "14px" }}>
                  Enter a name and limit for the new API key.
                </p>
              )}
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ marginTop: "-8px" }}
            ></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body" style={{ padding: "24px" }}>
              {/* Key Name */}
              <div className="mb-4">
                <label htmlFor="name" className="form-label fw-medium mb-2" style={{ fontSize: "14px" }}>
                  Key Name <span className="text-muted fw-normal">— A unique name to identify this key</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Key Name"
                  required
                  style={{
                    borderColor: "#e0e0e0",
                    padding: "10px 12px",
                    fontSize: "14px",
                  }}
                />
              </div>

              {/* Key Type - Only show for create */}
              {!isEditing && (
                <div className="mb-4">
                  <label className="form-label fw-medium mb-3" style={{ fontSize: "14px" }}>
                    Key Type <span className="text-muted fw-normal">— Choose the environment for this key</span>
                  </label>
                  <div className="d-flex flex-column gap-2">
                    {/* Development Option */}
                    <KeyTypeOption
                      type="dev"
                      label="Development"
                      description="Rate limited to 100 requests/minute"
                      icon="bi-code-slash"
                      selected={formData.type === "dev"}
                      onSelect={() => setFormData({ ...formData, type: "dev" })}
                    />

                    {/* Production Option */}
                    <KeyTypeOption
                      type="prod"
                      label="Production"
                      description="Rate limited to 1,000 requests/minute"
                      icon="bi-rocket-takeoff"
                      selected={formData.type === "prod"}
                      onSelect={() => setFormData({ ...formData, type: "prod" })}
                    />
                  </div>
                </div>
              )}

              {/* Limit Monthly Usage - Only show for create */}
              {!isEditing && (
                <div className="mb-3">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="limitMonthlyUsage"
                      checked={formData.limitMonthlyUsage ?? true}
                      onChange={(e) => setFormData({ ...formData, limitMonthlyUsage: e.target.checked })}
                      style={{ marginTop: "0.25rem" }}
                    />
                    <label className="form-check-label fw-medium" htmlFor="limitMonthlyUsage" style={{ fontSize: "14px" }}>
                      Limit monthly usage<span className="text-danger">*</span>
                    </label>
                  </div>
                  {(formData.limitMonthlyUsage ?? true) && (
                    <div className="mb-3" style={{ marginLeft: "24px" }}>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.monthlyLimit ?? 1000}
                        onChange={(e) => setFormData({ ...formData, monthlyLimit: parseInt(e.target.value) || 1000 })}
                        min="1"
                        style={{
                          borderColor: "#e0e0e0",
                          padding: "10px 12px",
                          fontSize: "14px",
                          maxWidth: "200px",
                        }}
                      />
                    </div>
                  )}
                  <p className="text-muted small mb-0" style={{ fontSize: "12px", marginLeft: "24px" }}>
                    <span className="text-danger">*</span> If the combined usage of all your keys exceeds your
                    account&apos;s allocated usage limit (plan, add-ons, and any pay-as-you-go limit), all requests will
                    be rejected.
                  </p>
                </div>
              )}
            </div>
            <div
              className="modal-footer border-top d-flex justify-content-end gap-2"
              style={{ borderColor: "#e0e0e0", padding: "16px 24px" }}
            >
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                style={{
                  borderColor: "#e0e0e0",
                  backgroundColor: "#ffffff",
                  color: "#333",
                  padding: "8px 16px",
                  fontSize: "14px",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn text-white"
                disabled={submitting}
                style={{
                  backgroundColor: "#667eea",
                  border: "none",
                  padding: "8px 16px",
                  fontSize: "14px",
                }}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : isEditing ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

/**
 * Key Type Selection Option component
 */
function KeyTypeOption({ type, label, description, icon, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{
        border: `2px solid ${selected ? "#667eea" : "#e0e0e0"}`,
        borderRadius: "8px",
        padding: "16px",
        cursor: "pointer",
        backgroundColor: selected ? "#f3f4ff" : "#ffffff",
        transition: "all 0.2s",
        opacity: selected ? 1 : 0.7,
      }}
    >
      <div className="d-flex align-items-start">
        <div
          className="rounded-circle d-flex align-items-center justify-content-center me-3"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: selected ? "#667eea" : "#f5f5f5",
            color: selected ? "#ffffff" : "#666",
            flexShrink: 0,
          }}
        >
          <i className={`bi ${icon}`} style={{ fontSize: "18px" }}></i>
        </div>
        <div className="flex-grow-1">
          <div className="d-flex align-items-center mb-1">
            <div
              className="rounded-circle me-2"
              style={{
                width: "16px",
                height: "16px",
                border: `2px solid ${selected ? "#667eea" : "#ccc"}`,
                backgroundColor: selected ? "#667eea" : "transparent",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selected && (
                <div
                  className="rounded-circle"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#ffffff",
                  }}
                ></div>
              )}
            </div>
            <span className="fw-medium" style={{ fontSize: "15px" }}>
              {label}
            </span>
          </div>
          <p className="text-muted small mb-0" style={{ fontSize: "13px", marginLeft: "24px" }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
