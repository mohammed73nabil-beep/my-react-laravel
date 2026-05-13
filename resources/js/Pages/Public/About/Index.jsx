import React, { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import SeoHead from '@/Components/SeoHead';
import Footer from '@/Components/Footer';

export default function AboutIndex() {
    const { globalSettings, pageContents } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'حديقتي لاندسكيب';

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
        const counters = document.querySelectorAll('.counter-anim');
        let startTimestamp = null;
        const duration = 2000;

        const animateCounters = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress * (2 - progress);

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'), 10);
                counter.innerText = Math.floor(easeProgress * target) + (counter.getAttribute('data-suffix') || '');
            });

            if (progress < 1) {
                window.requestAnimationFrame(animateCounters);
            }
        };

        // Use Intersection Observer to start counters only when visible
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                window.requestAnimationFrame(animateCounters);
                statsObserver.disconnect();
            }
        }, { threshold: 0.5 });

        const statsSection = document.getElementById('stats-section');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        return () => {
            observer.disconnect();
            statsObserver.disconnect();
        };
    }, []);

    const values = [
        {
            title: pageContents?.['about.values.quality.title'] || 'الجودة',
            icon: 'diamond',
            desc: pageContents?.['about.values.quality.text'] || 'نلتزم بأعلى معايير الجودة العالمية في التصميم والتنفيذ لضمان ديمومة المشاريع.'
        },
        {
            title: pageContents?.['about.values.commitment.title'] || 'الالتزام',
            icon: 'handshake',
            desc: pageContents?.['about.values.commitment.text'] || 'العمل بجدية لتسليم المشاريع في الوقت المحدد والميزانية المعتمدة.'
        },
        {
            title: pageContents?.['about.values.transparency.title'] || 'الشفافية',
            icon: 'visibility',
            desc: pageContents?.['about.values.transparency.text'] || 'وضوح تام في التعامل ومشاركة العميل بتفاصيل مراحل العمل كشريك استراتيجي.'
        },
        {
            title: pageContents?.['about.values.safety.title'] || 'الأمان',
            icon: 'health_and_safety',
            desc: pageContents?.['about.values.safety.text'] || 'تطبيق صارم لبروتوكولات السلامة المهنية لحماية فرق العمل والممتلكات.'
        },
        {
            title: pageContents?.['about.values.innovation.title'] || 'الابتكار',
            icon: 'lightbulb',
            desc: pageContents?.['about.values.innovation.text'] || 'توظيف أحدث التقنيات والمواد لتقديم حلول هندسية ذكية وفعالة.'
        },
        {
            title: pageContents?.['about.values.development.title'] || 'التطوير',
            icon: 'trending_up',
            desc: pageContents?.['about.values.development.text'] || 'تحسين مستمر لمهارات الكوادر وتحديث المعدات لنواكب تطلعات المستقبل.'
        },
    ];

    const team = [
        {
            id: 1,
            name: pageContents?.['about.team.member1.name'] || 'المهندس طارق',
            role: pageContents?.['about.team.member1.position'] || 'المدير العام والمؤسس',
            email: pageContents?.['about.team.member1.email'] || '',
            img: pageContents?.['about.team.member1.image'] ? (pageContents['about.team.member1.image'].startsWith('http') ? pageContents['about.team.member1.image'] : `/storage/${pageContents['about.team.member1.image']}`) : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop'
        },
        {
            id: 2,
            name: pageContents?.['about.team.member2.name'] || 'م.محمد نبيل',
            role: pageContents?.['about.team.member2.position'] || 'رئيس قسم الهندسة الزراعية',
            email: pageContents?.['about.team.member2.email'] || '',
            img: pageContents?.['about.team.member2.image'] ? (pageContents['about.team.member2.image'].startsWith('http') ? pageContents['about.team.member2.image'] : `/storage/${pageContents['about.team.member2.image']}`) : 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000&auto=format&fit=crop'
        },
        {
            id: 3,
            name: pageContents?.['about.team.member3.name'] || 'سلطان الدوسري',
            role: pageContents?.['about.team.member3.position'] || 'مدير عمليات اللاندسكيب',
            email: pageContents?.['about.team.member3.email'] || '',
            img: pageContents?.['about.team.member3.image'] ? (pageContents['about.team.member3.image'].startsWith('http') ? pageContents['about.team.member3.image'] : `/storage/${pageContents['about.team.member3.image']}`) : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop'
        },
        {
            id: 4,
            name: pageContents?.['about.team.member4.name'] || 'م. عبد الله',
            role: pageContents?.['about.team.member4.position'] || 'استشاري التصميم الخارجي',
            email: pageContents?.['about.team.member4.email'] || '',
            img: pageContents?.['about.team.member4.image'] ? (pageContents['about.team.member4.image'].startsWith('http') ? pageContents['about.team.member4.image'] : `/storage/${pageContents['about.team.member4.image']}`) : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop'
        },
    ];

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#022C22] min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-[#16A34A] selection:text-[#064E3B]" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <SeoHead
                title={pageContents?.['about.hero.title']
                    ? `من نحن | ${pageContents['about.hero.title']}`
                    : `من نحن — شريكك الموثوق في تنسيق وتصميم الحدائق | ${siteName}`}
                description={pageContents?.['about.hero.subtitle']
                    || `${siteName} — مؤسسة هندسية وزراعية متخصصة في تنسيق الحدائق، تصميم اللاندسكيب، الشلالات، النوافير، وتركيب العشب الصناعي.`}
            />

            <Navbar />

            {/* 1) HERO SECTION */}
            <section className="relative min-h-[100svh] md:min-h-[600px] flex items-center justify-center overflow-hidden border-b border-[#16A34A]/20">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="مشروع هندسي كبير"
                        className="w-full h-full object-cover"
                        src={pageContents?.['about.hero.image'] ? (pageContents['about.hero.image'].startsWith('http') ? pageContents['about.hero.image'] : `/storage/${pageContents['about.hero.image']}`) : "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop"}
                    />
                    <div className="absolute inset-0 bg-[#064E3B]/70 mix-blend-multiply"></div>
                    <div className="absolute inset-0 hero-gradient"></div>
                </div>

                <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center mt-24 md:mt-24">
                    <span className="inline-block py-1.5 px-5 rounded-full border border-[#16A34A]/40 text-[#16A34A] font-bold text-xs md:text-sm tracking-widest uppercase mb-6 md:mb-8 backdrop-blur-md shadow-lg reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        نبذة عن الشركة
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-tight drop-shadow-2xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                        {pageContents?.['about.hero.title'] || (
                            <>
                                شريكك الموثوق في أعمال اللاندسكيب <span className="text-transparent bg-clip-text green-gradient">والتنسيق</span>
                            </>
                        )}
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                        {pageContents?.['about.hero.subtitle'] || 'خبرة زراعية وهندسية تضعنا في مقدمة مؤسسات تنسيق وتصميم الحدائق في المملكة العربية السعودية.'}
                    </p>
                    <div className="reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
                        <Link href={`${route('contact')}#contact-form-section`} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 green-gradient hover:brightness-110 text-[#064E3B] font-black text-lg md:text-xl py-4 px-8 md:py-4 md:px-12 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-1">
                            {pageContents?.['about.hero.button_text'] || 'تواصل معنا'}
                            <DynamicIcon name="arrow_forward" className="rotate-180" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2) COMPANY INTRODUCTION SECTION */}
            <section className="py-16 md:py-28 relative bg-white dark:bg-[#040A12] z-20">
                <div className="max-w-4xl mx-auto px-4 text-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name="corporate_fare" className="text-[#16A34A] text-5xl md:text-6xl mb-6" />
                    <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-3">
                        {pageContents?.['about.company.badge'] || 'نبذة عن الشركة'}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-8 md:mb-10 leading-snug">
                        {pageContents?.['about.company.title'] || 'مؤسسة وطنية بمعايير احترافية عالمية'}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-loose text-justify lg:text-center">
                        {pageContents?.['about.company.paragraph_1'] || 'نحن كيان هندسي وزراعي متكامل، نمتلك سنوات طويلة من الخبرة في تقديم حلول تصميم وتنسيق الحدائق، الشلالات، المظلات، والعشب الصناعي. نعمل وفق منهجية تجمع بين الجمال والإبداع.'}
                        <br /><br />
                        {pageContents?.['about.company.paragraph_2'] || 'فريقنا يضم نخبة من المهندسين الزراعيين والفنيين الذين يكرسون جهودهم لتحويل المساحات الخارجية إلى واحات خضراء نابضة بالحياة، تلبي تطلعات عملائنا بأرقى المعايير.'}
                    </p>
                </div>
            </section>

            {/* 3) VISION & MISSION SECTION */}
            <section className="py-16 md:py-28 bg-[#f8f7f6] dark:bg-[#022C22] border-t border-gray-100 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#16A34A]/5 blur-[100px] rounded-full pointer-events-none hidden md:block"></div>

                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-none group">
                                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" alt="Vision and Mission" className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/90 via-[#064E3B]/30 to-transparent"></div>
                                <div className="absolute bottom-6 right-6 left-6 md:bottom-10 md:right-10 md:left-10 text-white">
                                    <h3 className="text-2xl md:text-3xl font-black mb-3">تطلعات لا تعرف الحدود</h3>
                                    <div className="w-16 h-1 green-gradient rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 space-y-12">
                            <div className="reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#16A34A]/10 flex shrink-0 items-center justify-center text-[#16A34A]">
                                        <DynamicIcon name="visibility" className="text-xl md:text-2xl" />
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                                        {pageContents?.['about.vision.title'] || 'رؤيتنا'}
                                    </h2>
                                </div>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed pr-4 md:pl-16">
                                    {pageContents?.['about.vision.text'] || '"أن نكون الخيار الأول والرائد في مجال تنسيق وتصميم الحدائق على مستوى المملكة، وذلك من خلال تقديم حلول مستدامة تعكس روح الابتكار والجمال."'}
                                </p>
                            </div>

                            <div className="w-full h-px bg-gray-200 dark:bg-white/10"></div>

                            <div className="reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#16A34A]/10 flex shrink-0 items-center justify-center text-[#16A34A]">
                                        <DynamicIcon name="flag" className="text-xl md:text-2xl" />
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                                        {pageContents?.['about.mission.title'] || 'رسالتنا'}
                                    </h2>
                                </div>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed pr-4 md:pl-16">
                                    {pageContents?.['about.mission.text'] || '"تقديم خدمات لاندسكيب احترافية بمعايير هندسية وزراعية صارمة وجودة لا تضاهى، تضمن رضا العملاء التام وتلتزم بالمواعيد المحددة لبناء بيئات خارجية خلابة."'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4) CORE VALUES SECTION */}
            <section className="py-16 md:py-28 relative bg-[#064E3B] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#16A34A]/10 blur-[200px] rounded-full mix-blend-screen pointer-events-none hidden md:block"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16 md:mb-20 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-3">ركائز العمل</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white">قيمنا الأساسية</h2>
                        <div className="w-24 h-1 green-gradient mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {values.map((val, idx) => (
                            <div key={idx} className="glass-panel p-10 rounded-3xl hover:-translate-y-2 transition-transform duration-500 reveal-on-scroll opacity-0 translate-y-10 border-t border-[#16A34A]/20 group" style={{ transitionDelay: `${(idx % 3) * 100}ms` }}>
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#16A34A] to-[#4ADE80] text-[#064E3B] flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <DynamicIcon name={val.icon} className="text-4xl" />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-4">{val.title}</h4>
                                <p className="text-gray-300 leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5) STATISTICS SECTION */}
            <section id="stats-section" className="py-12 md:py-20 bg-white dark:bg-[#040A12] border-y border-gray-100 dark:border-white/5 relative z-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 text-center divide-x-0 sm:divide-x-0 md:divide-x md:divide-x-reverse divide-gray-200 dark:divide-white/10">
                        <div className="reveal-on-scroll opacity-0 scale-90 transition-all duration-700 delay-100 mb-6 md:mb-0">
                            <div className="flex justify-center items-center gap-1 text-4xl sm:text-5xl md:text-6xl font-black text-[#16A34A] mb-2 md:mb-4">
                                <span>+</span>
                                <span className="counter-anim" data-target={pageContents?.['about.stats.projects.number'] || "150"} data-suffix="">0</span>
                            </div>
                            <div className="text-gray-900 dark:text-white font-bold text-lg">{pageContents?.['about.stats.projects.label'] || 'مشروع مكتمل'}</div>
                        </div>
                        <div className="reveal-on-scroll opacity-0 scale-90 transition-all duration-700 delay-200 mb-6 md:mb-0">
                            <div className="flex justify-center items-center gap-1 text-4xl sm:text-5xl md:text-6xl font-black text-[#16A34A] mb-2 md:mb-4">
                                <span>+</span>
                                <span className="counter-anim" data-target={pageContents?.['about.stats.experience.number'] || "10"} data-suffix="">0</span>
                            </div>
                            <div className="text-gray-900 dark:text-white font-bold text-lg">{pageContents?.['about.stats.experience.label'] || 'سنوات من الخبرة'}</div>
                        </div>
                        <div className="reveal-on-scroll opacity-0 scale-90 transition-all duration-700 delay-300">
                            <div className="flex justify-center items-center gap-1 text-4xl sm:text-5xl md:text-6xl font-black text-[#16A34A] mb-2 md:mb-4">
                                <span>+</span>
                                <span className="counter-anim" data-target={pageContents?.['about.stats.engineers.number'] || "25"} data-suffix="">0</span>
                            </div>
                            <div className="text-gray-900 dark:text-white font-bold text-lg">{pageContents?.['about.stats.engineers.label'] || 'مهندس وفني محترف'}</div>
                        </div>
                        <div className="reveal-on-scroll opacity-0 scale-90 transition-all duration-700 delay-400">
                            <div className="flex justify-center items-center gap-1 text-4xl sm:text-5xl md:text-6xl font-black text-[#16A34A] mb-2 md:mb-4">
                                <span>+</span>
                                <span className="counter-anim" data-target={pageContents?.['about.stats.satisfaction.number'] || "98"} data-suffix="%">0%</span>
                            </div>
                            <div className="text-gray-900 dark:text-white font-bold text-lg">{pageContents?.['about.stats.satisfaction.label'] || 'نسبة رضا العملاء'}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6) TEAM SECTION */}
            <section className="py-16 md:py-28 bg-[#f8f7f6] dark:bg-[#022C22]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12 md:mb-20 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-3">الكوادر البشرية</span>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">فريقنا الهندسي</h2>
                        <div className="w-24 h-1 green-gradient mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, idx) => (
                            <div key={member.id} className="group reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700" style={{ transitionDelay: `${idx * 150}ms` }}>
                                <div className="relative rounded-3xl overflow-hidden mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-500 shadow-xl border border-gray-100 dark:border-white/5">
                                    <img src={member.img} alt={member.name} className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B] to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                                    <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-[#064E3B]/95 backdrop-blur px-4 py-2 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                                        <div className="flex gap-2">
                                            <DynamicIcon name="mail" className="text-[#16A34A] text-xl cursor-pointer hover:text-white transition-colors" />
                                            <DynamicIcon name="engineering" className="text-[#16A34A] text-xl cursor-pointer hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center px-4">
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{member.name}</h3>
                                    <p className="text-[#16A34A] font-bold">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7) STRONG CALL TO ACTION */}
            <section className="relative py-20 md:py-32 text-center bg-[#022C22] overflow-hidden border-t-4 border-[#16A34A]">
                <div className="absolute inset-0 z-0">
                    <img src={pageContents?.['about.cta.background'] ? (pageContents['about.cta.background'].startsWith('http') ? pageContents['about.cta.background'] : `/storage/${pageContents['about.cta.background']}`) : "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"} alt="cta bg" className="w-full h-full object-cover filter blur-sm scale-110 opacity-30" />
                    <div className="absolute inset-0 bg-[#064E3B]/90 mix-blend-multiply"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name="rocket_launch" className="text-[#16A34A] text-5xl md:text-6xl mb-6 drop-shadow-lg" />
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 leading-tight">
                        {pageContents?.['about.cta.title'] || (
                            <>
                                هل لديك مشروع قادم؟<br />دعنا نبدأ اليوم.
                            </>
                        )}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        {pageContents?.['about.cta.text'] || 'اكتشف الفرق مع فريقنا الاحترافي الذي يضع رؤيتك في مقدمة أولوياته.'}
                    </p>
                    <Link href={`${route('contact')}#contact-form-section`} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 md:gap-4 green-gradient hover:bg-white text-[#064E3B] font-black text-xl md:text-2xl py-5 px-10 md:py-6 md:px-16 rounded-2xl transition-all duration-300 shadow-[0_15px_40px_rgba(201,162,39,0.4)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(201,162,39,0.6)]">
                        <span>{pageContents?.['about.cta.button_text'] || 'اطلب استشارة مجانية'}</span>
                        <DynamicIcon name="arrow_forward" className="rotate-180 text-3xl" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
