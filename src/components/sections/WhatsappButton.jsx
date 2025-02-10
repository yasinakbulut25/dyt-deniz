import { getUser } from "@/api/endpoints";
import { WhatsappIcon } from "@/icons";

async function WhatsappButton() {
  const data = await getUser();
  if (!data) return;

  const { whatsappPhone } = data.admin;
  return (
    <a
      href={`https://wa.me/${whatsappPhone}`}
      className="fixed bottom-4 right-4 bg-green-500 w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 duration-200"
    >
      <WhatsappIcon className="w-6 h-6 text-white" />
    </a>
  );
}

export default WhatsappButton;
