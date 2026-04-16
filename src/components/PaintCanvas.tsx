import React, { useRef, useState, useCallback, useEffect } from 'react';

interface PaintCanvasProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function PaintCanvas({ containerRef }: PaintCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  // Resize canvas to match hero section
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Save current drawing
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (tempCtx) {
      tempCtx.drawImage(canvas, 0, 0);
    }

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.drawImage(tempCanvas, 0, 0, rect.width, rect.height);
    }
  }, [containerRef]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    // Evita seleção de texto globalmente enquanto o usuário estiver ativamente pintando
    if (isPainting) {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    } else {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    }
    return () => {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, [isPainting]);

  const getCanvasPoint = (e: React.PointerEvent | React.MouseEvent | React.TouchEvent | PointerEvent | MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.PointerEvent).clientX;
      clientY = (e as React.PointerEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const drawStroke = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = 'rgba(255, 140, 0, 0.07)';
    ctx.lineWidth = 44;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = 'source-over';
    ctx.stroke();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isEnabled) return;
    
    // Captura o ponteiro para que os eventos não sejam passados para os botões embaixo
    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);

    setIsPainting(true);
    const point = getCanvasPoint(e);
    if (point) {
      lastPoint.current = point;
      drawStroke(point, point);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPainting || !isEnabled) return;

    const point = getCanvasPoint(e);
    if (point && lastPoint.current) {
      drawStroke(lastPoint.current, point);
      lastPoint.current = point;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsPainting(false);
    lastPoint.current = null;
    
    const target = e.target as HTMLElement;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
  };

  const handleDisable = () => {
    setIsEnabled(false);
    setIsPainting(false);
    lastPoint.current = null;
    clearCanvas();
  };

  const handleEnable = () => {
    setIsEnabled(true);
  };

  return (
    <>
      {/* Event Capture Layer — behind interactive elements */}
      <div
        className={`absolute inset-0 z-0 ${!isEnabled ? 'pointer-events-none' : ''}`}
        style={{ touchAction: isEnabled ? 'none' : 'auto' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />

      {/* Canvas layer — visual only, pointer-events-none always so it never blocks clicks */}
      <canvas
        ref={canvasRef}
        className={`paint-canvas absolute inset-0 z-20 pointer-events-none ${isPainting ? 'painting' : ''}`}
      />

      {/* Controls — always visible at top-right */}
      <div className="absolute top-24 right-4 z-30 flex flex-col gap-2">
        {isEnabled ? (
          <>
            <button
              onClick={clearCanvas}
              className="bg-neutral-900/50 backdrop-blur-sm text-white text-sm font-bold w-9 h-9 rounded-full hover:bg-neutral-900/70 transition-all shadow-lg border border-white/10 flex items-center justify-center"
              title="Limpar pintura"
            >
              🧹
            </button>
            <button
              onClick={handleDisable}
              className="bg-neutral-900/50 backdrop-blur-sm text-white text-sm font-bold w-9 h-9 rounded-full hover:bg-neutral-900/70 transition-all shadow-lg border border-white/10 flex items-center justify-center"
              title="Desativar pincel"
            >
              ✕
            </button>
          </>
        ) : (
          <button
            onClick={handleEnable}
            className="bg-secondary-500/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-2 rounded-full hover:bg-secondary-500 transition-all shadow-lg border border-white/20 flex items-center gap-2 animate-pulse"
            title="Ativar pincel para pintar"
          >
            <BrushIcon />
            <span className="hidden sm:inline">Pintar</span>
          </button>
        )}
      </div>

      {/* Bottom hint — only when brush is enabled */}
      {isEnabled && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-neutral-900/50 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 animate-pulse">
            <BrushIcon />
            <span>Arraste para pintar!</span>
          </div>
        </div>
      )}
    </>
  );
}

/** Inline SVG paint roller icon (orange & black, matching brand) */
function BrushIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="2" width="14" height="7" rx="3" fill="#FF8C00" stroke="#fff" strokeWidth="1.5" />
      <path d="M12 9V13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="9" y="13" width="6" height="9" rx="2" fill="#FF8C00" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}
