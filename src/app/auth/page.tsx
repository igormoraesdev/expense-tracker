import { Auth } from "@/components/Auth/Auth";

export default function AuthPage() {
  return (
    <section className="bg-white w-full h-svh flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <Auth />
      </div>
    </section>
  );
}
