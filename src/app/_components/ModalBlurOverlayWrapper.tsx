"use client";
import React from "react";
import dynamic from "next/dynamic";
const ModalBlurOverlay = dynamic(() => import("@/app/_components/ModalBlurOverlay"), { ssr: false });
export default function ModalBlurOverlayWrapper() {
  return <ModalBlurOverlay />;
}