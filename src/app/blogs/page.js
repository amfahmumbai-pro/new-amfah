import BlogsContent from "./BlogsContent";
import { blogs } from "@/data/blogs";

export const metadata = {
  title: "AMFAH Blogs | Best Dehumidifiers and Air Purifiers in India",
  description: "Amfah, India's premier dehumidifier brand, offers superior moisture control solutions for industrial and commercial applications. Trusted since 2008.",
};

export default function BlogsPage() {
  // Strip out the heavy 'content' field to reduce the client-side payload
  const blogsForListing = blogs.map(({ content, ...rest }) => rest);

  return <BlogsContent initialBlogs={blogsForListing} />;
}
