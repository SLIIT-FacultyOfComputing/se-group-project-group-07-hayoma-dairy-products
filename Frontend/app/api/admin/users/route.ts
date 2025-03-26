import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = `http://localhost:8080/api/users`;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  console.log("[GET /api/admin/users] Request received.");
  console.log("[GET] Authorization Header:", authHeader);

  if (!authHeader) {
    console.warn("[GET] Missing Authorization header");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("[GET] Forwarding request to backend:", BACKEND_URL);

    const response = await fetch(BACKEND_URL, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log("[GET] Backend response status:", response.status);
    console.log("[GET] Backend response body:", data);

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("[GET] Exception occurred:", err);
    return NextResponse.json(
      { message: "Failed to fetch users", error: err },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  console.log("[POST /api/admin/users] Request received.");
  console.log("[POST] Authorization Header:", authHeader);

  if (!authHeader) {
    console.warn("[POST] Missing Authorization header");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  console.log("[POST] Request body:", body);

  try {
    console.log("[POST] Forwarding request to backend:", BACKEND_URL);

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log("[POST] Backend response status:", response.status);
    console.log("[POST] Backend response body:", data);

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    console.error("[POST] Exception occurred:", err);
    return NextResponse.json(
      { message: "Failed to add user", error: err },
      { status: 500 }
    );
  }
}
