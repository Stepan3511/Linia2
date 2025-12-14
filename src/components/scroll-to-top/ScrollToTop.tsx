"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

import styles from "./ScrollToTop.module.scss";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.scrollToTop} ${isVisible ? styles.visible : ""}`}
      onClick={scrollToTop}
    >
      <ChevronUp size={32} className="text-white" />
    </div>
  );
};

export default ScrollToTop;
