import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InvSubTab, InventoryItem } from '../../types';
import { INVENTORY_ITEMS, PROFILE } from '../../data/portfolioData';
import { playPipboyClick, playFanfare } from '../../utils/audio';
import { Shield, Sword, HeartPulse, Disc, ExternalLink, Mail, Phone, Sparkles, X, ChevronRight } from 'lucide-react';

interface InvViewProps {
  subTab: InvSubTab;
}

export const InvView: React.FC<InvViewProps> = ({ subTab }) => {
  const filteredItems = INVENTORY_ITEMS.filter(item => item.category === subTab);
  const [selectedItemId, setSelectedItemId] = useState<string>(
    filteredItems[0]?.id || INVENTORY_ITEMS[0].id
  );
  const [mobileItemModalOpen, setMobileItemModalOpen] = useState(false);

  const selectedItem =
    INVENTORY_ITEMS.find(item => item.id === selectedItemId) || filteredItems[0] || INVENTORY_ITEMS[0];

  return (
    <div className="w-full h-full p-4 md:p-6 overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full max-w-5xl mx-auto items-start">
        {/* Left Column: Inventory List */}
        <div className="lg:col-span-5 flex flex-col space-y-2 border border-[#1aff80]/30 p-3 bg-[#011406]/50">
          <div className="text-xs font-bold text-[#1aff80]/70 tracking-widest pb-1 border-b border-[#1aff80]/20 flex justify-between">
            <span className="flex items-center gap-1.5">
              <span>ITEM NAME</span>
              <span className="lg:hidden text-[10px] text-[#50ff9c]/70">[TAP DETAILS]</span>
            </span>
            <div className="flex gap-4">
              <span>WT</span>
              <span>VAL</span>
            </div>
          </div>

          <div className="space-y-1.5 max-h-[450px] overflow-y-auto pr-1">
            {filteredItems.map((item) => {
              const isSelected = item.id === selectedItemId;
              return (
                <button
                  key={item.id}
                  id={`inv-item-${item.id}`}
                  onClick={() => {
                    playPipboyClick(1050, 0.03);
                    setSelectedItemId(item.id);
                    setMobileItemModalOpen(true);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 text-left font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#1aff80] text-black border-[#1aff80] shadow-[0_0_10px_#1aff80]'
                      : 'border-transparent hover:border-[#1aff80]/40 text-[#1aff80] hover:bg-[#1aff80]/10'
                  }`}
                >
                  <span className="truncate pr-2">{item.name}</span>
                  <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                    <span>{item.weight}</span>
                    <span>{item.value}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Carrying Capacity Footer */}
          <div className="pt-2 border-t border-[#1aff80]/20 flex justify-between text-xs text-[#1aff80]/70">
            <span>TOTAL WEIGHT: {PROFILE.weight} LBS</span>
            <span>CAPS: {PROFILE.caps}</span>
          </div>
        </div>

        {/* Right Column (Desktop inline): Item Inspection Card */}
        <div className="hidden lg:flex lg:col-span-7 flex-col border border-[#1aff80]/30 p-5 bg-[#011406]/50">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#50ff9c] tracking-wide">
                {selectedItem.name}
              </h3>
              <span className="text-xs text-[#1aff80]/70 tracking-wider">
                CATEGORY: {selectedItem.category} // {selectedItem.techType || 'GEAR'}
              </span>
            </div>

            <div className="text-right font-mono text-xs">
              <div className="text-[#50ff9c] font-bold">VAL: {selectedItem.value} CAPS</div>
              <div className="text-[#1aff80]/70">WT: {selectedItem.weight} LBS</div>
            </div>
          </div>

          {/* Condition Bar */}
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="text-[#1aff80]/70">CONDITION:</span>
            <div className="flex-1 h-2.5 bg-[#00220d] border border-[#1aff80]/40 p-0.5">
              <div
                className="h-full bg-[#1aff80] shadow-[0_0_4px_#1aff80]"
                style={{ width: `${selectedItem.condition}%` }}
              />
            </div>
            <span className="font-mono text-xs">{selectedItem.condition}%</span>
          </div>

          <div className="w-full h-[1.5px] bg-[#1aff80] shadow-[0_0_6px_#1aff80] my-3" />

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#1aff80]/90 leading-relaxed font-mono mb-4">
            {selectedItem.description}
          </p>

          {/* Effect attributes */}
          <div className="p-3 bg-[#1aff80]/10 border border-[#1aff80]/30 text-xs font-mono text-[#50ff9c] space-y-1">
            <div className="font-bold tracking-wider">[EQUIPMENT EFFECT]:</div>
            <div>{selectedItem.effect}</div>
          </div>

          {/* Action Trigger */}
          <div className="mt-5 pt-3 border-t border-[#1aff80]/20 flex justify-end">
            {selectedItem.actionUrl && (
              <a
                href={selectedItem.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open external link for ${selectedItem.name}`}
                onClick={() => playFanfare()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1aff80] text-black font-bold text-xs tracking-wider hover:bg-white transition-colors cursor-pointer shadow-[0_0_10px_#1aff80]"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span>{selectedItem.actionLabel || 'ACTIVATE ITEM'}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MODAL: ITEM DETAILS */}
      <AnimatePresence>
        {mobileItemModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs select-none lg:hidden">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 12 }}
              className="w-full max-w-md max-h-[90vh] flex flex-col bg-[#011406] border-2 border-[#1aff80] p-5 text-[#1aff80] font-mono shadow-[0_0_24px_rgba(26,255,128,0.5)] overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1aff80]/40 shrink-0">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#50ff9c] tracking-widest">
                  <span className="w-2 h-2 bg-[#1aff80] animate-pulse" />
                  <span>ITEM INSPECTION // {selectedItem.category}</span>
                </div>
                <button
                  id="close-item-modal"
                  onClick={() => {
                    playPipboyClick();
                    setMobileItemModalOpen(false);
                  }}
                  className="p-1 text-[#1aff80]/70 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto py-3 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-[#50ff9c]">
                      {selectedItem.name}
                    </h3>
                    <span className="text-xs text-[#1aff80]/70">
                      {selectedItem.techType || 'STANDARD ISSUE'}
                    </span>
                  </div>
                  <div className="text-right text-xs">
                    <div className="text-[#50ff9c] font-bold">VAL: {selectedItem.value}</div>
                    <div className="text-[#1aff80]/70">WT: {selectedItem.weight}</div>
                  </div>
                </div>

                {/* Condition Bar */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#1aff80]/70">CND:</span>
                  <div className="flex-1 h-2.5 bg-[#00220d] border border-[#1aff80]/40 p-0.5">
                    <div
                      className="h-full bg-[#1aff80]"
                      style={{ width: `${selectedItem.condition}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs">{selectedItem.condition}%</span>
                </div>

                <div className="w-full h-[1.5px] bg-[#1aff80] shadow-[0_0_6px_#1aff80]" />

                <p className="text-xs text-[#1aff80]/90 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Effect attributes */}
                <div className="p-2.5 bg-[#1aff80]/10 border border-[#1aff80]/30 text-xs font-mono text-[#50ff9c] space-y-0.5">
                  <div className="font-bold tracking-wider text-[11px]">[EQUIPMENT EFFECT]:</div>
                  <div className="text-xs">{selectedItem.effect}</div>
                </div>

                {/* Action Trigger */}
                {selectedItem.actionUrl && (
                  <div className="pt-2">
                    <a
                      href={selectedItem.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open external link for ${selectedItem.name}`}
                      onClick={() => playFanfare()}
                      className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#1aff80] text-black font-bold text-xs tracking-wider hover:bg-white transition-colors cursor-pointer shadow-[0_0_8px_#1aff80]"
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      <span>{selectedItem.actionLabel || 'ACTIVATE ITEM'}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-[#1aff80]/40 flex justify-end shrink-0">
                <button
                  id="close-item-modal-btn"
                  onClick={() => {
                    playPipboyClick();
                    setMobileItemModalOpen(false);
                  }}
                  className="w-full py-2 bg-[#1aff80] text-black font-bold text-xs tracking-widest hover:bg-white transition-colors cursor-pointer"
                >
                  RETURN TO INVENTORY
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
