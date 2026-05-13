import React, { useState, useEffect, memo } from 'react';
import { Link, usePage } from '@inertiajs/react';
import FloatingContact from './FloatingContact';
import DynamicIcon from '@/Components/DynamicIcon';

// --- مكون الروابط الذكي ---
const NavLink = memo(({ link, closeMenu, variant = 'desktop' }) => {
    const isMobileSidebar = variant === 'mobile-sidebar';
    const isQuickBar = variant === 'quick-bar';

    const baseClasses = "transition-all duration-200 font-bold whitespace-nowrap flex items-center justify-center";

    let styleClasses = "";
    if (isMobileSidebar) {
        styleClasses = `w-full px-5 py-3.5 text-base ${
            link.active
                ? 'bg-[#16A34A]/10 text-[#16A34A] border-r-4 border-[#16A34A] rounded-l-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg'
        }`;
    } else if (isQuickBar) {
        styleClasses = `px-3.5 py-1.5 text-[12px] border rounded-full ${
            link.active
                ? 'bg-[#16A34A] text-white border-[#16A34A]'
                : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10'
        }`;
    } else {
        styleClasses = `px-3 py-1.5 text-[13px] lg:text-[14px] rounded ${
            link.active
                ? 'text-[#16A34A] bg-[#16A34A]/10'
                : 'text-gray-200 hover:text-[#16A34A] hover:bg-white/5'
        }`;
    }

    return (
        <li className={isMobileSidebar ? "w-full" : "shrink-0 flex"}>
            <Link href={link.href} onClick={closeMenu} className={`${baseClasses} ${styleClasses}`}>
                {link.name}
            </Link>
        </li>
    );
});

export default function Navbar() {
    const { globalSettings } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'حدائق سار';
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle('dark');
        localStorage.theme = newMode ? 'dark' : 'light';
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }, [isOpen]);

    const navLinks = [
        { name: 'الرئيسية', href: route('home'), active: route().current('home') },
        { name: 'الخدمات', href: route('services.index'), active: route().current('services.*') },
        { name: 'تنسيق الحدائق', href: route('services.landscaping'), active: route().current('services.landscaping') },
        { name: 'تصميم الحدائق', href: route('services.design'), active: route().current('services.design') },
        { name: 'العشب الصناعي', href: route('services.artificial-grass'), active: route().current('services.artificial-grass') },
        { name: 'المدونة', href: route('blog.index'), active: route().current('blog.*') },
        { name: 'مشاريعنا', href: route('our-projects.index'), active: route().current('our-projects.*') },
        { name: 'من نحن', href: route('about'), active: route().current('about') },
        { name: 'اتصل بنا', href: route('contact'), active: route().current('contact') },
    ];

    return (
        <>
            {/* ======= MOBILE HEADER ======= */}
            <header
                className={`fixed z-[60] top-0 left-0 right-0 md:hidden transition-all duration-500 ${
                    scrolled ? 'bg-[#064E3B] border-b border-white/10 shadow-md' : 'bg-transparent border-transparent'
                }`}
                dir="rtl"
            >
                {/* Row 1: Logo + Toggle */}
                <div className="flex items-center justify-between px-4 h-14">
                    <Link href={route('home')} className="flex items-center gap-2 shrink-0">
                        <span className="font-black text-[14px] text-white truncate max-w-[170px]">
                            {siteName}
                        </span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleDarkMode}
                            className="w-9 h-9 flex items-center justify-center text-gray-300 hover:text-[#16A34A] transition-colors"
                        >
                            <DynamicIcon name={isDarkMode ? 'light_mode' : 'dark_mode'} className="text-xl" />
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-9 h-9 flex items-center justify-center bg-white/10 text-white"
                        >
                            <DynamicIcon name={isOpen ? "close" : "menu"} className="text-xl" />
                        </button>
                    </div>
                </div>


            </header>

            {/* ======= MOBILE SIDEBAR ======= */}
            <div className={`fixed inset-0 z-[70] md:hidden transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsOpen(false)}
                />
                {/* Sidebar Panel */}
                <nav
                    className={`absolute top-0 right-0 h-full w-[280px] bg-white dark:bg-[#064E3B] shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    dir="rtl"
                >
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between px-5 py-4 bg-[#064E3B]">
                        <div className="flex items-center gap-2">
                            <span className="font-black text-white text-sm">{siteName}</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                            <DynamicIcon name="close" className="text-2xl" />
                        </button>
                    </div>

                    {/* Sidebar Links */}
                    <ul className="flex flex-col gap-1 overflow-y-auto flex-1 px-3 py-3">
                        {navLinks.map((link, index) => (
                            <NavLink key={index} link={link} closeMenu={() => setIsOpen(false)} variant="mobile-sidebar" />
                        ))}
                    </ul>

                    {/* Sidebar Footer */}
                    <div className="px-4 py-4 border-t border-gray-100 dark:border-white/10 space-y-3">
                        <button
                            onClick={toggleDarkMode}
                            className="w-full py-2.5 bg-gray-100 dark:bg-white/5 flex items-center justify-center gap-2 font-bold text-gray-700 dark:text-white text-sm transition-colors hover:bg-gray-200 dark:hover:bg-white/10"
                        >
                            <DynamicIcon name={isDarkMode ? 'light_mode' : 'dark_mode'} />
                            {isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
                        </button>
                        <Link
                            href={route('contact')}
                            onClick={() => setIsOpen(false)}
                            className="w-full py-2.5 bg-[#16A34A] text-[#064E3B] flex items-center justify-center gap-2 font-black text-sm hover:bg-[#b38c1a] transition-colors"
                        >
                            تواصل معنا
                            <DynamicIcon name="arrow_forward" className="text-base rotate-180" />
                        </Link>
                    </div>
                </nav>
            </div>

            {/* ======= DESKTOP HEADER ======= */}
            <header
                className={`hidden md:flex fixed z-50 top-0 left-0 right-0 items-center h-16 transition-all duration-500 ${
                    scrolled ? 'bg-[#064E3B] border-b border-white/10 shadow-lg shadow-black/30' : 'bg-transparent border-transparent'
                }`}
                dir="rtl"
            >
                <div className="w-full max-w-screen-2xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href={route('home')} className="flex items-center gap-2.5 shrink-0">
                        <span className="font-black text-white text-[15px] hidden lg:block">
                            {siteName}
                        </span>
                    </Link>

                    {/* Nav Links (Center) */}
                    <nav className="flex-1 flex items-center justify-center">
                        <ul className="flex items-center gap-0.5 lg:gap-1">
                            {navLinks.map((link, index) => (
                                <NavLink key={index} link={link} variant="desktop" />
                            ))}
                        </ul>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={toggleDarkMode}
                            className="w-9 h-9 flex items-center justify-center text-gray-300 hover:text-[#16A34A] transition-colors"
                            title={isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
                        >
                            <DynamicIcon name={isDarkMode ? 'light_mode' : 'dark_mode'} className="text-xl" />
                        </button>
                        <Link
                            href={route('contact')}
                            className="bg-[#16A34A] hover:bg-[#b38c1a] text-[#064E3B] font-black py-2 px-5 text-sm transition-colors whitespace-nowrap"
                        >
                            تواصل معنا
                        </Link>
                    </div>
                </div>
            </header>



            <FloatingContact />
        </>
    );
}