"use client";

import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import FsLightbox from "fslightbox-react";
import BlurFade from "../ui/blur-fade";
import Image from "next/image";

function GalleryImages({ allImages }) {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClickImage = (index) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: index,
    });
  };

  return (
    <>
      {isClient && (
        <>
          <FsLightbox
            toggler={lightboxController.toggler}
            sources={allImages}
            slide={lightboxController.slide}
          />
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 768: 2, 1024: 3, 1280: 4 }}
          >
            <Masonry gutter="16px">
              {allImages.map((item, index) => (
                <BlurFade key={index} inView>
                  <Image
                    onClick={() => handleClickImage(index + 1)}
                    className="min-w-full cursor-pointer rounded-md"
                    alt="Uzm. Diyetisyen Almina Meşin Galeri"
                    src={item}
                    width={500}
                    height={500}
                  />
                </BlurFade>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </>
      )}
    </>
  );
}

export default GalleryImages;
