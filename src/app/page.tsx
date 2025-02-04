import { SigninForm } from "@/components/SiginForm";

export default function Home() {
  return (
    <section className="bg-white w-full h-svh flex items-center justify-center">
      <div className="w-full mx-auto max-w-screen-lg px-4 py-4">
        <div className="mx-auto max-w-lg">
          <SigninForm />
        </div>
      </div>
    </section>
  );
}
