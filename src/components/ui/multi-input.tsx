'use client';

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
        placeholder="Type and press Enter"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 rounded bg-gray-100 p-1"
          >
            <span>{item}</span>
            <Button variant="ghost" size="sm" onClick={() => removeItem(index)}>
              x
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
