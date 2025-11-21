import { Search, Bell, ChevronDown, Wifi, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Page } from '../App';

interface TopBarProps {
  onNavigate?: (page: Page) => void;
}

export function TopBar({ onNavigate }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search cases, judgments, drafts..."
            className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-6">
        {/* Connection Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 rounded-full">
          <Wifi className="w-4 h-4" />
          <span className="text-sm">Local</span>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-foreground" />
          ) : (
            <Sun className="w-5 h-5 text-foreground" />
          )}
        </button>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <button 
          onClick={() => onNavigate?.('settings')}
          className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-lg transition-colors"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">AD</span>
          </div>
          <div className="text-left hidden lg:block">
            <div className="text-sm text-foreground">Adv. Sharma</div>
            <div className="text-xs text-muted-foreground">Sharma & Associates</div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
