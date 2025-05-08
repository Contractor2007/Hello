import Footer from "@/components/auth/Footer";
import Header from "@/components/auth/Header";
import PostList from "@/components/shared/PostList"; // Adjust path as needed

export default function Page() {
  return (
    <div className="relative h-screen w-full flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>

      <div
        className="flex-1 pt-16 pb-16 overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex flex-col p-4">
          <div className="mb-6">
            <h4 className="text-lg font-semibold">Recent Posts</h4>
            <p className="text-gray-600">See what&apos;s on the minds of others</p>
          </div>

          <PostList />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10">
        <Footer />
      </div>
    </div>
  );
}
