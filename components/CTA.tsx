import Image from "next/image";
import config from "@/config";
import ButtonCheckout from './ButtonCheckout';

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        alt="Background"
        className="object-cover w-full"
        fill
      />
      <div className="relative hero-overlay bg-neutral bg-opacity-70"></div>
      <ButtonCheckout priceId="price_1O5KtcAxyNprDp7iftKnrrpw" mode="payment" text="" />
    </section>
  );
};

export default CTA;
