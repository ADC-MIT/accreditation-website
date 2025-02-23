'use client';

import { X } from 'lucide-react';

import React, { KeyboardEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MultiInputProps {
  values?: string[];
  onChange?: (values: string[]) => void;
}

export function MultiInput({ values = [], onChange }: MultiInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState<string[]>(values);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newItems = [...items, inputValue.trim()];
      setItems(newItems);
      onChange?.(newItems);
      setInputValue('');
    }
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange?.(newItems);
  };

  return (
    <div>
      <Input
        value={inputValue}
        placeholder="To add multiple values, press Enter after each value"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-1 rounded-full bg-muted pl-4 text-muted-foreground"
          >
            <p className="px-1">{item}</p>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-muted-foreground/10"
              onClick={() => removeItem(index)}
            >
              <X />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
