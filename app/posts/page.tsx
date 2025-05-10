
import PostList from "@/components/shared/PostList"; // Adjust path as needed

export default function Page() {
  return (
    <div className="relative h-screen w-full flex flex-col">
      <div
        className="flex-1 pt-16 pb-16 overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex flex-col p-4">
          <div className="mb-6">
            <h4 className="text-lg font-semibold flex items-center justify-center">Recent Posts</h4>
            <p className="text-gray-600 flex items-center justify-center">See what&apos;s on the minds of others</p>
          </div>

          <PostList />
        </div>
      </div>

    </div>
  );
}
