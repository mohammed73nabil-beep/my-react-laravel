import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function SiteContentIndex({ contents = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        key: '',
        type: 'text',
        value: '',
        file: null,
    });

    const [editingKey, setEditingKey] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.content.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setEditingKey(null);
                toast.success('تم حفظ المحتوى بنجاح!');
            },
            onError: () => {
                toast.error('حدث خطأ أثناء حفظ المحتوى.');
            }
        });
    };

    const handleEdit = (contentItem) => {
        setEditingKey(contentItem.key);
        setData({
            key: contentItem.key,
            type: contentItem.type,
            value: contentItem.type !== 'image' ? contentItem.value : '',
            file: null,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        reset();
        setEditingKey(null);
    };

    const handleDelete = (contentItem) => {
        if (confirm(`هل أنت متأكد من حذف هذا القسم "${getKeyTitle(contentItem.key)}"؟ سيتم حذفه نهائياً من قاعدة البيانات.`)) {
            router.delete(route('admin.content.destroy', contentItem.id), {
                preserveScroll: true,
                onSuccess: () => {
                    if (editingKey === contentItem.key) {
                        cancelEdit();
                    }
                    toast.success('تم حذف القسم بنجاح!');
                },
                onError: () => toast.error('حدث خطأ أثناء الحذف.')
            });
        }
    };

    // Predefined recommended keys for the site
    const predefinedKeys = {
        // Home
        'home.hero.title': 'العنوان الرئيسي (الرئيسية)',
        'home.hero.subtitle': 'النص الفرعي (الرئيسية)',
        'home.hero.image': 'صورة الغلاف (الرئيسية) [نوع: صورة]',
        'home.hero.primary_button_text': 'زر الغلاف الرئيسي (الرئيسية)',
        'home.hero.secondary_button_text': 'زر الغلاف الثانوي (الرئيسية)',
        'home.hero.stats.projects.number': 'عدد المشاريع (الرئيسية)',
        'home.hero.stats.experience.number': 'سنوات الخبرة (الرئيسية)',
        'home.hero.stats.satisfaction.number': 'نسبة الرضا (الرئيسية)',
        
        'home.services.badge': 'شارة قسم الخدمات (الرئيسية)',
        'home.services.title': 'عنوان قسم الخدمات (الرئيسية)',
        'home.services.maintenance.title': 'الخدمة 1 - العنوان',
        'home.services.maintenance.description': 'الخدمة 1 - الوصف',
        'home.services.caravans.title': 'الخدمة 2 - العنوان',
        'home.services.caravans.description': 'الخدمة 2 - الوصف',
        'home.services.portacabins.title': 'الخدمة 3 - العنوان',
        'home.services.portacabins.description': 'الخدمة 3 - الوصف',
        'home.services.renovation.title': 'الخدمة 4 - العنوان',
        'home.services.renovation.description': 'الخدمة 4 - الوصف',
        'home.services.insulation.title': 'الخدمة 5 - العنوان',
        'home.services.insulation.description': 'الخدمة 5 - الوصف',
        'home.services.electrical.title': 'الخدمة 6 - العنوان',
        'home.services.electrical.description': 'الخدمة 6 - الوصف',

        'home.why.title': 'عنوان لماذا تختارنا (الرئيسية)',
        'home.why.description': 'نبذة لماذا تختارنا (الرئيسية)',
        'home.why.features.support.title': 'ميزة الدعم - العنوان',
        'home.why.features.support.text': 'ميزة الدعم - الوصف',
        'home.why.features.team.title': 'ميزة الطاقم - العنوان',
        'home.why.features.team.text': 'ميزة الطاقم - الوصف',
        'home.why.features.warranty.title': 'ميزة الضمان - العنوان',
        'home.why.features.warranty.text': 'ميزة الضمان - الوصف',
        'home.why.features.quality.title': 'ميزة الجودة - العنوان',
        'home.why.features.quality.text': 'ميزة الجودة - الوصف',

        'home.projects.badge': 'شارة المشاريع (الرئيسية)',
        'home.projects.title': 'عنوان المشاريع (الرئيسية)',
        'home.testimonials.badge': 'شارة آراء العملاء (الرئيسية)',
        'home.testimonials.title': 'عنوان آراء العملاء (الرئيسية)',
        'home.cta.title': 'العنوان دعوة للحركة (الرئيسية)',
        'home.cta.description': 'الوصف دعوة للحركة (الرئيسية)',

        // ── فيديو الأعمال (الرئيسية) ──────────────────────────────────────────
        'home.video.url': '🎬 رابط الفيديو — YouTube أو Vimeo (الرئيسية)',
        'home.video.title': '🎬 عنوان قسم الفيديو (الرئيسية)',
        'home.video.subtitle': '🎬 وصف قسم الفيديو (الرئيسية)',
        'home.video.thumbnail': '🎬 صورة مصغرة للفيديو [نوع: صورة] (الرئيسية)',

        // About
        'about.hero.title': 'العنوان الرئيسي (من نحن)',
        'about.hero.subtitle': 'النص الفرعي (من نحن)',
        'about.hero.image': 'صورة الغلاف (من نحن) [نوع: صورة]',
        'about.company.badge': 'شارة الشركة (من نحن)',
        'about.company.title': 'عنوان الشركة (من نحن)',
        'about.company.paragraph_1': 'مقدمة الشركة (من نحن)',
        'about.company.paragraph_2': 'تفاصيل الشركة (من نحن)',
        'about.vision.title': 'الرؤية - العنوان',
        'about.vision.text': 'الرؤية - النص',
        'about.mission.title': 'الرسالة - العنوان',
        'about.mission.text': 'الرسالة - النص',
        'about.team.member1.name': 'عضو الفريق 1 - الاسم',
        'about.team.member1.position': 'عضو الفريق 1 - المنصب',
        'about.team.member1.image': 'عضو الفريق 1 - الصورة [نوع: صورة]',

        // Contact
        'contact.header.title': 'العنوان الرئيسي (تواصل معنا)',
        'contact.header.subtitle': 'النص الفرعي (تواصل معنا)',
        'contact.header.image': 'صورة الغلاف (تواصل معنا) [نوع: صورة]',
    };

    // Helper to get descriptive titles for certain keys
    const getKeyTitle = (key) => {
        return predefinedKeys[key] || key;
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">campaign</span>
                    <span className="font-medium text-slate-900 dark:text-white">إدارة محتوى الموقع</span>
                </div>
            }
        >
            <Head title="تعديل المحتوى" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">إدارة أقسام الموقع</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">تغيير النصوص، الصور، وتحديث هوية الموقع الفاخرة.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Editor Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/5 p-6 sticky top-28">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200 dark:border-white/5">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined">{editingKey ? 'edit' : 'add_circle'}</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{editingKey ? 'تعديل قسم' : 'إضافة قسم جديد'}</h3>
                                <p className="text-xs text-slate-500">{editingKey ? `تعديل المفتاح: ${editingKey}` : 'أنشئ مفتاحاً جديداً لربطه بالموقع'}</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">المفتاح (الرابط البرمجي)</label>
                                <input
                                    type="text"
                                    list="predefined-keys"
                                    value={data.key}
                                    onChange={e => setData('key', e.target.value)}
                                    disabled={editingKey !== null}
                                    className="w-full px-4 py-2.5 bg-slate-100 dark:bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm transition-all dark:text-white disabled:opacity-50"
                                    placeholder="اختر من القائمة أو اكتب مفتاحاً جديداً..."
                                    dir="ltr"
                                    autoComplete="off"
                                />
                                <datalist id="predefined-keys">
                                    {Object.entries(predefinedKeys).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </datalist>
                                {errors.key && <div className="text-red-500 text-xs mt-1">{errors.key}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">نوع المحتوى</label>
                                <select
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-100 dark:bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm transition-all dark:text-white"
                                >
                                    <option value="text">نص قصير (عنوان، رقم)</option>
                                    <option value="long_text">نص طويل (نبذة، مقال)</option>
                                    <option value="image">صورة (خلفية، شعار)</option>
                                </select>
                            </div>

                            {/* Dynamic Input based on Type */}
                            <div className="pt-2">
                                {data.type === 'image' ? (
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">رفع الصورة</label>
                                        <input
                                            type="file"
                                            onChange={e => setData('file', e.target.files[0])}
                                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                                        />
                                        {errors.file && <div className="text-red-500 text-xs mt-1">{errors.file}</div>}
                                    </div>
                                ) : data.type === 'long_text' ? (
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">النص المطلوب</label>
                                        <textarea
                                            value={data.value}
                                            onChange={e => setData('value', e.target.value)}
                                            rows="4"
                                            className="w-full px-4 py-2 bg-slate-100 dark:bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm transition-all dark:text-white"
                                            placeholder="اكتب النص هنا..."
                                        ></textarea>
                                        {errors.value && <div className="text-red-500 text-xs mt-1">{errors.value}</div>}
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">النص</label>
                                        <input
                                            type="text"
                                            value={data.value}
                                            onChange={e => setData('value', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-100 dark:bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm transition-all dark:text-white"
                                            placeholder="اكتب النص..."
                                        />
                                        {errors.value && <div className="text-red-500 text-xs mt-1">{errors.value}</div>}
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-primary text-sidebar-dark font-bold py-3 rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
                                >
                                    {processing ? 'جاري الحفظ...' : 'حفظ التعديلات'}
                                </button>
                                {editingKey && (
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="px-4 bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-lg hover:bg-slate-300 dark:hover:bg-white/10 transition-all"
                                    >
                                        إلغاء
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Content List Array */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-white/5">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">المحتويات الحالية</h3>
                            <p className="text-xs text-slate-500 mt-1">قائمة بجميع المتغيرات والنصوص المسجلة في الموقع</p>
                        </div>
                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-right text-sm">
                                <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">القسم الدلالي (Key)</th>
                                        <th className="px-6 py-4 font-bold">النوع</th>
                                        <th className="px-6 py-4 font-bold">القيمة الحالية</th>
                                        <th className="px-6 py-4 font-bold w-32">إجراءات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                    {contents.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                                                {getKeyTitle(item.key)}
                                                <div className="text-[10px] text-slate-400 font-normal font-mono ltr mt-1" dir="ltr">{item.key}</div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">
                                                {item.type === 'image' ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/10 text-purple-500 rounded text-[10px] font-bold">
                                                        <span className="material-symbols-outlined text-[12px]">image</span> صورة
                                                    </span>
                                                ) : item.type === 'long_text' ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/10 text-blue-500 rounded text-[10px] font-bold">
                                                        <span className="material-symbols-outlined text-[12px]">article</span> نص طويل
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-500 rounded text-[10px] font-bold">
                                                        <span className="material-symbols-outlined text-[12px]">short_text</span> نص قصير
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.type === 'image' ? (
                                                    <div className="w-20 h-12 rounded overflow-hidden border border-white/10 relative group">
                                                        <img src={`/storage/${item.value}`} alt={item.key} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <a href={`/storage/${item.value}`} target="_blank" className="text-white text-[10px] underline">عرض</a>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="max-w-[200px] truncate text-slate-600 dark:text-slate-300">
                                                        {item.value}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="w-8 h-8 rounded-lg text-primary hover:bg-primary/10 flex items-center justify-center transition-colors"
                                                        title="تعديل هذا القسم"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item)}
                                                        className="w-8 h-8 rounded-lg text-red-500 hover:bg-red-500/10 flex items-center justify-center transition-colors"
                                                        title="حذف هذا القسم"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {contents.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                                لا توجد محتويات مضافة بعد. يمكنك البدء بإضافة 'hero_title' و 'hero_background'.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
