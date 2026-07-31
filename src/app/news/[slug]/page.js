import { notFound } from "next/navigation";
import Link from "@/components/ui/AppLink";
import { BookOpen, ArrowRight, Calendar, Clock } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import { news } from "@/data/news";

// Generate dynamic metadata for B2B/B2C SEO value
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);

  if (!item) {
    return {
      title: "News Article Not Found | AMFAH India",
      description: "The requested news article could not be found.",
    };
  }

  // Remove HTML tags
  const cleanContent = item.content
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Meta Description with elegant fallback & truncation
  const rawDesc = item.summary || cleanContent;
  const description = rawDesc.length > 160 
    ? rawDesc.slice(0, 157) + "..." 
    : rawDesc;

  // Dynamically extract keywords based on content frequency
  const titleWords = item.title
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

  // Combine static and dynamic keywords
  const keywordSet = new Set([
    item.title,
    item.category,
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
  const pageUrl = `${siteUrl}/news/${item.slug}`;
  const imageUrl = item.image
    ? `${siteUrl}${item.image}`
    : `${siteUrl}/banner/dehumidifiers.jpeg`;

  let publishedTime = item.date;
  try {
    const parsedDate = new Date(item.date);
    if (!isNaN(parsedDate.getTime())) {
      publishedTime = parsedDate.toISOString();
    }
  } catch (e) {}

  return {
    metadataBase: new URL(siteUrl),

    title: `${item.title} | AMFAH India`,

    description,

    keywords,

    authors: [
      {
        name: item.author,
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
      title: item.title,

      description,

      url: pageUrl,

      siteName: "AMFAH India",

      locale: "en_IN",

      type: "article",

      publishedTime,

      authors: [item.author],

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: item.title,
      description,
      images: [imageUrl],
    },
  };
}

// Generate static routes for maximum server performance
export async function generateStaticParams() {
  return news.map((n) => ({
    slug: n.slug,
  }));
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);

  if (!item) {
    notFound();
  }

  // Pre-fill Google-friendly Article Schema JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": item.title,
    "description": item.summary,
    "datePublished": item.date,
    "author": {
      "@type": "Person",
      "name": item.author
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

  // Find other reading suggestions
  const relatedNews = news.filter((n) => n.slug !== item.slug).slice(0, 2);

  return (
    <div className="flex flex-col bg-white min-h-screen font-sans selection:bg-brand-navy selection:text-white">
      {/* Dynamic Article JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="flex-grow pb-24">
        
        {/* Centered Editorial Header */}
        <header className="max-w-7xl mx-auto text-center space-y-6 pt-16 pb-12 px-6">
          {/* <ScrollReveal delay={0.1} y={15}>
            <span className="text-[10px] sm:text-xs font-bold text-brand-navy bg-brand-blue-light/70 px-4 py-1.5 rounded-full uppercase tracking-wider font-display inline-block border border-brand-blue-light/95 shadow-2xs">
              {item.category}
            </span>
          </ScrollReveal> */}

          <ScrollReveal delay={0.2} y={15}>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-brand-navy tracking-tight leading-[1.15] max-w-7xl mx-auto">
              {item.title}
            </h1>
          </ScrollReveal>

          {/* Centered Author & Metadata */}
          <ScrollReveal delay={0.3} y={15}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-brand-border/60 max-w-lg mx-auto text-xs text-brand-gray-medium font-sans">
              <div className="flex items-center gap-2 font-semibold text-brand-navy">
                <div className="h-7 w-7 bg-brand-accent text-white rounded-full flex items-center justify-center font-display font-bold text-[10px] shadow-2xs select-none">
                  {item.author.split(" ").slice(0,2).map(w => w[0]).join("")}
                </div>
                <span>By {item.author}</span>
              </div>
              <span className="h-3 w-px bg-brand-border/80" />
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{item.date}</span>
              </div>
              <span className="h-3 w-px bg-brand-border/80" />
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{item.readTime}</span>
              </div>
              {item.officialLink && (
                <>
                  <span className="h-3 w-px bg-brand-border/80" />
                  <a
                    href={item.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-accent hover:text-brand-navy underline font-bold transition-colors"
                  >
                    Official Source
                  </a>
                </>
              )}
            </div>
          </ScrollReveal>
        </header>

        {/* Large Centered Framed High-Res Image (Non-bleed, beautifully styled) */}
        <section className="w-full mb-16">
          <ScrollReveal delay={0.3}>
            <div className="overflow-hidden w-full">
              <div className="overflow-hidden bg-brand-blue-light/20 relative max-h-[600px]">
                <img
                  src={item.image || "/banner/dehumidifiers.jpeg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Distraction-Free Single-Column Article Body */}
        <section className="max-w-7xl mx-auto px-6">
          <ScrollReveal delay={0.1}>
            <div 
              className="text-brand-gray-dark/95 text-base sm:text-[18px] leading-[1.75] space-y-8 font-sans
                         [&_p]:leading-[1.75] [&_p]:mb-5 [&_p]:text-justify
                         [&_p.lead]:text-lg sm:[&_p.lead]:text-xl [&_p.lead]:font-medium [&_p.lead]:text-brand-navy [&_p.lead]:border-l-4 [&_p.lead]:border-brand-accent [&_p.lead]:pl-5 [&_p.lead]:my-8 [&_p.lead]:leading-relaxed
                         [&_h3]:font-display [&_h3]:font-black [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:text-brand-navy [&_h3]:mt-12 [&_h3]:mb-4 [&_h3]:tracking-tight [&_h3]:border-b [&_h3]:border-brand-border/40 [&_h3]:pb-2
                         [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-6 [&_ul]:space-y-2.5
                         [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-6 [&_ol]:space-y-2.5
                         [&_li]:leading-relaxed [&_li]:text-brand-gray-dark/90
                         [&_blockquote]:bg-[#FAF7F2] [&_blockquote]:border-l-4 [&_blockquote]:border-brand-accent [&_blockquote]:p-6 [&_blockquote]:rounded-r-xl [&_blockquote]:italic [&_blockquote]:text-brand-navy [&_blockquote]:my-8 [&_blockquote]:font-sans [&_blockquote_cite]:block [&_blockquote_cite]:mt-3 [&_blockquote_cite]:text-[10px] [&_blockquote_cite]:font-bold [&_blockquote_cite]:uppercase [&_blockquote_cite]:tracking-wider [&_blockquote_cite]:text-brand-gray-medium [&_blockquote_cite]:not-italic [&_blockquote_cite]:font-display"
              dangerouslySetInnerHTML={{ __html: item.content }} 
            />
          </ScrollReveal>
        </section>

        {/* 3. Related Announcements Grid */}
        {relatedNews.length > 0 && (
          <section className="max-w-7xl mx-auto mt-24 pt-16 border-t border-brand-border/60 px-6">
            <div className="space-y-8">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[10px] font-bold text-brand-gray-medium uppercase tracking-widest font-display block">
                  Keep Reading
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-navy">
                  More Corporate Announcements
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedNews.map((rel) => (
                  <NewsRelatedCard key={rel.slug} item={rel} />
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Main Bottom B2B Call to Action */}
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
              href="/news" 
              className="text-xs font-bold uppercase tracking-widest text-white hover:text-brand-blue-light border-b border-white/30 hover:border-brand-blue-light pb-0.5 transition-colors font-display"
            >
              Back to All News
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

// Local NewsRelatedCard component to separate blogs and news code dependencies
function NewsRelatedCard({ item }) {
  const { slug, title, summary, date, readTime, category, image, author, officialLink } = item;
  
  // Custom source tags depending on slug or categories
  const sourceTag = slug.includes("covid") ? "Express Healthcare Feature" : "Official Press Release";

  return (
    <article className="group flex flex-col md:flex-row bg-white border border-brand-border/60 hover:border-brand-navy/20 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 gap-5 items-stretch">
      {/* Thumbnail */}
      <Link
        href={`/news/${slug}`}
        className="block overflow-hidden rounded-xl md:w-44 md:h-32 w-full shrink-0 relative bg-brand-blue-light/35 shadow-xs"
      >
        <img
          src={image || "/banner/dehumidifiers.jpeg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104"
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className="flex-grow flex flex-col justify-between space-y-2 py-0.5 font-sans">
        <div className="space-y-1">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-[9px] font-bold text-brand-gray-medium uppercase tracking-wider font-display flex-wrap">
            <span className="text-brand-navy bg-brand-blue-light px-2 py-0.5 rounded">
              {sourceTag}
            </span>
            <span className="h-1 w-1 rounded-full bg-brand-border" />
            <span>{date}</span>
            {officialLink && (
              <>
                <span className="h-1 w-1 rounded-full bg-brand-border" />
                <a
                  href={officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:text-brand-navy underline transition-colors normal-case font-semibold"
                >
                  Source
                </a>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display font-extrabold text-sm sm:text-base text-brand-navy group-hover:text-brand-accent transition-colors duration-300 leading-snug">
            <Link href={`/news/${slug}`}>
              {title}
            </Link>
          </h3>

          {/* Summary */}
          <p className="text-xs leading-relaxed text-brand-gray-dark/80 line-clamp-2 font-sans">
            {summary}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-brand-border/40 flex items-center justify-between gap-2 text-[9px]">
          <span className="text-brand-navy font-bold uppercase tracking-wider font-display">By {author.split(" (")[0]}</span>
          <Link
            href={`/news/${slug}`}
            className="inline-flex items-center gap-1 font-bold text-brand-navy uppercase tracking-wider border-b border-brand-navy/35 hover:border-brand-accent hover:text-brand-accent transition-all pb-0.5"
          >
            <span>Read Release</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
