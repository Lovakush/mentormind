// src/pages/Pricing/components/FeatureComparison.jsx
import React from 'react';
import { Check, X } from 'lucide-react';

const FeatureRow = ({ feature }) => {
  const renderValue = (value) => {
    if (value === 'Unlimited') {
      return <span className="text-green-600">∞ Unlimited</span>;
    }
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="inline text-green-600 w-5 h-5" />
      ) : (
        <X className="inline text-gray-400 w-5 h-5" />
      );
    }
    return value;
  };

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 py-6">
        {/* Feature Info */}
        <div>
          <h4 className="font-medium text-gray-900 mb-1">{feature.name}</h4>
          <p className="text-sm text-gray-500">{feature.description}</p>
        </div>
        
        {/* Basic Plan */}
        <div className="text-center">
          <div className="text-sm font-medium">
            {renderValue(feature.basic)}
          </div>
        </div>

        {/* Premium Plan */}
        <div className="text-center bg-green-50">
          <div className="text-sm font-medium">
            {renderValue(feature.premium)}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureComparison = ({ features }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      {/* Table Header */}
      <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 bg-white">
        <div className="p-4">Features</div>
        <div className="p-4 text-center bg-gray-100">
          <span className="inline-block px-3 py-1 bg-gray-500 text-white rounded text-sm">
            FREE
          </span>
        </div>
        <div className="p-4 text-center bg-green-50">
          <span className="inline-block px-3 py-1 bg-green-400 text-white rounded text-sm">
            SUPER
          </span>
        </div>
      </div>

      {/* Features List */}
      <div className="bg-white">
        {features.map((feature, index) => (
          <FeatureRow key={index} feature={feature} />
        ))}
      </div>
    </div>
  );
};

export default FeatureComparison;