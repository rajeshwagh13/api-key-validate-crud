import {
  getAllApiKeys,
  createApiKey as createApiKeyStorage,
} from "./storage";

// GET - Fetch all API keys
export async function GET() {
  try {
    const apiKeys = await getAllApiKeys();
    return Response.json({ success: true, data: apiKeys });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new API key
export async function POST(request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return Response.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    // Generate a random API key
    const generateApiKey = () => {
      const prefix = "sk_";
      const randomString = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      return prefix + randomString;
    };

    // Generate a unique ID (using timestamp + random string to ensure uniqueness)
    const generateId = () => {
      return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    };

    const newApiKey = {
      id: generateId(),
      name,
      api_key_value: generateApiKey(), // Use database column name
      type: 'dev',
      usage_count: 0,
      monthly_limit: null,
      limit_monthly_usage: false,
      created_at: new Date().toISOString(),
      last_used: null,
    };

    const createdKey = await createApiKeyStorage(newApiKey);

    return Response.json({ success: true, data: createdKey }, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
