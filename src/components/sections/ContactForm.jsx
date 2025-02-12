"use client";

import { useState } from "react";
import InputField from "@/components/form/InputField";
import TextAreaField from "@/components/form/TextAreaField";
import SubmitButton from "@/components/form/SubmitButton";
import BlurFade from "@/components/ui/blur-fade";
import Chip from "../chip";

function ContactForm() {
  const initialStates = {
    name: "",
    email: "",
    title: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialStates);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        title: formData.title,
        message: formData.message,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setFormData(initialStates);
    }

    setResponse(data);
    setIsLoading(false);
  };

  return (
    <div className="grid w-full mx-auto gap-4 items-center">
      <BlurFade delay={0.5} inView>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="w-full flex flex-col gap-6 mx-auto">
            <InputField
              type="text"
              label="Ad Soyad"
              placeholder="Adınızı ve soyadınızı yazınız.."
              isRequired
              maxLength={300}
              onChange={handleChange("name")}
              value={formData.name}
              errorMessage="Lütfen geçerli bir değer ile doldurunuz!"
            />
            <InputField
              type="email"
              label="Mail Adresiniz"
              placeholder="Mail adresinizi yazınız.."
              isRequired
              maxLength={300}
              onChange={handleChange("email")}
              value={formData.email}
              errorMessage="Lütfen geçerli bir değer ile doldurunuz!"
            />
            <InputField
              type="text"
              label="Konu Başlığı"
              placeholder="Konu başlığını yazınız.."
              isRequired
              maxLength={300}
              onChange={handleChange("title")}
              value={formData.title}
              errorMessage="Lütfen geçerli bir değer ile doldurunuz!"
            />
            <TextAreaField
              label="Mesajınız"
              isRequired
              placeholder="Mesajınızı yazınız.."
              onChange={handleChange("message")}
              value={formData.message}
              errorMessage="Lütfen geçerli bir değer ile doldurunuz!"
            />
            {response && (
              <Chip
                item={{
                  type: response.error ? "error" : "success",
                  value: response.error ? response.error : response.message,
                }}
                className="!w-full py-3"
              />
            )}
            <SubmitButton isDisabled={isLoading} isLoading={isLoading}>
              Gönder
            </SubmitButton>
          </div>
        </form>
      </BlurFade>
    </div>
  );
}

export default ContactForm;
