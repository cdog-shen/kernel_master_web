"use client";
import { DynEditableForm } from "@/components/containers/forms";
import { useEffect, useState } from "react";

export default function app() {
  // const [accesssData, setAccesssData] = useState({});
  const [loading, setLoading] = useState(true);
  // const [editStatus, seteditStatus] = useState(false);
  // const [newStatus, setnewStatus] = useState(false);
  // const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <h1 className="text-2xl font-semibold mb-4">
        CMDB subsystem Configuration
      </h1>
      <p>CMDB subsystem has no configuration yet.</p>
    </div>
  );
}
