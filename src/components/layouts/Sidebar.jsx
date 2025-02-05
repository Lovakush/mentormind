// src/components/layouts/Sidebar.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Book, 
  BarChart2, 
  Newspaper, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Clock,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const navigationGroups = [
    {
      items: [
        { name: 'Ask MentorMind', icon: MessageSquare, href: '/chat', current: true },
        { name: 'Mains Evaluation', icon: FileText, href: '/evaluation' }
      ],
      bgColor: 'bg-blue-50'
    },
    {
      items: [
        { name: 'My Tests', icon: Book, href: '/tests' },
        { name: 'My Library', icon: Book, href: '/library' },
        { name: 'News Analysis', icon: Newspaper, href: '/news' }
      ]
    },
    {
      items: [
        { name: 'Practice PYQs', icon: FileText, href: '/pyqs', badge: 'New' },
        { name: 'My Progress', icon: BarChart2, href: '/progress' }
      ]
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  // Mobile Header
  const MobileHeader = () => (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <img src="/logo.svg" alt="MentorMind" className="w-6 h-6" />
          </div>
          <span className="font-semibold">MentorMind</span>
        </div>
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="text-gray-400"
        >
          {mobileExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileExpanded && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="py-2">
            {navigationGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="py-1">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3
                      ${item.current ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}
                    `}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
                {groupIndex < navigationGroups.length - 1 && (
                  <div className="h-px bg-gray-100 mx-4 my-1" />
                )}
              </div>
            ))}
            {/* Upgrade Banner in Mobile */}
            <div className="p-4 border-t border-gray-100">
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-center font-medium text-sm mb-2">
                  Get Unlimited Access with SUPER Plan
                </h3>
                <button className="w-full bg-orange-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-orange-600 transition-colors">
                  View Benefits
                </button>
              </div>
            </div>
            {/* User Profile in Mobile */}
            <div className="border-t border-gray-100 p-4 flex items-center gap-3">
              <img
                src="/avatar.jpg"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex items-center justify-between flex-1">
                <span className="font-medium text-sm">Lova Kush</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside 
      className={`
        hidden md:flex flex-col fixed inset-y-0 left-0 z-30
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-16'} 
        bg-white border-r border-gray-200
      `}
    >
      {/* Desktop Logo and Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <img src="/logo.svg" alt="MentorMind" className="w-6 h-6" />
          </div>
          {isOpen && <span className="font-semibold">MentorMind</span>}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-gray-600"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation for Desktop */}
      <nav className="flex-1 overflow-y-auto">
        {navigationGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="py-1">
            {group.items.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  relative flex items-center gap-3 px-4 py-2.5
                  ${item.current ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}
                  ${!isOpen && 'justify-center'}
                  group
                `}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isOpen ? (
                  <>
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {item.badge}
                      </span>
                    )}
                  </>
                ) : (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            ))}
            {groupIndex < navigationGroups.length - 1 && (
              <div className="h-px bg-gray-100 mx-4 my-1" />
            )}
          </div>
        ))}
      </nav>

      {/* Desktop Upgrade Banner */}
      {isOpen ? (
        <div className="p-4">
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-center font-medium text-sm mb-2">
              Get Unlimited Access with SUPER Plan
            </h3>
            <button className="w-full bg-orange-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-orange-600 transition-colors">
              View Benefits
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 flex justify-center">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center group relative">
            <Clock className="w-5 h-5 text-orange-500" />
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
              Get SUPER Plan
            </div>
          </div>
        </div>
      )}

      {/* Desktop User Profile */}
      <div className="border-t border-gray-100 p-4 flex items-center gap-3">
        <img
          src="/avatar.jpg"
          alt="User"
          className="w-8 h-8 rounded-full"
        />
        {isOpen && (
          <div className="flex items-center justify-between flex-1">
            <span className="font-medium text-sm">Lova Kush</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <>
      <MobileHeader />
      <DesktopSidebar />
    </>
  );
};

export default Sidebar;