"use client";

import React from "react";
import Hero from "@/src/components/Hero";

type Props = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {

  return (
    <>
      <Hero/>
      {children}
    </>
  );
}
