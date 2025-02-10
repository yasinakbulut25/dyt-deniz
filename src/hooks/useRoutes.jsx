"use client";

import { getSections } from "@/api/endpoints";
import { routes } from "@/routes";
import { useState, useEffect } from "react";

const useRoutes = () => {
  const [activeRoutes, setActiveRoutes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSections();
        const publishedData = data.filter((item) => Number(item.publish) === 1);
        const filteredRoutes = routes.filter((route) => {
          if (route.name === "Ana Sayfa") return true;

          return publishedData.some(
            (item) => item.sectionKey === route.sectionKey
          );
        });

        setActiveRoutes(filteredRoutes);
      } catch (error) {
        console.error("API isteği sırasında bir hata oluştu:", error);
      }
    };

    fetchData();
  }, []);

  return activeRoutes;
};

export default useRoutes;
