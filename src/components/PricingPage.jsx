import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, MessageCircle } from 'lucide-react';

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('annual');

  const plans = {
    annual: {
      price: 399,
      total: 4788,
      duration: '/mo*',
      label: 'Annual'
    },
    sixMonth: {
      price: 559,
      total: 3354,
      duration: '/mo*',
      label: '6 months'
    },
    monthly: {
      price: 1199,
      duration: '/mo*',
      label: 'Monthly'
    }
  };

  const features = [
    {
      name: 'Practice MCQ & PYQ',
      description: 'Ask and practice questions on any subject or topic',
      free: 'Limited',
      super: 'Unlimited'
    },
    {
      name: 'Mains Answer Evaluation',
      description: 'Get instant feedback on your handwritten Mains answer',
      free: '5/month',
      super: 'Unlimited'
    },
    {
      name: 'Doubt Resolution',
      description: 'Clear all your doubts with accurate & detailed responses',
      free: '5/day',
      super: 'Unlimited'
    },
    {
      name: 'Detailed Progress Report',
      description: 'Track your progress with personalised reports',
      free: false,
      super: true
    },
    {
      name: 'Early access to new features',
      description: 'Be the first to experience latest features to improve your prep',
      free: false,
      super: true
    },
    {
      name: 'Priority WhatsApp Support',
      description: 'Get priority help for all your queries from AI Bharat team',
      free: false,
      super: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Early Pricing Banner */}
      <div className="bg-amber-100 p-3 text-center">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-red-500 font-medium">🎯</span>
          <span className="font-medium">Early pricing</span>
          <span className="font-medium">Get Annual Plan at just ₹13/day</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium text-yellow-800 mb-4">
            ❤️ Trusted by 180,000+ UPSC Aspirants
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Get a Super mentor for your
            <div className="text-orange-500">UPSC preparation</div>
          </h1>
          <p className="text-gray-600 px-4">
            All-in-one learning ecosystem for focused and disciplined preparation
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-3xl mx-auto mb-12">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              onClick={() => setSelectedPlan(key)}
              className={`mb-4 rounded-lg border-2 transition-all cursor-pointer ${
                key === selectedPlan
                  ? 'border-blue-500 bg-white shadow-lg'
                  : 'border-gray-200 bg-white hover:border-blue-200'
              }`}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="plan"
                      checked={selectedPlan === key}
                      onChange={() => setSelectedPlan(key)}
                      className="h-4 w-4 text-blue-500"
                    />
                    <span className="font-medium">{plan.label}</span>
                    {key === 'annual' && (
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-bold">₹{plan.price}<span className="text-sm text-gray-500">{plan.duration}</span></div>
                    {plan.total && (
                      <div className="text-sm text-gray-500">
                        Total ₹{plan.total}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => console.log('Subscribe to', selectedPlan)}
            className="w-full py-4 px-6 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors mt-6"
          >
            Subscribe to {plans[selectedPlan].label} Plan
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            *One-time payment for the selected duration
          </p>
        </div>

        {/* Features Comparison */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
            Unlock Your Potential
          </h2>
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-4">
            with Super Plan
          </h3>
          <p className="text-center text-gray-600 mb-8">
            Everything you need for your UPSC preparation
          </p>

          {/* Features Table */}
          <div className="space-y-4">
            {/* Table Header - Mobile Hidden */}
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 rounded-lg font-medium">
              <div className="col-span-6">Features</div>
              <div className="col-span-3 text-center">Free</div>
              <div className="col-span-3 text-center">Super</div>
            </div>

            {/* Features */}
            {features.map((feature, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 bg-white rounded-lg items-center"
              >
                <div className="sm:col-span-6">
                  <h4 className="font-medium">{feature.name}</h4>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
                
                {/* Mobile: Stack side by side */}
                <div className="grid grid-cols-2 gap-2 sm:hidden">
                  <div className="text-sm bg-gray-100 p-2 rounded text-center">
                    <div className="text-xs text-gray-500 mb-1">Free</div>
                    {typeof feature.free === 'boolean' ? (
                      feature.free ? <Check className="inline" size={16} /> : <X className="inline" size={16} />
                    ) : (
                      feature.free
                    )}
                  </div>
                  <div className="text-sm bg-green-50 p-2 rounded text-center">
                    <div className="text-xs text-gray-500 mb-1">Super</div>
                    {typeof feature.super === 'boolean' ? (
                      feature.super ? <Check className="inline text-green-600" size={16} /> : <X className="inline" size={16} />
                    ) : (
                      feature.super
                    )}
                  </div>
                </div>

                {/* Desktop: Show in columns */}
                <div className="hidden sm:block sm:col-span-3 text-center">
                  <div className="text-sm bg-gray-100 p-2 rounded">
                    {typeof feature.free === 'boolean' ? (
                      feature.free ? <Check className="inline" size={16} /> : <X className="inline" size={16} />
                    ) : (
                      feature.free
                    )}
                  </div>
                </div>
                <div className="hidden sm:block sm:col-span-3 text-center">
                  <div className="text-sm bg-green-50 text-green-700 p-2 rounded">
                    {typeof feature.super === 'boolean' ? (
                      feature.super ? <Check className="inline" size={16} /> : <X className="inline" size={16} />
                    ) : (
                      feature.super
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Bharat India</h3>
              <p className="text-gray-400 text-sm">
                Empowering UPSC aspirants with AI-powered learning solutions
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link to="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <p className="text-gray-400 mb-4">
                Need help? Reach out to us on WhatsApp
              </p>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600">
                <MessageCircle size={20} />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AI Bharat India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;