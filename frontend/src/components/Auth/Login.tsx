import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, LogIn, Mail, Lock, RefreshCw } from 'lucide-react';
import { authClient } from '../../lib/auth-client';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { data: session, isPending, error, isRefetching, refetch } = authClient.useSession();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (session?.user) {
      navigate('/dashboard');
    }
  }, [session?.user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle remember me change
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }

    try {
      const result = await authClient.signIn.email({
        email: formData.email,
        rememberMe,
        password: formData.password,
      });

      // Check if the result indicates success
      if (result?.data?.user) {
        console.log('Login successful:', result.data.user);
      // The session will be automatically updated by the useSession hook
      }
    } catch (error) {
      console.error('Login error:', error);
      // The error will be handled by the useSession hook and displayed in the UI
    } finally {
      // After attempt, refetch session to get the latest state
      refetch();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-rose-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-rose-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                📋
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your TaskFlow account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isPending || isRefetching}
                    className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isPending || isRefetching}
                    className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  disabled={isPending || isRefetching}
                  className="mr-2 accent-orange-500"
                />
                <Label htmlFor="rememberMe" className="text-sm select-none cursor-pointer">
                  Remember me
                </Label>
                {/* Add a manual refetch button as well to demonstrate use */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-auto flex items-center"
                  onClick={() => refetch()}
                  disabled={isRefetching}
                  tabIndex={-1}
                >
                  <RefreshCw className={`h-4 w-4 mr-1 ${isRefetching ? 'animate-spin' : ''}`} />
                  {isRefetching ? 'Refreshing...' : 'Refresh session'}
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {error?.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={!formData.email || !formData.password || isPending || isRefetching}
                className="w-full transition-all duration-200 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700"
              >
                {isPending || isRefetching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isPending ? 'Signing In...' : 'Processing...'}
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200"
                >
                  Create account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;