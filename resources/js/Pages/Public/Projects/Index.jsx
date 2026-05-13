import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';

export default function ProjectsIndex({ projects = [] }) {
    const { globalSettings, pageContents, pageContentExtras = {} } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'حديقتي لاندسكيب';
    const [activeTab, setActiveTab] = useState('الكل');
    const projectsArray = Array.isArray(projects) ? projects : (projects?.data || []);
    const paginationLinks = Array.isArray(projects?.links) ? projects.links : null;

    // Helper function to get image URL
    const getImageUrl = (key, defaultUrl = '') => {
        const val = pageContents?.[key];
        if (!val) return defaultUrl;
        if (val.startsWith('http') || val.startsWith('/')) return val;
        return `/storage/${val}`;
    };

    // Helper function to get opacity
    const getOpacity = (key, defaultOpacity = 60) => {
        return pageContentExtras[key] ? parseInt(pageContentExtras[key]) : defaultOpacity;
    };

    // Filter categories mapping from requirements.
    const categories = ['الكل', 'تنسيق حدائق', 'تصميم حدائق', 'عشب صناعي', 'شلالات', 'مظلات'];

    // If projects don't map to these exactly, we may need to adjust filter logic or project data.
    const filteredProjects = activeTab === 'الكل'
        ? projectsArray
        : projectsArray.filter(p => p.category === activeTab || (activeTab === 'تنسيق حدائق' && p.category?.includes('عام')));

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#064E3B] min-h-screen text-gray-800 dark:text-gray-100 transition-colors duration-300" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{`مشاريعنا - ${siteName}`}</title>
                <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet" />

                <style>{`
                    .hero-gradient { background-image: linear-gradient(180deg, rgba(11,31,58,0.3) 0%, rgba(11,31,58,0.9) 100%); }
                    .green-gradient { background-image: linear-gradient(135deg, #4ADE80 0%, #16A34A 100%); }
                    .text-green { color: #16A34A; }
                    .hover-zoom-img:hover { transform: scale(1.05); }
                    .project-card:hover .project-overlay { opacity: 1; }
                `}</style>
            </Head>

            <Navbar />

            {/* 1) HERO SECTION */}
            <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="High-end landscaping project background"
                        className="w-full h-full object-cover"
                        src={getImageUrl('projects.hero.background_image', "https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop")}
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center mt-20">
                    {pageContents?.['projects.hero.badge'] && (
                        <span className="inline-block py-1.5 px-4 rounded-full border border-[#16A34A]/40 text-[#16A34A] font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur shadow-sm">
                            {pageContents?.['projects.hero.badge']}
                        </span>
                    )}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight drop-shadow-xl">
                        {pageContents?.['projects.hero.title'] || ''}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                        {pageContents?.['projects.hero.subtitle'] || ''}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {pageContents?.['projects.hero.primary_button_text'] && (
                            <a href={pageContents?.['projects.hero.primary_button_link'] || '#projects-grid'} className="green-gradient hover:brightness-110 text-[#064E3B] font-bold py-4 px-10 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.4)] hover:-translate-y-1">
                                {pageContents?.['projects.hero.primary_button_text']}
                            </a>
                        )}
                        {pageContents?.['projects.hero.secondary_button_text'] && (
                            <Link href={pageContents?.['projects.hero.secondary_button_link'] || route('contact')} className="border-2 border-white/30 hover:bg-white hover:text-[#064E3B] text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 backdrop-blur-sm hover:-translate-y-1">
                                {pageContents?.['projects.hero.secondary_button_text']}
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* 2) FILTER SECTION */}
            <section id="projects-grid" className="py-8 bg-white dark:bg-[#022C22] border-b border-gray-200 dark:border-white/5 sticky top-20 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
                    <div className="flex justify-start md:justify-center gap-2 md:gap-4 min-w-max pb-2">
                        {categories.map((cat, index) => {
                            // Map index to CMS key for filters based on requested structure
                            const filterKeys = ['all', 'landscaping', 'design', 'artificial_grass', 'waterfalls', 'umbrellas'];
                            const filterLabel = pageContents?.[`projects.filters.${filterKeys[index]}`] || cat;
                            if (!filterLabel) return null;

                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === cat
                                        ? 'bg-[#16A34A] text-[#064E3B] shadow-md'
                                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                                        }`}
                                >
                                    {filterLabel}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3) PROJECT GRID */}
            <section className="py-20 bg-[#f8f7f6] dark:bg-[#064E3B]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => {
                                // Dynamic CMS keys based on index limit (e.g. project1 up to project6 for static overrides)
                                const cmsKeyPrefix = `projects.grid.project${index + 1}`;

                                return (
                                    <div key={project.id} className="project-card group relative bg-white dark:bg-[#022C22] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-2 flex flex-col h-full">
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`)}
                                                alt={pageContents?.[`${cmsKeyPrefix}.title`] || project.title || project.title_ar}
                                                className="w-full h-full object-cover hover-zoom-img transition-transform duration-700"
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop'; }} // Fallback if image missing
                                            />
                                            <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#064E3B]/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full text-[#16A34A] shadow-sm">
                                                {pageContents?.[`${cmsKeyPrefix}.category`] || project.category}
                                            </div>
                                            {/* Hover Overlay */}
                                            <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 flex flex-col justify-end p-6">
                                                <p className="text-gray-300 text-sm line-clamp-3 mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                                    {pageContents?.[`${cmsKeyPrefix}.description`] || project.description || project.description_ar || ''}
                                                </p>
                                                <Link href={pageContents?.[`${cmsKeyPrefix}.details_button_link`] || route('our-projects.show', project.id)} className="inline-flex items-center gap-2 text-white font-bold hover:text-[#16A34A] transition-colors w-fit">
                                                    {pageContents?.[`${cmsKeyPrefix}.details_button_text`] || 'عرض التفاصيل'}
                                                    <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{pageContents?.[`${cmsKeyPrefix}.title`] || project.title || project.title_ar}</h3>

                                                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <DynamicIcon name="location_on" className="text-[16px] text-[#16A34A]" />
                                                        <span>{pageContents?.[`${cmsKeyPrefix}.location`] || 'السعودية'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <DynamicIcon name="calendar_today" className="text-[16px] text-[#16A34A]" />
                                                        <span dir="ltr">{pageContents?.[`${cmsKeyPrefix}.year`] || new Date(project.created_at).getFullYear()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <Link href={pageContents?.[`${cmsKeyPrefix}.details_button_link`] || route('our-projects.show', project.id)} className="mt-6 w-full flex justify-center py-3 text-center border border-[#16A34A]/30 text-[#16A34A] hover:bg-[#16A34A] hover:text-[#064E3B] font-bold rounded-lg transition-colors duration-300">
                                                {pageContents?.[`${cmsKeyPrefix}.details_button_text`] || 'عرض تفاصيل المشروع'}
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <DynamicIcon name="construction" className="text-6xl text-gray-300 dark:text-white/20 mb-4 block" />
                                <h3 className="text-2xl font-bold text-gray-500 dark:text-gray-400">لا توجد مشاريع في هذا القسم حالياً</h3>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 4) PAGINATION */}
            {paginationLinks && paginationLinks.length > 0 && (
                <section className="pb-14 bg-[#f8f7f6] dark:bg-[#064E3B]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {paginationLinks.map((link, idx) => (
                                <Link
                                    key={`${idx}-${link.label}`}
                                    href={link.url || '#'}
                                    preserveScroll
                                    className={`px-4 py-2 rounded-lg border text-sm font-bold transition-colors ${
                                        link.active
                                            ? 'bg-[#16A34A] text-[#064E3B] border-[#16A34A]'
                                            : 'bg-white dark:bg-[#022C22] text-gray-700 dark:text-gray-200 border-gray-200 dark:border-white/10 hover:border-[#16A34A]/50'
                                    } ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 5) STATISTICS SECTION */}
            <section className="py-20 bg-[#022C22] border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-x-reverse divide-white/10">
                        <div className="p-4 flex flex-col items-center">
                            {pageContents?.['projects.stats.projects_completed.icon'] && (
                                <DynamicIcon name={pageContents['projects.stats.projects_completed.icon']} className="text-[#16A34A] text-4xl mb-2" />
                            )}
                            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text green-gradient mb-3" style={{ fontFamily: '"Manrope", sans-serif' }}>
                                {pageContents?.['projects.stats.projects_completed.value'] || '+150'}
                            </div>
                            <div className="text-white font-medium text-lg">
                                {pageContents?.['projects.stats.projects_completed.title'] || 'مشروع مكتمل'}
                            </div>
                        </div>
                        <div className="p-4 flex flex-col items-center">
                            {pageContents?.['projects.stats.years_experience.icon'] && (
                                <DynamicIcon name={pageContents['projects.stats.years_experience.icon']} className="text-[#16A34A] text-4xl mb-2" />
                            )}
                            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text green-gradient mb-3" style={{ fontFamily: '"Manrope", sans-serif' }}>
                                {pageContents?.['projects.stats.years_experience.value'] || '10'}
                            </div>
                            <div className="text-white font-medium text-lg">
                                {pageContents?.['projects.stats.years_experience.title'] || 'سنوات خبرة'}
                            </div>
                        </div>
                        <div className="p-4 flex flex-col items-center">
                            {pageContents?.['projects.stats.customer_satisfaction.icon'] && (
                                <DynamicIcon name={pageContents['projects.stats.customer_satisfaction.icon']} className="text-[#16A34A] text-4xl mb-2" />
                            )}
                            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text green-gradient mb-3" style={{ fontFamily: '"Manrope", sans-serif' }}>
                                {pageContents?.['projects.stats.customer_satisfaction.value'] || '%98'}
                            </div>
                            <div className="text-white font-medium text-lg">
                                {pageContents?.['projects.stats.customer_satisfaction.title'] || 'رضا العملاء'}
                            </div>
                        </div>
                        <div className="p-4 flex flex-col items-center">
                            {pageContents?.['projects.stats.engineers.icon'] && (
                                <DynamicIcon name={pageContents['projects.stats.engineers.icon']} className="text-[#16A34A] text-4xl mb-2" />
                            )}
                            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text green-gradient mb-3" style={{ fontFamily: '"Manrope", sans-serif' }}>
                                {pageContents?.['projects.stats.engineers.value'] || '50'}
                            </div>
                            <div className="text-white font-medium text-lg">
                                {pageContents?.['projects.stats.engineers.title'] || 'مهندس زراعي وفني'}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6) CLIENT TESTIMONIALS */}
            <section className="py-24 bg-white dark:bg-[#064E3B]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        {pageContents?.['projects.testimonials.badge'] && (
                            <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-3">{pageContents?.['projects.testimonials.badge']}</span>
                        )}
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {pageContents?.['projects.testimonials.title'] || 'آراء شركاء النجاح'}
                        </h2>
                        <div className="w-20 h-1 bg-[#16A34A] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((index) => {
                            const cmsKeyPrefix = `projects.testimonials.item${index}`;

                            const name = pageContents?.[`${cmsKeyPrefix}.name`];
                            if (!name) return null; // Only render if the testimonial is populated in the CMS

                            const text = pageContents?.[`${cmsKeyPrefix}.text`] || '';
                            const position = pageContents?.[`${cmsKeyPrefix}.position`] || '';

                            return (
                                <div key={index} className="bg-gray-50 dark:bg-[#022C22] p-8 rounded-2xl border border-gray-100 dark:border-white/5 relative">
                                    <DynamicIcon name="format_quote" className="absolute top-6 left-6 text-6xl text-[#16A34A]/10 rotate-180" />
                                    <div className="flex items-center gap-1 text-[#16A34A] mb-6">
                                        {[1, 2, 3, 4, 5].map(star => <DynamicIcon key={star} name="star" className="text-[18px]" />)}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 relative z-10">{text}</p>
                                    <div className="flex items-center gap-4 border-t border-gray-200 dark:border-white/10 pt-6">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center font-bold text-[#064E3B] dark:text-white">
                                            {name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-white">{name}</div>
                                            <div className="text-sm text-[#16A34A]">
                                                {position}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 7) STRONG CALL TO ACTION */}
            <section className="py-24 relative overflow-hidden bg-[#16A34A]">
                {pageContents?.['projects.cta.background_image'] && (
                    <div className="absolute inset-0 z-0 mix-blend-multiply opacity-30">
                        <img
                            src={getImageUrl('projects.cta.background_image')}
                            className="w-full h-full object-cover"
                            alt="CTA Background"
                        />
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-l from-[#16A34A] to-[#4ADE80]" style={{ opacity: pageContents?.['projects.cta.background_image'] ? getOpacity('projects.cta.background_image', 90) / 100 : 1 }}></div>
                <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                <div className="max-w-5xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
                    {pageContents?.['projects.cta.icon'] && (
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 text-[#064E3B]">
                            <DynamicIcon name={pageContents['projects.cta.icon']} className="text-4xl" />
                        </div>
                    )}
                    <h2 className="text-4xl md:text-5xl font-black text-[#064E3B] mb-6 leading-tight">
                        {pageContents?.['projects.cta.title'] ? (
                            <span dangerouslySetInnerHTML={{ __html: pageContents['projects.cta.title'].replace(/\n/g, '<br />') }} />
                        ) : (
                            <>هل لديك مشروع قادم؟<br />دعنا نبدأ اليوم.</>
                        )}
                    </h2>
                    <p className="text-[#064E3B]/80 text-xl font-medium mb-10 max-w-2xl">
                        {pageContents?.['projects.cta.description'] || 'تواصل معنا الآن للحصول على استشارة مجانية وعرض تصميم مبدئي لتنفيذ حديقة أحلامك بأعلى معايير الجودة.'}
                    </p>
                    <Link href={pageContents?.['projects.cta.button_link'] || route('contact')} className="bg-[#064E3B] hover:bg-white hover:text-[#064E3B] text-white font-bold text-xl py-5 px-14 rounded-xl transition-all duration-300 shadow-xl hover:shadow-[0_20px_40px_rgba(11,31,58,0.2)] transform hover:-translate-y-1 inline-flex items-center gap-3">
                        {pageContents?.['projects.cta.button_text'] || 'تواصل معنا الآن'}
                        <DynamicIcon name="arrow_forward" className="rotate-180" />
                    </Link>
                </div>
            </section>

            {/* Footer inclusion or simple footer can go here if needed, but assuming Navigation wrapper or similar contains it. Usually we import Footer if it is separate from Navbar but Welcome.jsx had inline footer. */}
            <footer className="bg-[#040A12] border-t border-white/5 py-8 text-center text-sm text-gray-500">
                <p>نظام حديقتي لاندسكيب © {new Date().getFullYear()} — صُمِّم بواسطة <a href="https://wa.me/967781582995" target="_blank" rel="noopener noreferrer" className="text-[#16A34A] font-bold hover:underline">شركة Aboras Soft</a></p>
            </footer>
        </div>
    );
}
