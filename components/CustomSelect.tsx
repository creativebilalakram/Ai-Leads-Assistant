
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
  placeholder = "Select an option",
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
    <div 
      className={`relative w-full transition-all duration-500 ${isOpen ? 'z-[1000]' : 'z-10'}`} 
      ref={containerRef}
    >
      {label && (
        <label className={`block text-[9px] md:text-[10px] font-[800] uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-3 ml-2 transition-all duration-500 ${isOpen ? 'text-teal-600' : 'text-slate-400'}`}>
          {label}
        </label>
      )}
      
      <div className="relative group/select">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-6 md:px-8 py-3.5 md:py-5 border transition-all duration-500 text-left relative active:scale-[0.99] ${
            isOpen 
              ? 'bg-white border-teal-500/60 rounded-t-[1.25rem] md:rounded-t-[1.75rem] rounded-b-none shadow-xl ring-[8px] ring-teal-500/5' 
              : 'bg-slate-50/50 border-slate-200/60 rounded-[1.25rem] md:rounded-[1.75rem] hover:border-slate-300 hover:bg-white shadow-sm'
          }`}
        >
          <span className={`block truncate text-sm md:text-[15px] font-semibold tracking-tight transition-colors duration-300 ${!value ? 'text-slate-400' : 'text-slate-900'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className={`p-1 rounded-full transition-all duration-500 ${isOpen ? 'bg-teal-50 text-teal-600 rotate-180' : 'bg-transparent text-slate-300 group-hover/select:text-slate-500'}`}>
            <ChevronDown size={16} md:size={18} strokeWidth={2.5} />
          </div>
        </button>

        {isOpen && (
          <div className="absolute w-full top-full left-0 bg-white border-x border-b border-teal-500/60 rounded-b-[1.25rem] md:rounded-b-[2rem] shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 origin-top ease-out z-[1100]">
            <div className="max-h-[220px] md:max-h-[320px] overflow-y-auto scrollbar-hide p-2 space-y-1">
              <div className="h-[1px] w-full bg-slate-50 mb-1" />
              
              {normalizedOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-xs md:text-[14px] font-semibold rounded-lg md:rounded-xl transition-all duration-300 group/item ${
                    value === option.value 
                      ? 'bg-teal-500/10 text-teal-700' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
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
        <p className="mt-2.5 md:mt-4 text-[9px] md:text-[10px] text-slate-400 font-[700] tracking-wider italic ml-3 opacity-60 leading-relaxed animate-in fade-in duration-700">
          {helperText}
        </p>
      )}
    </div>
  );
};
