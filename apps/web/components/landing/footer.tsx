"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";

export const Footer = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const textRef = useRef<SVGTextElement>(null);

    useEffect(() => {
        const fitWatermark = () => {
            if (!svgRef.current || !textRef.current) return;
            try {
                const bbox = textRef.current.getBBox();
                svgRef.current.setAttribute(
                    "viewBox",
                    `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
                );
            } catch (e) {
                // Ignore if getBBox is not available yet
            }
        };

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(fitWatermark);
        } else {
            window.addEventListener("load", fitWatermark);
        }
        window.addEventListener("resize", fitWatermark);
        
        // Initial fit in case fonts are already loaded
        setTimeout(fitWatermark, 100);

        return () => {
            window.removeEventListener("load", fitWatermark);
            window.removeEventListener("resize", fitWatermark);
        };
    }, []);

    return (
        <footer className="w-full relative bg-transparent font-sans">
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
                .font-dm { font-family: 'DM Sans', sans-serif; }
                .font-caveat { font-family: 'Caveat', cursive; }
                `
            }} />
            <section className="pt-12 pb-0 px-6 font-dm overflow-hidden">
                <div className="max-w-[1150px] mx-auto grid grid-cols-1 md:grid-cols-[350px_1fr] gap-4 md:gap-[16px] items-stretch">
                    {/* Left card */}
                    <div className="relative min-h-[340px] md:min-h-[340px] rounded-[28px] p-8 overflow-hidden bg-[#65a30d] flex flex-col justify-between shadow-[0_12px_40px_rgba(101,163,13,0.25)] gap-10 md:gap-0">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                        >
                            <source
                                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4"
                                type="video/mp4"
                            />
                        </video>
                        
                        <div className="flex flex-row gap-[10px] items-center relative z-10">
                            <Image src="/logos/logo.svg?v=3" alt="Zeno" width={90} height={26} className="rounded-lg" />
                        </div>

                        <div className="mt-auto mb-7 z-10 relative">
                            <p className="text-[19px] font-normal text-white leading-[1.45]">
                                Smarter sales automation,<br />
                                <span className="text-white/65">powered by AI.</span>
                            </p>
                        </div>

                        <div className="flex flex-row justify-between items-center gap-3 z-10 relative">
                            <span className="font-caveat text-[17px] font-semibold text-white/90 tracking-[0.3px]">
                                Stay in touch!
                            </span>
                            <div className="flex flex-row gap-[7px]">
                                {/* Discord */}
                                <div className="w-9 h-9 rounded-[9px] bg-[#0e1014] flex items-center justify-center shadow-[0_6px_18px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.2)] hover:bg-black hover:-translate-y-[2px] transition-all duration-200 cursor-pointer group">
                                    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-white">
                                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                                    </svg>
                                </div>
                                {/* X (Twitter) */}
                                <div className="w-9 h-9 rounded-[9px] bg-[#0e1014] flex items-center justify-center shadow-[0_6px_18px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.2)] hover:bg-black hover:-translate-y-[2px] transition-all duration-200 cursor-pointer">
                                    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-white">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </div>
                                {/* LinkedIn */}
                                <div className="w-9 h-9 rounded-[9px] bg-[#0e1014] flex items-center justify-center shadow-[0_6px_18px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.2)] hover:bg-black hover:-translate-y-[2px] transition-all duration-200 cursor-pointer">
                                    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-white">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </div>
                                {/* GitHub */}
                                <div className="w-9 h-9 rounded-[9px] bg-[#0e1014] flex items-center justify-center shadow-[0_6px_18px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.2)] hover:bg-black hover:-translate-y-[2px] transition-all duration-200 cursor-pointer">
                                    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-white">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right card */}
                    <div className="relative bg-neutral-900 border border-neutral-800 rounded-[28px] p-6 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex flex-col justify-between">
                        {/* Floating lucky badge */}
                        <div className="absolute -top-7 right-3 md:-top-9 md:right-10 z-10 flex flex-col items-start gap-[6px]">
                            <div className="w-[72px] h-[72px] md:w-24 md:h-24 rounded-[22px] -rotate-12 bg-gradient-to-br from-[#bef264] via-[#65a30d] to-[#3f6212] shadow-[inset_3px_3px_8px_rgba(255,255,255,0.35),inset_-3px_-3px_12px_rgba(0,0,0,0.18),8px_14px_28px_rgba(101,163,13,0.35)] flex items-center justify-center">
                                <div className="rotate-12 drop-shadow-[0_3px_6px_rgba(0,0,0,0.25)]">
                                    <Image src="/logos/logo.svg?v=3" alt="Zeno" width={60} height={18} />
                                </div>
                            </div>
                            <div className="flex flex-row gap-[6px] items-center -rotate-6 mt-1">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-[22px] h-[22px] text-[#9ca3af] stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round">
                                    <path d="M3 20 C 6 14, 10 9, 18 5" />
                                    <path d="M18 5 L 12 5" />
                                    <path d="M18 5 L 18 11" />
                                </svg>
                                <span className="font-caveat text-[20px] font-semibold text-[#9ca3af] whitespace-nowrap">
                                    Feeling lucky?
                                </span>
                            </div>
                        </div>

                        {/* Top columns */}
                        <div className="flex flex-row gap-10 md:gap-[72px] pt-2 flex-wrap md:flex-nowrap">
                            <div className="flex flex-col">
                                <h3 className="font-caveat text-[24px] font-semibold italic text-[#9ca3af] mb-[18px]">Navigation</h3>
                                <Link href="#" className="block font-dm text-[14px] font-semibold text-neutral-300 mb-[14px] hover:text-white transition-colors duration-200">How it works</Link>
                                <Link href="#" className="block font-dm text-[14px] font-semibold text-neutral-300 mb-[14px] hover:text-white transition-colors duration-200">Features</Link>
                                <Link href="#" className="block font-dm text-[14px] font-semibold text-neutral-300 mb-[14px] hover:text-white transition-colors duration-200">Pricing</Link>
                                <Link href="#" className="block font-dm text-[14px] font-semibold text-neutral-300 mb-[14px] hover:text-white transition-colors duration-200">Testimonials</Link>
                                <Link href="#" className="block font-dm text-[14px] font-semibold text-neutral-300 mb-[14px] hover:text-white transition-colors duration-200">FAQ</Link>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-caveat text-[24px] font-semibold italic text-[#9ca3af] mb-[18px]">Company</h3>
                                <Link href="#" className="block font-dm text-[14px] font-semibold text-neutral-300 mb-[14px] hover:text-white transition-colors duration-200">Blog</Link>
                                <Link href="#" className="block font-dm text-[14px] font-semibold text-neutral-300 mb-[14px] hover:text-white transition-colors duration-200">About</Link>
                                <Link href="#" className="block font-dm text-[14px] font-semibold text-neutral-300 mb-[14px] hover:text-white transition-colors duration-200">Terms and Condition</Link>
                                <Link href="#" className="block font-dm text-[14px] font-semibold text-neutral-300 mb-[14px] hover:text-white transition-colors duration-200">Privacy Policy</Link>
                            </div>
                        </div>

                        {/* Bottom row */}
                        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-12 gap-6 md:gap-0">
                            <span className="font-dm text-[12.5px] font-medium text-[#9ca3af] order-last md:order-first">
                                &copy; 2026 Zeno. All rights reserved.
                            </span>

                            <div className="flex flex-col gap-[14px] w-full md:w-auto">
                                <p className="text-[15px] font-normal text-neutral-400 leading-[1.45] m-0">
                                    AI moves fast.<br />
                                    <strong className="block text-[19px] font-bold text-white">Stay ahead with Zeno.</strong>
                                </p>
                                <div className="flex flex-row w-full md:w-[310px] bg-neutral-950 border border-neutral-800 rounded-[12px] p-[5px] shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                                    <input 
                                        type="email" 
                                        placeholder="Enter email address" 
                                        className="flex-1 py-[11px] px-[14px] bg-transparent border-none font-dm text-[13.5px] text-white placeholder:text-neutral-500 outline-none"
                                    />
                                    <button 
                                        type="button"
                                        className="py-[11px] px-[22px] bg-white text-black font-dm text-[13.5px] font-semibold rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.28),0_2px_8px_rgba(0,0,0,0.15)] hover:bg-neutral-200 hover:shadow-[0_8px_24px_rgba(255,255,255,0.15),0_3px_10px_rgba(255,255,255,0.1)] hover:-translate-y-[1px] transition-all duration-200"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Watermark */}
                <div className="max-w-[1150px] -mt-[60px] mx-auto select-none relative z-0 leading-none" aria-hidden="true">
                    <motion.svg 
                        ref={svgRef as any} 
                        id="watermarkSvg" 
                        viewBox="62 95 876 175" 
                        preserveAspectRatio="xMidYMid meet" 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="block w-full h-auto overflow-visible group"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                    >
                        <motion.text 
                            ref={textRef as any} 
                            id="watermarkText" 
                            x="500" 
                            y="240" 
                            textAnchor="middle" 
                            fontSize="320" 
                            strokeLinejoin="round"
                            style={{ paintOrder: 'stroke fill' }}
                            className="font-sans font-bold tracking-[-0.03em] fill-white/[0.04] stroke-white/[0.05] stroke-2 transition-all duration-700 ease-in-out group-hover:fill-white/10 group-hover:stroke-white/40 group-hover:drop-shadow-[0_0_60px_rgba(255,255,255,0.4)] cursor-default"
                            variants={{
                                hidden: { filter: "drop-shadow(0 0 0px rgba(255,255,255,0))", stroke: "rgba(255,255,255,0.05)" },
                                visible: { 
                                    filter: ["drop-shadow(0 0 0px rgba(255,255,255,0))", "drop-shadow(0 0 15px rgba(255,255,255,0.2))", "drop-shadow(0 0 0px rgba(255,255,255,0))"],
                                    stroke: ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.05)"],
                                    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                }
                            }}
                        >
                            Zeno
                        </motion.text>
                    </motion.svg>
                </div>
            </section>
        </footer>
    );
};
