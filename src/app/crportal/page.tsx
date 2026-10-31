"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CRPortalRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/cr-portal");
  }, [router]);

  return null;
}
