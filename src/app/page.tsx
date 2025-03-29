"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Page() {
  useEffect(() => {
    const jwt = localStorage.getItem("JWT");
    const uid = localStorage.getItem("uid");

    const checkAuth = async () => {
      if (Boolean(jwt && uid)) {
        try {
          const response = await fetch(
            `${process.env.BACKEND_BASE_URL}/auth/me/${uid}`,
            {
              method: "GET",
              headers: {
                Authorization: jwt || "",
              },
            }
          );

          if (response.ok) {
            redirect("/control/home");
          }
        } catch (error) {
          redirect("/login");
        }
      } else {
        redirect("/login");
      }
    };

    checkAuth();
  }, []);

  return null;
}
