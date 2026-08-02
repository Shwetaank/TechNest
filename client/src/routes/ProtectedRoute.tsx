import React from 'react';
import { useAuth } from '@/store/authStore';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    const currentPath = encodeURIComponent(window.location.pathname);
    window.location.href = `/login?redirect=${currentPath}`;
    return null;
  }

  const isAdmin =
    user?.role === 'admin' ||
    user?.roles?.includes('ADMIN') ||
    user?.roles?.includes('SUPER_ADMIN');

  if (requireAdmin && !isAdmin) {
    return (
      <div className="py-20 bg-background min-h-screen flex items-center justify-center">
        <div className="container-custom max-w-md text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center justify-center mx-auto shadow-lg">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-foreground font-heading">
              403 Access Denied
            </h2>
            <p className="text-xs text-muted-foreground">
              You do not have Administrator permissions to access the enterprise control panel. Signed in as <strong className="text-foreground">{user?.email}</strong>.
            </p>
          </div>

          <a href="/">
            <Button variant="default" size="sm" className="font-bold rounded-xl gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Store Home</span>
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
