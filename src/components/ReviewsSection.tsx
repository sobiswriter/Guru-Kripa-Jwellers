import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, Plus, Filter, ShieldCheck, MapPin } from 'lucide-react';
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
  const [newProduct, setNewProduct] = useState('Pure 22K Royal Punjabi Gold Kada');

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
      location: newLocation || 'Phagwara, Punjab',
      rating: newRating,
      date: 'Just now',
      title: newTitle,
      comment: newComment,
      productName: newProduct,
      productId: 'p-user',
      verifiedBuyer: true,
      helpfulCount: 1,
      tags: ['Verified Customer', 'Phagwara Sarafan Bazar']
    };

    setReviewsList([created, ...reviewsList]);
    setShowAddModal(false);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
  };

  return (
    <section id="reviews-section" className="py-16 bg-[#FAF8F5] text-[#2D2926] border-t border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div>
            <span className="text-xs font-serif uppercase tracking-widest text-[#9D825E] font-bold block mb-2">
              Verified Customer Feedback • Phagwara
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2D2926] font-medium">
              Customer Reviews & Trust
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <span className="text-[#2D2926] font-serif font-bold text-lg">4.9 / 5.0</span>
              <span className="text-[#665E55] text-xs font-sans">(140+ verified local & NRI reviews)</span>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-[#2D2926] hover:bg-[#1A1817] text-[#D4AF37] rounded-full font-serif text-xs font-bold transition-all flex items-center gap-2 shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" /> Write a Review
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-[#E8E1D5]">
          <span className="text-xs text-[#665E55] font-serif uppercase tracking-widest mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['all', 5, 4].map((ratingVal) => (
            <button
              key={String(ratingVal)}
              onClick={() => setFilterRating(ratingVal as number | 'all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif transition-all ${
                filterRating === ratingVal
                  ? 'bg-[#9D825E] text-white font-bold shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-[#FAF3E0] border border-[#E8E1D5]'
              }`}
            >
              {ratingVal === 'all' ? 'All Reviews' : `${ratingVal} Stars`}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-[#E8E1D5] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-[#2D2926] text-base">{rev.author}</h4>
                      {rev.verifiedBuyer && (
                        <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                          <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-stone-400 font-sans">{rev.location} • {rev.date}</span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>
                </div>

                <span className="inline-block px-2.5 py-1 bg-[#FAF3E0] text-[#5C4524] text-[11px] font-serif rounded-md font-semibold mb-3 border border-[#D9C49A]">
                  Ordered / Service: {rev.productName}
                </span>

                <h5 className="font-serif font-bold text-[#2D2926] text-sm mb-2">{rev.title}</h5>
                <p className="text-xs text-[#554E46] leading-relaxed italic font-sans">&ldquo;{rev.comment}&rdquo;</p>

                {/* Customer Proof Photo */}
                {rev.customerPhoto && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-[#E8E1D5] max-h-48">
                    <img
                      src={rev.customerPhoto}
                      alt="Customer Jewellery Order"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8E1D5] flex justify-between items-center text-xs text-stone-500">
                <div className="flex gap-2">
                  {rev.tags?.map((t, idx) => (
                    <span key={idx} className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded font-sans">
                      #{t}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1 text-[11px] text-[#9D825E] font-medium">
                  <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({rev.helpfulCount})
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E1D5] max-w-lg w-full shadow-2xl relative text-left">
              <h3 className="font-serif text-xl font-bold text-[#2D2926] mb-1">Submit Customer Review</h3>
              <p className="text-xs text-[#665E55] mb-4">Share your feedback on our jewellery craftsmanship, gold rate, or plating service.</p>
              
              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#2D2926] font-serif font-semibold mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jasleen Kaur"
                    value={newAuthor}
                    onChange={e => setNewAuthor(e.target.value)}
                    className="w-full bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-[#2D2926] font-serif font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Phagwara / UK / Canada"
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                    className="w-full bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-[#2D2926] font-serif font-semibold mb-1">Rating</label>
                  <select
                    value={newRating}
                    onChange={e => setNewRating(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 font-semibold text-stone-800"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Stars (Exceptional Goldsmithing)</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Stars (Very Good)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#2D2926] font-serif font-semibold mb-1">Review Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Accurate hallmark weight and fast kada delivery"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-[#2D2926] font-serif font-semibold mb-1">Detailed Review *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the karigari, gold quality, polish shine, or turnaround time..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="w-full bg-white border border-[#E8E1D5] rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-stone-600 font-serif"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#9D825E] hover:bg-[#886F4E] font-serif font-bold text-white rounded-xl shadow-sm"
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

