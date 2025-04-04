import { ArrowLeft, CreditCard } from "lucide-react";
import { Link } from "react-router";

export default function ChooseOnlinePaymentMethodPage() {
  const paymentOptions = [
    {
      title: "MasterCard / Visa / Verver Card",
      description: "Pay instantly with your credit or debit card",
      icon: <CreditCard size={32} />,
      link: "#",
      linkText: "Pay with Card"
    },
    {
      title: "Bank Transfer (USSD)",
      description: "Transfer funds using your bank's USSD code",
      icon: <span className="text-3xl font-semibold">₦</span>,
      link: "#",
      linkText: "Pay via USSD"
    },
    {
      title: "Internet Banking Transfer",
      description: "Make a transfer using your bank's mobile or internet banking app",
      icon: <InternetBankTransferIcon />,
      link: "#",
      linkText: "Make Transfer"
    }
  ];

  return (
    <div className="px-4 py-6 space-y-6 bg-white shadow min-h-full">
      <div className="flex items-center gap-4">
        <Link to="/become-a-member">
          <ArrowLeft />
        </Link>

        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Choose An Online Payment Method</h1>
          <p className="text-sm text-zinc-500">Select how you'd like to pay online</p>
        </div>
      </div>

      <div className="space-y-3">
        {paymentOptions.map((option, i) => (
          <PaymentOptionCard key={i} {...option} />
        ))}
      </div>
    </div>
  );
}

function PaymentOptionCard(props: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}) {
  const { icon, title, description, link, linkText } = props;

  return (
    <div className="flex items-center gap-4 border-1 border-primary rounded-3xl py-4 px-4 mobile:px-8">
      <div>{icon}</div>
      <div className="flex-1">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Link to={link} className="bg-primary text-sm px-4 py-2 rounded-xl text-white">
        {linkText}
      </Link>
    </div>
  );
}

function InternetBankTransferIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.3337 5.33337C8.30566 5.33337 5.79099 5.33337 4.22966 6.89604C2.66833 8.45871 2.66699 10.972 2.66699 16C2.66699 21.028 2.66699 23.5427 4.22966 25.104C5.79233 26.6654 8.30566 26.6667 13.3337 26.6667H15.3337M18.667 5.33337C23.695 5.33337 26.2097 5.33337 27.771 6.89604C29.1897 8.31337 29.3203 10.5147 29.3337 14.6667"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M20.6667 18.6667V26.6667M20.6667 26.6667L23.3333 24.0001M20.6667 26.6667L18 24.0001M26.6667 26.6667V18.6667M26.6667 18.6667L29.3333 21.3334M26.6667 18.6667L24 21.3334"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.3337 21.3334H8.00033M2.66699 13.3334H9.33366M29.3337 13.3334H14.667"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
