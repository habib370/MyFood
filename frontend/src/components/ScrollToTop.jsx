import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 
      flex items-center justify-center
      h-11 w-11 rounded-full
      bg-orange-500 text-white
      shadow-lg transition-all duration-300
      hover:bg-orange-600 hover:scale-110
      ${show ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTop;
