import React, { useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import SeoHead from '@/Components/SeoHead';
import Footer from '@/Components/Footer';

export default function ServicesIndex({ projects = [], galleryImages = [] }) {
    const { globalSettings, pageContents } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'حديقتي لاندسكيب';

    // Smooth reveal animation on scroll optimized with unobserve
    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                    obs.unobserve(entry.target); // Stop observing once revealed for better performance
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const serviceKeys = [
        { key: 'maintenance', title: 'تنسيق الحدائق', desc: 'تصاميم خارجية مذهلة وتحويل المساحات إلى واحات خضراء تعكس ذوقك.', icon: 'yard' },
        { key: 'caravans', title: 'تصميم 3D', desc: 'رؤية حديقتك قبل التنفيذ باستخدام أحدث برامج التصميم ثلاثي الأبعاد.', icon: 'design_services' },
        { key: 'portacabins', title: 'العشب الصناعي', desc: 'أفضل أنواع العشب المعتمد عالمياً، مقاوم للحرارة ومثالي لبيئتنا.', icon: 'grass' },
        { key: 'renovation', title: 'نوافير وشلالات', desc: 'إضافة لمسة مائية ساحرة تمنح حديقتك لمسة من الهدوء والأناقة.', icon: 'pool' },
        { key: 'insulation', title: 'مظلات وجلسات', desc: 'تصميم وتنفيذ مساحات مريحة للعائلة بأفضل الخامات وأحدث التصاميم.', icon: 'deck' },
        { key: 'electrical', title: 'شبكات الري', desc: 'أنظمة ري ذكية ومخفية تحافظ على جمال حديقتك بكفاءة عالية.', icon: 'water_drop' }
    ];
    const strengthKeys = [
        { key: 'experience', title: 'خبرة طويلة', desc: 'سنوات من التميز في مجال تنسيق الحدائق وتصميم اللاندسكيب.', icon: 'military_tech' },
        { key: 'team', title: 'فريق متخصص', desc: 'نخبة من المهندسين والفنيين ذوي الكفاءة العالية.', icon: 'groups' },
        { key: 'speed', title: 'سرعة الإنجاز', desc: 'تنفيذ دقيق مع الالتزام التام بالجداول الزمنية المحددة.', icon: 'timer' },
        { key: 'quality', title: 'جودة استثنائية', desc: 'نستخدم أفضل المواد والخامات لضمان استدامة وجمال مشاريعنا.', icon: 'verified' },
        { key: 'warranty', title: 'ضمان شامل', desc: 'نقدم ضمانات حقيقية على جميع أعمالنا لراحتك واطمئنانك.', icon: 'gpp_good' },
        { key: 'support', title: 'دعم مستمر', desc: 'خدمة عملاء متميزة ومتابعة دورية بعد تسليم المشروع.', icon: 'support_agent' }
    ];
    const testimonialKeys = ['item1', 'item2', 'item3'];

    const getServiceImage = (key) => {
        const defaultImages = {
            maintenance: 'https://images.unsplash.com/photo-1558904541-efa843a96f0d?q=80&w=2070&auto=format&fit=crop',
            caravans: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
            portacabins: 'https://images.unsplash.com/photo-1585068285521-1b9134a4c522?q=80&w=2070&auto=format&fit=crop',
            renovation: 'https://images.unsplash.com/photo-1575409166699-d4bc5a3de711?q=80&w=2070&auto=format&fit=crop',
            insulation: 'https://images.unsplash.com/photo-1605810753065-22442ec9a5fb?q=80&w=2070&auto=format&fit=crop',
            electrical: 'https://images.unsplash.com/photo-1563514253-34e8c1bfa70f?q=80&w=2070&auto=format&fit=crop'
        };
        return pageContents?.[`services.details.${key}.image`] || defaultImages[key] || defaultImages.maintenance;
    };

    const getBgUrl = (key, defaultUrl) => {
        const val = pageContents?.[key];
        if (!val) return defaultUrl;
        if (val.startsWith('http') || val.startsWith('/')) return val;
        return `/storage/${val}`;
    };

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#022C22] min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-[#16A34A] selection:text-[#064E3B]" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <SeoHead
                title={pageContents?.['services.hero.title']
                    ? `${siteName} | ${pageContents['services.hero.title']}`
                    : `${siteName} | خدمات تنسيق وتصميم الحدائق`}
                description={pageContents?.['services.hero.subtitle'] || 'حلول هندسية وزراعية متكاملة لتحويل مساحاتك إلى واحات خضراء.'}
            />

            <Navbar />

            {/* 1) HERO SECTION */}
            <section className="relative min-h-[100svh] md:min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt={pageContents?.['services.hero.title'] || 'Hero Background'}
                        className="w-full h-full object-cover"
                        src={getBgUrl('services.hero.background_image', '/images/services_hero_bg.png')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#064E3B]/90 via-[#064E3B]/70 to-[#022C22]"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-20">
                    {pageContents?.['services.grid.badge'] && (
                        <span className="inline-block py-2 px-6 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 backdrop-blur-md text-[#16A34A] font-bold text-xs md:text-sm tracking-widest uppercase mb-6 shadow-xl">
                            {pageContents?.['services.grid.badge'] ?? 'خدماتنا الشاملة'}
                        </span>
                    )}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        {pageContents?.['services.hero.title'] ?? 'تصميم وتنسيق حدائق بمعايير استثنائية'}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100 px-2">
                        {pageContents?.['services.hero.subtitle'] ?? 'حلول متكاملة نصنع بها من مساحاتك الخارجية لوحات فنية تنبض بالحياة.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                        {pageContents?.['services.hero.primary_button_text'] && (
                            <Link href={`${route('contact')}#contact-form-section`} className="w-full sm:w-auto bg-gradient-to-l from-[#4ADE80] to-[#16A34A] text-[#064E3B] font-bold py-3 md:py-4 px-8 md:px-10 rounded-xl transition-all duration-300 shadow-[0_8px_25px_rgba(201,162,39,0.4)] hover:shadow-[0_12px_35px_rgba(201,162,39,0.6)] hover:-translate-y-1 text-base md:text-lg">
                                {pageContents?.['services.hero.primary_button_text'] ?? 'اطلب عرض سعر'}
                            </Link>
                        )}
                        {pageContents?.['services.hero.secondary_button_text'] && (
                            <Link href={`${route('contact')}#contact-form-section`} className="w-full sm:w-auto border border-white/30 bg-white/5 hover:bg-white/20 text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-xl transition-all duration-300 backdrop-blur-md hover:-translate-y-1 text-base md:text-lg">
                                {pageContents?.['services.hero.secondary_button_text'] ?? 'تواصل معنا'}
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* 2) MAIN SERVICES GRID (Glassmorphism effect) */}
            <section className="py-16 md:py-24 relative z-20">
                <div className="max-w-7xl mx-auto px-4 relative -mt-20 md:-mt-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {serviceKeys.map((item, index) => {
                            const key = item.key;
                            const icon = pageContents?.[`services.grid.${key}.icon`] || item.icon;
                            const title = pageContents?.[`services.grid.${key}.title`] || item.title;
                            const desc = pageContents?.[`services.grid.${key}.description`] || item.desc;
                            
                            return (
                                <div key={key} className="bg-white/80 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-xl dark:shadow-2xl border border-white/40 dark:border-white/10 hover:border-[#16A34A]/50 transition-all duration-500 group hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${(index % 3) * 100}ms` }}>
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-200 dark:from-white/10 dark:to-transparent flex items-center justify-center text-[#16A34A] mb-6 md:mb-8 group-hover:scale-110 group-hover:from-[#16A34A] group-hover:to-[#4ADE80] group-hover:text-[#064E3B] transition-all duration-500 shadow-sm border border-white/20">
                                        <DynamicIcon name={icon} className="text-2xl md:text-3xl" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 group-hover:text-[#16A34A] transition-colors">{title}</h3>
                                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 md:mb-8 h-auto min-h-[4rem] line-clamp-3">
                                        {desc}
                                    </p>
                                    <a href={`#service-${key}`} className="inline-flex items-center gap-2 text-[#064E3B] dark:text-white font-bold group-hover:text-[#16A34A] transition-colors">
                                        عرض التفاصيل
                                        <DynamicIcon name="arrow_forward" className="text-sm rotate-180 transition-transform group-hover:-translate-x-1" />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3) DETAILED SERVICE SECTIONS */}
            <section className="bg-white dark:bg-[#022C22] py-16 md:py-20 relative">
                <div className="max-w-7xl mx-auto px-4 flex flex-col gap-20 md:gap-32">
                    {serviceKeys.map((item, index) => {
                        const key = item.key;
                        const title = pageContents?.[`services.details.${key}.title`] || item.title;
                        const desc = pageContents?.[`services.details.${key}.description`] || item.desc;
                        const features = [
                            pageContents?.[`services.details.${key}.feature1`] || 'جودة واحترافية في التنفيذ',
                            pageContents?.[`services.details.${key}.feature2`] || 'تصاميم عصرية تناسب تطلعاتك',
                            pageContents?.[`services.details.${key}.feature3`] || 'أسعار تنافسية ومناسبة'
                        ].filter(Boolean);

                        return (
                            <div id={`service-${key}`} key={key} className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="w-full lg:w-1/2 relative group">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#16A34A]/20 to-transparent blur-2xl rounded-full transform -rotate-6 group-hover:rotate-0 transition-transform duration-700"></div>
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/5">
                                        <img src={getServiceImage(key)} alt={title} className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B] via-transparent to-transparent opacity-80"></div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-1/2 space-y-5 md:space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-[2px] w-8 md:w-12 bg-[#16A34A]"></div>
                                        <span className="text-[#16A34A] font-bold tracking-widest text-xs md:text-sm uppercase">تفاصيل الخدمة</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                                        {title}
                                    </h2>
                                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {desc}
                                    </p>
                                    {features.length > 0 && (
                                        <ul className="space-y-3 pt-2">
                                            {features.map((feat, i) => (
                                                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium bg-gray-50 dark:bg-white/5 px-4 py-3 rounded-xl border border-gray-100 dark:border-white/5">
                                                    <DynamicIcon name="check_circle" className="text-[#16A34A]" />
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 4) WHY CHOOSE US (STRENGTH) */}
            <section className="py-20 md:py-28 relative bg-[#064E3B] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#16A34A]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none hidden md:block"></div>
                
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-3">نقاط القوة</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white">{pageContents?.['services.strength.title'] ?? 'لماذا نحن الخيار الأمثل؟'}</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {strengthKeys.map((item, idx) => {
                            const key = item.key;
                            const icon = pageContents?.[`services.strength.${key}.icon`] || item.icon;
                            const title = pageContents?.[`services.strength.${key}.title`] || item.title;
                            const desc = pageContents?.[`services.strength.${key}.description`] || item.desc;

                            return (
                                <div key={key} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 text-center hover:-translate-y-2 hover:bg-white/10 transition-all duration-500 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 100}ms` }}>
                                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#16A34A]/20 to-transparent flex items-center justify-center text-[#16A34A] mb-6 border border-[#16A34A]/30">
                                        <DynamicIcon name={icon} className="text-3xl" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5) PROJECT PREVIEW SECTION */}
            {projects?.length > 0 && (
                <section className="py-20 md:py-28 bg-[#f8f7f6] dark:bg-[#022C22] border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <div className="text-center md:text-right">
                                <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-2">{pageContents?.['services.projects.badge'] ?? 'سجل أعمالنا'}</span>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">{pageContents?.['services.projects.title'] ?? 'أحدث المشاريع المنجزة'}</h2>
                            </div>
                            <Link href={route('our-projects.index')} className="group flex items-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-bold px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                                عرض الكل
                                <DynamicIcon name="arrow_forward" className="text-sm rotate-180 transition-transform group-hover:-translate-x-1" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {projects.map((project, idx) => (
                                <Link href={route('our-projects.show', project.id)} key={project.id} className="group rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-[#064E3B] border border-gray-100 dark:border-white/5 hover:border-[#16A34A]/50 block transition-all duration-500 hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 150}ms` }}>
                                    <div className="h-56 overflow-hidden relative">
                                        <img
                                            src={project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`)}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                        {project.category && (
                                            <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#064E3B]/90 text-[#16A34A] text-xs font-bold px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md">
                                                {project.category}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1 group-hover:text-[#16A34A] transition-colors">{project.title || project.title_ar}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 6) CLIENT TESTIMONIALS */}
            <section className="py-20 md:py-28 bg-white dark:bg-[#040A12] relative">
                <div className="max-w-7xl mx-auto px-4 text-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                    <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-3">{pageContents?.['services.testimonials.badge'] ?? 'شركاء النجاح'}</span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-16">{pageContents?.['services.testimonials.title'] ?? 'ثقة تبنى على الإنجازات'}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
                        {testimonialKeys.map((key) => {
                            const text = pageContents?.[`services.testimonials.${key}.text`];
                            const name = pageContents?.[`services.testimonials.${key}.name`];
                            const company = pageContents?.[`services.testimonials.${key}.company`];

                            if (!text && !name) return null;

                            return (
                                <div key={key} className="bg-[#f8f7f6] dark:bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-gray-100 dark:border-white/5 relative group hover:-translate-y-2 transition-transform duration-500">
                                    <DynamicIcon name="format_quote" className="absolute top-6 left-6 text-6xl text-[#16A34A]/10 group-hover:text-[#16A34A]/20 transition-colors rotate-180" />
                                    <div className="flex gap-1 text-[#16A34A] mb-6">
                                        {[1, 2, 3, 4, 5].map(star => <DynamicIcon key={star} name="star" className="text-sm" />)}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-8 relative z-10 italic">"{text}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#064E3B] to-gray-800 dark:from-white/10 dark:to-transparent flex items-center justify-center font-bold text-white text-xl shadow-inner border border-white/10">
                                            {(name || ' ').charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-white text-lg">{name}</div>
                                            <div className="text-sm text-[#16A34A]">
                                                {company}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 7) GALLERY IMAGES SECTION (Masonry with Glassmorphism Hover) */}
            {galleryImages?.length > 0 && (
                <section className="py-20 md:py-28 bg-[#f8f7f6] dark:bg-[#022C22] border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-3">معرض الصور</span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">أعمالنا على أرض الواقع</h2>
                        </div>
                        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                            {galleryImages.map((img, idx) => (
                                <div key={img.id} className="break-inside-avoid relative rounded-3xl overflow-hidden shadow-md group reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${(idx % 4) * 100}ms` }}>
                                    <img
                                        src={`/storage/${img.image_path}`}
                                        alt={img.title || 'صورة أعمال'}
                                        className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/90 via-[#064E3B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                        {img.title && (
                                            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-white font-bold text-lg backdrop-blur-sm bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                                                {img.title}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 8) FINAL CTA SECTION */}
            <section className="relative py-24 md:py-32 text-center bg-[#022C22] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={getBgUrl('services.cta.background_image', '/images/services_hero_bg.png')} alt="CTA Background" className="w-full h-full object-cover filter blur-md scale-110 opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B] via-[#064E3B]/90 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-3xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name={pageContents?.['services.cta.icon'] ?? 'rocket_launch'} className="text-[#16A34A] text-6xl mb-8 animate-bounce" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {pageContents?.['services.cta.title'] ?? 'هل لديك مشروع قادم؟'}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 font-light leading-relaxed">
                        {pageContents?.['services.cta.description'] ?? 'نحن هنا لنحول أفكارك وتصوراتك إلى واقع ملموس باحترافية عالية.'}
                    </p>
                    <Link href={`${route('contact')}#contact-form-section`} className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-gradient-to-l from-[#4ADE80] to-[#16A34A] text-[#064E3B] font-bold text-lg py-4 px-10 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(201,162,39,0.5)]">
                        {pageContents?.['services.cta.button_text'] ?? 'اطلب استشارة مجانية الآن'}
                        <DynamicIcon name="arrow_forward" className="rotate-180" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}