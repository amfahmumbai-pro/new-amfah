import Link from "@/components/ui/AppLink";
import { ArrowUpRight, ShieldCheck, Factory, Landmark, Hotel, Activity, Database, Snowflake } from "lucide-react";

export default function IndustryCard({ industry }) {
  const { slug, name, targetRH, problem } = industry;

  // Dynamically allocate appropriate premium industrial icons
  const iconMap = {
    "pharmaceutical-industry": Factory,
    "warehouses": ShieldCheck,
    "hospitals": Activity,
    "hotels": Hotel,
    "cold-storage": Snowflake,
    "data-centers": Database,
    "manufacturing-plants": Landmark,
  };

  const IconComponent = iconMap[slug] || Factory;

  return (
    <Link
      href={`/industries/${slug}`}
      className="group block bg-white border border-brand-border rounded-2xl p-6 md:p-8 hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.01] flex flex-col justify-between h-full"
    >
      <div className="space-y-6">
        {/* Header Icon & Target RH Badge */}
        <div className="flex justify-between items-start">
          <div className="h-12 w-12 rounded-xl bg-brand-blue-light text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
            <IconComponent className="h-6 w-6" />
          </div>
          <span className="bg-brand-gray-light text-brand-navy border border-brand-border text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-display">
            Target: {targetRH}
          </span>
        </div>

        {/* Industry Title */}
        <div>
          <h3 className="font-display font-bold text-xl text-brand-navy group-hover:text-brand-blue transition-colors duration-300 flex items-center gap-1.5">
            <span>{name}</span>
            <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
          </h3>
          <p className="text-xs font-semibold text-brand-gray-medium uppercase tracking-wider mt-1.5">
            Humidity control standard
          </p>
        </div>

        {/* Critical Issue / Problem Summary */}
        <p className="text-sm leading-relaxed text-brand-gray-dark/80 line-clamp-3">
          {problem}
        </p>
      </div>

      {/* Explore Link */}
      <div className="pt-6 mt-6 border-t border-brand-border/40 flex items-center justify-between text-xs font-bold text-brand-blue uppercase tracking-wider group-hover:text-brand-navy transition-colors">
        <span>Read Solution Guide</span>
        <span className="h-1.5 w-1.5 rounded-full bg-brand-blue group-hover:w-6 transition-all duration-500" />
      </div>
    </Link>
  );
}
