import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function HomeVideo({ videoContents }) {
    const { data, setData, post, processing, errors } = useForm({
        'home.video.url': videoContents['home.video.url'] || '',
        'home.video.title': videoContents['home.video.title'] || '',
        'home.video.subtitle': videoContents['home.video.subtitle'] || '',
        'home.video.thumbnail': null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.home-video.update'), {
            onSuccess: () => toast.success('تم تحديث بيانات الفيديو بنجاح!'),
            onError: () => toast.error('حدث خطأ أثناء التحديث.')
        });
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">videocam</span>
                    <span className="font-medium text-slate-900 dark:text-white">فيديو الصفحة الرئيسية</span>
                </div>
            }
        >
            <Head title="فيديو الصفحة الرئيسية" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold dark:text-white">إعدادات فيديو المشاريع</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">قم بإضافة فيديو تعريفي لمشاريعك ليظهر في الصفحة الرئيسية.</p>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/5 p-8 shadow-sm">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Video URL */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">رابط الفيديو (YouTube / Vimeo)</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">link</span>
                                <input
                                    type="text"
                                    value={data['home.video.url']}
                                    onChange={e => setData('home.video.url', e.target.value)}
                                    className="w-full pr-12 pl-4 py-3 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl focus:ring-primary focus:border-primary text-sm transition-all dark:text-white"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    dir="ltr"
                                />
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1">يُفضل استخدام روابط YouTube أو Vimeo لضمان أفضل أداء.</p>
                            {errors['home.video.url'] && <div className="text-red-500 text-xs mt-1">{errors['home.video.url']}</div>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">عنوان القسم</label>
                                <input
                                    type="text"
                                    value={data['home.video.title']}
                                    onChange={e => setData('home.video.title', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl focus:ring-primary focus:border-primary text-sm transition-all dark:text-white"
                                    placeholder="شاهد كيف نحوّل مساحتك إلى تحفة فنية"
                                />
                                {errors['home.video.title'] && <div className="text-red-500 text-xs mt-1">{errors['home.video.title']}</div>}
                            </div>

                            {/* Subtitle */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">وصف قصير</label>
                                <input
                                    type="text"
                                    value={data['home.video.subtitle']}
                                    onChange={e => setData('home.video.subtitle', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl focus:ring-primary focus:border-primary text-sm transition-all dark:text-white"
                                    placeholder="أكثر من 150 مشروع تنسيق حدائق منجز..."
                                />
                                {errors['home.video.subtitle'] && <div className="text-red-500 text-xs mt-1">{errors['home.video.subtitle']}</div>}
                            </div>
                        </div>

                        {/* Thumbnail */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">صورة مصغرة مخصصة (اختياري)</label>
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        onChange={e => setData('home.video.thumbnail', e.target.files[0])}
                                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer transition-all"
                                    />
                                    <p className="text-[10px] text-slate-500 mt-2">إذا تركتها فارغة، سيتم سحب الصورة تلقائياً من YouTube.</p>
                                    {errors['home.video.thumbnail'] && <div className="text-red-500 text-xs mt-1">{errors['home.video.thumbnail']}</div>}
                                </div>
                                {videoContents['home.video.thumbnail'] && (
                                    <div className="w-32 h-20 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 shrink-0 shadow-sm">
                                        <img src={`/storage/${videoContents['home.video.thumbnail']}`} alt="Thumbnail" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full md:w-auto px-8 py-3.5 bg-primary text-sidebar-dark font-black rounded-xl hover:brightness-110 shadow-[0_10px_20px_rgba(201,162,39,0.2)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-sidebar-dark border-t-transparent rounded-full animate-spin"></span>
                                        جاري الحفظ...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">save</span>
                                        حفظ الإعدادات
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Preview Box */}
                {data['home.video.url'] && (
                    <div className="mt-8 bg-slate-900 rounded-2xl p-4 border border-white/5 shadow-2xl">
                        <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-3 px-2">معاينة الفيديو</p>
                        <div className="aspect-video rounded-xl overflow-hidden bg-black">
                            {data['home.video.url'].includes('youtube.com') || data['home.video.url'].includes('youtu.be') ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${data['home.video.url'].match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1]}`}
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/20">
                                    <span className="material-symbols-outlined text-6xl">play_circle</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
