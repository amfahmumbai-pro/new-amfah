import Link from "next/link";

export default function AppLink(props) {
  return <Link prefetch={false} {...props} />;
}
