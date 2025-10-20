import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  Target,
  Zap,
  BarChart3,
  Shield,
  Clock,
  Calendar,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const LandingPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50 dark:from-slate-900 dark:to-neutral-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className={cn("inset-0 bg-gradient-to-r from-orange-600/10 to-rose-600/10", scrolled ? 'fixed top-6 h-[88px] max-h-[88px] py-4 rounded-xl flex items-center justify-center bg-transparent' : 'absolute w-full h-full dark:bg-neutral-900/50 ')} />
        {scrolled && (<div className='relative z-10 flex items-center justify-center'>
          <nav className={`fixed w-full top-6 h-[88px] max-h-[88px] z-50 flex items-center justify-between p-6 max-w-7xl mx-auto transition-all duration-300 ${scrolled ? 'py-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg rounded-xl' : ''}`}>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-rose-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-rose-500 text-white rounded-lg hover:from-orange-700 hover:to-rose-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started Free
            </Link>
          </div>
        </nav>
        </div>)}
        <nav className={`relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto transition-all duration-300 ${scrolled ? 'py-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg rounded-xl' : ''}`}>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-rose-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-rose-500 text-white rounded-lg hover:from-orange-700 hover:to-rose-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started Free
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-100/20 via-transparent to-transparent" />

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-rose-400/20 rounded-full blur-xl float-animation" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-rose-400/20 to-orange-200/20 rounded-full blur-xl float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-br from-orange-200/40 to-rose-400/20 rounded-full blur-xl float-animation" style={{ animationDelay: '4s' }} />

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium text-orange-700 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300 rounded-full pulse-glow">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
            Trusted by 10,000+ teams worldwide
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-6">
            <span className="block">Manage Tasks</span>
            <span className="block bg-gradient-to-r from-orange-600 to-rose-500 bg-clip-text text-transparent">
              Like a Pro
            </span>
          </h1>

          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your productivity with intelligent task management.
            Organize, prioritize, and accomplish more with your team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-rose-500 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-rose-600 transition-all transform hover:scale-105 shadow-xl"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-orange-50 dark:hover:bg-neutral-700 transition-all shadow-lg"
            >
              View Demo
              <BarChart3 className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-orange-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-orange-500 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-orange-500 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-white dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Everything you need to stay productive
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Powerful features to help you and your team accomplish more
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-br from-orange-50 to-rose-50 dark:from-orange-900/20 dark:to-rose-900/20 rounded-2xl border border-orange-100 dark:border-orange-800  transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                Smart Task Management
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Create, organize, and prioritize tasks with intelligent sorting and filtering options.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 rounded-2xl border border-rose-100 dark:border-rose-800  transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                Team Collaboration
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Work together seamlessly with real-time updates and team task assignments.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl border border-orange-200 dark:border-orange-800  transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Track productivity with comprehensive analytics and performance insights.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-50 to-rose-100 dark:from-orange-900/20 dark:to-rose-900/20 rounded-2xl border border-orange-100 dark:border-orange-800  transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-rose-400 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                Time Tracking
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Monitor time spent on tasks and optimize your workflow with detailed time reports.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-50 to-rose-50 dark:from-orange-900/20 dark:to-rose-900/20 rounded-2xl border border-orange-100 dark:border-orange-800  transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-rose-400 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                Smart Scheduling
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Intelligent scheduling and deadline management to keep projects on track.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-neutral-50 to-orange-50 dark:from-neutral-800 dark:to-orange-800 rounded-2xl border border-neutral-200 dark:border-neutral-700  transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-neutral-600 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                Enterprise Security
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Bank-level security with role-based access control and data encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20 bg-white dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              See what our customers have to say about TaskFlow Pro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gradient-to-br from-orange-50 to-rose-50 dark:from-orange-900/20 dark:to-rose-900/20 rounded-2xl border border-orange-100 dark:border-orange-800">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4 italic">
                "TaskFlow has completely transformed how our team collaborates. We've seen a 40% increase in productivity since switching."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  JD
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">John Davis</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">CTO, TechStart</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 rounded-2xl border border-rose-100 dark:border-rose-800">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4 italic">
                "The analytics dashboard gives us insights we never had before. It's like having a productivity consultant on our team."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-rose-300 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  SC
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">Sarah Chen</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Product Manager, InnovateCo</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-100 to-rose-100 dark:from-orange-900/20 dark:to-rose-900/20 rounded-2xl border border-orange-200 dark:border-orange-800">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 mb-4 italic">
                "Simple, powerful, and intuitive. Our team adopted it in a day and our project completion rate has doubled."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-300 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  MR
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">Michael Rodriguez</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">CEO, GrowthLabs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-orange-600 to-rose-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-orange-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-orange-100">Tasks Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-orange-100">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-orange-100">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-orange-50 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Ready to transform your productivity?
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Join thousands of teams already using TaskFlow Pro to get more done.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-rose-500 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-rose-600 transition-all transform hover:scale-105 shadow-xl"
          >
            Start Your Free Trial
            <Zap className="ml-2 w-5 h-5" />
          </Link>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
            No credit card required • 14-day free trial • Setup in minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-neutral-900 text-neutral-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">TaskFlow Pro</span>
              </div>
              <p className="text-sm text-neutral-400">
                The modern task management solution for productive teams.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/status" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-700 pt-8 text-center text-sm text-neutral-400">
            <p>&copy; ${ new Date().getFullYear() } TaskFlow Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;