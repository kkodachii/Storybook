import { Home, Search, Users, Bookmark, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center py-6 z-40">
      <div className="mb-8">
        <h1 className="text-white font-bold text-xl">Reader</h1>
      </div>
      <nav className="flex flex-col gap-6 w-full">
        <a href="#home" className="flex flex-col items-center gap-1 text-white hover:text-orange-400 transition-colors p-2">
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </a>
        <a href="#discover" className="flex flex-col items-center gap-1 text-white hover:text-orange-400 transition-colors p-2">
          <Search className="h-6 w-6" />
          <span className="text-xs">Discover</span>
        </a>
        <a href="#recommendations" className="flex flex-col items-center gap-1 text-white hover:text-orange-400 transition-colors p-2">
          <Users className="h-6 w-6" />
          <span className="text-xs">Recommendations</span>
        </a>
        <a href="#wishlist" className="flex flex-col items-center gap-1 text-white hover:text-orange-400 transition-colors p-2">
          <Bookmark className="h-6 w-6" />
          <span className="text-xs">Wishlist</span>
        </a>
        <a href="#settings" className="flex flex-col items-center gap-1 text-white hover:text-orange-400 transition-colors p-2">
          <Settings className="h-6 w-6" />
          <span className="text-xs">Settings</span>
        </a>
      </nav>
    </aside>
  );
}

