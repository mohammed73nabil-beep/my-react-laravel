import React, { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import GallerySection from '@/Components/GallerySection';
import Footer from '@/Components/Footer';

export default function LandscapingService({ projects = [], galleryImages = [] }) {
    const { globalSettings, pageContents = {}, pageContentExtras = {} } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'حديقتي لاندسكيب';

    // Helper function to get content by key
    const getContent = (key, defaultValue = '') => {
        return pageContents[key] ?? defaultValue;
    };

    // Helper function to get image URL
    const getImageUrl = (key, defaultUrl = '') => {
        const val = pageContents[key];
        if (!val) return defaultUrl;
        if (val.startsWith('http') || val.startsWith('/')) return val;
        return `/storage/${val}`;
    };

    // Helper function to get opacity
    const getOpacity = (key, defaultOpacity = 70) => {
        return pageContentExtras[key] ? parseInt(pageContentExtras[key]) : defaultOpacity;
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const services = [
        { title: getContent('services.landscaping.services.item1.title', 'تصميم 3D للحدائق'), icon: 'architecture', desc: getContent('services.landscaping.services.item1.desc', 'نقدم تصاميم ثلاثية الأبعاد مبتكرة تعكس رؤيتك للحديقة قبل التنفيذ.') },
        { title: getContent('services.landscaping.services.item2.title', 'زراعة النباتات والأشجار'), icon: 'park', desc: getContent('services.landscaping.services.item2.desc', 'اختيار وزراعة أفضل أنواع النباتات والأشجار التي تناسب مناخ منطقتك.') },
        { title: getContent('services.landscaping.services.item3.title', 'تركيب شبكات الري'), icon: 'water_drop', desc: getContent('services.landscaping.services.item3.desc', 'تصميم وتركيب شبكات ري أوتوماتيكية ذكية توفر المياه وتحافظ على نضارة الحديقة.') },
        { title: getContent('services.landscaping.services.item4.title', 'العناية الشاملة'), icon: 'eco', desc: getContent('services.landscaping.services.item4.desc', 'خدمات صيانة دورية للحدائق تشمل التقليم والتسميد ومكافحة الآفات الزراعية.') }
    ];

    const steps = [
        { title: getContent('services.landscaping.process.step1.title', 'معاينة الموقع'), icon: 'location_on', desc: getContent('services.landscaping.process.step1.desc', 'زيارة الموقع لرفع المقاسات ودراسة طبيعة التربة والبيئة المحيطة.') },
        { title: getContent('services.landscaping.process.step2.title', 'التصميم والمقترح'), icon: 'design_services', desc: getContent('services.landscaping.process.step2.desc', 'تقديم تصاميم مقترحة ومناقشتها مع العميل حتى الوصول للتصميم المثالي.') },
        { title: getContent('services.landscaping.process.step3.title', 'التنفيذ والزراعة'), icon: 'agriculture', desc: getContent('services.landscaping.process.step3.desc', 'البدء بتجهيز الأرض وتركيب الشبكات وزراعة النباتات وفق الخطة المعتمدة.') },
        { title: getContent('services.landscaping.process.step4.title', 'التسليم والمتابعة'), icon: 'done_all', desc: getContent('services.landscaping.process.step4.desc', 'تسليم الحديقة للعميل مع تقديم إرشادات العناية وخدمة المتابعة الدورية.') }
    ];

    // Dynamic Advantages (Why Choose Us)
    const advantages = Object.keys(pageContents)
        .filter(key => key.startsWith('services.landscaping.why.item') && key.endsWith('.title'))
        .map(key => {
            const baseKey = key.replace('.title', '');
            return {
                title: pageContents[key],
                desc: pageContents[`${baseKey}.desc`] || '',
                icon: pageContents[`${baseKey}.icon`] || 'verified' // Default icon if not specified
            };
        });

    // Fallback if none found in DB
    const displayAdvantages = advantages.length > 0 ? advantages : [
        { title: getContent('services.landscaping.why.item1.title', 'إبداع في التصميم'), icon: 'emoji_objects', desc: getContent('services.landscaping.why.item1.desc', 'نبتكر أفكاراً فريدة تجعل حديقتك لوحة فنية مميزة تعكس ذوقك الرفيع.') },
        { title: getContent('services.landscaping.why.item2.title', 'مهندسون زراعيون'), icon: 'nature_people', desc: getContent('services.landscaping.why.item2.desc', 'فريق متخصص من المهندسين الزراعيين ذوي الخبرة الطويلة في اللاندسكيب.') },
        { title: getContent('services.landscaping.why.item3.title', 'جودة المواد والنباتات'), icon: 'verified', desc: getContent('services.landscaping.why.item3.desc', 'نستخدم أفضل المواد الزراعية والنباتات المنتقاة بعناية لضمان استدامتها.') },
        { title: getContent('services.landscaping.why.item4.title', 'التزام تام'), icon: 'schedule', desc: getContent('services.landscaping.why.item4.desc', 'نحترم مواعيدنا ونلتزم بتقديم أعلى مستويات الجودة في التنفيذ والتسليم.') }
    ];

    const landscapeProjects = projects.length > 0 ? projects.slice(0, 4) : [];

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#022C22] min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-[#16A34A] selection:text-[#064E3B]" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{`تنسيق الحدائق - ${siteName}`}</title>
                <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet" />

                <style>{`
                    .hero-gradient { background-image: linear-gradient(180deg, rgba(11,31,58,0.5) 0%, rgba(11,31,58,0.95) 100%); }
                    .green-gradient { background-image: linear-gradient(135deg, #4ADE80 0%, #16A34A 100%); }
                `}</style>
            </Head>

            <Navbar />

            {/* HERO SECTION */}
            <section className="relative h-[65vh] min-h-[550px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt={getContent('services.landscaping.hero.title', 'تنسيق الحدائق')}
                        className="w-full h-full object-cover"
                        src={getImageUrl('services.landscaping.hero.image', 'https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop')}
                    />
                    <div className="absolute inset-0 bg-[#064E3B]/30" style={{ opacity: getOpacity('services.landscaping.hero.image', 40) / 100 }}></div>
                    <div className="absolute inset-0 hero-gradient" style={{ opacity: Math.min((getOpacity('services.landscaping.hero.image', 40) + 40) / 100, 1) }}></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-20">
                    <span className="inline-block py-1.5 px-6 rounded-full border border-[#16A34A]/30 text-[#16A34A] font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur shadow-sm">
                        {getContent('services.landscaping.hero.badge', 'لاندسكيب وتنسيق')}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        {getContent('services.landscaping.hero.title', 'تنسيق الحدائق')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                        {getContent('services.landscaping.hero.subtitle', 'نحول مساحاتك الخارجية إلى واحات خضراء ساحرة تنبض بالحياة، بأحدث أساليب اللاندسكيب العالمية.')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                        <Link href={`${route('contact')}#contact-form-section`} className="green-gradient hover:brightness-110 text-[#064E3B] font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:-translate-y-1 text-lg flex items-center justify-center gap-2">
                            اطلب عرض السعر
                            <DynamicIcon name="request_quote" />
                        </Link>
                    </div>
                </div>
            </section>
            {/* GALLERY – right below hero */}
            <GallerySection images={galleryImages} title="صور من أعمال تنسيق الحدائق" />

            {/* ABOUT SERVICE SECTION */}
            <section className="py-24 bg-white dark:bg-[#064E3B] relative z-20">
                <div className="max-w-7xl mx-auto px-4 text-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                    <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.landscaping.services.badge', 'ماذا نقدم؟')}</span>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8">{getContent('services.landscaping.services.title', 'خدمات اللاندسكيب والتنسيق')}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        {services.map((service, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-[#022C22] p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 dark:border-white/5">
                                <div className="w-16 h-16 mx-auto rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] mb-6">
                                    <DynamicIcon name={service.icon} className="text-3xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/*  PROCESS / STEPS SECTION */}
            <section className="py-24 bg-[#064E3B] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.landscaping.process.badge', 'آلية العمل')}</span>
                    <h2 className="text-4xl font-black text-white mb-16">{getContent('services.landscaping.process.title', 'خطوات التنسيق خطوة بخطوة')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative group reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 150}ms` }}>
                                {idx < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-l from-[#16A34A]/50 to-transparent -z-10 transform -translate-x-1/2"></div>
                                )}
                                <div className="w-24 h-24 mx-auto rounded-full border-4 border-[#16A34A] bg-[#022C22] flex items-center justify-center text-[#16A34A] mb-6 shadow-[0_0_20px_rgba(201,162,39,0.2)] group-hover:scale-110 transition-transform duration-500">
                                    <DynamicIcon name={step.icon} className="text-4xl" />
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                    <div className="text-[#16A34A] font-bold text-xl mb-3">{idx + 1}. {step.title}</div>
                                    <p className="text-gray-400 text-sm">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ADVANTAGES */}
            <section className="py-24 bg-white dark:bg-[#040A12] border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.landscaping.why.badge', 'لماذا حديقتي لاندسكيب؟')}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">{getContent('services.landscaping.why.title', 'نضمن لك الجمال والاحترافية في التنفيذ')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                                {getContent('services.landscaping.why.desc', 'نحن نمزج بين الفن والهندسة لنخلق مساحات خضراء تريح النفس وتسعد العين، باستخدام أجود المواد والنباتات وأحدث تقنيات الري الذكية.')}
                            </p>
                            <div className="space-y-6">
                                {displayAdvantages.map((adv, idx) => (
                                    <div key={idx} className="flex items-center gap-5 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-[#064E3B] transition-colors">
                                        <div className="w-14 h-14 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] shrink-0">
                                            <DynamicIcon name={adv.icon} className="text-2xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{adv.title}</h4>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{adv.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[600px]">
                                <img src={getImageUrl('services.landscaping.why.image', 'https://images.unsplash.com/photo-1594922119159-4d22edfa5041?q=80&w=2070&auto=format&fit=crop')} alt="Why Choose Us" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/90 via-[#064E3B]/20 to-transparent"></div>
                                <div className="absolute bottom-10 right-10 left-10 text-white">
                                    <div className="text-3xl font-bold mb-2">{getContent('services.landscaping.why.experience.title', 'أكثر من 10 سنوات خبرة')}</div>
                                    <div className="text-xl text-[#16A34A]">{getContent('services.landscaping.why.experience.subtitle', 'في تصميم وتنسيق الحدائق')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS / GALLERY */}
            {landscapeProjects.length > 0 && (
                <section className="py-24 bg-[#f8f7f6] dark:bg-[#022C22] border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <div>
                                <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-3">معرض الأعمال</span>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white">أحدث مشاريع اللاندسكيب</h2>
                            </div>
                            <Link href={route('our-projects.index')} className="green-gradient text-[#064E3B] font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2">
                                عرض جميع مشاريعنا
                                <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                            {landscapeProjects.map((project, idx) => (
                                <Link href={route('our-projects.show', project.id)} key={project.id} className="group rounded-2xl overflow-hidden shadow-md bg-white dark:bg-[#064E3B] border border-gray-100 dark:border-white/5 hover:border-[#16A34A]/50 block transition-all hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 150}ms` }}>
                                    <div className="h-64 overflow-hidden relative">
                                        <img
                                            src={project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`)}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop'; }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>
                                        <div className="absolute top-4 right-4 bg-white/95 text-[#064E3B] text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur">
                                            {project.category ?? 'تنسيق حدائق'}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2">{project.title || project.title_ar}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            {/* CTA SECTION */}
            <section className="relative py-28 text-center bg-[#022C22] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={getImageUrl('services.landscaping.hero.image', 'https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop')} alt="bg" className="w-full h-full object-cover filter scale-110 opacity-60" />
                    <div className="absolute inset-0 bg-[#064E3B]/40" style={{ opacity: getOpacity('services.landscaping.hero.image', 40) / 100 }}></div>
                    <div className="absolute inset-0 hero-gradient" style={{ opacity: Math.min((getOpacity('services.landscaping.hero.image', 40) + 40) / 100, 1) }}></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name="support_agent" className="text-[#16A34A] text-6xl mb-6" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {getContent('services.landscaping.cta.title', 'هل حديقتك تحتاج إلى تنسيق احترافي؟')}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        {getContent('services.landscaping.cta.subtitle', 'تواصل معنا الآن للحصول على استشارة وتصميم مبدئي لتبدأ رحلة التغيير.')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={`${route('contact')}#contact-form-section`} className="inline-flex justify-center items-center gap-3 bg-[#16A34A] hover:bg-white text-[#064E3B] font-bold text-xl py-5 px-10 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(201,162,39,0.4)]">
                            اطلب عرض السعر
                            <DynamicIcon name="arrow_forward" className="rotate-180" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
