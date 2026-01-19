
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
      className={`relative w-full transition-all duration-300 ${isOpen ? 'z-[100]' : 'z-10'}`} 
      ref={containerRef}
    >
      {label && (
        <label className="block text-[10px] font-[800] uppercase tracking-[0.3em] text-slate-400 mb-3 ml-2 transition-colors duration-300">
          {label}
        </label>
      )}
      
      <div className="relative group/select">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-6 md:px-7 py-[1.1rem] md:py-[1.25rem] border transition-all duration-500 text-left relative ${
            isOpen 
              ? 'bg-white border-teal-500/60 rounded-t-[1.5rem] rounded-b-none shadow-[0_15px_40px_-10px_rgba(20,184,166,0.15)]' 
              : 'bg-slate-50/50 border-slate-200/60 rounded-[1.5rem] hover:border-slate-300 hover:bg-white shadow-sm'
          }`}
        >
          <span className={`block truncate text-[14px] md:text-[14.5px] font-semibold tracking-tight transition-colors duration-300 ${!value ? 'text-slate-400' : 'text-slate-900'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className={`p-1.5 rounded-full transition-all duration-500 ${isOpen ? 'bg-teal-50 text-teal-600 rotate-180' : 'bg-transparent text-slate-300 group-hover/select:text-slate-500'}`}>
            <ChevronDown size={16} strokeWidth={3} />
          </div>
        </button>

        {isOpen && (
          <div className="absolute w-full top-full left-0 bg-white border-x border-b border-teal-500/60 rounded-b-[1.75rem] shadow-[0_40px_80px_-20px_rgba(15,23,42,0.28)] overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 origin-top ease-out z-[110]">
            <div className="max-h-[240px] md:max-h-[280px] overflow-y-auto scrollbar-hide p-2 pt-0 space-y-1">
              <div className="h-[1px] w-full bg-slate-100/80 mb-1.5" />
              
              {normalizedOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 md:px-5 py-3.5 md:py-4 text-[13.5px] md:text-[14px] font-semibold rounded-xl transition-all duration-300 group/item ${
                    value === option.value 
                      ? 'bg-teal-500/10 text-teal-700' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:pl-6 md:hover:pl-7'
                  }`}
                >
                  <span className="tracking-tight">{option.label}</span>
                  {value === option.value && (
                    <div className="w-5 md:w-5.5 h-5 md:h-5.5 bg-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/30">
                      <Check size={11} md:size={12} strokeWidth={4} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {helperText && !isOpen && (
        <p className="mt-3 text-[10px] text-slate-400 font-[700] tracking-wider italic ml-2 opacity-60 leading-relaxed animate-in fade-in duration-500">
          {helperText}
        </p>
      )}
    </div>
  );
};
