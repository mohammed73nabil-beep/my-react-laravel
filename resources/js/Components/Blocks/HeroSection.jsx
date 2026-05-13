import React from 'react';
import { Link } from '@inertiajs/react';

export default function HeroSection({ data }) {
    return (
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    alt={data?.title?.ar || 'Hero'}
                    className="w-full h-full object-cover"
                    src={data?.image ? data.image : "/images/hero-bg-2.jpg"}
                />
                <div className="absolute inset-0 bg-[#064E3B]/60 mix-blend-multiply"></div>
                {/* Fallback pattern if no image */}
                {!data?.image && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-30"></div>}
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 mt-20">
                <div className="max-w-4xl text-right">
                    <span className="inline-block py-1.5 px-4 rounded-full border border-[#16A34A]/40 text-[#16A34A] font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur shadow-sm">
                        حديقتي لاندسكيب
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] drop-shadow-2xl">
                        {data?.title?.ar || 'عنوان الصفحة الرئيسي'}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed font-light max-w-2xl">
                        {data?.subtitle?.ar || 'نبذة تعريفية سريعة هنا.'}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <Link href={route('contact')} className="bg-gradient-to-r from-[#16A34A] to-[#4ADE80] hover:brightness-110 text-[#064E3B] font-bold py-4 px-10 rounded-lg transition-all shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-1 text-lg text-center">
                            تواصل معنا
                        </Link>
                        <Link href={route('our-projects.index')} className="border border-white/30 hover:bg-white hover:text-[#064E3B] text-white font-bold py-4 px-10 rounded-lg transition-all backdrop-blur-sm hover:-translate-y-1 text-lg text-center">
                            سجل أعمالنا
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
