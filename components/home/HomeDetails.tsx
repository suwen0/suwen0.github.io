'use client';

import { motion } from 'framer-motion';

export interface HomeDetailItem {
    primary: string;
    secondary?: string;
    meta?: string;
    location?: string;
    detail?: string;
}

interface HomeDetailsProps {
    title?: string;
    layout?: 'columns' | 'stacked';
    items: HomeDetailItem[];
}

export default function HomeDetails({ title, layout = 'columns', items }: HomeDetailsProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
        >
            {title && <h2 className="mb-4 font-serif text-2xl font-bold text-primary">{title}</h2>}

            {layout === 'columns' ? (
                <>
                    <div className="divide-y divide-neutral-200 sm:hidden dark:divide-neutral-800">
                        {items.map((item, index) => (
                            <div key={`${item.primary}-mobile-${index}`} className="py-3 first:pt-0 last:pb-0">
                                <div className="flex items-baseline justify-between gap-4">
                                    <h3 className="font-semibold text-primary">{item.primary}</h3>
                                    <p className="shrink-0 text-sm tabular-nums text-neutral-500">{item.meta}</p>
                                </div>
                                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">{item.secondary}</p>
                            </div>
                        ))}
                    </div>

                    <table className="hidden w-full table-fixed border-collapse text-left sm:table">
                        <colgroup>
                            <col className="w-[32%]" />
                            <col className="w-[48%]" />
                            <col className="w-[20%]" />
                        </colgroup>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={`${item.primary}-${index}`} className="border-b border-neutral-200 last:border-b-0 dark:border-neutral-800">
                                    <th scope="row" className="py-3 pr-6 font-semibold text-primary">{item.primary}</th>
                                    <td className="py-3 pr-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">{item.secondary}</td>
                                    <td className="py-3 text-right text-sm tabular-nums text-neutral-500">{item.meta}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="space-y-5">
                    {items.map((item, index) => (
                        <article key={`${item.primary}-${index}`} className="text-sm leading-relaxed">
                            <div className="grid gap-x-8 gap-y-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline">
                                <h3 className="text-base font-semibold text-primary">{item.primary}</h3>
                                {item.meta && <p className="tabular-nums text-neutral-500 sm:text-right">{item.meta}</p>}
                                {item.secondary && <p className="font-medium text-neutral-700 dark:text-neutral-400">{item.secondary}</p>}
                                {item.location && <p className="text-neutral-500 sm:text-right">{item.location}</p>}
                            </div>
                            {item.detail && <p className="mt-2 text-neutral-600 dark:text-neutral-500">{item.detail}</p>}
                        </article>
                    ))}
                </div>
            )}
        </motion.section>
    );
}
