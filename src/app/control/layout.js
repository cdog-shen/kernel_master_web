"use client";
import { MainMenu } from "@/components/menu/menus";
import Top from "@/components/header/top_bar";
import { useState, useEffect } from "react";

const serviceArray = process.env.SERVICE_ARRAY;

export default function businessLayout({ children }) {
  const [title, settitle] = useState("");
  const [subtitle, setsubtitle] = useState("");

  useEffect(() => {
    const path = new URL(window.location.href).pathname;
    serviceArray.map((serv) => {
      serv.innerList.map((inner) => {
        if (inner.path == path) {
          settitle(serv.outerTag);
          setsubtitle(inner.tag);
        }
      });
    });
  }, []);

  return (
    <>
      <Top title={title} subtitle={subtitle} />
      <MainMenu menuArray={serviceArray} />
      <div className="flex flex-grow flex-auto bg-white/30 p-4 min-h-[calc(100vh-160px)] max-h-full mb-[56px] overflow-auto">
        {children}
      </div>
    </>
  );
}
