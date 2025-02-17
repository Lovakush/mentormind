// src/pages/Pricing/data/pricingData.js
export const pricingPlans = {
    annual: {
      id: 'annual',
      label: 'Annual',
      price: 299,
      total: 3588,
      duration: '/mo*',
      isPopular: true
    },
    sixMonth: {
      id: 'sixMonth',
      label: '6 months',
      price: 399,
      total: 2394,
      duration: '/mo*'
    },
    monthly: {
      id: 'monthly',
      label: 'Monthly',
      price: 699,
      duration: '/mo*'
    }
  };
  
  export const features = [
    {
      name: 'Study Materials & Notes',
      description: 'Access to comprehensive study materials and notes for all subjects',
      basic: 'Limited',
      premium: 'Unlimited'
    },
    {
      name: 'Practice Questions',
      description: 'Practice with our extensive question bank',
      basic: '50/month',
      premium: 'Unlimited'
    },
    {
      name: 'Mock Tests',
      description: 'Take full-length mock tests with detailed analysis',
      basic: '2/month',
      premium: 'Unlimited'
    },
    {
      name: 'Live Classes',
      description: 'Interactive live classes with expert teachers',
      basic: false,
      premium: true
    },
    {
      name: 'Doubt Resolution',
      description: 'Get your doubts cleared by our expert teachers',
      basic: '5/day',
      premium: 'Priority Support'
    },
    {
      name: 'Performance Analytics',
      description: 'Detailed analysis of your performance and progress tracking',
      basic: 'Basic',
      premium: 'Advanced'
    },
    {
      name: 'Personalized Learning Path',
      description: 'AI-powered personalized learning recommendations',
      basic: false,
      premium: true
    },
    {
      name: 'Parent Dashboard',
      description: 'Keep parents updated with progress reports',
      basic: 'Monthly',
      premium: 'Weekly'
    }
  ];