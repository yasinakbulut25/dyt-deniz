"use client";

import BlurFade from "@/components/ui/blur-fade";

function ContactForm() {
  const formID = "250554630520044";

  return (
    <div className="relative grid w-full mx-auto gap-4 items-center">
      <BlurFade delay={0.5} inView>
        <iframe
          className="!min-h-[845px]"
          id={`JotFormIFrame-${formID}`}
          title="Otel Form"
          frameBorder="0"
          allow="geolocation; microphone; camera; fullscreen"
          src={`https://form.jotform.com/${formID}`}
          scrolling="no"
          style={{
            minWidth: "100%",
            maxWidth: "100%",
            height: "auto",
            border: "none",
          }}
        />
      </BlurFade>
      <div className="w-full h-14 bg-white absolute bottom-0 z-9"></div>
    </div>
  );
}

export default ContactForm;
