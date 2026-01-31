/**
 * Utility functions for API key operations
 */

/**
 * Mask an API key for display, showing only the first 8 characters
 * @param {string} key - The API key to mask
 * @returns {string} Masked API key
 */
export function maskApiKey(key) {
  if (!key || key.length <= 12) return key;
  const prefix = key.substring(0, 8);
  const masked = "*".repeat(Math.min(key.length - 8, 27));
  return `${prefix}-${masked}`;
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @param {Function} showToast - Toast notification function
 */
export async function copyToClipboard(text, showToast) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("API key copied to clipboard!", "success");
  } catch (error) {
    showToast("Failed to copy to clipboard", "danger");
  }
}

/**
 * Get initial form data for API key form
 * @returns {Object} Default form data
 */
export function getDefaultFormData() {
  return {
    name: "",
    type: "dev",
    limitMonthlyUsage: true,
    monthlyLimit: 1000,
  };
}

/**
 * Calculate usage statistics from API keys
 * @param {Array} apiKeys - Array of API key objects
 * @param {number} planLimit - Monthly plan limit
 * @returns {Object} Usage statistics
 */
export function calculateUsageStats(apiKeys, planLimit) {
  const totalUsage = apiKeys.reduce((sum, key) => sum + (key.usageCount || 0), 0);
  const usagePercentage = planLimit > 0 ? Math.min((totalUsage / planLimit) * 100, 100) : 0;
  return { totalUsage, usagePercentage };
}
