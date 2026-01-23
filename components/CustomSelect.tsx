
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, openUp: false });
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const opts = options.map(o => typeof o === 'string' ? { label: o, value: o } : o);
  const current = opts.find(o => o.value === value);

  const updateCoords = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = Math.min(opts.length * 56 + 16, 250); // Estimated max height
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUp = spaceBelow < dropdownHeight && rect.top > dropdownHeight;

      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        openUp: openUp
      });
    }
  };

  useLayoutEffect(() => {
    if (open) {
      updateCoords();
      window.addEventListener('scroll', updateCoords, true);
      window.addEventListener('resize', updateCoords);
    }
    return () => {
      window.removeEventListener('scroll', updateCoords, true);
      window.removeEventListener('resize', updateCoords);
    };
  }, [open]);

  useEffect(() => {
    const handleOutsideInteraction = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        (containerRef.current && containerRef.current.contains(target)) ||
        (portalRef.current && portalRef.current.contains(target))
      ) {
        return;
      }
      setOpen(false);
    };

    if (open) {
      document.addEventListener('pointerdown', handleOutsideInteraction);
    }
    return () => document.removeEventListener('pointerdown', handleOutsideInteraction);
  }, [open]);

  const dropdownMenu = open && createPortal(
    <div 
      ref={portalRef}
      className={`fixed z-[99999] bg-white/95 backdrop-blur-xl border border-slate-200/50 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)] overflow-hidden animate-dropdown-reveal origin-top`}
      style={{ 
        top: coords.openUp ? `${coords.top - 6}px` : `${coords.top + (containerRef.current?.offsetHeight || 50) + 6}px`, 
        left: `${coords.left}px`, 
        width: `${coords.width}px`,
        transform: coords.openUp ? 'translateY(-100%)' : 'none',
        transformOrigin: coords.openUp ? 'bottom center' : 'top center'
      }}
    >
      <div className="max-h-[220px] md:max-h-[250px] overflow-y-auto p-1.5 md:p-2 scrollbar-hide overscroll-contain">
        {opts.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange(o.value);
              setOpen(false);
            }}
            className={`w-full flex items-center justify-between px-5 md:px-6 py-3 md:py-4 rounded-full text-[12px] md:text-[13px] font-bold transition-all cursor-pointer mb-1 last:mb-0 text-left outline-none ${
              value === o.value 
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100'
            }`}
          >
            <span className="truncate pr-4">{o.label}</span>
            {value === o.value && <Check size={12} strokeWidth={4} className="shrink-0" />}
          </button>
        ))}
      </div>
    </div>,
    document.body
  );

  const isCompleted = !!value;

  return (
    <div className="relative w-full text-left" ref={containerRef}>
      {label && (
        <label className="block text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] text-slate-500 mb-1.5 md:mb-2.5 ml-1">
          {label}
        </label>
      )}
      
      <button 
        type="button"
        onClick={() => setOpen(!open)}
        className={`group relative w-full h-[48px] md:h-[60px] flex items-center justify-between px-5 md:px-6 bg-white border-2 rounded-full cursor-pointer transition-all duration-300 outline-none ${
          open 
            ? 'border-slate-900 ring-4 ring-slate-900/5 shadow-sm' 
            : isCompleted 
              ? 'border-slate-900 ring-1 ring-slate-900/5 shadow-sm' 
              : 'border-slate-100 hover:border-slate-300'
        }`}
      >
        <span className={`text-[12px] md:text-[13px] font-bold tracking-tight truncate ${!value ? 'text-slate-400' : 'text-slate-900'}`}>
          {current ? current.label : placeholder}
        </span>
        <div className={`transition-all duration-500 flex items-center justify-center ${open ? 'rotate-180 text-slate-900 scale-110' : isCompleted ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-900'}`}>
          <ChevronDown size={14} md:size={16} strokeWidth={2.5} />
        </div>
      </button>

      {dropdownMenu}
    </div>
  );
};
