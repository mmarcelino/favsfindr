import React from 'react';

export function ContributePage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Hi! We're Mariana and Nuno and this is our curated list of favourite places from our travels around Portugal and hometown adventures.
        </p>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-4">
          Got a favorite spot you think we should add? Let us know why you love it - we're always on the lookout for our next favourite find!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-brand focus:border-brand"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-brand focus:border-brand"
          />
        </div>

        <div>
          <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 mb-1">
            Your suggestion goes here
          </label>
          <textarea
            id="suggestion"
            required
            rows={4}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-brand focus:border-brand"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-brand text-white px-8 py-3 rounded-lg hover:bg-brand-light transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}