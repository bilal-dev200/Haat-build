import MyServicesClient from "./MyServicesClient";

export const metadata = {
  title: "My Services | Haat",
  description: "Manage the services you have created on Haat.",
};

export default function Page() {
  return <MyServicesClient />;
}

