import FAQContent from "./FAQContent";
import {
  whyNeedDehumidifier,
  whereToUseDehumidifier,
  howRefrigerantDehumidifierWorks,
  sizingGuide,
  howToUseRightWay,
  keyFeaturesToLookFor,
  maintenanceSchedule,
  cleaningGuide,
  generalFaqs,
} from "@/data/faqs";

export const metadata = {
  title: "Dehumidifier FAQs | Sizing, RH & Care | AMFAH",
  description:
    "What a dehumidifier does, what capacity your space needs, ideal RH for home and industry, drainage options and filter cleaning. Answered simply.",
  keywords: [
    "what is a dehumidifier",
    "why do you need a dehumidifier",
    "where to use a dehumidifier",
    "how does a refrigerant dehumidifier work",
    "dehumidifier sizing table",
    "what features to look for in dehumidifier",
    "how to clean dehumidifier properly",
    "dehumidifier maintenance frequency",
    "AMFAH dehumidifier FAQ",
    "mold allergy humidity control India",
  ],
  alternates: {
    canonical: "https://amfah.com/faq",
  },
  openGraph: {
    title: "Dehumidifier FAQs | Sizing, RH & Care | AMFAH",
    description:
      "What a dehumidifier does, what capacity your space needs, ideal RH for home and industry, drainage options and filter cleaning. Answered simply.",
    url: "https://amfah.com/faq",
    siteName: "AMFAH India",
    images: [
      {
        url: "https://amfah.com/banner/home-dehumidifier.png",
        width: 1200,
        height: 630,
        alt: "AMFAH Dehumidifier FAQ Knowledge Hub",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function FAQPage() {
  // Build Google FAQPage structured data schema
  const schemaEntities = [
    {
      "@type": "Question",
      name: "What is an indoor air dehumidifier?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A dehumidifier is an electrical appliance that removes excess moisture from indoor air to maintain a healthy humidity level (40%–60% RH). Portable models come with wheels for easy movement between rooms, helping prevent mold, dust mites, musty odors, and dampness damage.",
      },
    },
    ...whyNeedDehumidifier.items.map((item) => ({
      "@type": "Question",
      name: `Why do you need a dehumidifier? ${item.title}`,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.content,
      },
    })),
    ...whereToUseDehumidifier.items.map((item) => ({
      "@type": "Question",
      name: `Where should you place a dehumidifier? ${item.title}`,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.content,
      },
    })),
    {
      "@type": "Question",
      name: "How does a refrigerant dehumidifier work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Humid air is drawn across a chilled evaporator coil where water vapor rapidly condenses into liquid droplets and collects in a reservoir. The chilled dry air is then passed over a warm condenser coil to reheat it back to comfortable room temperature before being discharged back into the room.",
      },
    },
    {
      "@type": "Question",
      name: "How to choose the right dehumidifier size for your space?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evaluate total room square footage and the severity of dampness. Compact spaces up to 200 sq.ft need 12-20 L/day, medium rooms up to 350 sq.ft need 20-30 L/day, large areas up to 500 sq.ft need 30-40 L/day, and expansive areas up to 800+ sq.ft need 50-90+ L/day.",
      },
    },
    ...howToUseRightWay.steps.map((s) => ({
      "@type": "Question",
      name: `How to use a dehumidifier the right way? ${s.title}`,
      acceptedAnswer: {
        "@type": "Answer",
        text: s.content,
      },
    })),
    ...keyFeaturesToLookFor.features.map((f) => ({
      "@type": "Question",
      name: `What features should you look for in a dehumidifier? ${f.name}`,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.desc,
      },
    })),
    ...maintenanceSchedule.points.map((p) => ({
      "@type": "Question",
      name: `Does the dehumidifier need any maintenance? ${p.title}`,
      acceptedAnswer: {
        "@type": "Answer",
        text: p.content,
      },
    })),
    {
      "@type": "Question",
      name: "How to clean a dehumidifier properly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Step 1: Disconnect the dehumidifier from power supply. Step 2: Use a soft damp cloth to wipe dust from the housing outer case. Step 3: Use a vacuum cleaner brush or tap water to clean the filter gently and let it dry completely before reinserting.",
      },
    },
    ...generalFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: schemaEntities,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQContent />
    </>
  );
}
