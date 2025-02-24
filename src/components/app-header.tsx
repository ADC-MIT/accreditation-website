'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';

export default function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

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
          : 'border-transparent bg-transparent text-foreground'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex flex-row items-center space-x-0.5">
          <Image
            src="/favicon.png"
            alt="Institute Logo"
            height={28}
            width={28}
            className={cn(
              'brightness-0 invert',
              isScrolled && 'invert-0 dark:invert'
            )}
          />
          <svg height="32" role="separator" viewBox="0 0 32 32" width="32">
            <path
              d="M22 5L9 28"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isScrolled ? 'stroke-current' : 'stroke-white'}
            />
          </svg>
          <span
            className={cn(
              'text-xl font-semibold tracking-tight',
              isScrolled ? 'text-foreground' : 'text-white'
            )}
          >
            accreditation.
          </span>
        </div>
        <div className="flex space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/input" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent font-semibold',
                      !isScrolled &&
                        'text-white hover:bg-background/10 hover:text-white'
                    )}
                  >
                    Input Data
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/export" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent font-semibold',
                      !isScrolled &&
                        'text-white hover:bg-background/10 hover:text-white'
                    )}
                  >
                    Export Data
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent font-semibold',
                      !isScrolled &&
                        'text-white hover:bg-background/10 hover:text-white'
                    )}
                  >
                    Documentation
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/summary" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent font-semibold',
                      !isScrolled &&
                        'text-white hover:bg-background/10 hover:text-white'
                    )}
                  >
                    Summary
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'bg-transparent',
              !isScrolled &&
                'text-white hover:bg-background/10 hover:text-white'
            )}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Sun className="dark:hidden" />
            <Moon className="hidden dark:block" />
            <span className="sr-only">Switch Theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
