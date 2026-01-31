"use client";

import { maskApiKey } from "../utils/apiKeyUtils";

/**
 * API Keys table component
 * @param {Object} props
 * @param {Array} props.apiKeys - List of API keys
 * @param {boolean} props.loading - Loading state
 * @param {Object} props.showKey - Visibility state for each key
 * @param {Function} props.onToggleVisibility - Toggle key visibility
 * @param {Function} props.onCopy - Copy key to clipboard
 * @param {Function} props.onEdit - Open edit modal
 * @param {Function} props.onDelete - Open delete confirmation
 * @param {Function} props.onCreateNew - Open create modal
 */
export function ApiKeysTable({
  apiKeys,
  loading,
  showKey,
  onToggleVisibility,
  onCopy,
  onEdit,
  onDelete,
  onCreateNew,
}) {
  const tableHeaderStyle = {
    padding: "12px 16px",
    fontSize: "11px",
    letterSpacing: "0.5px",
    borderBottom: "1px solid #e0e0e0",
  };

  const actionButtonStyle = {
    backgroundColor: "transparent",
    border: "none",
    color: "#666",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 fw-bold mb-0">API Keys</h2>
        <button
          className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
          onClick={onCreateNew}
          style={{
            width: "28px",
            height: "28px",
            backgroundColor: "#f5f5f5",
            border: "none",
            color: "#666",
          }}
          title="Create new API key"
        >
          <i className="bi bi-plus" style={{ fontSize: "18px" }}></i>
        </button>
      </div>

      {/* Table Card */}
      <div
        className="rounded"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e0e0e0",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-muted" role="status" style={{ width: "2rem", height: "2rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : apiKeys.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-key fs-1 text-muted d-block mb-3"></i>
            <p className="text-muted">No API keys found. Create your first one!</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr style={{ backgroundColor: "#f8f9fa" }}>
                  <th className="text-uppercase small fw-medium text-muted" style={tableHeaderStyle}>
                    Name
                  </th>
                  <th className="text-uppercase small fw-medium text-muted" style={tableHeaderStyle}>
                    Type
                  </th>
                  <th className="text-uppercase small fw-medium text-muted" style={tableHeaderStyle}>
                    Usage
                  </th>
                  <th className="text-uppercase small fw-medium text-muted" style={tableHeaderStyle}>
                    Key
                  </th>
                  <th className="text-uppercase small fw-medium text-muted" style={tableHeaderStyle}>
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr
                    key={key.id}
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: "600",
                        color: "#000",
                      }}
                    >
                      {key.name}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        color: "#666",
                      }}
                    >
                      dev
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        color: "#666",
                      }}
                    >
                      {(key.usageCount || 0).toLocaleString()}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <code
                        style={{
                          backgroundColor: "#f5f5f5",
                          padding: "6px 10px",
                          borderRadius: "4px",
                          fontSize: "13px",
                          fontFamily: "monospace",
                          color: "#333",
                          display: "inline-block",
                        }}
                      >
                        {showKey[key.id] ? key.key : maskApiKey(key.key)}
                      </code>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm p-1"
                          onClick={() => onToggleVisibility(key.id)}
                          style={actionButtonStyle}
                          title={showKey[key.id] ? "Hide" : "Show"}
                        >
                          <i className={showKey[key.id] ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                        </button>
                        <button
                          className="btn btn-sm p-1"
                          onClick={() => onCopy(key.key)}
                          style={actionButtonStyle}
                          title="Copy"
                        >
                          <i className="bi bi-clipboard"></i>
                        </button>
                        <button
                          className="btn btn-sm p-1"
                          onClick={() => onEdit(key)}
                          style={actionButtonStyle}
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm p-1"
                          onClick={() => onDelete(key.id, key.name)}
                          style={actionButtonStyle}
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
