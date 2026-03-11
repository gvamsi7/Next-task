export default function Loading() {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <span className="ml-3 text-lg font-medium text-gray-600">Loading users...</span>
      </div>
    );
  }