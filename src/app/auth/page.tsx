import { SigninForm } from "@/components/SiginForm";

export default function Auth() {
  return (
    <section className="bg-white w-full h-svh flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <SigninForm />
      </div>
    </section>
  );
}
