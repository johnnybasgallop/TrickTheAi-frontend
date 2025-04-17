// src/app/page.tsx
import CRTFrame from "@/components/CRTFrame";
import Terminal from "../components/Terminal";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-green-400 font-mono p-0 lg:p-4 flex items-center justify-center">
      <CRTFrame>
        <div className="h-full">
          <Terminal />
        </div>
      </CRTFrame>
    </main>
  );
}
