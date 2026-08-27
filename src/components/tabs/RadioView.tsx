import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RadioStation } from '../../types';
import { RADIO_STATIONS } from '../../data/portfolioData';
import { startRadioPlayback, stopRadioPlayback, playPipboyClick, playFanfare } from '../../utils/audio';
import { Radio as RadioIcon, Play, Square, Volume2, Disc, Waves, Music } from 'lucide-react';

interface RadioViewProps {
  soundEnabled: boolean;
}

export const RadioView: React.FC<RadioViewProps> = ({ soundEnabled }) => {
  const [selectedStationId, setSelectedStationId] = useState<string>(RADIO_STATIONS[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const selectedStation =
    RADIO_STATIONS.find(s => s.id === selectedStationId) || RADIO_STATIONS[0];

  useEffect(() => {
    if (isPlaying && soundEnabled) {
      startRadioPlayback(selectedStationId);
    } else {
      stopRadioPlayback();
    }
    return () => {
      stopRadioPlayback();
    };
  }, [isPlaying, soundEnabled, selectedStationId]);

  const handleSelectStation = (stationId: string) => {
    playPipboyClick(1100, 0.04);
    setSelectedStationId(stationId);
    setIsPlaying(true);
  };

  const togglePlayback = () => {
    playPipboyClick();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full h-full p-4 md:p-6 overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full max-w-5xl mx-auto items-start">
        {/* Left Column: Station Selector */}
        <div className="lg:col-span-5 flex flex-col space-y-2 border border-[#1aff80]/30 p-3 bg-[#011406]/50">
          <div className="text-xs font-bold text-[#1aff80]/70 tracking-widest pb-1 border-b border-[#1aff80]/20 flex justify-between">
            <span>FREQUENCY</span>
            <span>STATION NAME</span>
          </div>

          <div className="space-y-1.5">
            {RADIO_STATIONS.map((station) => {
              const isSelected = station.id === selectedStationId;
              return (
                <button
                  key={station.id}
                  id={`radio-station-${station.id}`}
                  onClick={() => handleSelectStation(station.id)}
                  className={`w-full flex items-center justify-between p-2.5 text-left font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#1aff80] text-black border-[#1aff80] shadow-[0_0_10px_#1aff80]'
                      : 'border-transparent hover:border-[#1aff80]/40 text-[#1aff80] hover:bg-[#1aff80]/10'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <RadioIcon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{station.name}</span>
                  </div>
                  <span className="text-[10px] font-mono shrink-0 ml-2">
                    {station.frequency}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tuner Status */}
          <div className="pt-3 border-t border-[#1aff80]/20 flex justify-between items-center text-xs text-[#1aff80]/70">
            <span>ANTENNA: EXTENDED</span>
            <span className="text-[#50ff9c] font-bold">
              {isPlaying && soundEnabled ? 'RECEIVING SIGNAL' : 'STANDBY'}
            </span>
          </div>
        </div>

        {/* Right Column: Audio Spectrum Visualizer & Station Card */}
        <div className="lg:col-span-7 flex flex-col border border-[#1aff80]/30 p-5 bg-[#011406]/50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#50ff9c] tracking-wide flex items-center gap-2">
                <Disc className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
                <span>{selectedStation.name}</span>
              </h3>
              <div className="text-xs text-[#1aff80]/70 tracking-wider mt-0.5">
                GENRE: {selectedStation.genre}
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold bg-[#1aff80]/20 px-2 py-1 border border-[#1aff80]/40 text-[#50ff9c]">
                {selectedStation.frequency}
              </span>
            </div>
          </div>

          <div className="w-full h-[1.5px] bg-[#1aff80] shadow-[0_0_6px_#1aff80] my-3" />

          {/* Audio Waveform / Spectrum Visualizer */}
          <div
            className="h-28 bg-[#001708] border border-[#1aff80]/30 flex items-end justify-center gap-1.5 p-3 relative overflow-hidden my-2"
            aria-hidden="true"
          >
            {Array.from({ length: 24 }).map((_, idx) => (
              <motion.div
                key={idx}
                className="flex-1 bg-[#1aff80] shadow-[0_0_6px_#1aff80]"
                animate={
                  isPlaying && soundEnabled
                    ? {
                        height: [
                          `${Math.max(10, Math.sin((idx + 1) * 0.8) * 80 + 20)}%`,
                          `${Math.max(10, Math.cos((idx + 2) * 1.1) * 90 + 10)}%`,
                          `${Math.max(10, (idx % 5) * 18 + 15)}%`,
                        ],
                      }
                    : { height: '8%' }
                }
                transition={{
                  repeat: Infinity,
                  duration: 0.35 + (idx % 4) * 0.1,
                  ease: 'easeInOut',
                  repeatType: 'reverse',
                }}
              />
            ))}
          </div>

          <p className="text-xs sm:text-sm text-[#1aff80]/90 leading-relaxed font-mono mt-3 mb-4">
            {selectedStation.description}
          </p>

          {/* Controls Bar */}
          <div className="mt-auto pt-4 border-t border-[#1aff80]/20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#1aff80]/80">
              <Volume2 className="w-4 h-4 text-[#50ff9c]" aria-hidden="true" />
              <span>SYNTHESIZER: WEB AUDIO API</span>
            </div>

            <button
              id="toggle-playback-btn"
              aria-label={isPlaying ? `Mute ${selectedStation.name}` : `Play broadcast for ${selectedStation.name}`}
              onClick={togglePlayback}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1aff80] text-black font-bold text-xs tracking-wider hover:bg-white transition-colors cursor-pointer shadow-[0_0_10px_#1aff80]"
            >
              {isPlaying ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-black" aria-hidden="true" />
                  <span>MUTE STATION</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-black" aria-hidden="true" />
                  <span>PLAY BROADCAST</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
