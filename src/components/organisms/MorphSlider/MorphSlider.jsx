import { useEffect, useRef, useState, useCallback } from 'react';
import { MorphEngine } from './morphEngine';
import { ControlesSlider } from '../../molecules/ControlesSlider/ControlesSlider';
import { IndicadoresSlider } from '../../molecules/IndicadoresSlider/IndicadoresSlider';

import './MorphSlider.css';

// Slider con transiciones WebGL (adaptado de React Bits MorphSlider)
// items: [{ image, caption? }] — debe ser una referencia estable (useMemo); si cambia se recrea el motor WebGL
export default function MorphSlider({
  items = [],
  startIndex = 0,
  transition = 'melt',
  duration = 1.1,
  ease = 'easeInOut',
  intensity = 0.55,
  scale = 2.4,
  aberration = 0.35,
  drift = 0.4,
  autoplay = false,
  autoplayDelay = 4,
  loop = true,
  radius = 16,
  overlayColor = '#000000',
  showCaptions = true,
  showControls = true,
  showIndicators = true,
  className = '',
  ...props
}) {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const [index, setIndex] = useState(startIndex);
  const [hovering, setHovering] = useState(false);

  // El motor lee las opciones desde este ref; se sincroniza antes de crear el motor (efectos corren en orden)
  const optsRef = useRef(null);
  useEffect(() => {
    optsRef.current = { transition, duration, ease, intensity, scale, aberration, drift, overlayColor, loop };
  });

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const engine = new MorphEngine(containerRef.current, {
      items,
      startIndex,
      reducedMotion,
      dprCap: 2,
      getOptions: () => optsRef.current,
      onIndexChange: setIndex
    });
    engineRef.current = engine;
    setIndex(startIndex);

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [items, startIndex]);

  const handleNext = useCallback(() => engineRef.current?.next(), []);
  const handlePrev = useCallback(() => engineRef.current?.prev(), []);

  useEffect(() => {
    if (!autoplay || hovering) return undefined;
    const id = setTimeout(() => engineRef.current?.next(), Math.max(autoplayDelay, 1) * 1000);
    return () => clearTimeout(id);
  }, [autoplay, autoplayDelay, hovering, index]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    let startX = 0;
    let width = 1;
    let active = false;

    const onDown = e => {
      const rect = el.getBoundingClientRect();
      width = rect.width || 1;
      startX = e.clientX;
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      engineRef.current?.setPointer(px, 1 - py);
      active = engineRef.current?.beginDrag() ?? false;
      if (active && el.setPointerCapture) {
        try {
          el.setPointerCapture(e.pointerId);
        } catch {
          // el navegador no permite capturar el puntero: se ignora
        }
      }
    };
    const onMove = e => {
      if (!active) return;
      const ndx = (e.clientX - startX) / width;
      engineRef.current?.drag(ndx);
    };
    const onUp = () => {
      if (!active) return;
      active = false;
      engineRef.current?.endDrag();
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);

    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
    };
  }, []);

  const onKeyDown = useCallback(
    e => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    },
    [handleNext, handlePrev]
  );

  const irA = useCallback(
    i => {
      const engine = engineRef.current;
      if (!engine || i === index) return;
      engine.goTo(i > index ? 1 : -1);
    },
    [index]
  );

  const hasCaptions = items.some(item => item.caption);

  return (
    <div
      className={`morph-slider ${className}`.trim()}
      style={{
        borderRadius: `${radius}px`,
        '--ms-swap': `${(duration * 0.66).toFixed(3)}s`,
        '--ms-dot': `${(duration * 0.45).toFixed(3)}s`
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...props}
    >
      <div
        ref={containerRef}
        className="morph-slider-stage"
        role="group"
        aria-roledescription="carrusel"
        aria-label="Carrusel principal"
        tabIndex={0}
        onKeyDown={onKeyDown}
      />

      {showCaptions && hasCaptions && (
        <div className="morph-slider-caption" aria-live="polite">
          {items.map((item, i) =>
            item.caption ? (
              <span
                key={i}
                aria-hidden={i === index ? undefined : true}
                className={`morph-slider-caption-text ${i === index ? 'is-active' : ''}`}
              >
                {item.caption}
              </span>
            ) : null
          )}
        </div>
      )}

      {showControls && <ControlesSlider onAnterior={handlePrev} onSiguiente={handleNext} />}

      {showIndicators && <IndicadoresSlider total={items.length} activo={index} onSeleccionar={irA} />}
    </div>
  );
}
