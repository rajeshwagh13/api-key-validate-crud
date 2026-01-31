import {
  getApiKeyById,
  updateApiKey as updateApiKeyStorage,
  deleteApiKey as deleteApiKeyStorage,
} from "../storage";

// GET - Fetch a single API key by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    // Ensure ID is a string for comparison
    const stringId = String(id);
    const apiKey = await getApiKeyById(stringId);

    if (!apiKey) {
      return Response.json(
        { success: false, error: "API key not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: apiKey });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update an API key
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return Response.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    // Ensure ID is a string for comparison
    const stringId = String(id);
    const updatedKey = await updateApiKeyStorage(stringId, { name });

    if (!updatedKey) {
      return Response.json(
        { success: false, error: "API key not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: updatedKey });
  } catch (error) {
    console.error("PUT error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete an API key
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    // Ensure ID is a string for comparison
    const stringId = String(id);
    const deletedKey = await deleteApiKeyStorage(stringId);

    if (!deletedKey) {
      return Response.json(
        { success: false, error: "API key not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: deletedKey });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
