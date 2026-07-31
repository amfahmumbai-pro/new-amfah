import Link from "@/components/ui/AppLink";

export default function BlogCard({ blog }) {
  const { slug, title, summary, date, readTime, category, image } = blog;

  return (
    <article className="group flex flex-col h-full bg-transparent">
      {/* Blog Image Cover */}
      <Link 
        href={`/blogs/${slug}`} 
        className="block overflow-hidden rounded-2xl aspect-[16/10] relative bg-brand-blue-light/35 shadow-sm"
      >
        <img
          src={image || "/banner/dehumidifiers.jpeg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          loading="lazy"
        />
      </Link>

      {/* Meta, Title & Summary Block */}
      <div className="pt-5 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Metadata: Category • Date */}
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-brand-gray-medium uppercase tracking-widest font-display">
            <span>{category}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-border/80" />
            <span>{date}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-border/80" />
            <span className="text-brand-navy/80">{readTime}</span>
          </div>

          {/* Title */}
          <h3 className="font-display font-extrabold text-lg sm:text-xl text-brand-navy group-hover:text-brand-accent transition-colors duration-300 leading-snug">
            <Link href={`/blogs/${slug}`} className="focus:outline-none">
              {title}
            </Link>
          </h3>

          {/* Summary */}
          <p className="text-sm leading-relaxed text-brand-gray-dark/80 line-clamp-3 font-sans">
            {summary}
          </p>
        </div>

        {/* Action Link */}
        <div className="pt-2">
          <Link
            href={`/blogs/${slug}`}
            className="inline-block text-[11px] font-bold text-brand-navy uppercase tracking-wider border-b border-brand-navy/40 pb-0.5 group-hover:text-brand-accent group-hover:border-brand-accent transition-all duration-300"
          >
            Read Article
          </Link>
        </div>
      </div>
    </article>
  );
}
