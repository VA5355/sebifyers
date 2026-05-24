"use client";

import FirstLandingPage from "./FirstLandingPageNew";
import { useRouter } from "next/navigation";

export default function VirtualAccountPage() {
  const router = useRouter();

  return (
    <FirstLandingPage
      onGetStarted={() => {
        router.push("/virtual-account/login");
      }}
    />
  );
}