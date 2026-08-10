import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Plus, Camera, Filter } from 'lucide-react';
import { Review } from '../types';
import { REVIEWS } from '../data/reviews';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New review form
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState('Elysian Radiant Oval Solitaire');

  const filteredReviews = reviewsList.filter(r => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newTitle || !newComment) return;

    const created: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      location: newLocation || 'Verified Global Patron',
      rating: newRating,
      date: 'Just now',
      title: newTitle,
      comment: newComment,
      productName: newProduct,
      productId: 'p-user',
      verifiedBuyer: true,
      helpfulCount: 1,
      tags: ['Verified Patron']
    };

    setReviewsList([created, ...reviewsList]);
    setShowAddModal(false);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
  };

  return (
    <section id="reviews-section" className="py-20 bg-[#FAF8F5] text-stone-900 border-t border-[#e6dfd5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-serif uppercase tracking-[0.25em] text-amber-800 font-bold block mb-2">
              Client Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 font-medium">
              Verified Patron Experiences
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-stone-900 font-serif font-bold text-lg">4.96 / 5.0</span>
              <span className="text-stone-500 text-xs">(Based on 1,480 verified haute joaillerie acquisitions)</span>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-amber-300 rounded-full font-serif text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
          >
            <Plus className="w-4 h-4" /> Share Your Experience
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-[#e6dfd5]">
          <span className="text-xs text-stone-500 font-serif uppercase tracking-widest mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['all', 5, 4].map((ratingVal) => (
            <button
              key={String(ratingVal)}
              onClick={() => setFilterRating(ratingVal as number | 'all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif transition-all ${
                filterRating === ratingVal
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-[#e6dfd5]'
              }`}
            >
              {ratingVal === 'all' ? 'All Reviews' : `${ratingVal} Stars`}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-[#e6dfd5] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-stone-900 text-base">{rev.author}</h4>
                      {rev.verifiedBuyer && (
                        <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                          <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified Patron
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-stone-400 font-serif">{rev.location} • {rev.date}</span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <span className="inline-block px-2.5 py-1 bg-amber-50 text-amber-900 text-[11px] font-serif rounded-md font-semibold mb-3 border border-amber-200">
                  Acquired: {rev.productName}
                </span>

                <h5 className="font-serif font-semibold text-stone-900 text-sm mb-2">{rev.title}</h5>
                <p className="text-xs text-stone-600 leading-relaxed italic">&ldquo;{rev.comment}&rdquo;</p>

                {/* Customer Proof Photo */}
                {rev.customerPhoto && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-[#e6dfd5] max-h-48">
                    <img
                      src={rev.customerPhoto}
                      alt="Customer Try-On photo proof"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#e6dfd5] flex justify-between items-center text-xs text-stone-500">
                <div className="flex gap-2">
                  {rev.tags?.map((t, idx) => (
                    <span key={idx} className="text-[10px] text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1 text-[11px]">
                  <ThumbsUp className="w-3.5 h-3.5 text-amber-700" /> Helpful ({rev.helpfulCount})
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-[#fdfbf7] p-6 rounded-2xl border border-[#e6dfd5] max-w-lg w-full shadow-2xl relative">
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-4">Submit Patron Review</h3>
              
              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-serif mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={newAuthor}
                    onChange={e => setNewAuthor(e.target.value)}
                    className="w-full bg-white border border-[#e6dfd5] rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-serif mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Geneva, Switzerland"
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                    className="w-full bg-white border border-[#e6dfd5] rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-serif mb-1">Rating</label>
                  <select
                    value={newRating}
                    onChange={e => setNewRating(Number(e.target.value))}
                    className="w-full bg-white border border-[#e6dfd5] rounded-xl px-3 py-2 font-semibold"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Stars (Exceptional)</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Stars (Excellent)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-serif mb-1">Review Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The virtual try-on accurately matched the real ring"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full bg-white border border-[#e6dfd5] rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-serif mb-1">Detailed Review *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your experience with the craftsmanship, virtual try-on, or boutique service..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="w-full bg-white border border-[#e6dfd5] rounded-xl px-3 py-2"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-stone-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 font-serif font-bold text-stone-950 rounded-xl"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
