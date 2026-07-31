// Force dynamic route params rebuild on data change
import { notFound } from "next/navigation";
import Link from "@/components/ui/AppLink";
import { ArrowLeft, Clock, Calendar, User, BookOpen, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import { blogs } from "@/data/blogs";
import ScrollProgress from "./ScrollProgress";
import BlogCard from "@/components/cards/BlogCard";

// Generate dynamic metadata for B2B/B2C SEO value
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return {
      title: "Article Not Found | AMFAH India",
      description: "The requested article could not be found.",
    };
  }

  // Remove HTML tags
  const cleanContent = blog.content
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Meta Description with elegant fallback & truncation
  const rawDesc = blog.metaDescription || blog.summary || cleanContent;
  const description = rawDesc.length > 160 
    ? rawDesc.slice(0, 157) + "..." 
    : rawDesc;

  // Dynamically extract keywords based on content frequency
  const titleWords = blog.title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 3);

  const contentWords = cleanContent
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 4);

  const stopWords = new Set([
    "about", "above", "across", "after", "again", "against", "almost", "along",
    "already", "also", "although", "always", "among", "another", "anyone",
    "anything", "back", "because", "been", "before", "behind", "being", "below",
    "between", "both", "cannot", "could", "didnt", "doesnt", "doing", "done",
    "down", "during", "each", "either", "else", "even", "ever", "every", "find",
    "from", "further", "give", "goes", "going", "gone", "good", "great", "hadnt",
    "hasnt", "havent", "having", "here", "hers", "himself", "hows", "however",
    "into", "itself", "just", "keep", "know", "least", "like", "made", "make",
    "many", "more", "most", "much", "must", "myself", "near", "need", "never",
    "none", "nothing", "nowhere", "often", "once", "only", "other", "others",
    "ought", "ours", "ourselves", "over", "particular", "perhaps", "please",
    "quite", "rather", "really", "same", "say", "says", "second", "shall",
    "should", "since", "some", "someone", "something", "sometimes", "still",
    "such", "than", "that", "the", "their", "them", "themselves", "then", "there",
    "these", "they", "thing", "think", "this", "those", "through", "throughout",
    "together", "too", "under", "until", "upon", "very", "want", "wasnt", "well",
    "were", "what", "whatever", "when", "where", "whether", "which", "while",
    "who", "whom", "whose", "why", "will", "with", "within", "without", "would",
    "your", "yours", "yourself", "yourselves"
  ]);

  const freqMap = {};
  [...titleWords, ...contentWords].forEach(word => {
    if (!stopWords.has(word) && isNaN(word)) {
      freqMap[word] = (freqMap[word] || 0) + 1;
    }
  });

  // Sort by frequency and take top 10
  const topKeywords = Object.keys(freqMap)
    .sort((a, b) => freqMap[b] - freqMap[a])
    .slice(0, 10);

  // Combine static keywords and dynamically extracted ones
  const keywordSet = new Set([
    blog.title,
    blog.category,
    "AMFAH",
    "AMFAH India",
    "Dehumidifier",
    "Humidity Control",
    "Indoor Air Quality",
    "Air Purifier",
    "Commercial Dehumidifier",
    "Industrial Dehumidifier",
    "Portable AC",
    "Air To Water Generator",
    ...topKeywords
  ]);
  const keywords = Array.from(keywordSet);

  const siteUrl = "https://amfah.com";
  const pageUrl = `${siteUrl}/blogs/${blog.slug}`;
  const imageUrl = blog.image
    ? `${siteUrl}${blog.image}`
    : `${siteUrl}/banner/dehumidifiers.jpeg`;

  let publishedTime = blog.date;
  try {
    const parsedDate = new Date(blog.date);
    if (!isNaN(parsedDate.getTime())) {
      publishedTime = parsedDate.toISOString();
    }
  } catch (e) {}

  return {
    metadataBase: new URL(siteUrl),

    title: blog.metaTitle || `${blog.title} | AMFAH India`,

    description,

    keywords,

    authors: [
      {
        name: blog.author || "AMFAH India",
      },
    ],

    creator: "AMFAH India",

    publisher: "AMFAH India",

    alternates: {
      canonical: pageUrl,
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      title: blog.metaTitle || blog.title,

      description,

      url: pageUrl,

      siteName: "AMFAH India",

      locale: "en_IN",

      type: "article",

      publishedTime,

      authors: [blog.author || "AMFAH India"],

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description,
      images: [imageUrl],
    },
  };
}

// Generate static routes for maximum server performance
export async function generateStaticParams() {
  return blogs.map((b) => ({
    slug: b.slug,
  }));
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // Pre-fill Google-friendly Article Schema JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": blog.title,
    "description": blog.summary,
    "datePublished": blog.date,
    "author": {
      "@type": "Person",
      "name": blog.author || "AMFAH India"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AMFAH Dehumidifiers",
      "logo": {
        "@type": "ImageObject",
        "url": "https://amfah.com/logo.png"
      }
    }
  };

  // Find other reading suggestions (excluding current blog, maximum 3 for the 3-column grid layout)
  const relatedBlogs = blogs.filter((b) => b.slug !== blog.slug).slice(0, 3);

  return (
    <div className="flex flex-col bg-white min-h-screen font-sans">
      {/* Dynamic Article JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />


      {/* Article Container */}
      <main className="flex-grow pb-10">
        
        {/* merged Hero Header with Image Background */}
        <section className="w-full relative min-h-[350px] sm:min-h-[450px] md:min-h-[630px] flex items-center overflow-hidden">
          {/* Background Image fill */}
          <div className="absolute inset-0 z-0">
            <img
              src={blog.image || "/banner/dehumidifiers.jpeg"}
              alt={blog.title}
              className="w-full h-full object-cover blur-[2px] scale-105"
            />
            {/* Elegant dark overlay gradient to guarantee contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/40 to-slate-950/20" />
          </div>

          {/* Overlaid content */}
          <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10 w-full py-8 md:py-8 space-y-5 text-white">
            
            {/* Category • Date */}
            <ScrollReveal delay={0.1} y={15}>
              <div className="flex items-center gap-3">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded font-display text-[9px] md:text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                  {blog.category}
                </span>
                <span className="text-xs md:text-sm text-slate-200 font-medium">
                  {blog.date}
                </span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal delay={0.2} y={20}>
              <h1 className="font-display font-extrabold text-xl md:text-5xl lg:text-[55px] leading-[1.15] text-white tracking-tight [text-shadow:_0_2px_4px_rgba(0,0,0,0.4)]">
                {blog.title}
              </h1>
            </ScrollReveal>

            {/* Subtitle / Summary */}
            <ScrollReveal delay={0.3} y={20}>
              <p className="text-slate-100 text-sm md:text-xl max-w-3xl leading-relaxed font-sans font-medium [text-shadow:_0_1px_2px_rgba(0,0,0,0.3)]">
                {blog.summary}
              </p>
            </ScrollReveal>

            {/* Read time details */}
            <ScrollReveal delay={0.4} y={15}>
              <div className="flex items-center gap-2 pt-1 font-display text-xs text-slate-200 font-bold uppercase tracking-wider">
                <span className="text-xs md:text-sm">{blog.readTime}</span>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* Distraction-Free Single-Column Article Body */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 pt-12 md:pt-16">
          <ScrollReveal delay={0.1}>
            <div 
              className="text-brand-gray-dark/95 text-base sm:text-[18px] leading-[1.65] space-y-7 font-sans
                         [&_p]:leading-[1.65] [&_p]:mb-5 [&_p]:text-justify
                         [&_p.lead]:text-lg sm:[&_p.lead]:text-xl [&_p.lead]:font-medium [&_p.lead]:text-brand-navy [&_p.lead]:border-l-4 [&_p.lead]:border-brand-accent [&_p.lead]:pl-5 [&_p.lead]:my-8 [&_p.lead]:leading-relaxed
                         [&_h3]:font-display [&_h3]:font-bold [&_h3]:text-2xl sm:[&_h3]:text-3xl [&_h3]:text-brand-navy [&_h3]:mt-12 [&_h3]:mb-4 [&_h3]:tracking-tight
                         [&_ul]:list-none [&_ul]:pl-6 [&_ul]:my-6 [&_ul]:space-y-2.5
                         [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-6 [&_ol]:space-y-2.5
                         [&_li]:leading-relaxed [&_li]:text-brand-gray-dark/90
                         [&_blockquote]:bg-[#FAF7F2] [&_blockquote]:border-l-4 [&_blockquote]:border-brand-accent [&_blockquote]:p-6 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_blockquote]:text-brand-navy [&_blockquote]:my-8 [&_blockquote]:font-sans"
              dangerouslySetInnerHTML={{ __html: blog.content }} 
            />
          </ScrollReveal>
        </section>

        {/* Suggested Reading - 3-Column Grid */}
        {relatedBlogs.length > 0 && (
          <section className="max-w-7xl px-4 mx-auto mt-6 md:mt-10 pt-6 md:pt-10 border-t border-brand-border/60">
            <div className="space-y-3 md:space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-brand-gray-medium uppercase tracking-widest font-display block">
                  More Insights
                </span>
                <h2 className="font-display font-extrabold text-2xl text-brand-navy">
                  Suggested Publications
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {relatedBlogs.map((rel) => (
                  <BlogCard key={rel.slug} blog={rel} />
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Main Bottom B2B Consulting Call to Action */}
      <section className="py-20 bg-brand-navy text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-blue-light/5 rounded-full blur-[100px] pointer-events-none" />

        <ScrollReveal delay={0.1} className="max-w-2xl mx-auto space-y-6 px-6 relative z-10">
          <BookOpen className="h-12 w-12 text-brand-blue-light mx-auto animate-pulse" />
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight">
            Need Expert Humidity Design Documentation?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto font-sans">
            Our Senior indoor air consultants are online to draft complete thermodynamic calculations for industrial cleanrooms, warehouses, data grids, or residential spaces.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="secondary" size="md" className="font-bold uppercase tracking-wider text-xs w-full sm:w-auto">
              Book Engineering Audit
            </Button>
            <Link 
              href="/blogs" 
              className="text-xs font-bold uppercase tracking-widest text-white hover:text-brand-blue-light border-b border-white/30 hover:border-brand-blue-light pb-0.5 transition-colors font-display"
            >
              Back to All Insights
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
