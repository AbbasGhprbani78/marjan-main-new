export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-70 h-70 border-4 border-black border-b-transparent rounded-full animate-spin"></div>
    </div>
  );
}
