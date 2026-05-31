export default function LoadingCompany() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
        <span className="text-sm text-gray-500">
          Loading market data…
        </span>
      </div>
    </div>
  );
}
