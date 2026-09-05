'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import FormattedBibTeXText from '@/components/publications/FormattedBibTeXText';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title, enableOnePageMode = false }: SelectedPublicationsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.selectedPublications;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif font-bold text-primary">{resolvedTitle}</h2>
                <Link
                    href={enableOnePageMode ? "/#research" : "/research"}
                    prefetch={true}
                    className="text-accent hover:text-accent-dark text-sm font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                >
                    {messages.home.viewAll} →
                </Link>
            </div>
            <ol className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {publications.map((pub, index) => (
                    <motion.li
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2 py-4 first:pt-0 last:pb-0"
                    >
                        <span className="font-serif text-sm text-neutral-400">{index + 1}.</span>
                        <div>
                            <h3 className="font-semibold leading-snug text-primary">
                                {pub.url ? (
                                    <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                                        <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                                    </a>
                                ) : (
                                    <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                                )}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">
                                {pub.authors.map((author, idx) => (
                                    <span key={idx}>
                                        <span className={author.isHighlighted ? 'font-semibold text-accent' : ''}>{author.name}</span>
                                        {idx < pub.authors.length - 1 && ', '}
                                    </span>
                                ))}
                            </p>
                            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-500">
                                {pub.journal || pub.conference ? <em>{pub.journal || pub.conference}</em> : null}
                                {(pub.journal || pub.conference) && pub.year ? ', ' : null}
                                {pub.year}
                            </p>
                        </div>
                    </motion.li>
                ))}
            </ol>
        </motion.section>
    );
}
