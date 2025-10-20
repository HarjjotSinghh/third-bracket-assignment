import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { LogOut, LayoutDashboard, CheckSquare, Settings } from 'lucide-react';
import { authClient } from '../../lib/auth-client';

const Navbar: React.FC = () => {
  // Use session hook from authClient for session/user state
  const { data: session, isPending, isRefetching, refetch } = authClient.useSession();
  const user = session?.user;
  const isAuthenticated = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    // Could add any relevant user session effect here if needed
  }, [session]);

  const handleLogout = async () => {
    try {
      await authClient.$fetch('/sign-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Session will update via useSession hook after refetch
    } catch (error) {
      // Optionally handle/log error
      console.error('Logout failed:', error);
    } finally {
      // Always refetch session after logout
      refetch();
      // Navigate to login - if not already redirected by auth/session
      navigate('/login');
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md group- transition-all duration-200 group-hover:scale-105">
            📋
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent group-hover:from-orange-700 group-hover:to-rose-700 transition-all duration-200">
              TaskFlow
            </span>
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200">
              Task Management System
            </span>
          </div>
        </Link>

        {/* Navigation */}
        {isAuthenticated && user ? (
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right mr-2">
              <p className="text-sm font-medium text-foreground">
                Welcome back,
              </p>
              <p className="text-sm font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                {user.name}
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10 bg-gradient-to-br from-orange-500 to-rose-600 shadow-md  transition-all duration-200">
                    <AvatarFallback className="text-white font-bold">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate('/dashboard')}
                  className="cursor-pointer"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate('/tasks')}
                  className="cursor-pointer"
                >
                  <CheckSquare className="mr-2 h-4 w-4" />
                  <span>My Tasks</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate('/settings')}
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  disabled={isPending || isRefetching}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              asChild
                className="transition-all duration-200"
                disabled={isPending || isRefetching}
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              size="sm"
              asChild
                className="bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 transition-all duration-200"
                disabled={isPending || isRefetching}
            >
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;