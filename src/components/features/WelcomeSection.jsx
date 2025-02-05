const WelcomeSection = ({ username }) => {
  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-blue-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      <h2 className="text-lg text-gray-700 mb-1 sm:text-xl">Welcome {username}</h2>
      <p className="text-xl font-semibold sm:text-2xl">Let's make it happen!</p>
    </div>
  );
};

export default WelcomeSection;
