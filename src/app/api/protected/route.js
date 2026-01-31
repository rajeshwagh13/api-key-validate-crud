import { supabase } from "../../../lib/supabase";

/**
 * POST /api/protected
 * Validates an API key and returns whether it's valid
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { apiKey } = body;

    if (!apiKey || typeof apiKey !== "string") {
      return Response.json(
        { success: false, error: "API key is required" },
        { status: 400 }
      );
    }

    // Trim the API key
    const trimmedKey = apiKey.trim();

    if (!trimmedKey) {
      return Response.json(
        { success: false, error: "API key cannot be empty" },
        { status: 400 }
      );
    }

    // Check if the API key exists in the database
    const { data, error } = await supabase
      .from("api_keys")
      .select("id, name, api_key_value")
      .eq("api_key_value", trimmedKey)
      .single();

    if (error) {
      // PGRST116 means no rows returned (key not found)
      if (error.code === "PGRST116") {
        return Response.json(
          { success: false, valid: false, error: "Invalid API Key" },
          { status: 401 }
        );
      }
      console.error("Error validating API key:", error);
      return Response.json(
        { success: false, error: "Failed to validate API key" },
        { status: 500 }
      );
    }

    if (!data) {
      return Response.json(
        { success: false, valid: false, error: "Invalid API Key" },
        { status: 401 }
      );
    }

    // API key is valid
    return Response.json({
      success: true,
      valid: true,
      message: "Valid API key, /protected can be accessed",
      keyName: data.name,
    });
  } catch (error) {
    console.error("Error in protected route:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
