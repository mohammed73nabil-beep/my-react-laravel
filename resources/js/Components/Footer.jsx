import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import DynamicIcon from '@/Components/DynamicIcon';
import WebsiteOfferBanner from '@/Components/WebsiteOfferBanner';

export default function Footer() {
    const { globalSettings } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'لاندسكيب';
    const sitePhone = globalSettings?.contact_phone?.value || '';
    const siteEmail = globalSettings?.contact_email?.value || '';
    const siteAddress = globalSettings?.address?.value || 'الرياض، المملكة العربية السعودية';
    const workingHours = globalSettings?.working_hours?.value || 'يومياً: 8:00 ص - 6:00 م';

    return (
        <>
        <footer className="bg-[#040A12] pt-20 pb-10 border-t border-white/10 relative z-20 text-gray-400 font-display">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* عمود 1: عن الشركة */}
                    <div>
                        <div className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                            {siteName}
                        </div>
                        <p className="text-sm leading-relaxed mb-6 text-justify">
                            مؤسسة رائدة في تقديم حلول متكاملة لتصميم وتنسيق الحدائق، تركيب العشب الصناعي، وبناء الشلالات والنوافير بمعايير هندسية وزراعية احترافية.
                        </p>
                        <div className="flex gap-4">
                            {/* يمكن ربطها لاحقا بالإعدادات */}
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#16A34A] hover:text-[#064E3B] transition-colors">
                                <span className="font-bold text-lg">X</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#16A34A] hover:text-[#064E3B] transition-colors">
                                <span className="font-bold text-lg">in</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#16A34A] hover:text-[#064E3B] transition-colors">
                                <span className="font-bold text-lg">f</span>
                            </a>
                        </div>
                    </div>

                    {/* عمود 2: روابط سريعة */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">روابط سريعة</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href={route('home')} className="hover:text-[#16A34A] transition-colors flex items-center gap-2">
                                    <DynamicIcon name="chevron_left" className="text-xs" />
                                    الرئيسية
                                </Link>
                            </li>
                            <li>
                                <Link href={route('about')} className="hover:text-[#16A34A] transition-colors flex items-center gap-2">
                                    <DynamicIcon name="chevron_left" className="text-xs" />
                                    من نحن
                                </Link>
                            </li>
                            <li>
                                <Link href={route('services.index')} className="hover:text-[#16A34A] transition-colors flex items-center gap-2">
                                    <DynamicIcon name="chevron_left" className="text-xs" />
                                    الخدمات
                                </Link>
                            </li>
                            <li>
                                <Link href={route('our-projects.index')} className="hover:text-[#16A34A] transition-colors flex items-center gap-2">
                                    <DynamicIcon name="chevron_left" className="text-xs" />
                                    المشاريع
                                </Link>
                            </li>
                            <li>
                                <Link href={route('blog.index')} className="hover:text-[#16A34A] transition-colors flex items-center gap-2">
                                    <DynamicIcon name="chevron_left" className="text-xs" />
                                    المدونة
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* عمود 3: خدماتنا */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">خدماتنا</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href={route('services.landscaping')} className="hover:text-[#16A34A] transition-colors flex items-center gap-2">
                                    <DynamicIcon name="chevron_left" className="text-xs" />
                                    تنسيق الحدائق
                                </Link>
                            </li>
                            <li>
                                <Link href={route('services.design')} className="hover:text-[#16A34A] transition-colors flex items-center gap-2">
                                    <DynamicIcon name="chevron_left" className="text-xs" />
                                    تصميم الحدائق
                                </Link>
                            </li>
                            <li>
                                <Link href={route('services.artificial-grass')} className="hover:text-[#16A34A] transition-colors flex items-center gap-2">
                                    <DynamicIcon name="chevron_left" className="text-xs" />
                                    العشب الصناعي
                                </Link>
                            </li>
                            <li>
                                <Link href={route('services.index')} className="hover:text-[#16A34A] transition-colors flex items-center gap-2">
                                    <DynamicIcon name="chevron_left" className="text-xs" />
                                    شلالات ونوافير
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* عمود 4: معلومات التواصل */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">معلومات التواصل</h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4">
                                <DynamicIcon name="location_on" className="text-[#16A34A] mt-1 shrink-0" />
                                <span className="text-sm leading-relaxed">{siteAddress}</span>
                            </li>
                            {sitePhone && (
                                <li className="flex items-center gap-4">
                                    <DynamicIcon name="call" className="text-[#16A34A] shrink-0" />
                                    <span className="text-sm" dir="ltr">{sitePhone}</span>
                                </li>
                            )}
                            {siteEmail && (
                                <li className="flex items-center gap-4">
                                    <DynamicIcon name="mail" className="text-[#16A34A] shrink-0" />
                                    <span className="text-sm">{siteEmail}</span>
                                </li>
                            )}
                            <li className="flex items-center gap-4">
                                <DynamicIcon name="schedule" className="text-[#16A34A] shrink-0" />
                                <span className="text-sm">{workingHours}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* الحقوق */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>جميع الحقوق محفوظة © {new Date().getFullYear()} {siteName}</p>
                    <p>
                        صُمِّم بواسطة <a href="https://wa.me/+967781582995" target="_blank" rel="noopener noreferrer" className="text-[#16A34A] font-bold hover:underline">Aboras Soft</a>
                    </p>
                </div>
            </div>
        </footer>
        <WebsiteOfferBanner />
        </>
    );
}
