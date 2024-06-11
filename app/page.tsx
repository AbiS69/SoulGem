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
    Crisp.configure("4c98dc7e-5720-4fea-bf21-048735d4f495");
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
