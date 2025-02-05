// src/components/layouts/MainLayout.jsx
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const showSidebar = location.pathname === '/chat';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        {showSidebar && (
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}
        <main 
          className={`
            flex-1 
            transition-all duration-300 
            ${showSidebar ? (isSidebarOpen ? 'md:ml-64' : 'md:ml-16') : ''}
            pt-16
            relative
          `}
        >
          {children}
        </main>
      </div>
      {!showSidebar && <Footer />}
    </div>
  );
};

export default MainLayout;