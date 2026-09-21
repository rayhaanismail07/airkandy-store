import React from 'react';
import { REVIEWS } from '../../data/reviews';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export const ReviewsCarousel: React.FC = () => (
  <section className="py-14 bg-white border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 lg:px-6">

      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ak-teal mb-2">
          Client Testimonials
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-wd-gray900">
          What Connoisseurs Say
        </h2>
      </div>

      {/* 3-Column Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {REVIEWS.slice(0, 3).map((review) => (
          <div
            key={review.id}
            className="bg-white border border-gray-200 p-7 flex flex-col gap-5 hover:shadow-wd-card transition-shadow"
            style={{ borderRadius: 2 }}
          >
            {/* Stars + Quote Icon */}
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'fill-ak-gold text-ak-gold' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <Quote className="w-7 h-7 text-ak-teal/20" />
            </div>

            {/* Review text */}
            <p className="text-sm text-wd-gray600 leading-relaxed italic flex-1">
              &ldquo;{review.comment}&rdquo;
            </p>

            {/* Author */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-wd-gray900 flex items-center gap-1.5">
                  {review.author}
                  {review.verifiedBuyer && (
                    <ShieldCheck className="w-3.5 h-3.5 text-ak-teal" />
                  )}
                </p>
                <p className="text-xs text-ak-teal mt-0.5">{review.productName}</p>
              </div>
              <span className="text-xs text-wd-gray400">{review.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary badge */}
      <div className="text-center mt-8">
        <div
          className="inline-flex items-center gap-3 px-6 py-3 bg-ak-warm border border-gray-200 text-sm text-wd-gray700"
          style={{ borderRadius: 2 }}
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-ak-gold text-ak-gold" />
            ))}
          </div>
          <span>
            <strong className="text-wd-gray900">4.9/5</strong> from 200+ verified South African buyers
          </span>
        </div>
      </div>
    </div>
  </section>
);
