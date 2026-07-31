import Link from "@/components/ui/AppLink";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-white flex items-center justify-center px-6 py-24 md:py-32">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in-up">
        
        {/* Main Heading in Blue */}
        <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-[#1251a0] tracking-tight leading-none">
          Page not found
        </h1>

        {/* Subtitle Message */}
        <p className="text-sm sm:text-base md:text-lg text-brand-gray-medium max-w-xl mx-auto leading-relaxed font-semibold">
          Looks like the page you're looking for no longer exists.
          <br className="hidden sm:inline" />
          Try going back to the previous page or to the pages below.
        </p>

        {/* Buttons Group: Red Home Button and Bordered Shop Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link
            href="/"
            prefetch={false}
            className="w-full sm:w-auto text-center bg-[#d41124] hover:bg-brand-navy text-white px-8 py-3.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
          >
            Go to the home page
          </Link>
          <Link
            href="/products"
            prefetch={false}
            className="w-full sm:w-auto text-center border-2 border-brand-navy text-blue-800 hover:bg-brand-navy hover:text-white px-8 py-3.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-98 cursor-pointer"
          >
            Continue shopping
          </Link>
        </div>

      </div>
    </div>
  );
}
