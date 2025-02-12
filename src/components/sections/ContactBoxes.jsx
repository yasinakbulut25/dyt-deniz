import { Button } from "@nextui-org/react";
import Link from "next/link";
import { ChevronRight } from "@/icons";
import { getContacts } from "@/api/endpoints";
import BlurFade from "../ui/blur-fade";

async function ContactBoxes({ address }) {
  const data = await getContacts();
  const activeData = data.filter((item) => !item.deleted_at);

  if (!data || !activeData || activeData.length === 0) return;

  return (
    <BlurFade
      delay={0.5}
      inView
      className="flex flex-wrap flex-col gap-4 h-full p-4 text-center"
    >
      <h2 className="lg:text-2xl md:text-xl text-lg font-bold text-black text-pretty">
        Sosyal Medya Hesaplarımdan Beni Takip Edebilirsiniz
      </h2>
      <p className="w-full text-pretty text-md text-slate-600">
        Başvurmak için adresine mail atabilir veya aşağıdaki linklere
        tıklayabilirsiniz.
      </p>
      <p className="w-full text-pretty text-md text-slate-600 my-3">
        {address}
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        {activeData.map((item, index) => (
          <Button
            key={index}
            className="bg-yellow-400 text-white py-2 px-4 rounded-full max-w-max"
            endContent={<ChevronRight width={16} height={16} />}
            as={Link}
            target="_blank"
            href={item.link}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </BlurFade>
  );
}

export default ContactBoxes;
