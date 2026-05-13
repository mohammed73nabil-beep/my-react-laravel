import React, { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';

export default function BlogShow({ post, relatedPosts }) {
    const { globalSettings, url } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'حديقتي لاندسكيب';

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

    const pageTitle = post.meta_title || `${post.title} - ${siteName}`;
    const pageDescription = post.meta_description || post.excerpt || `مقالة بعنوان ${post.title} من مدونة حديقتي لاندسكيب.`;
    const canonicalUrl = `${window.location.origin}${url}`;
    const imageUrl = post.image ? `${window.location.origin}/storage/${post.image}` : `${window.location.origin}/images/services_hero_bg.png`;

    // Structured Data JSON-LD
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': canonicalUrl
        },
        'headline': post.title,
        'description': pageDescription,
        'image': imageUrl,
        'author': {
            '@type': 'Organization',
            'name': siteName
        },
        'publisher': {
            '@type': 'Organization',
            'name': siteName,
            'logo': {
                '@type': 'ImageObject',
                'url': `${window.location.origin}/images/logo.png`
            }
        },
        'datePublished': post.published_at || post.created_at,
        'dateModified': post.updated_at
    };

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#022C22] min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-[#16A34A] selection:text-[#064E3B]" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />

                {/* OpenGraph Tags */}
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="article" />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>

                <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet" />

                <style>{`
                    .hero-gradient { background-image: linear-gradient(180deg, rgba(11,31,58,0.5) 0%, rgba(11,31,58,1) 100%); }
                    .green-gradient { background-image: linear-gradient(135deg, #4ADE80 0%, #16A34A 100%); }
                    
                    /* Rich Text Editor Content Styling */
                    .article-content h1, .article-content h2, .article-content h3 { font-weight: 800; margin-top: 2rem; margin-bottom: 1rem; color: inherit; }
                    .article-content h2 { font-size: 1.875rem; }
                    .article-content h3 { font-size: 1.5rem; }
                    .article-content p { margin-bottom: 1.25rem; line-height: 1.8; color: inherit; opacity: 0.9; }
                    .article-content ul, .article-content ol { margin-right: 1.5rem; margin-bottom: 1.25rem; }
                    .article-content ul { list-style-type: disc; }
                    .article-content ol { list-style-type: decimal; }
                    .article-content a { color: #16A34A; text-decoration: underline; }
                    .article-content img { border-radius: 1rem; margin: 2rem 0; width: 100%; height: auto; outline: 1px solid rgba(255,255,255,0.1); }
                    .article-content blockquote { border-right: 4px solid #16A34A; margin: 1.5rem 0; padding: 1rem 2rem 1rem 1rem; background: rgba(0,0,0,0.03); border-radius: 0.5rem; font-style: italic; }
                    .dark .article-content blockquote { background: rgba(255,255,255,0.03); }
                `}</style>
            </Head>

            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-64 lg:pt-40 lg:pb-72 flex flex-col justify-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt={post.title}
                        className="w-full h-full object-cover"
                        src={post.image ? `/storage/${post.image}` : 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'}
                    />
                    <div className="absolute inset-0 bg-[#064E3B]/60 mix-blend-multiply"></div>
                    <div className="absolute inset-0 hero-gradient dark:from-transparent dark:to-[#022C22] from-transparent to-[#f8f7f6]"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-10">
                    {post.category && (
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#16A34A]/20 border border-[#16A34A]/30 text-[#16A34A] font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur shadow-sm reveal-on-scroll opacity-0 translate-y-10">
                            {post.category.name}
                        </span>
                    )}
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white mb-8 leading-tight drop-shadow-xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-gray-700 dark:text-gray-300 font-medium reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                        <div className="flex items-center gap-2">
                            <DynamicIcon name="calendar_month" className="text-[#16A34A]" />
                            <span>{new Date(post.published_at || post.created_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ARTICLE CONTENT */}
            <section className="relative z-20 pb-20 -mt-32">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white dark:bg-[#064E3B] rounded-3xl shadow-2xl border border-gray-100 dark:border-white/5 p-8 md:p-12 lg:p-16">

                        {/* Rich Text Body */}
                        <div
                            className="article-content text-lg"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        ></div>

                        {/* CTA Inside Article */}
                        <div className="mt-16 p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-[#16A34A]/20 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">هل تحتاج مساعدة في مشروعك؟</h3>
                                <p className="text-gray-600 dark:text-gray-400">فريقنا جاهز لتقديم أفضل الحلول والاستشارات.</p>
                            </div>
                            <Link href={`${route('contact')}#contact-form-section`} className="green-gradient text-[#064E3B] font-bold py-3.5 px-8 rounded-xl shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-1 hover:shadow-xl transition-all whitespace-nowrap inline-flex items-center gap-2">
                                تواصل معنا الآن
                                <DynamicIcon name="arrow_forward" className="rotate-180 text-sm" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* RELATED POSTS */}
            {relatedPosts && relatedPosts.length > 0 && (
                <section className="py-24 bg-white dark:bg-[#040A12] border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-14 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <span className="text-[#16A34A] font-bold tracking-widest text-sm uppercase block mb-3">المزيد للإفادة</span>
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white">مقالات ذات صلة</h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-[#4ADE80] to-[#16A34A] mx-auto mt-5 rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((rel, idx) => (
                                <Link key={rel.id} href={route('blog.show', rel.slug)} className="group bg-gray-50 dark:bg-[#064E3B] rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 dark:border-white/5 block transition-all hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${(idx % 3) * 100}ms` }}>
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={rel.image ? `/storage/${rel.image}` : 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'}
                                            alt={rel.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-[#16A34A] transition-colors">{rel.title}</h3>
                                        <div className="flex items-center gap-1 text-sm font-bold text-[#16A34A] mt-4">
                                            اقرأ المزيد
                                            <DynamicIcon name="arrow_forward" className="text-xs rotate-180 group-hover:-translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <footer className="bg-[#040A12] py-8 text-center text-sm text-gray-500 border-t border-white/5 relative z-20">
                <p>نظام حديقتي لاندسكيب © {new Date().getFullYear()} — صُمِّم بواسطة <a href="https://wa.me/967781582995" target="_blank" rel="noopener noreferrer" className="text-[#16A34A] font-bold hover:underline">شركة Aboras Soft</a></p>
            </footer>
        </div>
    );
}
