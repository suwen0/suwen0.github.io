'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { CardPageConfig } from '@/types/page';

const markdownComponents = {
    p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-3 last:mb-0">{children}</p>,
    ul: ({ children }: React.ComponentProps<'ul'>) => <ul className="mb-3 ml-5 list-disc space-y-1.5">{children}</ul>,
    ol: ({ children }: React.ComponentProps<'ol'>) => <ol className="mb-3 ml-5 list-decimal space-y-1.5">{children}</ol>,
    li: ({ children }: React.ComponentProps<'li'>) => <li>{children}</li>,
    a: ({ ...props }) => (
        <a {...props} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline underline-offset-4" />
    ),
    strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }: React.ComponentProps<'em'>) => <em className="italic">{children}</em>,
};

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    const compact = config.layout === 'compact';
    const yearly = config.layout === 'yearly';
    const compactHasDates = compact && config.items.some((item) => item.date);
    const stackedSubtitles = compact && config.subtitleLayout === 'stacked';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className={compact || yearly ? "mb-7" : embedded ? "mb-5" : "mb-10"}>
                <h1 className={`${compact || yearly ? "text-3xl" : embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-3`}>{config.title}</h1>
                {config.description && (
                    <div className={`${embedded ? "text-base" : "text-lg"} max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-500`}>
                        <ReactMarkdown components={markdownComponents}>{config.description}</ReactMarkdown>
                    </div>
                )}
            </div>

            <div className={compact ? "space-y-0.5" : yearly ? "space-y-3.5" : "divide-y divide-neutral-200 dark:divide-neutral-800"}>
                {config.items.map((item, index) => (
                    <motion.article
                        key={index}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 * index }}
                        className={compact
                            ? compactHasDates
                                ? `grid grid-cols-[7.75rem_minmax(0,1fr)] gap-3 ${stackedSubtitles ? "py-1.5" : "py-0.5"} text-sm`
                                : "border-b border-neutral-200 py-2 text-sm last:border-b-0 dark:border-neutral-800"
                            : yearly
                                ? "text-sm leading-6"
                            : "py-6 first:pt-0 last:pb-0"}
                    >
                        {yearly ? (
                            <p className="text-neutral-700 dark:text-neutral-400">
                                <span className="mr-2 font-semibold tabular-nums text-primary">{item.date}:</span>
                                {item.title}
                            </p>
                        ) : compact ? (
                            <>
                                {compactHasDates && (
                                    <span className="tabular-nums text-neutral-500">
                                        {index === 0 || config.items[index - 1]?.date !== item.date ? item.date : ''}
                                    </span>
                                )}
                                <div className="leading-relaxed">
                                    <h2 className={`${stackedSubtitles ? "block" : "inline"} font-semibold text-primary`}>{item.title}</h2>
                                    {item.subtitle && (stackedSubtitles
                                        ? <p className="mt-0.5 text-neutral-600 dark:text-neutral-400">{item.subtitle}</p>
                                        : <span className="text-neutral-500"> — {item.subtitle}</span>
                                    )}
                                    {item.content && (
                                        <div className="mt-1 text-neutral-600 dark:text-neutral-500">
                                            <ReactMarkdown components={markdownComponents}>{item.content}</ReactMarkdown>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div>
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                                    <h2 className={`${embedded ? "text-lg" : "text-xl"} font-semibold leading-snug text-primary`}>{item.title}</h2>
                                    {item.date && <span className="shrink-0 text-sm text-neutral-600 dark:text-neutral-400">{item.date}</span>}
                                </div>
                                {item.subtitle && <p className={`${embedded ? "text-sm" : "text-base"} mt-1 font-medium text-accent`}>{item.subtitle}</p>}
                                {item.content && (
                                    <div className={`${embedded ? "text-sm" : "text-base"} mt-3 leading-relaxed text-neutral-700 dark:text-neutral-400`}>
                                        <ReactMarkdown components={markdownComponents}>{item.content}</ReactMarkdown>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.article>
                ))}
            </div>
        </motion.div>
    );
}
