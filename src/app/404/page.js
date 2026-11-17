import NotFound from "../not-found";

export const metadata = {
  title: "Page not found",
  description: "Looks like the page you're looking for no longer exists.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: null,
  },
};

export default function Custom404() {
  return <NotFound />;
}
