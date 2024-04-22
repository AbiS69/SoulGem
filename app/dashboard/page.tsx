import config from "@/config";
import { useSession } from 'next-auth/react';
import ButtonAccount from '@/components/ButtonAccount';
import ButtonCheckout from '@/components/ButtonCheckout';
import dynamic from 'next/dynamic';

const UserInfo = dynamic(() => import('./UserInfo'), { ssr: false });

export const dynamic1 = "force-dynamic";


export default function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Subscribe to get access:
        </h1>

        <ButtonCheckout
          mode="payment"
          priceId={config.stripe.plans[0].priceId}
        />
        <UserInfo />
      </section>
    </main>
  );
}