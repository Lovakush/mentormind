// src/pages/Pricing/index.jsx
import React, { useState } from 'react';
import { pricingPlans, features } from './data/pricingData';
import PricingCard from './components/PricingCard';
import FeatureComparison from './components/FeatureComparison';
import Footer from '../../components/layouts/Footer';

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('annual');

  const handleSubscribe = () => {
    // Handle subscription logic
    console.log('Subscribing to:', selectedPlan);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Early Pricing Banner */}
      <div className="bg-amber-100 p-3 text-center">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-red-500 font-medium">🎯</span>
          <span className="font-medium">Early pricing</span>
          <span className="font-medium">Get Annual Plan at just ₹13/day</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-block bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium text-yellow-800 mb-4">
              ❤️ Trusted by 50,000+ Students
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Get Expert Guidance for
              <div className="text-orange-500">Your Academic Success</div>
            </h1>
            <p className="text-gray-600 px-4">
              Comprehensive learning platform for students of classes 8-12
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="max-w-3xl mx-auto mb-12">
            {Object.values(pricingPlans).map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlan === plan.id}
                onSelect={setSelectedPlan}
              />
            ))}

            <button
              onClick={handleSubscribe}
              className="w-full py-4 px-6 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors mt-6"
            >
              Subscribe to {pricingPlans[selectedPlan].label} Plan
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              *One-time payment for the selected duration
            </p>
          </div>

          {/* Features Comparison */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
              Transform Your Learning Journey
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-4">
              with our Premium Plan
            </h3>
            <p className="text-center text-gray-600 mb-8">
              Choose the plan that best fits your learning needs
            </p>

            <FeatureComparison features={features} />

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <h4 className="text-lg font-medium mb-2">Need help choosing?</h4>
              <p className="text-gray-600 mb-4">
                Our education counselors are here to help you select the best plan
              </p>
              <button className="bg-white text-blue-500 border border-blue-500 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <Footer />
      </section>
    </div>
  );
};

export default PricingPage;