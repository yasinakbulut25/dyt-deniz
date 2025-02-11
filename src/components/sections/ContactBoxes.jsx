import { Button } from "@nextui-org/react";
import Link from "next/link";
import { ChevronRight } from "@/icons";
import { getContacts } from "@/api/endpoints";

async function ContactBoxes() {
  const data = await getContacts();
  const activeData = data.filter((item) => !item.deleted_at);

  if (!data || !activeData || activeData.length === 0) return;

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center mt-8">
      {activeData.map((item, index) => (
        <Button
          key={index}
          className="bg-yellow-400 text-white py-2 px-4 rounded-full"
          endContent={<ChevronRight width={16} height={16} />}
          as={Link}
          target="_blank"
          href={item.link}
        >
          {item.title}
        </Button>
      ))}
    </div>
  );
}

export default ContactBoxes;
