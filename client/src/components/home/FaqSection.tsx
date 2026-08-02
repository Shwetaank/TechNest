import { useState } from 'react';
import { FAQ_ITEMS } from '@/constants/products';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 bg-background border-b border-border/60">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Everything you need to know about custom PC building, warranties, shipping, and returns.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-border/80 bg-card overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-base text-foreground hover:text-primary transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-muted-foreground transition-transform duration-200 shrink-0 ml-4',
                      isOpen && 'rotate-180 text-primary'
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                    <p className="pt-3">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
