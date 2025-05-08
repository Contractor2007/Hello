'use client';

import { Moon , Sun } from "lucide-react";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function DarkModeSwitch() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme === 'system' ? systemTheme : theme;
  useEffect(() => setMounted(true), []);
  return (
    <div>
      {mounted &&
        (currentTheme === 'dark' ? (
          <Moon
            onClick={() => setTheme('light')}
            className='text-xl cursor-pointer hover:text-blue-500'
          />
        ) : (
          <Sun
            onClick={() => setTheme('dark')}
            className='text-xl cursor-pointer hover:text-blue-500'
          />
        ))}
    </div>
  );
}
