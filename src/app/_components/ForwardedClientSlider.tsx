"use client";

import dynamic from "next/dynamic";
import React, { forwardRef } from "react";

const SlickSlider = dynamic(() => import("react-slick"), { ssr: false });

const ForwardedClientSlider = forwardRef<any, any>((props, ref) => (
  <SlickSlider {...props} ref={ref} />
));

export default ForwardedClientSlider;
