import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import GallerySection from '@/Components/GallerySection';
import SeoHead from '@/Components/SeoHead';
import Footer from '@/Components/Footer';
import BeforeAfterSlider from '@/Components/BeforeAfterSlider';
import VideoSection from '@/Components/VideoSection';


export default function Welcome({ projects, siteContents, galleryImages = [], beforeAfterImages = [] }) {
    const { globalSettings, pageContents: rawPageContents, pageContentExtras = {} } = usePage().props;
    const defaultSiteContents = siteContents || {};
    
    // Merge safely: only overwrite if the new value is not empty
    const pageContents = { ...defaultSiteContents };
    if (rawPageContents) {
        Object.keys(rawPageContents).forEach(key => {
            if (rawPageContents[key]) {
                pageContents[key] = rawPageContents[key];
            }
        });
    }
    const siteName = globalSettings?.site_name?.value || 'حديقتي لاندسكيب';

    const [stats, setStats] = useState({
        projects: 0,
        experience: 0,
        satisfaction: 0
    });

    // Helper function to get image URL
    const getImageUrl = (key, defaultUrl = '') => {
        const val = pageContents[key];
        if (!val) return defaultUrl;
        if (val.startsWith('http') || val.startsWith('/')) return val;
        return `/storage/${val}`;
    };

    // Helper function to get opacity
    const getOpacity = (key, defaultOpacity = 60) => {
        return pageContentExtras[key] ? parseInt(pageContentExtras[key]) : defaultOpacity;
    };

    useEffect(() => {
        // Scroll reveal animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));

        // Counter animation
        let startTimestamp = null;
        const duration = 2000;

        const animateCounters = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Ease out quad
            const easeProgress = progress * (2 - progress);

            setStats({
                projects: Math.floor(easeProgress * (parseInt(pageContents?.['home.hero.stats.projects.number']) || 150)),
                experience: Math.floor(easeProgress * (parseInt(pageContents?.['home.hero.stats.experience.number']) || 10)),
                satisfaction: Math.floor(easeProgress * (parseInt(pageContents?.['home.hero.stats.satisfaction.number']) || 98))
            });

            if (progress < 1) {
                window.requestAnimationFrame(animateCounters);
            }
        };

        window.requestAnimationFrame(animateCounters);

        return () => observer.disconnect();
    }, []);

    const whyFeatures = [
        { title: pageContents?.['home.why.features.warranty.title'] || 'سرعة واحترافية', icon: pageContents?.['home.why.features.warranty.icon'] || 'bolt', desc: pageContents?.['home.why.features.warranty.text'] || 'تنفيذ دقيق مع الالتزام التام بالجداول الزمنية.' },
        { title: pageContents?.['home.why.features.support.title'] || 'إتقان التفاصيل', icon: pageContents?.['home.why.features.support.icon'] || 'diamond', desc: pageContents?.['home.why.features.support.text'] || 'جودة استثنائية في كل ركن من أركان مشروعك.' },
        { title: pageContents?.['home.why.features.pricing.title'] || 'أسعار تنافسية', icon: pageContents?.['home.why.features.pricing.icon'] || 'payments', desc: pageContents?.['home.why.features.pricing.text'] || 'أفضل قيمة مقابل جودة هندسية لا تضاهى.' },
        { title: pageContents?.['home.why.features.f4.title'] || 'فريق خبير', icon: pageContents?.['home.why.features.f4.icon'] || 'park', desc: pageContents?.['home.why.features.f4.text'] || 'نخبة من المهندسين بخبرة تزيد عن 10 سنوات.' },
    ];

    const services = [
        {
            id: 1,
            icon: pageContents?.['home.services.item1.icon'] || 'architecture',
            title: pageContents?.['home.services.item1.title'] || 'تصميم الحدائق',
            desc: pageContents?.['home.services.item1.desc'] || 'تصاميم لاندسكيب مبتكرة تجمع بين الجمال والوظيفة.',
            buttonText: pageContents?.['home.services.item1.button'] || 'اطلب الخدمة',
        },
        {
            id: 2,
            icon: pageContents?.['home.services.item2.icon'] || 'park',
            title: pageContents?.['home.services.item2.title'] || 'تنسيق الحدائق',
            desc: pageContents?.['home.services.item2.desc'] || 'تحويل المساحات إلى واحات خضراء تعكس ذوقك.',
            buttonText: pageContents?.['home.services.item2.button'] || 'اطلب الخدمة',
        },
        {
            id: 3,
            icon: pageContents?.['home.services.item3.icon'] || 'grass',
            title: pageContents?.['home.services.item3.title'] || 'العشب الطبيعي والصناعي',
            desc: pageContents?.['home.services.item3.desc'] || 'أجود أنواع العشب المقاوم للحرارة والمثالي لبيئتنا.',
            buttonText: pageContents?.['home.services.item3.button'] || 'اطلب الخدمة',
        },
        {
            id: 4,
            icon: pageContents?.['home.services.item4.icon'] || 'water_drop',
            title: pageContents?.['home.services.item4.title'] || 'الشلالات والنوافير',
            desc: pageContents?.['home.services.item4.desc'] || 'عناصر مائية تمنح حديقتك لمسة من الهدوء والأناقة.',
            buttonText: pageContents?.['home.services.item4.button'] || 'اطلب الخدمة',
        },
        {
            id: 5,
            icon: pageContents?.['home.services.item5.icon'] || 'wb_sunny',
            title: pageContents?.['home.services.item5.title'] || 'الإضاءة الخارجية',
            desc: pageContents?.['home.services.item5.desc'] || 'أنظمة إضاءة ذكية تبرز جمال حديقتك في الليل.',
            buttonText: pageContents?.['home.services.item5.button'] || 'اطلب الخدمة',
        }
    ];

    // ——— SEO: بناء الوصف من محتوى الصفحة ———
    const seoTitle = pageContents?.['home.hero.title']
        ? `حديقتي لاندسكيب | ${pageContents['home.hero.title']}`
        : 'حديقتي لاندسكيب | تصميم وتنسيق حدائق';
    const seoDescription = pageContents?.['home.hero.subtitle'] || 'تصميم وتنسيق حدائق، شلالات، نوافير، وعشب طبيعي وصناعي بأعلى جودة';

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#022C22] min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-[#16A34A] selection:text-[#064E3B]" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <SeoHead
                title={seoTitle}
                description={seoDescription}
            />

            <Navbar />

            {/* 1) HERO SECTION */}
            <section className="relative min-h-[100svh] md:min-h-[700px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt={`${pageContents?.['home.hero.title'] || 'نحوّل مساحتك إلى حديقة فاخرة'} — ${siteName}`}
                        className="w-full h-full object-cover"
                        src={getImageUrl('home.hero.image', "/images/hero-bg-2.jpg")}
                        fetchpriority="high"
                        width="1920"
                        height="1080"
                    />
                    <div className="absolute inset-0 bg-[#064E3B]" style={{ opacity: getOpacity('home.hero.image', 30) / 100 }}></div>
                    <div className="absolute inset-0 hero-gradient" style={{ opacity: Math.min((getOpacity('home.hero.image', 30) + 40) / 100, 1) }}></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 mt-20">
                    <div className="max-w-4xl text-center sm:text-right">

                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-6 leading-tight md:leading-[1.1] drop-shadow-2xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                            {pageContents?.['home.hero.title'] ? (
                                <>
                                    {pageContents['home.hero.title'].split(' ').slice(0, -2).join(' ')} <span className="text-transparent bg-clip-text green-gradient">{pageContents['home.hero.title'].split(' ').slice(-2).join(' ')}</span>
                                </>
                            ) : (
                                <>
                                    حلول لاندسكيب وتنسيق حدائق بمعايير <span className="text-transparent bg-clip-text green-gradient">عالمية راقية</span>
                                </>
                            )}
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-10 leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200 max-w-2xl mx-auto sm:mx-0">
                            {pageContents?.['home.hero.subtitle'] || 'تصميم وتنسيق حدائق، شلالات، نوافير، وعشب طبيعي وصناعي بأعلى جودة'}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4 mb-12 md:mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
                            <Link href={`${route('contact')}#contact-form-section`} className="w-full sm:w-auto green-gradient hover:brightness-110 text-[#064E3B] font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-1 text-lg text-center">
                                {pageContents?.['home.hero.primary_button_text'] || 'اطلب تصميم الآن'}
                            </Link>
                            <Link href={route('our-projects.index')} className="w-full sm:w-auto border border-white/30 hover:bg-white hover:text-[#064E3B] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 text-lg text-center">
                                {pageContents?.['home.hero.secondary_button_text'] || 'تواصل عبر واتساب'}
                            </Link>
                        </div>

                        {/* Floating Statistics */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-8 sm:pt-10 border-t border-white/10 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-500">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-2 sm:gap-4 text-center sm:text-right border-l sm:border-l-0 sm:border-r border-white/10 sm:pr-6 first:border-0 sm:first:border-r-0">
                                <span className="text-2xl sm:text-4xl font-black text-[#16A34A]">+{stats.projects}</span>
                                <span className="text-gray-300 text-[10px] sm:text-sm font-bold uppercase tracking-wider leading-tight">{pageContents?.['home.hero.stats.projects.label_line1'] || 'مشروع'}<br className="hidden sm:block" /> {pageContents?.['home.hero.stats.projects.label_line2'] || 'مكتمل'}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-2 sm:gap-4 text-center sm:text-right border-l sm:border-l-0 sm:border-r border-white/10 sm:pr-6">
                                <span className="text-2xl sm:text-4xl font-black text-[#16A34A]">+{stats.experience}</span>
                                <span className="text-gray-300 text-[10px] sm:text-sm font-bold uppercase tracking-wider leading-tight">{pageContents?.['home.hero.stats.experience.label_line1'] || 'سنوات'}<br className="hidden sm:block" /> {pageContents?.['home.hero.stats.experience.label_line2'] || 'خبرة'}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-2 sm:gap-4 text-center sm:text-right border-l sm:border-l-0 sm:border-r border-white/10 sm:pr-6">
                                <span className="text-2xl sm:text-4xl font-black text-[#16A34A]">{stats.satisfaction}%</span>
                                <span className="text-gray-300 text-[10px] sm:text-sm font-bold uppercase tracking-wider leading-tight">{pageContents?.['home.hero.stats.satisfaction.label_line1'] || 'رضا'}<br className="hidden sm:block" /> {pageContents?.['home.hero.stats.satisfaction.label_line2'] || 'العملاء'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2) VIDEO SHOWREEL — أقوى قسم لبناء الثقة بعد الهيرو مباشرة */}
            <VideoSection
                videoUrl={pageContents?.['home.video.url']}
                thumbnail={pageContents?.['home.video.thumbnail']
                    ? `/storage/${pageContents['home.video.thumbnail']}`
                    : null}
                title={pageContents?.['home.video.title']}
                subtitle={pageContents?.['home.video.subtitle']}
            />

            {/* 3) BEFORE / AFTER SECTION */}
            {beforeAfterImages && beforeAfterImages.length > 0 && (
                <section className="py-16 md:py-24 relative bg-[#f8f7f6] dark:bg-[#022C22] overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 relative z-10">
                        <div className="text-center mb-12 md:mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-3">قبل وبعد</span>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                                شاهد التحول الجذري لمساحتك
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                                اسحب الشريط لترى كيف نحول المساحات العادية إلى حدائق تنبض بالحياة.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                            {beforeAfterImages.map((img) => (
                                <div key={img.id} className="flex flex-col gap-3">
                                    <BeforeAfterSlider 
                                        beforeImage={`/storage/${img.before_image_path}`}
                                        afterImage={`/storage/${img.after_image_path}`}
                                    />
                                    {img.title && (
                                        <p className="text-center text-lg font-bold text-gray-800 dark:text-gray-200 mt-2">{img.title}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 4) FEATURED PROJECTS SECTION */}
            {
                projects && projects.length > 0 && (
                    <section className="py-16 md:py-28 bg-white dark:bg-[#040A12]">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 text-center md:text-right reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                                <div>
                                    <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-3">{pageContents?.['home.projects.badge'] || 'مشاريعنا في اللاندسكيب'}</span>
                                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">{pageContents?.['home.projects.title'] || 'شاهد التحولات المذهلة قبل وبعد'}</h2>
                                </div>
                                <Link href={route('our-projects.index')} className="w-full sm:w-auto justify-center green-gradient text-[#064E3B] font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2 shrink-0">
                                    {pageContents?.['home.projects.view_all_text'] || 'عرض جميع المشاريع'}
                                    <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.slice(0, 3).map((project, idx) => (
                                    <Link href={route('our-projects.show', project.id)} key={project.id} className={`group relative rounded-3xl overflow-hidden shadow-2xl block bg-black h-[400px] reveal-on-scroll opacity-0 translate-y-10 delay-${idx * 200}`}>
                                        <img
                                            src={project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`)}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0JAHsObzIwnKDCWmYTUyAsR9C7WINbtHiv7-SNPFkwpvyHrGM42q9H2J-Ee7DLoDv4ZlMqlXqVtRvDB8vhp8nYJohCzmTUqr5HcXUp2SHaYN4S_QfhWu6bX_c7gpYGuWPRa3TtWsyF62L3fbjnXlfn_Kh-HQJS1zAnRNrpSODl5zr5LVSSkKw1K7FuK46TOtZOwKzrUUQO90P_O0bee6_wDBb7dO-38mIlKKEpPBEQdmTbOAymBm0rvhuCFlMrx_V9LhK3fdjmCeF'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                        <div className="absolute top-6 right-6">
                                            <span className="bg-[#16A34A] text-[#064E3B] text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                                                {project.category}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-2 text-[#16A34A] mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                <DynamicIcon name="location_on" className="text-sm" />
                                                <span className="text-sm font-bold">المملكة العربية السعودية</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{project.title || project.title_ar}</h3>
                                            <div className="w-0 h-1 bg-[#16A34A] group-hover:w-16 transition-all duration-700 ease-out"></div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* 5) CLIENT TESTIMONIALS */}
            <section className="py-16 md:py-28 bg-white dark:bg-[#040A12] border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12 md:mb-20 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-3">{pageContents?.['home.testimonials.badge'] || 'آراء العملاء'}</span>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">{pageContents?.['home.testimonials.title'] || 'ماذا يقول شركاؤنا عنّا'}</h2>
                        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto px-4">{pageContents?.['home.testimonials.subtitle'] || 'فخورون بكل كلمة طيبة وثقة منحها لنا شركاؤنا بعد إتمام مشاريعهم بنجاح واحترافية.'}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: pageContents?.['home.testimonials.item1.name'] || 'مجموعة أفق العقارية',
                                company: pageContents?.['home.testimonials.item1.company'] || '',
                                reviewer: pageContents?.['home.testimonials.item1.position'] || 'مدير المشاريع',
                                text: pageContents?.['home.testimonials.item1.text'] || 'كان تنسيق الحدائق وتركيب العشب الصناعي للمشروع مبهراً للغاية. جودة المواد المستخدمة ودقة التنفيذ تعكس احترافية عالية جداً.'
                            },
                            {
                                name: pageContents?.['home.testimonials.item2.name'] || 'مؤسسة الرياض للاستثمار',
                                company: pageContents?.['home.testimonials.item2.company'] || '',
                                reviewer: pageContents?.['home.testimonials.item2.position'] || 'مهندس مشرف',
                                text: pageContents?.['home.testimonials.item2.text'] || 'شلالات المياه والنوافير أضافت لمسة من الهدوء والرقي للمنزل. فريق العمل كان متعاوناً ومبدعاً في طرح الأفكار وتنفيذها.'
                            },
                            {
                                name: pageContents?.['home.testimonials.item3.name'] || 'أحمد بن طلال',
                                company: pageContents?.['home.testimonials.item3.company'] || '',
                                reviewer: pageContents?.['home.testimonials.item3.position'] || 'صاحب فيلا خاصة',
                                text: pageContents?.['home.testimonials.item3.text'] || 'تم تحويل حديقة منزلي إلى مساحة خضراء خلابة مع إضاءة خارجية رائعة. شكراً لـ حديقتي لاندسكيب على هذا الإبداع والالتزام.'
                            },
                        ].map((testimonial, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-[#022C22] p-10 rounded-3xl border border-gray-100 dark:border-white/5 relative hover:-translate-y-2 transition-transform duration-500">
                                <DynamicIcon name="format_quote" className="absolute top-10 left-10 text-6xl text-gray-200 dark:text-white/5 rotate-180" />
                                <div className="flex gap-1 text-[#16A34A] mb-8">
                                    {[1, 2, 3, 4, 5].map(star => <DynamicIcon key={star} name="star" className="text-xl" />)}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-10 relative z-10">"{testimonial.text}"</p>
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-full bg-[#064E3B] flex items-center justify-center font-black text-white text-2xl border-2 border-[#16A34A]">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-black text-gray-900 dark:text-white text-lg">{testimonial.name}</div>
                                        <div className="text-sm text-[#16A34A] font-bold">{testimonial.reviewer}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section – only shown when images exist */}
            {galleryImages && galleryImages.length > 0 && (
                <section className="py-16 md:py-28 bg-[#f8f7f6] dark:bg-[#022C22] border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12 md:mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-3">معرض أعمالنا</span>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">صور من مشاريعنا</h2>
                            <div className="w-24 h-1 green-gradient mx-auto mt-6 rounded-full"></div>
                        </div>
                        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                            {galleryImages.map((img, idx) => (
                                <div
                                    key={img.id}
                                    className={`break-inside-avoid rounded-2xl overflow-hidden shadow-md group reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-${(idx % 4) * 100}`}
                                >
                                    <img
                                        src={`/storage/${img.image_path}`}
                                        alt={img.title || 'صورة أعمال'}
                                        className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    {img.title && (
                                        <div className="bg-white dark:bg-[#064E3B] px-3 py-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                                            {img.title}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 7) STRONG CALL TO ACTION */}
            <section className="relative py-20 md:py-32 text-center bg-[#022C22] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={getImageUrl('home.cta.background', "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop")}
                        alt={`تواصل مع ${siteName} للحصول على عرض سعر`}
                        className="w-full h-full object-cover filter blur-md scale-110 opacity-40"
                    />
                    <div className="absolute inset-0 bg-[#064E3B]" style={{ opacity: getOpacity('home.cta.background', 90) / 100 }}></div>
                    <div className="absolute inset-0 hero-gradient" style={{ opacity: Math.min((getOpacity('home.cta.background', 90) + 10) / 100, 1) }}></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <div className="w-16 h-16 md:w-24 md:h-24 mx-auto bg-white/10 backdrop-blur rounded-full flex items-center justify-center mb-6 md:mb-8 border border-white/20">
                        <DynamicIcon name={pageContents?.['home.cta.icon'] || 'handshake'} className="text-[#16A34A] text-4xl md:text-5xl" />
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 leading-tight">
                        {pageContents?.['home.cta.title'] || 'ابدأ تصميم حديقتك الآن'}
                    </h2>
                    <p className="text-base md:text-xl text-gray-300 mb-10 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        {pageContents?.['home.cta.description'] || 'تواصل معنا واحصل على استشارة مجانية'}
                    </p>
                    <Link href={`${route('contact')}#contact-form-section`} className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 green-gradient hover:bg-white text-[#064E3B] font-black text-xl md:text-2xl py-5 px-10 md:py-6 md:px-16 rounded-2xl transition-all duration-300 shadow-[0_15px_40px_rgba(201,162,39,0.3)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(201,162,39,0.5)] w-full sm:w-auto">
                        <span>{pageContents?.['home.cta.button_text'] || 'تواصل معنا الآن'}</span>
                        <DynamicIcon name="arrow_forward" className="rotate-180 text-3xl" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div >
    );
}
