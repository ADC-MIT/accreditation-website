import { Check, ChevronsUpDown } from 'lucide-react';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ComboboxProps {
  items: Array<{ label: string; value: string }>;
  onSelect: (value: string) => void;
  placeholder?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isLoading?: boolean;
  hasError?: boolean;
}

export function Combobox({
  items,
  onSelect,
  placeholder,
  open,
  onOpenChange,
  isLoading,
  hasError,
}: ComboboxProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState('');

  const actualOpen = open ?? internalOpen;
  const handleOpenChange = (nextOpen: boolean) => {
    setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <Popover open={actualOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={actualOpen}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm font-normal ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
        >
          {selectedValue
            ? items.find((item) => item.value === selectedValue)?.label
            : placeholder || 'Select an option'}
          <ChevronsUpDown className="ml-2 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder="Search..."
            onValueChange={(val) => setInputValue(val)}
          />
          <CommandList>
            {isLoading ? (
              <div className="px-4 py-2">Loading...</div>
            ) : hasError ? (
              <div className="px-4 py-2">
                there was an error while fetching data.
              </div>
            ) : items.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    onSelect={() => {
                      onSelect(item.value);
                      setSelectedValue(item.value);
                      handleOpenChange(false);
                      setInputValue(item.label);
                    }}
                  >
                    {item.label}
                    <Check
                      className={
                        selectedValue === item.value
                          ? 'ml-auto opacity-100'
                          : 'ml-auto opacity-0'
                      }
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
