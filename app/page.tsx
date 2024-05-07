"use client";

import { Suspense, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { Crisp } from "crisp-sdk-web";


export default function Home() {

  useEffect(() => {
    Crisp.configure("76426dd1-287c-4a27-84e6-d91674efdbd8");
  });

  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <Problem />
        {/* <FeaturesAccordion /> */}
        {/* <Pricing /> */}
        {/* <FAQ />
        <CTA /> */}
      </main>
      <Footer />
    </>
  );
}
