"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Notification } from "../components/Notification";

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showNotification = useCallback((message, type) => {
    setNotification({ show: true, message, type });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, show: false }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!apiKey.trim()) {
      showNotification("Please enter an API key", "warning");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/protected", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      });

      const result = await response.json();

      if (result.success && result.valid) {
        showNotification("Valid API key, /protected can be accessed", "success");
      } else {
        showNotification("Invalid API Key", "error");
      }
    } catch (error) {
      console.error("Error validating API key:", error);
      showNotification("Failed to validate API key", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      {/* Header */}
      <header className="p-4">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <Link href="/dashboards" className="text-decoration-none d-flex align-items-center">
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
                  API Playground
                </div>
              </div>
            </Link>
            <Link
              href="/dashboards"
              className="btn d-flex align-items-center gap-2"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "14px",
              }}
            >
              <i className="bi bi-arrow-left"></i>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
        <div
          className="w-100"
          style={{
            maxWidth: "500px",
          }}
        >
          {/* Card */}
          <div
            className="rounded-4 p-5"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* Icon */}
            <div className="text-center mb-4">
              <div
                className="d-inline-flex align-items-center justify-content-center"
                style={{
                  width: "80px",
                  height: "80px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "20px",
                  boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
                }}
              >
                <i className="bi bi-code-slash text-white" style={{ fontSize: "36px" }}></i>
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-center fw-bold mb-2"
              style={{ fontSize: "28px", color: "#1a1a2e" }}
            >
              API Playground
            </h1>
            <p
              className="text-center mb-4"
              style={{ color: "#6b7280", fontSize: "15px" }}
            >
              Test your API key to verify access to protected endpoints
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="apiKey"
                  className="form-label fw-medium mb-2"
                  style={{ fontSize: "14px", color: "#374151" }}
                >
                  API Key
                </label>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      backgroundColor: "#f3f4f6",
                      border: "2px solid #e5e7eb",
                      borderRight: "none",
                      borderRadius: "10px 0 0 10px",
                    }}
                  >
                    <i className="bi bi-key" style={{ color: "#6b7280" }}></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key..."
                    style={{
                      padding: "14px 16px",
                      fontSize: "15px",
                      border: "2px solid #e5e7eb",
                      borderLeft: "none",
                      borderRadius: "0 10px 10px 0",
                    }}
                  />
                </div>
                <p
                  className="mt-2 mb-0"
                  style={{ fontSize: "12px", color: "#9ca3af" }}
                >
                  Enter the API key you want to validate
                </p>
              </div>

              <button
                type="submit"
                className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: "600",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                  transition: "all 0.2s ease",
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Validating...
                  </>
                ) : (
                  <>
                    <i className="bi bi-shield-check"></i>
                    Validate API Key
                  </>
                )}
              </button>
            </form>

            {/* Info Box */}
            <div
              className="mt-4 p-3 rounded-3 d-flex align-items-start gap-3"
              style={{
                backgroundColor: "#f0f9ff",
                border: "1px solid #bae6fd",
              }}
            >
              <i
                className="bi bi-info-circle-fill"
                style={{ color: "#0ea5e9", fontSize: "18px", marginTop: "2px" }}
              ></i>
              <div>
                <p className="mb-1 fw-medium" style={{ fontSize: "13px", color: "#0c4a6e" }}>
                  How it works
                </p>
                <p className="mb-0" style={{ fontSize: "12px", color: "#0369a1" }}>
                  This will send your API key to the <code>/api/protected</code> endpoint to verify
                  if it&apos;s a valid key in the system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Notification */}
      <Notification
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={hideNotification}
      />
    </div>
  );
}
