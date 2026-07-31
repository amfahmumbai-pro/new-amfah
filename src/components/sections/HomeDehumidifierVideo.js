"use client";
 
import { useSearchParams } from "next/navigation";
 
export default function HomeDehumidifierVideo() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const isEconomy = filter === "economy";
 
  // if (isEconomy) return null;
 
  // return (
  //   <section className="relative h-[40vh] sm:h-[60vh] md:h-[100vh] w-full bg-black overflow-hidden" style={{ clipPath: "inset(0px)" }}>
  //     <div className="absolute md:fixed inset-0 w-full h-full pointer-events-none z-0">
  //       {/* <video
  //         src="/videos/olimpia-splendid2.mp4"
  //         autoPlay
  //         loop
  //         muted
  //         playsInline
  //         className="w-full h-full object-cover opacity-80"
  //       /> */}
  //     </div>
  //   </section>
  // );
  return null;
}
