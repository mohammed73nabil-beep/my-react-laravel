import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ header, children }) {
    const { url, props } = usePage();
    const user = props.auth?.user || { name: 'المدير', email: 'admin@admin.com' };

    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('adminDarkMode');
        if (savedMode !== null) {
            setIsDarkMode(savedMode === 'true');
        }
    }, []);

    // إغلاق القائمة عند الانتقال لصفحة أخرى
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [url]);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('adminDarkMode', newMode);
    };

    return (
        <div className={`${isDarkMode ? 'dark' : ''} text-slate-900 dark:text-slate-100 min-h-screen flex overflow-hidden font-display`} dir="rtl" lang="ar">
            <Toaster position="top-center" reverseOrder={false} />
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Manrope:wght@400;500;700&display=swap" rel="stylesheet" />

                <style>{`
                    body { font-family: 'IBM Plex Sans Arabic', 'Manrope', sans-serif; }
                    .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
                    .active-nav { background-color: rgba(219, 166, 31, 0.15); border-right: 4px solid #22C55E; color: #22C55E; }
                    ::-webkit-scrollbar { width: 6px; }
                    ::-webkit-scrollbar-track { background: transparent; }
                    ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
                    
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(219, 166, 31, 0.2); border-radius: 10px; }
                    .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(34, 197, 94, 0.5); }
                `}</style>
            </Head>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* Right Sidebar Navigation */}
            <aside className={`w-72 bg-sidebar-dark border-l border-white/5 flex flex-col h-screen fixed md:sticky top-0 right-0 z-50 shrink-0 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
                <div className="p-8 flex items-center gap-3">
                    <div>
                        <h1 className="text-white text-lg font-bold leading-none">نظام الإدارة</h1>
                        <p className="text-primary text-[10px] uppercase tracking-widest mt-1 font-semibold">Saargardens.com</p>
                    </div>
                </div>
                <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <Link
                        href={route('admin.dashboard')}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${url?.startsWith('/admin/dashboard') ? 'active-nav' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="font-medium">الرئيسية</span>
                    </Link>
                    <Link
                        href={route('admin.contents.index')}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${url?.startsWith('/admin/contents') ? 'active-nav' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined">description</span>
                        <span className="font-medium">المحتويات</span>
                    </Link>
                    <Link
                        href={route('admin.home-video.index')}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${url?.startsWith('/admin/home-video') ? 'active-nav' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined">videocam</span>
                        <span className="font-medium">فيديو الصفحة الرئيسية</span>
                    </Link>
                    <Link
                        href={route('admin.projects.index')}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${url?.startsWith('/admin/projects') ? 'active-nav' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined">architecture</span>
                        <span className="font-medium">سجل الأعمال</span>
                    </Link>
                    <Link
                        href={route('admin.posts.index')}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${url?.startsWith('/admin/posts') ? 'active-nav' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined">article</span>
                        <span className="font-medium">المدونة</span>
                    </Link>
                    <Link
                        href={route('admin.project-requests.index')}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${url?.startsWith('/admin/project-requests') ? 'active-nav' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined">assignment</span>
                        <span className="font-medium">الطلبات الجديدة</span>
                    </Link>

                    <div className="pt-6 pb-2 px-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest">النظام</div>
                    <Link
                        href={route('admin.backgrounds.index')}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${url?.startsWith('/admin/backgrounds') ? 'active-nav' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined">wallpaper</span>
                        <span className="font-medium">الخلفيات</span>
                    </Link>
                    <Link
                        href={route('admin.gallery.index')}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${url?.startsWith('/admin/gallery') ? 'active-nav' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined">photo_library</span>
                        <span className="font-medium">صور الأعمال</span>
                    </Link>
                    <Link
                        href={route('admin.settings.index')}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${url?.startsWith('/admin/settings') ? 'active-nav' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined">settings</span>
                        <span className="font-medium">إعدادات الموقع</span>
                    </Link>
                    <Link
                        href={route('profile.edit')}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${url?.startsWith('/profile') ? 'active-nav' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined">person</span>
                        <span className="font-medium">الملف الشخصي</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-white/5">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all text-slate-400 font-medium"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span>تسجيل الخروج</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-background-light dark:bg-background-dark min-w-0">
                {/* Top Header */}
                <header className="h-20 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-4 md:px-8 bg-white dark:bg-sidebar-dark/50 backdrop-blur-md sticky top-0 z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            {header}
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        {/* Custom Dark Mode Toggle */}
                        <label className="toggle-switch scale-50 md:scale-75 origin-[left_center] cursor-pointer">
                            <input type="checkbox" className="checkbox" checked={!isDarkMode} onChange={toggleTheme} />
                            <div className="switch-label"></div>
                            <div className="slider"></div>
                        </label>

                        <div className="relative group">
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                            <input
                                className="w-48 md:w-64 pr-10 pl-4 py-2 bg-slate-100 dark:bg-white/5 border-none rounded-lg focus:ring-1 focus:ring-primary text-sm transition-all text-gray-800 dark:text-white"
                                placeholder="بحث عن..." type="text"
                            />
                        </div>
                        <div className="h-8 w-px bg-slate-200 dark:bg-white/10 hidden md:block"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-left hidden md:block">
                                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user?.name || 'المدير'}</p>
                                <p className="text-[10px] text-primary font-medium">{user?.email || 'admin@admin.com'}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary overflow-hidden flex items-center justify-center text-primary font-bold">
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Body */}
                <div className="p-8 space-y-8 flex-1">
                    {children}
                </div>

                {/* Footer Meta */}
                <footer className="flex items-center justify-between px-8 pt-8 pb-4 text-[11px] text-slate-500 font-medium mt-auto shrink-0">
                    <p>نظام حديقتي لاندسكيب © {new Date().getFullYear()} — صُمِّم بواسطة <a href="https://wa.me/967781582995" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">شركة Aboras Soft</a></p>
                    <div className="flex items-center gap-4">
                        <a className="hover:text-primary transition-colors" href="#">دعم الفني</a>
                    </div>
                </footer>
            </main>
        </div>
    );
}
