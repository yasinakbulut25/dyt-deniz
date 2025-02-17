"use client";

import { useState } from "react";
import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";
import TextAreaField from "@/components/form/TextAreaField";
import { v4 as uuidv4 } from "uuid";
import { API_URL } from "@/api/fetchRequest";
import { Alert } from "@nextui-org/react";
import BlurFade from "@/components/ui/blur-fade";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { ChatDotsIcon } from "@/icons";

function AddCommentForm() {
  const generateUniqueID = () => uuidv4();
  const [isVisible, setIsVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    type: "success",
    title: "Yorumunuz başarıyla eklendi!",
  });

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const initialStates = {
    name: "",
    date: getCurrentDate(),
    description: "",
    publish: 1,
  };

  const [formData, setFormData] = useState(initialStates);
  const [isLoading, setIsLoading] = useState(false);

  const requiredFields = ["name", "description"];
  const isDisabled = requiredFields.some((field) => !formData[field]);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const hash = generateUniqueID();
    const data = {
      ...formData,
      hash,
    };

    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setAlertProps({
          type: "success",
          title: "Yorumunuz başarıyla eklendi!",
        });
        setFormData(initialStates);
      } else {
        setAlertProps({
          type: "danger",
          title: "Yorum eklenirken hata oluştu!",
        });
        console.error(result.message || "Yorum eklenirken hata oluştu!");
      }
    } catch (error) {
      console.error("error :>> ", error);
      setAlertProps({
        type: "danger",
        title: "Bağlantı hatası! Lütfen tekrar deneyin.",
      });
    } finally {
      setIsLoading(false);
      setIsVisible(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-start mt-4 mb-16 px-4 max-w-3xl mx-auto"
    >
      <div className="w-full flex items-center justify-center text-center ">
        <BlurFade delay={0.25} inView>
          <div className="flex flex-col items-center gap-2 mb-4 text-center">
            <AnimatedGradientText className="flex items-center gap-2">
              <ChatDotsIcon className="w-4 h-4" color="#eab308" />
              <span className="text-yellow-500">Görüş Ekle</span>
            </AnimatedGradientText>
            <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-black">
              Görüşlerinizi Ekleyin
            </h2>
            <p className="w-full text-center text-pretty text-sm text-slate-600">
              Siz de görüşlerinizi ekleyerek katkıda bulunabilirsiniz.
            </p>
          </div>
        </BlurFade>
      </div>
      <div className="relative sm:p-8 p-4 rounded-[12px] shadow-md shadow-slate-100 bg-white border border-slate-200 flex-1 w-full flex gap-6 flex-col min-w-[300px]">
        <Alert
          color={alertProps.type}
          isVisible={isVisible}
          title={alertProps.title}
          variant="faded"
          onClose={() => setIsVisible(false)}
        />
        <InputField
          type="text"
          label="Adınız Soyadınız"
          placeholder="Adınız ve soyadınızı giriniz.."
          onChange={handleChange("name")}
          value={formData.name}
        />
        <TextAreaField
          label="Yorumunuz"
          placeholder="Yorumunuzu buraya yazınız.."
          onChange={handleChange("description")}
          value={formData.description}
        />
        <div className="flex flex-col gap-4 w-full max-w-[400px] mx-auto">
          <SubmitButton isLoading={isLoading} isDisabled={isDisabled}>
            Yorumu Ekle
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}

export default AddCommentForm;
