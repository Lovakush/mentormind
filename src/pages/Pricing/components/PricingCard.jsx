// src/pages/Pricing/components/PricingCard.jsx
import React from 'react';
import { Check } from 'lucide-react';

const PricingCard = ({ plan, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(plan.id)}
      className={`mb-4 rounded-lg border-2 transition-all cursor-pointer ${
        isSelected
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
              checked={isSelected}
              onChange={() => onSelect(plan.id)}
              className="h-4 w-4 text-blue-500"
            />
            <span className="font-medium">{plan.label}</span>
            {plan.isPopular && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                Most Popular
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-bold">
              ₹{plan.price}<span className="text-sm text-gray-500">{plan.duration}</span>
            </div>
            {plan.total && (
              <div className="text-sm text-gray-500">
                Total ₹{plan.total}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;