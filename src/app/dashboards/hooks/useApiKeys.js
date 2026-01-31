"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for managing API keys CRUD operations
 * @param {Function} showToast - Function to display toast notifications
 * @returns {Object} API keys state and operations
 */
export function useApiKeys(showToast) {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all API keys
  const fetchApiKeys = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/api-keys");
      const result = await response.json();
      if (result.success) {
        setApiKeys(result.data);
      } else {
        showToast(result.error || "Failed to fetch API keys", "danger");
      }
    } catch (error) {
      console.error("Error fetching API keys:", error);
      showToast("Failed to fetch API keys", "danger");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Create new API key
  const createApiKey = useCallback(async (name) => {
    try {
      const response = await fetch("/api/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const result = await response.json();
      if (result.success) {
        showToast("API key created successfully!", "success");
        await fetchApiKeys();
        return { success: true };
      } else {
        showToast(result.error || "Failed to create API key", "danger");
        return { success: false };
      }
    } catch (error) {
      console.error("Error creating API key:", error);
      showToast("Failed to create API key", "danger");
      return { success: false };
    }
  }, [showToast, fetchApiKeys]);

  // Update existing API key
  const updateApiKey = useCallback(async (id, name) => {
    try {
      console.log("Updating API key:", id, name);
      const response = await fetch(`/api/api-keys/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      console.log("Update response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Update failed:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Update result:", result);

      if (result.success) {
        showToast("API key updated successfully!", "success");
        await fetchApiKeys();
        return { success: true };
      } else {
        showToast(result.error || "Failed to update API key", "danger");
        return { success: false };
      }
    } catch (error) {
      console.error("Error updating API key:", error);
      showToast(`Failed to update API key: ${error.message}`, "danger");
      return { success: false };
    }
  }, [showToast, fetchApiKeys]);

  // Delete API key
  const deleteApiKey = useCallback(async (id) => {
    try {
      console.log("Deleting API key:", id);
      const response = await fetch(`/api/api-keys/${id}`, {
        method: "DELETE",
      });

      console.log("Delete response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Delete failed:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Delete result:", result);

      if (result.success) {
        showToast("API key deleted successfully!", "success");
        await fetchApiKeys();
        return { success: true };
      } else {
        showToast(result.error || "Failed to delete API key", "danger");
        return { success: false };
      }
    } catch (error) {
      console.error("Error deleting API key:", error);
      showToast(`Failed to delete API key: ${error.message}`, "danger");
      return { success: false };
    }
  }, [showToast, fetchApiKeys]);

  // Initial fetch
  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  return {
    apiKeys,
    loading,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
  };
}
