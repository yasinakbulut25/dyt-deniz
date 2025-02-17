import {
  ChatDotsIcon,
  QuestionCircleIcon,
  StethoscopeIcon,
  BellIcon,
  UserIcon,
  PenIcon,
  ImageIcon
} from "@/icons";
import { CalculatorIcon } from "lucide-react";

export const sectionKeys = {
  services: "sectionServices",
  about: "sectionAbout",
  comments: "sectionComments",
  blogs: "sectionBlogs",
  contact: "sectionContact",
  faqs: "sectionFaqs",
  gallery: "sectionGallery",
  bki: "sectionBki",
}

export const routes = [
  {
    name: 'Hakkımda',
    path: 'hakkimda',
    sectionID: 'hakkimda',
    icon: <UserIcon width={16} color="#eab308" />,
    sectionKey: sectionKeys.about
  },
  {
    name: 'Hizmetler',
    path: 'hizmet',
    sectionID: 'hizmetler',
    icon: <StethoscopeIcon width={16} color="#eab308" />,
    sectionKey: sectionKeys.services,
    hasDropdown: true
  },
  {
    name: 'Yorumlar',
    path: 'yorumlar',
    sectionID: 'yorumlar',
    icon: <ChatDotsIcon width={16} color="#eab308" />,
    sectionKey: sectionKeys.comments
  },
  {
    name: 'Yazılar',
    path: 'yazi',
    sectionID: 'yazilar',
    icon: <PenIcon width={16} color="#eab308" />,
    sectionKey: sectionKeys.blogs,
    hasDropdown: true
  },
  {
    name: 'SSS',
    path: 'sss',
    sectionID: 'sss',
    icon: <QuestionCircleIcon width={16} color="#eab308" />,
    sectionKey: sectionKeys.faqs
  },
  {
    name: 'BKİ Hesapla',
    path: 'bki',
    sectionID: 'bki',
    icon: <CalculatorIcon width={16} color="#eab308" />,
    sectionKey: sectionKeys.bki
  },
  {
    name: 'Foto Galeri',
    path: 'galeri',
    sectionID: 'galeri',
    icon: <ImageIcon width={16} color="#eab308" />,
    sectionKey: sectionKeys.gallery
  },
  {
    name: 'İletişim',
    path: 'iletisim',
    sectionID: 'iletisim',
    icon: <BellIcon width={16} color="#eab308" />,
    sectionKey: sectionKeys.contact
  },
]