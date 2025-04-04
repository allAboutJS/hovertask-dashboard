import { CheckCircle, LayoutDashboard, LogOut, Store, UserPlus, Wallet } from "lucide-react";

export default [
  {
    path: "/",
    label: "Dashboard",
    icon: <LayoutDashboard size={13} />
  },
  {
    path: "/earn",
    label: "Earn",
    icon: <Wallet size={13} />
  },
  {
    path: "/advertise",
    label: "Advertise",
    icon: <CheckCircle size={13} />
  },
  {
    path: "/marketplace",
    label: "Marketplace",
    icon: <Store size={13} />
  },
  {
    path: "/buy-followers",
    label: "Buy Followers",
    icon: <UserPlus size={13} />
  },
  {
    path: "/refer-and-earn",
    label: "Refer and Earn",
    icon: (
      <span style={{ fontSize: 13 }} className="material-icons-outlined">
        share
      </span>
    )
  },
  {
    path: "/support-and-faq",
    label: "Support and FAQ",
    icon: (
      <span style={{ fontSize: 13 }} className="material-icons-outlined">
        support_agent
      </span>
    )
  },
  {
    path: "/logout",
    label: "Logout",
    icon: <LogOut size={13} />
  }
];
