import { 
  MessageSquare, 
  CheckCircle, 
  FileText, 
  Newspaper, 
  ChevronRight,
  BookOpen,
  Target,
  Clock,
  BarChart2,
  Calculator,
  Brain
} from 'lucide-react';

const VARIANTS = {
  yellow: 'bg-amber-50 hover:bg-amber-100',
  green: 'bg-emerald-50 hover:bg-emerald-100',
  blue: 'bg-blue-50 hover:bg-blue-100',
  red: 'bg-red-50 hover:bg-red-100',
  purple: 'bg-purple-50 hover:bg-purple-100',
  orange: 'bg-orange-50 hover:bg-orange-100',
  indigo: 'bg-indigo-50 hover:bg-indigo-100',
  emerald: 'bg-emerald-50 hover:bg-emerald-100'
};

const ICONS = {
  message: MessageSquare,
  checkCircle: CheckCircle,
  fileText: FileText,
  newspaper: Newspaper,
  bookOpen: BookOpen,
  target: Target,
  clock: Clock,
  barChart2: BarChart2,
  calculator: Calculator,
  brain: Brain
};

const ChatCard = ({ icon, title, description, variant = 'yellow', onClick }) => {
  const IconComponent = ICONS[icon] || MessageSquare; // Fallback to MessageSquare if icon not found
  
  return (
    <button
      onClick={onClick}
      className={`
        ${VARIANTS[variant] || VARIANTS.yellow}
        p-4 rounded-lg text-left transition-colors w-full group
        flex flex-col h-full
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <IconComponent className="w-5 h-5 text-gray-600" />
        <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {description && (
          <span className="text-sm text-gray-600 line-clamp-2">
            {description}
          </span>
        )}
      </div>
    </button>
  );
};

export default ChatCard;