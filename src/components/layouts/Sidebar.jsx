import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  FileText,
  LayoutGrid,
  BookOpen,
  Clock,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationGroups = [
    {
      items: [
        { 
          name: 'Ask MentorMind', 
          icon: MessageSquare, 
          href: '/chat', 
          current: true,
          hoverColor: 'hover:bg-blue-100',
          activeColor: 'bg-blue-50 text-blue-600'
        },
        { 
          name: 'Answer Evaluation', 
          icon: FileText, 
          href: '/evaluation',
          hoverColor: 'hover:bg-green-100',
          activeColor: 'bg-green-50 text-green-600'
        }
      ]
    },
    {
      items: [
        { 
          name: 'Mock Tests', 
          icon: LayoutGrid, 
          href: '/tests',
          hoverColor: 'hover:bg-purple-100',
          activeColor: 'bg-purple-50 text-purple-600'
        },
        { 
          name: 'Study Materials', 
          icon: BookOpen, 
          href: '/materials',
          hoverColor: 'hover:bg-orange-100',
          activeColor: 'bg-orange-50 text-orange-600'
        }
      ]
    },
    {
      items: [
        { 
          name: 'My Progress', 
          icon: BarChart2, 
          href: '/progress',
          hoverColor: 'hover:bg-pink-100',
          activeColor: 'bg-pink-50 text-pink-600'
        }
      ]
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setIsOpen(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  const MobileHeader = () => (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" className="w-5 h-5" />
          </div>
          <span className="font-semibold">MentorMind</span>
        </div>
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="text-gray-400 hover:text-gray-600"
        >
          <ChevronDown className={`w-6 h-6 ${mobileExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {mobileExpanded && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200">
          <nav className="divide-y divide-gray-200">
            {navigationGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="py-2">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${item.hoverColor}`}
                  >
                    <item.icon className={`w-5 h-5 ${item.current ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className={`${item.current ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );

  // Tooltip component for collapsed sidebar
  const Tooltip = ({ children, visible, name }) => (
    <div className="relative group">
      {children}
      {visible && (
        <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap z-50">
          {name}
        </div>
      )}
    </div>
  );

  return (
    <>
      <MobileHeader />
      <aside className={`
        hidden md:flex flex-col fixed inset-y-0 left-0 z-30
        transform transition-all duration-300
        ${isOpen ? 'w-64' : 'w-16'}
        bg-white border-r border-gray-200
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <img src="/logo.svg" alt="Logo" className="w-5 h-5" />
              </div>
              {isOpen && <span className="font-semibold">MentorMind</span>}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
            >
              {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto pt-4">
            {navigationGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="mb-4">
                {group.items.map((item) => (
                  <Tooltip 
                    key={item.name} 
                    name={item.name} 
                    visible={!isOpen && hoveredItem === item.name}
                  >
                    <Link
                      to={item.href}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`
                        flex items-center gap-3 px-4 py-2 mx-2 rounded-lg mb-1
                        transition-all duration-150
                        ${item.current ? item.activeColor : `text-gray-700 ${item.hoverColor}`}
                        ${!isOpen && 'justify-center'}
                        hover:scale-105
                      `}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {isOpen && <span className="font-medium">{item.name}</span>}
                    </Link>
                  </Tooltip>
                ))}
                {groupIdx < navigationGroups.length - 1 && (
                  <div className="h-0.5 bg-gray-200 mx-4 my-4" />
                )}
              </div>
            ))}
          </nav>

          {/* Super Plan Banner - Only show on desktop expanded view */}
          {isOpen && (
            <div className="p-4 border-t border-gray-200">
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
                </div>
                <h3 className="text-center font-medium text-sm mb-2">
                  Get Unlimited Access with SUPER Plan
                </h3>
                <button className="w-full bg-orange-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-orange-600 transition-colors hover:scale-105">
                  View Benefits <ExternalLink className="w-4 h-4 inline ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* User Profile - Only show on desktop expanded view */}
          {isOpen && (
            <div className="border-t border-gray-200 p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
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
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;