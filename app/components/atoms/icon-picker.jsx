"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as IoIcons from 'react-icons/io5';
import * as GiIcons from 'react-icons/gi';

// Puedes añadir más paquetes aquí si lo deseas (p. ej. fi, ti, ri, si)
const ICON_MODULES = {
  fa: FaIcons,
  md: MdIcons,
  ai: AiIcons,
  bi: BiIcons,
  io: IoIcons,
  gi: GiIcons,
};

const INITIAL_LOAD = 150; // Cantidad de iconos a cargar inicialmente
const LOAD_MORE_STEP = 100; // Cantidad de iconos a cargar en cada carga adicional

export default function IconPicker({ label = 'Icono', name = 'icon', value = '', onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(INITIAL_LOAD);
  const gridRef = useRef(null);

  // Construir lista COMPLETA de iconos (sin loader, es muy rápido)
  const ALL_ICONS = useMemo(() => {
    const list = [];
    Object.entries(ICON_MODULES).forEach(([pack, mod]) => {
      Object.keys(mod).forEach((key) => {
        const comp = mod[key];
        // Filtrar sólo exports que son componentes (funciones/objetos)
        if (typeof comp === 'function' || typeof comp === 'object') {
          list.push({ id: `${pack}_${key}`, name: key, pack, component: comp });
        }
      });
    });
    return list;
  }, []);

  // Filtrar iconos basado en la búsqueda
  const filtered = useMemo(() => {
    return ALL_ICONS.filter((i) => {
      const q = query.toLowerCase();
      return (
        i.name.toLowerCase().includes(q) ||
        i.pack.toLowerCase().includes(q) ||
        `${i.pack}:${i.name}`.toLowerCase().includes(q)
      );
    });
  }, [ALL_ICONS, query]);

  // Si hay búsqueda, mostrar todos los resultados; si no, mostrar solo los primeros displayCount
  const displayedIcons = query ? filtered : filtered.slice(0, displayCount);

  // Detectar scroll para cargar más iconos
  useEffect(() => {
    if (!gridRef.current) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = gridRef.current;
      // Si está cerca del final, cargar más
      if (scrollHeight - scrollTop - clientHeight < 100 && !query && displayCount < filtered.length) {
        setDisplayCount((prev) => Math.min(prev + LOAD_MORE_STEP, filtered.length));
      }
    };

    const grid = gridRef.current;
    grid.addEventListener('scroll', handleScroll);
    return () => grid.removeEventListener('scroll', handleScroll);
  }, [query, displayCount, filtered.length]);

  // Resetear displayCount cuando se abre el panel
  useEffect(() => {
    if (open) {
      setDisplayCount(INITIAL_LOAD);
    }
  }, [open]);

  const handleSelect = (pack, iconName) => {
    const id = `${pack}_${iconName}`;
    // Enviar id (pack_icon) para evitar ambigüedades; mantenemos compatibilidad buscando también por name
    if (onChange) onChange({ target: { name, value: id } });
    setOpen(false);
  };

  // Soportar tanto el id nuevo (pack_name) como el antiguo (name)
  const SelectedIcon = ALL_ICONS.find((i) => i.id === value || i.name === value)?.component || null;

  return (
    <div className="mb-4 w-full">
      <label className="block mb-2 font-bold text-gray-700">{label}</label>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="flex items-center gap-2 rounded-xl h-10 border border-gray-300 shadow-md p-2 px-4 text-dark dark:text-white bg-white hover:bg-gray-50 transition-colors"
        >
          {SelectedIcon ? <SelectedIcon className="w-5 h-5" /> : <span className="text-sm text-gray-500">Seleccionar</span>}
          <span className="text-sm">{value || ''}</span>
        </button>

        <input
          type="hidden"
          name={name}
          value={value}
          onChange={(e) => onChange && onChange(e)}
          placeholder="o escribe el nombre del icono (p. ej. fa:FaCamera o FaCamera)"
          className="rounded-xl h-10 w-full border border-gray-300 shadow-md p-4 text-dark dark:text-white focus-visible:outline-0"
        />
      </div>

      {/* Panel expandible con animación fade in/out */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="w-full rounded-md border border-gray-200 bg-white p-4 shadow-lg">
          <input
            type="text"
            placeholder="Buscar iconos por nombre o pack (ej: fa, md)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full mb-4 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div
            ref={gridRef}
            className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 max-h-80 overflow-y-auto"
          >
            {displayedIcons.length > 0 ? (
              displayedIcons.map((ic) => {
                const IconComp = ic.component;
                return (
                  <button
                    key={ic.id}
                    type="button"
                    onClick={() => handleSelect(ic.pack, ic.name)}
                    className="flex flex-col items-center gap-1 rounded-md border border-gray-200 p-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    title={`${ic.pack}:${ic.name}`}
                  >
                    <IconComp className="w-6 h-6" />
                    <span className="text-xs text-gray-600 text-center truncate w-full">{ic.name}</span>
                  </button>
                );
              })
            ) : (
              <div className="col-span-full text-center py-4 text-gray-500">
                No se encontraron iconos
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
