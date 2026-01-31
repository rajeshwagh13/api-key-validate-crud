"use client";

/**
 * Current plan usage card component
 * @param {Object} props
 * @param {number} props.totalUsage - Total API requests used
 * @param {number} props.planLimit - Maximum requests allowed
 * @param {number} props.usagePercentage - Usage as percentage
 */
export function CurrentPlanCard({ totalUsage, planLimit, usagePercentage }) {
  return (
    <div
      className="mb-4 rounded-3 p-4 position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #d946ef 0%, #ec4899 30%, #f97316 100%)",
        minHeight: "160px",
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "-30px",
          left: "30%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
        }}
      ></div>

      <div className="d-flex justify-content-between align-items-start position-relative">
        <div className="flex-grow-1">
          <p
            className="mb-2 text-uppercase fw-medium"
            style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.8)",
              letterSpacing: "1px",
            }}
          >
            Current Plan
          </p>
          <h2 className="text-white fw-bold mb-4" style={{ fontSize: "32px" }}>
            Researcher
          </h2>

          <div>
            <div className="d-flex align-items-baseline gap-2 mb-2">
              <p
                className="mb-0"
                style={{
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                API Limit
              </p>
              {/* Exact count displayed prominently */}
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#ffffff",
                }}
              >
                {totalUsage.toLocaleString()}
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "rgba(255, 255, 255, 0.85)",
                }}
              >
                / {planLimit.toLocaleString()}
              </span>
            </div>
            {/* Progress bar */}
            <div
              className="rounded-pill mb-2"
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              }}
            >
              <div
                className="rounded-pill"
                style={{
                  width: `${Math.min(Math.max(usagePercentage, 0.5), 100)}%`,
                  height: "100%",
                  backgroundColor: "#ffffff",
                  minWidth: totalUsage > 0 ? "8px" : "0px",
                  transition: "width 0.3s ease",
                }}
              ></div>
            </div>
            <p
              className="mb-0"
              style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.75)",
              }}
            >
              {(planLimit - totalUsage).toLocaleString()} requests remaining ({usagePercentage.toFixed(1)}% used)
            </p>
          </div>
        </div>

        <button
          className="btn"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: "500",
            backdropFilter: "blur(10px)",
          }}
        >
          Manage Plan
        </button>
      </div>
    </div>
  );
}
