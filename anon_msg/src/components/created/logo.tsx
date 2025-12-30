import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  href?: string;
}

export default function Logo({ 
  variant = 'light', 
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
  const textColor = variant === 'dark' ? 'text-white' : 'text-black';

  const LogoContent = () => (
    <>
      {showIcon && (
        <div className={`bg-red-600 text-white ${config.iconPadding} rounded-lg`}>
          <MessageSquare size={config.icon} strokeWidth={2.5} />
        </div>
      )}
      <span className={`${config.text} font-black tracking-tight ${textColor}`}>
        anon<span className="text-red-600">msg</span>
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
