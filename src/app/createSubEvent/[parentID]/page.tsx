import CreateSubEventForm from "./CreateSubEventForm";

export default async function Page({ params }: { params: Promise<{ parentId: string }> }) {
  const { parentId } = await params;

  const res = await fetch("http://localhost:8080/api/events", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch events");
  const events = await res.json();

  // Find event via ID
  const parentEvent = events.find((e: any) => e.id === parentId);

  if (!parentEvent) {
    return <div>Parent event not found for ID: {parentId}</div>;
  }

  console.log("Fetched parent event:", parentEvent);

  return <CreateSubEventForm parentEvent={parentEvent} />;
}