import Lanyard from "./components/Lanyard";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative h-screen w-screen overflow-hidden">
        <Lanyard className="absolute inset-0" />
        <div className="relative z-10 h-full pointer-events-none" />
      </section>
    </main>
  );
}
