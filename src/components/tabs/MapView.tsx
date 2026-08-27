import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MAP_LOCATIONS, PROFILE } from '../../data/portfolioData';
import { playPipboyClick, playGeigerClick, playFanfare } from '../../utils/audio';
import { MapPin, Navigation, Compass, Radio, ShieldCheck, Crosshair } from 'lucide-react';

export const MapView: React.FC = () => {
  const [selectedLocId, setSelectedLocId] = useState<string>(MAP_LOCATIONS[0].id);
  const [fastTraveling, setFastTraveling] = useState(false);

  const selectedLoc = MAP_LOCATIONS.find(l => l.id === selectedLocId) || MAP_LOCATIONS[0];

  const handleFastTravel = () => {
    playGeigerClick();
    setFastTraveling(true);
    setTimeout(() => {
      playFanfare();
      setFastTraveling(false);
    }, 1200);
  };

  return (
    <div className="w-full h-full p-4 md:p-6 overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full max-w-6xl mx-auto items-start">
        {/* Left Radar Map Area */}
        <div className="lg:col-span-7 flex flex-col border border-[#1aff80]/30 p-4 bg-[#011406]/60 relative overflow-hidden min-h-[380px]">
          {/* Radar Header */}
          <div className="flex justify-between items-center text-xs pb-2 border-b border-[#1aff80]/20 z-10">
            <span className="font-bold text-[#50ff9c] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              GLOBAL WASTELAND RADAR // SECTOR INDONESIA
            </span>
            <span className="font-mono text-[11px] text-[#1aff80]/70">LAT 6.2088° S, LON 106.8456° E</span>
          </div>

          {/* Radar Canvas with Grid Lines and Pulsing Sweep */}
          <div className="relative flex-1 my-3 flex items-center justify-center min-h-[280px] border border-[#1aff80]/15 bg-[#001405]/70">
            {/* Grid Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] bg-[#1aff80]/20" />
              <div className="absolute h-full w-[1px] bg-[#1aff80]/20" />
            </div>

            {/* Concentric Radar Rings */}
            <div className="absolute w-[120px] h-[120px] rounded-full border border-[#1aff80]/20 pointer-events-none" />
            <div className="absolute w-[200px] h-[200px] rounded-full border border-[#1aff80]/20 pointer-events-none" />
            <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-[#1aff80]/15 pointer-events-none" />

            {/* Radar Sweeping Beam */}
            <motion.div
              className="absolute w-[280px] h-[280px] rounded-full pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, rgba(26,255,128,0.2) 0deg, transparent 60deg)',
              }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            />

            {/* Interactive Map Nodes */}
            <div className="absolute inset-0 p-6 flex flex-wrap items-center justify-around z-20">
              {MAP_LOCATIONS.map((loc, idx) => {
                const isSelected = loc.id === selectedLocId;
                // Distribute positions across radar
                const offsets = [
                  { top: '48%', left: '46%' }, // Jakarta HQ
                  { top: '30%', left: '55%' }, // Kartel Daun
                  { top: '65%', left: '38%' }, // Hacktiv8
                  { top: '60%', left: '75%' }, // UKDW Yogyakarta
                  { top: '15%', left: '25%' }, // AWS Cloud Relay
                ];
                const pos = offsets[idx] || { top: '50%', left: '50%' };

                return (
                  <button
                    key={loc.id}
                    id={`map-node-${loc.id}`}
                    aria-label={`Select map location: ${loc.name}`}
                    onClick={() => {
                      playPipboyClick(1200, 0.04);
                      playGeigerClick();
                      setSelectedLocId(loc.id);
                    }}
                    style={{ position: 'absolute', top: pos.top, left: pos.left }}
                    className={`transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all ${
                      isSelected ? 'scale-110 z-30' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-full border transition-all ${
                        isSelected
                          ? 'bg-[#1aff80] text-black border-[#1aff80] shadow-[0_0_12px_#1aff80] animate-bounce'
                          : 'bg-[#00220d] text-[#1aff80] border-[#1aff80]/60 group-hover:border-[#1aff80]'
                      }`}
                    >
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span
                      className={`text-[9px] font-mono font-bold whitespace-nowrap mt-1 px-1.5 py-0.2 ${
                        isSelected
                          ? 'bg-black text-[#50ff9c] border border-[#1aff80]'
                          : 'text-[#1aff80]/80 bg-black/60'
                      }`}
                    >
                      {loc.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Fast Travel Overlay */}
            {fastTraveling && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-40 text-[#50ff9c] font-mono space-y-2"
              >
                <div className="w-8 h-8 border-2 border-[#1aff80] border-t-transparent rounded-full animate-spin" />
                <div className="text-sm font-bold tracking-widest">FAST TRAVELING TO {selectedLoc.name}...</div>
                <div className="text-xs text-[#1aff80]/70">CALIBRATING PIP-BOY COMPASS</div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Location Details Panel */}
        <div className="lg:col-span-5 flex flex-col border border-[#1aff80]/30 p-5 bg-[#011406]/50">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#50ff9c] bg-[#1aff80]/20 px-2 py-0.5 border border-[#1aff80]/30">
                {selectedLoc.type}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#50ff9c] tracking-wide mt-1.5">
                {selectedLoc.name}
              </h3>
            </div>
            <div className="text-right text-xs font-mono text-[#1aff80]/80">
              <div>{selectedLoc.distance}</div>
              <div className="text-[10px] text-[#50ff9c]">{selectedLoc.dangerLevel}</div>
            </div>
          </div>

          <div className="w-full h-[1.5px] bg-[#1aff80] shadow-[0_0_6px_#1aff80] my-3" />

          <div className="space-y-2 text-xs font-mono mb-4">
            <div className="flex justify-between text-[#1aff80]/70 border-b border-[#1aff80]/15 pb-1">
              <span>COORDINATES:</span>
              <span className="text-[#50ff9c]">{selectedLoc.coordinates}</span>
            </div>
            <div className="flex justify-between text-[#1aff80]/70 border-b border-[#1aff80]/15 pb-1">
              <span>OPERATOR STATUS:</span>
              <span className="text-[#50ff9c]">ACCESSIBLE</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#1aff80]/90 leading-relaxed font-mono mb-4">
            {selectedLoc.description}
          </p>

          {/* Fast travel button */}
          <div className="mt-auto pt-4 border-t border-[#1aff80]/20 flex justify-end">
            <button
              id="fast-travel-btn"
              aria-label={`Fast travel to ${selectedLoc.name}`}
              onClick={handleFastTravel}
              disabled={fastTraveling}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1aff80] text-black font-bold text-xs tracking-wider hover:bg-white transition-colors cursor-pointer shadow-[0_0_10px_#1aff80]"
            >
              <Navigation className="w-4 h-4" aria-hidden="true" />
              <span>FAST TRAVEL TO LOCATION</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
