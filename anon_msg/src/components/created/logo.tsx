import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  href?: string;
}

export default function Logo({ 
  variant = 'auto', 
  size = 'md', 
  showIcon = true,
  href = '/'
}: LogoProps) {
  const sizeClasses = {
    sm: { icon: 18, iconPadding: 'p-1', text: 'text-lg', logoWidth: 80, logoHeight: 26 },
    md: { icon: 22, iconPadding: 'p-1.5', text: 'text-xl', logoWidth: 100, logoHeight: 32 },
    lg: { icon: 28, iconPadding: 'p-2', text: 'text-2xl', logoWidth: 120, logoHeight: 38 },
  };

  const config = sizeClasses[size];
  
  // Use semantic tokens for auto variant, hardcoded for explicit light/dark
  const textColorClass = variant === 'auto' 
    ? 'text-text-primary' 
    : variant === 'dark' 
      ? 'text-white' 
      : 'text-black';

  const LogoContent = () => (
    <>
      {showIcon && (
        <div className={`bg-brand text-brand-foreground ${config.iconPadding} rounded-lg`}>
          <MessageSquare size={config.icon} strokeWidth={2.5} />
        </div>
      )}
      <span className={`${config.text} font-black tracking-tight ${textColorClass}`}>
        anon<span className="text-brand">msg</span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center gap-2 select-none">
        <LogoContent />
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2 select-none">
      <LogoContent />
    </div>
  );
}
