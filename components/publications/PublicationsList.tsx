'use client';

import { motion } from 'framer-motion';
import { Publication } from '@/types/publication';
import { PublicationPageConfig } from '@/types/page';
import FormattedBibTeXText from './FormattedBibTeXText';
import type { PublicationCategory } from '@/types/publication';

interface PublicationsListProps {
    config: PublicationPageConfig;
    publications: Publication[];
    embedded?: boolean;
}

export default function PublicationsList({ config, publications, embedded = false }: PublicationsListProps) {
    const categories: Array<{ id: PublicationCategory; title: string }> = [
        { id: 'publication', title: 'Publications' },
        { id: 'working-paper', title: 'Working Papers' },
        { id: 'industry', title: 'Industry-Related Research' },
    ];

    const statusRank = (description?: string) => {
        const status = description?.toLowerCase() || '';
        if (status.startsWith('accepted')) return 0;
        if (status.startsWith('revise and resubmit')) return 1;
        if (status.startsWith('under review')) return 2;
        return 3;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
        >
            <div className={embedded ? "mb-5" : "mb-8"}>
                <h1 className={`${embedded ? "text-2xl" : "text-4xl"} mb-3 font-serif font-bold text-primary`}>{config.title}</h1>
                {config.description && (
                    <p className={`${embedded ? "text-base" : "text-lg"} max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-500`}>
                        {config.description}
                    </p>
                )}
            </div>

            <div className="space-y-10">
                {categories.map((category) => {
                    const categoryPublications = publications
                        .filter((pub) => pub.category === category.id)
                        .sort((a, b) => {
                            if (category.id === 'working-paper') {
                                return statusRank(a.description) - statusRank(b.description);
                            }
                            if (category.id === 'industry') {
                                return (a.displayOrder ?? Number.MAX_SAFE_INTEGER) - (b.displayOrder ?? Number.MAX_SAFE_INTEGER);
                            }
                            return 0;
                        });
                    if (categoryPublications.length === 0) return null;

                    return (
                        <section key={category.id} aria-labelledby={`research-${category.id}`}>
                            <h2 id={`research-${category.id}`} className="mb-4 border-b border-neutral-200 pb-2 font-serif text-xl font-bold text-primary dark:border-neutral-800">
                                {category.title}
                            </h2>
                            <ol className="space-y-5">
                                {categoryPublications.map((pub, index) => {
                                    const displayYear = pub.yearLabel || String(pub.year);
                                    const venue = pub.journal || pub.conference;
                                    const coauthors = pub.authors.filter((author) => !author.isHighlighted);
                                    const isHighlightedStatus = statusRank(pub.description) < 3;

                                    return (
                                        <motion.li
                                            key={pub.id}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, delay: 0.02 * index }}
                                            className="grid grid-cols-[1.6rem_minmax(0,1fr)] gap-1 text-sm text-neutral-600 dark:text-neutral-400"
                                        >
                                            <span className="pt-0.5 tabular-nums text-neutral-400">{index + 1}.</span>
                                            <div className="space-y-0.5 leading-relaxed">
                                                <p className="text-[0.95rem] text-primary">
                                                    <cite className="font-medium italic not-underline">
                                                        <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                                                    </cite>
                                                </p>

                                                {coauthors.length > 0 && (
                                                    <p className="text-neutral-500 dark:text-neutral-500">
                                                        with{' '}
                                                        {coauthors.map((author, idx) => (
                                                            <span key={`${pub.id}-${author.name}-${idx}`}>
                                                                {author.name}
                                                                {idx < coauthors.length - 1 && ', '}
                                                            </span>
                                                        ))}
                                                    </p>
                                                )}

                                                <p>
                                                    {venue && <strong className="font-bold text-primary">{venue}</strong>}
                                                    {venue ? `, ${displayYear}` : displayYear}
                                                    {pub.description && (
                                                        <span className={isHighlightedStatus ? 'font-semibold text-primary' : 'text-neutral-500'}>
                                                            {' — '}{pub.description}
                                                        </span>
                                                    )}
                                                    {pub.url && (
                                                        <>
                                                            {' '}
                                                            <a href={pub.url} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline underline-offset-4">
                                                                [Link]
                                                            </a>
                                                        </>
                                                    )}
                                                </p>
                                                
                                            </div>
                                        </motion.li>
                                    );
                                })}
                            </ol>
                        </section>
                    );
                })}
            </div>
        </motion.div>
    );
}
