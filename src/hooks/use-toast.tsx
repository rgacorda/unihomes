import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState<{
    title: string;
    description: string;
  } | null>(null);

  function showToast(newToast: { title: string; description: string }) {
    setToast(newToast);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }

  return {
    toast,
    showToast,
  };
}
