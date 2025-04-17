// src/app/page.tsx
import Terminal from "../components/Terminal";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-green-400 font-mono p-4">
      <h1 className="text-lg mb-4">TRICK THE AI - TERMINAL</h1>
      <Terminal />
    </main>
  );
}
