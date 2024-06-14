"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList arrayy below.

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "What is it exactly?",
    answer: <div className="space-y-2 leading-relaxed">You take a brief personality test of 12 questions, you get an presentation of your personality as we understood it, and then you can create an awesome SoulGem representing your traits of personality in a beautiful and visual way! You will then get a text explaining you the colors and style used for your image, which are corresponding to your caracter.</div>,
  },
  {
    question: "Is it free?",
    answer: <div className="space-y-2 leading-relaxed">You can create up to 2 images for free! Then, you will have to support us by paying just a few dollars if you want to generate images in better resolution and different formats. We have to pay for the artists working in the background! Of course it is a joke, it's not real people creating the images but an artificial intelligence, Dall-E. It ain&apos;t free though!</div>,
  },
  {
    question: "Is this a professional and scientifical personality test?",
    answer: (
      <p>
        No, it is not. It is a fun and entertaining test, and the results are not to be taken seriously. The test is based on the Myers-Briggs Type Indicator, which is a popular and well-known personality test. The results are not meant to be used for any professional or scientific purposes. The results are meant to be taken with a grain of salt. If you are looking for a professional or scientific personality test, we recommend that you consult a licensed psychologist or other mental health professional.
      </p>
    ),
  },
  {
    question: "I have another question",
    answer: (
      <div className="space-y-2 leading-relaxed">Contact us by email or with the dialog button on the bottom right!</div>
    ),
  },
];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-base-100" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
