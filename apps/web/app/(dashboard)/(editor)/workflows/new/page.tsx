import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function NewWorkflowPage() {
  const reqHeaders = await headers();
  const cookieStr = reqHeaders.get("cookie") || "";

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/workflows`, {
      method: "POST",
      headers: { cookie: cookieStr },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      redirect(`/workflows/${data.id}`);
    }
  } catch (error) {
    console.error("Failed to create workflow", error);
  }

  // Fallback if it fails
  redirect("/workflows");
}
