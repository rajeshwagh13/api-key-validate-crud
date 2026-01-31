"use client";

import { useState, useRef, useCallback } from "react";

/**
 * Custom hook for managing toast notifications
 * @returns {Object} Toast state and controls
 */
export function useToast() {
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const toastRef = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
    if (toastRef.current && typeof window !== "undefined" && window.bootstrap) {
      const bsToast = new window.bootstrap.Toast(toastRef.current);
      bsToast.show();
    }
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  return {
    toast,
    toastRef,
    showToast,
    hideToast,
  };
}
