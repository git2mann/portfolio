"use client";
import React from "react";

export default function ModalBlurOverlay() {
  const [modalOpen, setModalOpen] = React.useState(false);
  React.useEffect(() => {
    const handler = (e: any) => setModalOpen(!!e.detail);
    window.addEventListener('artwork-modal-toggle', handler);
    return () => window.removeEventListener('artwork-modal-toggle', handler);
  }, []);
  if (!modalOpen) return null;
  // zIndex: 90 ensures overlay is below modal (z-100) but above page content
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, pointerEvents: 'none', backdropFilter: 'blur(24px) brightness(0.7)', WebkitBackdropFilter: 'blur(24px) brightness(0.7)', background: 'rgba(0,0,0,0.25)', transition: 'backdrop-filter 0.3s' }} />
  );
}