'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';

export default function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed z-50 w-full border-b transition-colors duration-100',
        isScrolled
          ? 'border-foreground/20 bg-background/50 text-foreground saturate-100 backdrop-blur-sm'
          : 'border-transparent bg-transparent text-white'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex flex-row items-center space-x-0.5 text-xl font-semibold tracking-tight">
          <Image
            src="/favicon.png"
            alt="Institute Logo"
            height={28}
            width={28}
            className={cn('brightness-0 invert', isScrolled && 'invert-0')}
          />
          <svg height="32" role="separator" viewBox="0 0 32 32" width="32">
            <path
              d="M22 5L9 28"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isScrolled ? 'stroke-current' : 'stroke-white'}
            />
          </svg>
          accreditation.
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent font-semibold',
                    !isScrolled && 'hover:bg-background/10 hover:text-white'
                  )}
                >
                  Input Data
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent font-semibold',
                    !isScrolled && 'hover:bg-background/10 hover:text-white'
                  )}
                >
                  Export Data
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent font-semibold',
                    !isScrolled && 'hover:bg-background/10 hover:text-white'
                  )}
                >
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
