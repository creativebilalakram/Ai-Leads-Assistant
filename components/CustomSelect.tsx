
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
  placeholder?: string;
  label?: string;
  helperText?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select...",
  label,
  helperText 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: Option[] = options.map(opt => 
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  );

  const selectedOption = normalizedOptions.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${isOpen ? 'z-[100]' : 'z-10'}`} ref={containerRef}>
      {label && (
        <label className={`block text-[9px] font-black uppercase tracking-widest mb-1.5 ml-2 transition-all duration-300 ${isOpen ? 'text-teal-600 translate-x-1' : 'text-slate-400'}`}>
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-5 md:px-7 py-3.5 md:py-4.5 border transition-all duration-300 text-left active:scale-[0.99] group ${
            isOpen 
              ? 'bg-white border-teal-500 rounded-t-2xl shadow-xl ring-4 ring-teal-500/5' 
              : 'bg-slate-50/40 border-slate-200/60 rounded-2xl hover:border-slate-300 hover:bg-white shadow-sm'
          }`}
        >
          <span className={`block truncate text-sm md:text-base font-semibold tracking-tight transition-colors duration-300 ${!value ? 'text-slate-400' : 'text-slate-900'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className={`transition-all duration-300 ${isOpen ? 'rotate-180 text-teal-600' : 'text-slate-300 group-hover:text-slate-500'}`}>
            <ChevronDown size={16} strokeWidth={2.5} />
          </div>
        </button>

        {isOpen && (
          <div className="absolute w-full top-full left-0 bg-white border-x border-b border-teal-500 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.25)] rounded-b-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 z-[110]">
            <div className="max-h-[200px] md:max-h-[250px] overflow-y-auto p-1.5 space-y-1 scrollbar-hide">
              <div className="h-[1px] w-full bg-slate-50 mb-1" />
              {normalizedOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => { onChange(option.value); setIsOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-200 ${
                    value === option.value 
                      ? 'bg-teal-50 text-teal-700' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'
                  }`}
                >
                  <span className="tracking-tight">{option.label}</span>
                  {value === option.value && (
                    <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/30">
                       <Check size={10} strokeWidth={4} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {helperText && !isOpen && (
        <p className="mt-2 text-[8px] md:text-[9px] text-slate-300 font-bold tracking-widest italic ml-2 leading-relaxed uppercase opacity-60 animate-in fade-in duration-1000">
          {helperText}
        </p>
      )}
    </div>
  );
};
