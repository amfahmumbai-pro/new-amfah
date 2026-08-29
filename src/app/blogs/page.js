import BlogsContent from "./BlogsContent";
import { blogs } from "@/data/blogs";

export const metadata = {
  title: "Humidity & Air Quality Blog | AMFAH India",
  description: "Practical guides on controlling humidity in Indian homes and industry: sizing, running costs, monsoon damp, mould and moisture damage.",
  alternates: {
    canonical: "https://amfah.com/blogs",
  },
  openGraph: {
    title: "Humidity & Air Quality Blog | AMFAH India",
    description: "Practical guides on controlling humidity in Indian homes and industry: sizing, running costs, monsoon damp, mould and moisture damage.",
    url: "https://amfah.com/blogs",
    images: [
      {
        url: "/blogs/amfah-blog.jpeg",
        alt: "AMFAH Blogs",
      },
    ],
  },
};

export default function BlogsPage() {
  // Strip out the heavy 'content' field to reduce the client-side payload
  const blogsForListing = blogs.map(({ content, ...rest }) => rest);

  return <BlogsContent initialBlogs={blogsForListing} />;
}
