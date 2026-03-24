const ListsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white rounded-xl p-5 shadow animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
        <div className="h-3 bg-gray-100 rounded w-1/3 mb-6" />
        <div className="flex justify-between">
          <div className="h-5 bg-gray-100 rounded-full w-16" />
        </div>
      </div>
    ))}
  </div>
);

export default ListsSkeleton;   