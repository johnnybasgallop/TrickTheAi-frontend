export default function CRTFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 border-[20px] border-neutral-300 rounded-xl shadow-2xl p-2 w-[900px] h-[700px] flex items-center justify-center">
      <div className="bg-black w-full h-full rounded-md overflow-hidden p-6">
        {children}
      </div>
    </div>
  );
}
