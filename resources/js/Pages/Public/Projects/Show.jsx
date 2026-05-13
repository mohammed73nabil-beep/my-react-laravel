import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';

export default function ProjectShow({ project, relatedProjects = [] }) {
    // Images for gallery
    const mainImg = project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`);

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#022C22] min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-[#16A34A] selection:text-[#064E3B]" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{`${project.title || project.title_ar} - مشاريعنا`}</title>
                <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet" />

                <style>{`
                    .hero-gradient { background-image: linear-gradient(0deg, rgba(7,19,36,1) 0%, rgba(7,19,36,0.4) 50%, rgba(7,19,36,0.8) 100%); }
                    .green-gradient { background-image: linear-gradient(135deg, #4ADE80 0%, #16A34A 100%); }
                    
                    /* Custom Before/After Slider Range Input styling */
                    input[type=range]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: 40px; width: 40px;
                        border-radius: 50%;
                        background: #16A34A;
                        cursor: ew-resize;
                        box-shadow: 0 0 0 4px rgba(255,255,255,0.8);
                        border: none;
                        background-image: url('data:image/svg+xml;utf8,<svg fill="%230B1F3A" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 14V10L4 12L8 14ZM16 10V14L20 12L16 10Z"/></svg>');
                        background-position: center; background-repeat: no-repeat;
                    }
                `}</style>
            </Head>

            <Navbar />

            {/* 1) PROJECT HERO */}
            <section className="relative h-[70vh] min-h-[500px] flex items-end pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img alt={project.title} className="w-full h-full object-cover" src={mainImg} />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                    <Link href={route('our-projects.index')} className="inline-flex items-center gap-2 text-white/70 hover:text-[#16A34A] mb-6 transition-colors text-sm font-bold tracking-wider uppercase backdrop-blur-sm bg-black/20 py-2 px-4 rounded-full w-fit">
                        <DynamicIcon name="arrow_forward" className="text-sm" />
                        العودة للمشاريع
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <span className="text-[#16A34A] font-bold text-sm tracking-wider uppercase mb-3 block drop-shadow-md">
                                {project.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight drop-shadow-lg mb-4">
                                {project.title || project.title_ar}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 mt-6">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <DynamicIcon name="location_on" className="text-[#16A34A]" />
                                    <span className="font-medium">المملكة العربية السعودية</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <DynamicIcon name="calendar_month" className="text-[#16A34A]" />
                                    <span className="font-medium">تاريخ التسليم: {new Date(project.created_at).getFullYear()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <section className="py-20 bg-white dark:bg-[#022C22] relative">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                        {/* LEFT COLUMN: ABOUT PROJECT & COMPARISON */}
                        <div className="lg:col-span-2 space-y-16">

                            {/* Project Overview */}
                            <div>
                                <h2 className="text-3xl font-bold border-b-2 border-[#16A34A] inline-block pb-3 pr-2 mb-8 text-[#064E3B] dark:text-white">نظرة عامة على المشروع</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-loose text-justify relative z-10 whitespace-pre-wrap">
                                    {project.description || project.description_ar || 'تفاصيل المشروع غير متوفرة حالياً.'}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: PROJECT INFORMATION PANEL */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-[#064E3B] rounded-3xl p-8 shadow-2xl overflow-hidden border border-white/10">
                                <div className="absolute top-0 left-0 w-full h-2 green-gradient"></div>
                                <h3 className="text-2xl font-bold text-white mb-8 mt-2 flex items-center gap-3">
                                    <DynamicIcon name="info" className="text-[#16A34A]" />
                                    بطاقة المشروع
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#16A34A] shrink-0">
                                            <DynamicIcon name="category" className="text-sm" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">الخدمة المُقدمة</div>
                                            <div className="font-bold text-white text-lg">{project.category}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#16A34A] shrink-0">
                                            <DynamicIcon name="calendar_month" className="text-sm" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">تاريخ التسليم</div>
                                            <div className="font-bold text-white text-lg">{new Date(project.created_at).toLocaleDateString('ar-EG')}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <Link href={route('contact')} className="w-full flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-white text-[#064E3B] font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_10px_20px_rgba(201,162,39,0.3)] hover:-translate-y-1">
                                        اطلب مشروعاً مماثلاً
                                        <DynamicIcon name="arrow_forward" className="rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* RELATED PROJECTS GRID */}
            {relatedProjects.length > 0 && (
                <section className="py-20 bg-[#f8f7f6] dark:bg-[#040A12] border-t border-gray-200 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-[#064E3B] dark:text-white">مشاريع ذات صلة</h2>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">تصفح المزيد من أعمالنا في نفس المجال</p>
                            </div>
                            <Link href={route('our-projects.index')} className="text-[#16A34A] font-bold hover:text-[#064E3B] dark:hover:text-white transition-colors hidden md:flex items-center gap-2">
                                كل المشاريع
                                <DynamicIcon name="arrow_forward" className="rotate-180 text-sm" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map(rel => (
                                <Link href={route('our-projects.show', rel.id)} key={rel.id} className="group overflow-hidden rounded-2xl bg-white dark:bg-[#064E3B] shadow-md hover:shadow-xl transition-all border border-transparent dark:border-white/5 hover:border-[#16A34A]/30 block">
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={rel.image_path ? `/storage/${rel.image_path}` : rel.image_url} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                                        <div className="absolute bottom-4 right-4 bg-[#16A34A] text-[#064E3B] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                            {rel.category}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2 line-clamp-1">{rel.title || rel.title_ar}</h4>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                                            عرض تفاصيل المشروع
                                            <DynamicIcon name="arrow_forward" className="text-[16px] rotate-180 transition-transform group-hover:-translate-x-2" />
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CALL TO ACTION */}
            <section className="py-20 bg-[#064E3B] text-center border-t border-[#16A34A]/20 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B] to-transparent"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">هل أعجبك مستوى التنفيذ؟</h2>
                    <p className="text-xl text-gray-400 mb-10">شاركنا أفكارك وسنقوم بتحويلها إلى واقع ملموس</p>
                    <Link href={route('contact')} className="inline-block bg-[#16A34A] hover:bg-white text-[#064E3B] font-bold text-xl py-4 px-12 rounded-lg transition-all duration-300 shadow-xl">
                        ابدأ مشروعك الآن
                    </Link>
                </div>
            </section>
        </div>
    );
}
