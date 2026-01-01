import ServicesBookingsClient from "./ServicesBookingsClient";

export const metadata = {
  title: "Service bookings | Haat",
  description: "Manage the services you have booked on Haat.",
};

export default function Page() {
  return <ServicesBookingsClient />;
}


