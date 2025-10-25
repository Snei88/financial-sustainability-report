import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

function isFullscreen() {
  // @ts-ignore
  return !!(document.fullscreenElement || document.webkitFullscreenElement);
}

async function requestFs(el: Element) {
  // @ts-ignore
  const req = el.requestFullscreen || el.webkitRequestFullscreen || (el as any).msRequestFullscreen;
  if (req) await req.call(el);
}

async function exitFs() {
  // @ts-ignore
  const exit = document.exitFullscreen || document.webkitExitFullscreen || (document as any).msExitFullscreen;
  if (exit) await exit.call(document);
}

type Props = {
  /** Si lo pasas, hace fullscreen de ese contenedor; si no, de toda la página */
  targetId?: string;
  className?: string;
};

const FullscreenToggle: React.FC<Props> = ({ targetId, className }) => {
  const [active, setActive] = useState(isFullscreen());

  const targetEl = useMemo(() => {
    if (targetId) return document.getElementById(targetId) ?? document.documentElement;
    return document.documentElement;
  }, [targetId]);

  const toggle = useCallback(async () => {
    if (isFullscreen()) {
      await exitFs();
    } else if (targetEl) {
      await requestFs(targetEl);
    }
  }, [targetEl]);

  useEffect(() => {
    const onChange = () => setActive(isFullscreen());
    document.addEventListener("fullscreenchange", onChange);
    // @ts-ignore
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      // @ts-ignore
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  // Atajo: Ctrl/Cmd + Shift + P para entrar/salir. Esc sale (nativo).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isToggle = (e.key === "p" || e.key === "P") && (e.ctrlKey || e.metaKey) && e.shiftKey;
      if (isToggle) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  // Clase global opcional para ajustar estilos en presentación
  useEffect(() => {
    document.documentElement.classList.toggle("presentation-mode", active);
  }, [active]);

  return (
    <button
      type="button"
      onClick={toggle}
      title={active ? "Salir de presentación (Esc)" : "Entrar en presentación (Ctrl/Cmd + Shift + P)"}
      aria-label={active ? "Salir de presentación" : "Entrar en presentación"}
      className={
        "fixed z-50 top-4 right-4 rounded-full shadow-lg border border-blue-100 bg-white/90 hover:bg-white backdrop-blur px-3 py-2 " +
        "transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 " +
        (className ?? "")
      }
    >
      {active ? <Minimize2 className="text-blue-700" size={20} /> : <Maximize2 className="text-blue-700" size={20} />}
    </button>
  );
};

export default FullscreenToggle;
