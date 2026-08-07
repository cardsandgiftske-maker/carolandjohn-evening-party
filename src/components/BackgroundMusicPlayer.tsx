import React, { useEffect } from 'react';
import { playBackgroundMusic } from '../lib/audioManager';

interface BackgroundMusicPlayerProps {
  autoPlayTriggered?: boolean;
}

export const BackgroundMusicPlayer: React.FC<BackgroundMusicPlayerProps> = ({ autoPlayTriggered = false }) => {

  useEffect(() => {
    if (autoPlayTriggered) {
      playBackgroundMusic();
    }
  }, [autoPlayTriggered]);

  useEffect(() => {
    // Backup listener: On first user interaction anywhere on document, trigger music if not playing
    const handleGesture = () => {
      playBackgroundMusic();
    };

    window.addEventListener('click', handleGesture, { once: true });
    window.addEventListener('touchstart', handleGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };
  }, []);

  return null;
};
