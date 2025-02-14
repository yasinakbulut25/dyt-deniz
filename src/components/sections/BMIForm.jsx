"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import InputField from "../form/InputField";
import SelectBox from "../select";
import { BorderBeam } from "../ui/border-beam";
import { NumberTicker } from "../ui/number";

const BMIForm = () => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "female",
  });
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const calculateBMI = () => {
    const heightInMeters = formData.height / 100;
    const bmiValue = formData.weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(1));
    determineBMICategory(bmiValue, formData.age, formData.gender);
  };

  const determineBMICategory = (bmi, age, gender) => {
    if (age < 18) {
      if (bmi < 18.5) {
        setCategory("Zayıf");
        setColor("text-blue-500");
      } else if (bmi < 24) {
        setCategory("Sağlıklı");
        setColor("text-green-500");
      } else if (bmi < 29) {
        setCategory("Şişman");
        setColor("text-yellow-500");
      } else if (bmi < 35) {
        setCategory("Obez");
        setColor("text-orange-500");
      } else {
        setCategory("Aşırı Obez");
        setColor("text-red-500");
      }
    } else {
      if (gender === "male") {
        if (bmi < 20) {
          setCategory("Zayıf");
          setColor("text-blue-500");
        } else if (bmi < 25) {
          setCategory("Sağlıklı");
          setColor("text-green-500");
        } else if (bmi < 30) {
          setCategory("Şişman");
          setColor("text-yellow-500");
        } else if (bmi < 40) {
          setCategory("Obez");
          setColor("text-orange-500");
        } else {
          setCategory("Aşırı Obez");
          setColor("text-red-500");
        }
      } else {
        if (bmi < 19) {
          setCategory("Zayıf");
          setColor("text-blue-500");
        } else if (bmi < 24) {
          setCategory("Sağlıklı");
          setColor("text-green-500");
        } else if (bmi < 29) {
          setCategory("Şişman");
          setColor("text-yellow-500");
        } else if (bmi < 39) {
          setCategory("Obez");
          setColor("text-orange-500");
        } else {
          setCategory("Aşırı Obez");
          setColor("text-red-500");
        }
      }
    }
  };

  return (
    <form className="relative p-8 max-w-xl mx-auto bg-white rounded-lg">
      <div className="grid md:grid-cols-2 gap-4">
        <InputField
          label="Boy (cm)"
          type="number"
          placeholder="Boyunuzu girin"
          value={formData.height}
          onChange={handleChange("height")}
          isRequired
        />
        <InputField
          label="Kilo (kg)"
          type="number"
          placeholder="Kilonuzu girin"
          value={formData.weight}
          onChange={handleChange("weight")}
          isRequired
        />
        <InputField
          label="Yaş"
          type="number"
          placeholder="Yaşınızı girin"
          value={formData.age}
          onChange={handleChange("age")}
          isRequired
        />
        <SelectBox
          label="Cinsiyet"
          items={[
            {
              id: "male",
              label: "Erkek",
            },
            {
              id: "female",
              label: "Kadın",
            },
          ]}
          placeholder="Cinsiyet Seçiniz"
          onChange={handleChange("gender")}
          errorMessage="Lütfen geçerli değer giriniz!"
          defaultSelectedKeys={[formData.gender]}
          isRequired
        />
      </div>
      <Button
        onClick={calculateBMI}
        isDisabled={!formData.height || !formData.weight || !formData.age}
        className="mt-6 w-full bg-yellow-500 text-white"
      >
        Hesapla
      </Button>

      {bmi && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
          <NumberTicker
            value={bmi}
            decimalPlaces={1}
            className="whitespace-pre-wrap lg:text-8xl sm:text-6xl text-5xl font-medium tracking-tighter text-black dark:text-white"
          />
          <p className="text-lg font-semibold mt-3">
            <span className={color}>{category}</span>
          </p>
        </div>
      )}
      <BorderBeam
        colorFrom="#eab308"
        colorTo="#fff085"
        size={300}
        duration={10}
        delay={9}
      />
    </form>
  );
};

export default BMIForm;
