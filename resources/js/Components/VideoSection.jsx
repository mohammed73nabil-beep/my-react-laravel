import React, { useState, useEffect, useRef } from 'react';
import DynamicIcon from '@/Components/DynamicIcon';

export default function VideoSection({ videoUrl, thumbnail, title, subtitle }) {
    const [isOpen, setIsOpen] = useState(false);
    const [embedUrl, setEmbedUrl] = useState('');
    const [autoThumb, setAutoThumb] = useState('');
    const overlayRef = useRef(null);

    useEffect(() => {
        if (!videoUrl) return;
        const ytMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (ytMatch) {
            const id = ytMatch[1];
            setEmbedUrl(`https://www.youtube.com/embed/${id}?autoplay=1`);
            if (!thumbnail) setAutoThumb(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
            return;
        }
        const vmMatch = videoUrl.match(/vimeo\.com\/(\d+)/);
        if (vmMatch) {
            setEmbedUrl(`https://player.vimeo.com/video/${vmMatch[1]}?autoplay=1`);
            return;
        }
        setEmbedUrl(videoUrl);
    }, [videoUrl, thumbnail]);

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') setIsOpen(false); };
        if (isOpen) window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen]);

    if (!videoUrl) return null;

    return (
        <section className="relative py-16 md:py-28 bg-[#0A0502] overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_#C9A22740_0%,_transparent_70%)]" />
            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <div className="text-center mb-10 md:mb-14">
                    <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">شاهد أعمالنا</span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{title || 'شاهد كيف نحوّل مساحتك إلى تحفة فنية'}</h2>
                    {subtitle && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
                </div>
                <div className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-2xl max-w-4xl mx-auto" onClick={() => setIsOpen(true)} style={{ aspectRatio: '16/9' }}>
                    <img src={thumbnail || autoThumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-[#C9A227]/30 animate-ping scale-150" />
                            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center group-hover:bg-white/20 group-hover:border-[#C9A227] transition-all duration-300 group-hover:scale-110">
                                <DynamicIcon name="play_arrow" className="text-white text-5xl md:text-6xl ms-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease]" onClick={(e) => e.target === overlayRef.current && setIsOpen(false)}>
                    <div className="relative w-full max-w-5xl">
                        <button onClick={() => setIsOpen(false)} className="absolute -top-12 left-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm"><DynamicIcon name="close" className="text-2xl" /><span>إغلاق</span></button>
                        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
                            <iframe src={embedUrl} className="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
