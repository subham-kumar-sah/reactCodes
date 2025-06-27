import React, { useState } from "react";
import { useEffect } from "react";
const useUserStatus = () => {
  const [status, setStatus] = useState(true);
  useEffect(() => {
    window.addEventListener("online", () => {
      setStatus(true);
    });
    window.addEventListener("offline", () => {
      setStatus(false);
    });
  }, []);
  return status;
};

export default useUserStatus;
