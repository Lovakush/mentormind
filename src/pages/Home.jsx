import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Trophy, Target, Clock, FileText, BarChart2, Users } from 'lucide-react';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
const Home = () => {
  const features = [
    {
      title: "Daily Leaderboard",
      description: "See where you stand among your classmates.",
      icon: Trophy,
    },
    {
      title: "Set Your Goals",
      description: "Complete your daily goals & maintain learning streaks",
      icon: Target,
    },
    {
      title: "Attempt Tests",
      description: "Practice with chapter-wise tests & mock exams",
      icon: FileText,
    },
    {
      title: "Weekly Report",
      description: "Track your progress & keep improving",
      icon: BarChart2,
    }
  ];

  const testimonials = [
    {
      name: "Priya Singh",
      class: "Class 10",
      content: "The AI mentor helps me understand difficult Math concepts easily. Now I can solve problems much faster!",
      avatar: "P",
      since: "Dec'23"
    },
    {
      name: "Rahul Kumar",
      class: "Class 12",
      content: "Practice MCQs and instant explanations helped me improve my Science scores.",
      avatar: "R",
      since: "Jan'24"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Header />
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-amber-100 text-amber-800 text-sm px-4 py-1 rounded-full inline-flex items-center mb-8">
            ✨ Personalised with AI
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Excel in Your Studies<br />
            with Your Personal AI Mentor
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Learning ecosystem for focused & disciplined preparation<br />
            from Class 8 to 12th
          </p>

          <Link
            to="/chat"
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors inline-flex items-center"
          >
            Start Now — it's FREE
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Get ready for
            <span className="text-orange-500 ml-2">Better Learning</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {/* AI Chat Demo */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-semibold text-xl mb-4">Resolve Your Doubts</h3>
              <p className="text-gray-600 mb-4">
                Get instant answers to your questions with our AI mentor.
                Learn concepts with mind maps and visual explanations.
              </p>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white">AI</span>
                  </div>
                  <span className="text-sm text-gray-600">Ask me anything...</span>
                </div>
              </div>
            </div>

            {/* Practice Section */}
            <div className="bg-purple-50 rounded-2xl p-6">
              <h3 className="font-semibold text-xl mb-4">Unlimited MCQ Practice</h3>
              <p className="text-gray-600 mb-4">
                Practice unlimited questions from your textbook chapters.
                Get instant explanations and track your progress.
              </p>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-600">
                  "What is the value of π (pi)?"
                </p>
                <div className="mt-3 space-y-2">
                  <button className="w-full text-left p-2 rounded border hover:bg-blue-50">
                    A) 3.14159
                  </button>
                  <button className="w-full text-left p-2 rounded border hover:bg-blue-50">
                    B) 3.14
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Series Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">
                Comprehensive <span className="text-orange-500">Test Series</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="text-blue-500" />
                  <span>Chapter-wise Tests</span>
                </div>
                <div className="flex items-center gap-2">
                  <LineChart className="text-blue-500" />
                  <span>Full Subject Tests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-blue-500" />
                  <span>Timed Practice</span>
                </div>
              </div>
              <div className="mt-8 space-x-4">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                  Learn More
                </button>
                <button className="border border-blue-500 text-blue-500 px-6 py-2 rounded-lg">
                  View Schedule
                </button>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="/api/placeholder/600/400" 
                alt="Test Interface Demo" 
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <feature.icon className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What students say about <span className="text-orange-500">StudyAI</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-500 font-medium">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.class}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
                <p className="text-sm text-gray-400 mt-4">Using since {testimonial.since}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">You are not alone in this journey</h2>
          <p className="text-gray-600 mb-8">
            Join 10,000+ students and access study materials, mind-maps, and practice with Daily Targets
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg inline-flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Join community</span>
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Discover your learning potential with AI
          </h2>
          <p className="text-gray-600 mb-8">
            Start your journey towards academic excellence. Ask your first question now.
          </p>
          <Link
            to="/chat"
            className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-orange-600 transition-colors inline-flex items-center"
          >
            Start Now — it's FREE
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;