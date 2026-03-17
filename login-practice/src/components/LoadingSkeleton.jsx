export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-16 rounded-xl bg-gray-200"
        />
      ))}
    </div>
  );
}