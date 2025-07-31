export default function TableSkeleton () {
    return (
        <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="animate-pulse flex justify-between items-center px-4 py-3 bg-gray-100 rounded-md">
                <div className="h-4 bg-gray-300 rounded w-1/6" />
                <div className="h-4 bg-gray-300 rounded w-1/4" />
                <div className="h-4 bg-gray-300 rounded w-1/5" />
                <div className="h-4 bg-gray-300 rounded w-1/6" />
                <div className="h-4 bg-gray-300 rounded w-1/12" />
            </div>
            ))}
        </div>
    )
}