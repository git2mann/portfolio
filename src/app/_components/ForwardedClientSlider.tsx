"use client";

import React, { forwardRef } from "react";
import dynamic from "next/dynamic";

const SlickSlider = dynamic(() => import("react-slick"), { ssr: false });

const ForwardedClientSlider = forwardRef<any, any>((props, ref) => {
  // @ts-ignore
  return <SlickSlider {...props} innerRef={ref} />;
});

export default ForwardedClientSlider;
