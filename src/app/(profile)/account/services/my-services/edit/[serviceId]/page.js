import EditServiceForm from "./EditServiceForm";

export const metadata = {
  title: "Edit Service | Haat",
  description: "Edit your service listing on Haat.",
};

export default async function Page({ params }) {
  const resolvedParams = await params;
  return <EditServiceForm serviceId={resolvedParams.serviceId} />;
}

