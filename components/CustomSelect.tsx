
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: string[] | Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, label, placeholder = "Select option..." }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const opts = options.map(o => typeof o === 'string' ? { label: o, value: o } : o);
  const current = opts.find(o => o.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full text-left" ref={containerRef}>
      {label && (
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
          {label}
        </label>
      )}
      
      <div 
        onClick={() => setOpen(!open)}
        className={`group relative h-[52px] flex items-center justify-between px-5 bg-white border rounded-xl cursor-pointer transition-all duration-200 ${
          open ? 'border-slate-900 ring-4 ring-slate-900/5' : 'border-slate-200 hover:border-slate-400'
        }`}
      >
        <span className={`text-[14px] font-semibold tracking-tight truncate ${!value ? 'text-slate-300' : 'text-slate-900'}`}>
          {current ? current.label : placeholder}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-slate-300 transition-transform duration-300 ${open ? 'rotate-180 text-slate-900' : ''}`} 
        />
      </div>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-slate-100 rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-[220px] overflow-y-auto p-1.5 scrollbar-hide">
            {opts.map((o) => (
              <div
                key={o.value}
                onClick={() => { onChange(o.value); setOpen(false); }}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-[13px] font-semibold transition-all cursor-pointer mb-0.5 last:mb-0 ${
                  value === o.value 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{o.label}</span>
                {value === o.value && <Check size={12} strokeWidth={4} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
