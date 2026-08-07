// Singleton Audio Manager for reliable background music playback
let bgAudio: HTMLAudioElement | null = null;

export const getAudioInstance = (): HTMLAudioElement => {
  if (!bgAudio) {
    bgAudio = new Audio();
    // Try local public file first, fallback to CDN if needed
    bgAudio.src = '/nakei-nairobi.mp3';
    bgAudio.loop = true;
    bgAudio.volume = 0.7;
    bgAudio.preload = 'auto';

    bgAudio.onerror = () => {
      if (bgAudio && !bgAudio.src.includes('archive.org')) {
        console.warn('Local audio failed, switching to fallback CDN URL');
        bgAudio.src = 'https://archive.org/download/08-faux-pas/04%20-%20Nakei%20Nairobi.mp3';
        bgAudio.load();
      }
    };
  }
  return bgAudio;
};

export const playBackgroundMusic = (): Promise<void> => {
  const audio = getAudioInstance();
  if (audio.paused) {
    return audio.play().catch((err) => {
      console.warn('Audio play request blocked or postponed:', err);
    });
  }
  return Promise.resolve();
};

export const pauseBackgroundMusic = (): void => {
  if (bgAudio && !bgAudio.paused) {
    bgAudio.pause();
  }
};

export const toggleBackgroundMusic = (): boolean => {
  const audio = getAudioInstance();
  if (audio.paused) {
    audio.play().catch(console.warn);
    return true;
  } else {
    audio.pause();
    return false;
  }
};

export const isMusicPlaying = (): boolean => {
  return bgAudio ? !bgAudio.paused : false;
};
