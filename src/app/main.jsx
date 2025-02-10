import Home from "./Home";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsappButton from "@/components/sections/WhatsappButton";

function Main({ children }) {
  return (
    <main className="content overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 opacity-40 max-w-full"
        style={{ zIndex: 0 }}
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-yellow-500 to-yellow-400" />
        <div className="blur-[106px] h-32 bg-gradient-to-r from-yellow-400 to-yellow-300" />
      </div>
      <div className="relative" style={{ zIndex: 9 }}>
        <Navbar />
        <Home>{children}</Home>
        <WhatsappButton />
        <Footer />
      </div>
    </main>
  );
}

export default Main;
