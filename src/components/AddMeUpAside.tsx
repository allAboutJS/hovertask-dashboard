import { Link } from "react-router";
import { contacts } from "../pages/AddMeUp/AddMeUp";

export default function AddMeUpAside() {
  return (
    <div className="mt-[420px] max-mobile-mobile:hidden space-y-2">
      <p>Your Contact List</p>
      <div className="space-y-2">
        {contacts.slice(0, 3).map((contact) => (
          <img src={contact.image_url} width={50} className="rounded-lg" />
        ))}
      </div>
      <Link to="#" className="text-primary text-sm hover:underline">
        View All
      </Link>
    </div>
  );
}
