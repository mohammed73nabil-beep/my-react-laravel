import React, { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';

export default function BlogIndex({ posts, categories, currentCategory }) {
    const { globalSettings, pageContents, pageContentExtras } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'حديقتي لاندسكيب';

    // Smooth reveal animation on scroll
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

    const pageTitle = currentCategory ? `บทความเกี่ยวกับ ${currentCategory} - ${siteName}` : `المدونة - ${siteName}`;

    const heroBg = pageContents?.['blog.hero.background_image'] 
        ? (pageContents['blog.hero.background_image'].startsWith('http') ? pageContents['blog.hero.background_image'] : `/storage/${pageContents['blog.hero.background_image']}`) 
        : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop";
    
    const heroOpacity = pageContentExtras?.['blog.hero.background_image'] ? parseInt(pageContentExtras['blog.hero.background_image']) : 80;

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#022C22] min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-[#16A34A] selection:text-[#064E3B]" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="اقرأ أحدث المقالات والنصائح في مجال تصميم وتنسيق الحدائق، وتعرف على أحدث التطورات في مجال اللاندسكيب." />

                {/* OpenGraph Tags */}
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content="اقرأ أحدث المقالات والنصائح في مجال تصميم وتنسيق الحدائق." />
                <meta property="og:type" content="blog" />

                <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet" />

                <style>{`
                    .hero-gradient { background-image: linear-gradient(180deg, rgba(11,31,58,0.5) 0%, rgba(11,31,58,0.95) 100%); }
                    .green-gradient { background-image: linear-gradient(135deg, #4ADE80 0%, #16A34A 100%); }
                    .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); }
                `}</style>
            </Head>

            <Navbar />

            {/* HERO SECTION */}
            <section className="relative h-[45vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="المدونة"
                        className="w-full h-full object-cover filter blur-[2px]"
                        src={heroBg}
                    />
                    <div className="absolute inset-0 bg-[#064E3B]" style={{ opacity: heroOpacity / 100 }}></div>
                    <div className="absolute inset-0 hero-gradient" style={{ opacity: Math.min((heroOpacity + 20) / 100, 1) }}></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-10">
                    <span className="inline-block py-1.5 px-4 rounded-full border border-[#16A34A]/30 text-[#16A34A] font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur shadow-sm">
                        مركز المعرفة
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        المدونة والمقالات
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                        اكتشف النصائح والأفكار المبتكرة في عالم اللاندسكيب والزراعة الحديثة.
                    </p>
                </div>
            </section>

            {/* BLOG CONTENT */}
            <section className="py-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Categories Filter */}
                    {categories && categories.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-3 mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <Link
                                href={route('blog.index')}
                                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm ${!currentCategory ? 'green-gradient text-[#064E3B]' : 'bg-white dark:bg-[#064E3B] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10'}`}
                            >
                                الكل
                            </Link>
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`${route('blog.index')}?category=${cat.slug}`}
                                    className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm ${currentCategory === cat.slug ? 'green-gradient text-[#064E3B]' : 'bg-white dark:bg-[#064E3B] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10'}`}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Posts Grid */}
                    {posts.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.data.map((post, idx) => (
                                    <Link key={post.id} href={route('blog.show', post.slug)} className="group bg-white dark:bg-[#064E3B] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-white/5 hover:border-[#16A34A]/50 block transition-all duration-500 hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${(idx % 3) * 100}ms` }}>
                                        <div className="h-56 overflow-hidden relative">
                                            <img
                                                src={post.image ? `/storage/${post.image}` : 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/80 to-transparent opacity-80"></div>
                                            {post.category && (
                                                <div className="absolute top-4 right-4 bg-white/95 dark:bg-[#064E3B]/95 text-[#16A34A] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                                    {post.category.name}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-8">
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                                <DynamicIcon name="calendar_month" className="text-[16px]" />
                                                <span>{new Date(post.published_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                            <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-[#16A34A] transition-colors">{post.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 leading-relaxed">
                                                {post.excerpt || 'اقرأ المزيد لمعرفة التفاصيل كاملة.'}
                                            </p>
                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="text-sm font-bold text-[#16A34A] flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                                    اقرأ المزيد
                                                    <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-16 flex justify-center gap-2">
                                {posts.links && posts.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-4 py-2 rounded-lg font-bold border transition-all ${!link.url
                                            ? 'opacity-50 cursor-not-allowed border-gray-200 dark:border-white/10 text-gray-400'
                                            : link.active
                                                ? 'bg-[#16A34A] border-[#16A34A] text-[#064E3B]'
                                                : 'border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10'
                                            }`}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-24 glass-card rounded-3xl reveal-on-scroll opacity-0 translate-y-10">
                            <DynamicIcon name="article" className="text-6xl text-gray-300 dark:text-white/20 mb-6" />
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">لا توجد مقالات حالياً</h3>
                            <p className="text-gray-500">عد قريباً لتجد المزيد من المحتوى المفيد.</p>
                        </div>
                    )}
                </div>
            </section>

            <footer className="bg-[#040A12] py-8 text-center text-sm text-gray-500 border-t border-white/5 relative z-20">
                <p>نظام حديقتي لاندسكيب © {new Date().getFullYear()} — صُمِّم بواسطة <a href="https://wa.me/967781582995" target="_blank" rel="noopener noreferrer" className="text-[#16A34A] font-bold hover:underline">شركة Aboras Soft</a></p>
            </footer>
        </div>
    );
}
