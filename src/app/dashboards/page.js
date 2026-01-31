"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Components
import {
  Sidebar,
  SidebarToggle,
  TopBar,
  CurrentPlanCard,
  ApiKeysTable,
  ApiKeyModal,
  DeleteConfirmModal,
  Toast,
} from "./components";

// Hooks
import { useApiKeys, useToast } from "./hooks";

// Utils
import { copyToClipboard, getDefaultFormData, calculateUsageStats } from "./utils/apiKeyUtils";

export default function DashboardsPage() {
  // Toast notifications
  const { toast, toastRef, showToast } = useToast();

  // API Keys CRUD operations
  const { apiKeys, loading, createApiKey, updateApiKey, deleteApiKey } = useApiKeys(showToast);

  // UI State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showKey, setShowKey] = useState({});
  const [editingKey, setEditingKey] = useState(null);
  const [formData, setFormData] = useState(getDefaultFormData());
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [planLimit] = useState(1000);

  // Modal refs
  const deleteModalRef = useRef(null);
  const createModalRef = useRef(null);

  // Calculate usage statistics
  const { totalUsage, usagePercentage } = calculateUsageStats(apiKeys, planLimit);

  // Handle modal close events
  useEffect(() => {
    if (createModalRef.current && typeof window !== "undefined" && window.bootstrap) {
      const modalElement = createModalRef.current;
      const handleHidden = () => {
        setEditingKey(null);
        setFormData(getDefaultFormData());
      };

      modalElement.addEventListener("hidden.bs.modal", handleHidden);

      return () => {
        modalElement.removeEventListener("hidden.bs.modal", handleHidden);
      };
    }
  }, []);

  // Open create modal
  const openCreateModal = useCallback(() => {
    setEditingKey(null);
    setFormData(getDefaultFormData());
    if (createModalRef.current && typeof window !== "undefined" && window.bootstrap) {
      const modal = new window.bootstrap.Modal(createModalRef.current);
      modal.show();
    }
  }, []);

  // Open edit modal
  const openEditModal = useCallback((apiKey) => {
    setEditingKey(apiKey);
    setFormData({
      name: apiKey.name,
      type: apiKey.type || "dev",
      limitMonthlyUsage: apiKey.limitMonthlyUsage !== undefined ? apiKey.limitMonthlyUsage : true,
      monthlyLimit: apiKey.monthlyLimit || 1000,
    });
    if (createModalRef.current && typeof window !== "undefined" && window.bootstrap) {
      const modal = new window.bootstrap.Modal(createModalRef.current);
      modal.show();
    }
  }, []);

  // Close create/edit modal
  const closeCreateModal = useCallback(() => {
    if (createModalRef.current && typeof window !== "undefined" && window.bootstrap) {
      const modal = window.bootstrap.Modal.getInstance(createModalRef.current);
      if (modal) modal.hide();
    }
  }, []);

  // Handle form submission (create or update)
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formData.name.trim()) {
        showToast("Please enter a name for the API key", "warning");
        return;
      }

      setSubmitting(true);
      try {
        let result;
        if (editingKey) {
          result = await updateApiKey(editingKey.id, formData.name);
        } else {
          result = await createApiKey(formData.name);
        }

        if (result.success) {
          setEditingKey(null);
          setFormData(getDefaultFormData());
          closeCreateModal();
        }
      } finally {
        setSubmitting(false);
      }
    },
    [formData, editingKey, updateApiKey, createApiKey, showToast, closeCreateModal]
  );

  // Show delete confirmation modal
  const confirmDelete = useCallback((id, name) => {
    setDeleteConfirm({ id, name });
    if (deleteModalRef.current && typeof window !== "undefined" && window.bootstrap) {
      const modal = new window.bootstrap.Modal(deleteModalRef.current);
      modal.show();
    }
  }, []);

  // Handle delete confirmation
  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteConfirm || !deleteConfirm.id) {
      showToast("No API key selected for deletion", "warning");
      return;
    }

    const result = await deleteApiKey(deleteConfirm.id);
    if (result.success) {
      setDeleteConfirm(null);
      if (deleteModalRef.current && typeof window !== "undefined" && window.bootstrap) {
        const modal = window.bootstrap.Modal.getInstance(deleteModalRef.current);
        if (modal) modal.hide();
      }
    }
  }, [deleteConfirm, deleteApiKey, showToast]);

  // Toggle key visibility
  const toggleKeyVisibility = useCallback((id) => {
    setShowKey((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Handle copy to clipboard
  const handleCopyToClipboard = useCallback(
    (text) => {
      copyToClipboard(text, showToast);
    },
    [showToast]
  );

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Sidebar Toggle Button (visible when sidebar is hidden) */}
      {!sidebarOpen && <SidebarToggle onOpen={() => setSidebarOpen(true)} />}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: sidebarOpen ? "280px" : "0",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {/* Top Bar */}
        <TopBar />

        {/* Content Area */}
        <div className="p-4">
          {/* Current Plan Section */}
          <CurrentPlanCard
            totalUsage={totalUsage}
            planLimit={planLimit}
            usagePercentage={usagePercentage}
          />

          {/* API Keys Section */}
          <ApiKeysTable
            apiKeys={apiKeys}
            loading={loading}
            showKey={showKey}
            onToggleVisibility={toggleKeyVisibility}
            onCopy={handleCopyToClipboard}
            onEdit={openEditModal}
            onDelete={confirmDelete}
            onCreateNew={openCreateModal}
          />
        </div>
      </div>

      {/* Create/Edit Modal */}
      <ApiKeyModal
        ref={createModalRef}
        editingKey={editingKey}
        formData={formData}
        setFormData={setFormData}
        submitting={submitting}
        onSubmit={handleSubmit}
      />

      {/* Toast Notification */}
      <Toast ref={toastRef} toast={toast} />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        ref={deleteModalRef}
        deleteConfirm={deleteConfirm}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
