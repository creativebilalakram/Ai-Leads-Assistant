
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
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const opts = options.map(o => typeof o === 'string' ? { label: o, value: o } : o);
  const current = opts.find(o => o.value === value);

  const updateCoords = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
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
    const handleOutsideInteraction = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      // Don't close if clicking inside the main toggle or the portal content
      if (
        (containerRef.current && containerRef.current.contains(target)) ||
        (portalRef.current && portalRef.current.contains(target))
      ) {
        return;
      }
      setOpen(false);
    };

    if (open) {
      // Use 'pointerdown' for better cross-device support
      document.addEventListener('pointerdown', handleOutsideInteraction);
    }
    return () => document.removeEventListener('pointerdown', handleOutsideInteraction);
  }, [open]);

  const dropdownMenu = open && createPortal(
    <div 
      ref={portalRef}
      className="fixed z-[99999] bg-white border border-slate-100 rounded-2xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.4)] overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200"
      style={{ 
        top: `${coords.top + 8}px`, 
        left: `${coords.left}px`, 
        width: `${coords.width}px` 
      }}
    >
      <div className="max-h-[250px] overflow-y-auto p-2 scrollbar-hide overscroll-contain">
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
            className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-[14px] font-bold transition-all cursor-pointer mb-1 last:mb-0 text-left outline-none ${
              value === o.value 
                ? 'bg-slate-900 text-white shadow-xl translate-x-1' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100'
            }`}
          >
            <span className="truncate pr-4">{o.label}</span>
            {value === o.value && <Check size={16} strokeWidth={4} className="shrink-0" />}
          </button>
        ))}
      </div>
    </div>,
    document.body
  );

  return (
    <div className="relative w-full text-left" ref={containerRef}>
      {label && (
        <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2.5 ml-1">
          {label}
        </label>
      )}
      
      <button 
        type="button"
        onClick={() => setOpen(!open)}
        className={`group relative w-full h-[52px] md:h-[58px] flex items-center justify-between px-5 bg-white border-2 rounded-2xl cursor-pointer transition-all duration-300 outline-none ${
          open ? 'border-slate-900 ring-8 ring-slate-900/5 translate-y-[-2px]' : 'border-slate-100 hover:border-slate-300'
        }`}
      >
        <span className={`text-[14px] font-bold tracking-tight truncate ${!value ? 'text-slate-300' : 'text-slate-900'}`}>
          {current ? current.label : placeholder}
        </span>
        <div className={`transition-all duration-300 flex items-center justify-center ${open ? 'rotate-180 text-slate-900' : 'text-slate-300'}`}>
          <ChevronDown size={18} strokeWidth={2.5} />
        </div>
      </button>

      {dropdownMenu}
    </div>
  );
};
