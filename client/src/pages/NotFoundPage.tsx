import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="py-24 bg-background min-h-screen flex flex-col items-center justify-center text-center">
      <div className="container-custom max-w-md space-y-6">
        <h1 className="text-8xl font-black text-primary font-heading">404</h1>
        <h2 className="text-2xl font-bold text-foreground">Hardware Route Not Found</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The page or custom hardware spec you are looking for has been moved or does not exist.
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <a href="/">
            <Button variant="gradient" size="default" leftIcon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
