"use client";

import React, { useEffect, useState, forwardRef } from "react";
import dynamic from "next/dynamic";

const SlickSlider = dynamic(() => import("react-slick"), { ssr: false });

const ForwardedClientSlider = forwardRef<any, any>((props, ref) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  // @ts-ignore
  return <SlickSlider {...props} ref={ref} />;
});

export default ForwardedClientSlider;
