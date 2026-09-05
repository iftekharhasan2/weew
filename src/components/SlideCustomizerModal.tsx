import React, { useState } from 'react';
import { X, Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, RotateCcw, Settings, Check } from 'lucide-react';
import { SlideItem } from '../types';
import { defaultSlides } from '../data/slides';
import { ImageField } from './ImageField';

interface SlideCustomizerModalProps {
  slides: SlideItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateSlides: (newSlides: SlideItem[]) => void;
  autoplayInterval: number;
  onUpdateInterval: (interval: number) => void;
}

export const SlideCustomizerModal: React.FC<SlideCustomizerModalProps> = ({
  slides,
  isOpen,
  onClose,
  onUpdateSlides,
  autoplayInterval,
  onUpdateInterval,
}) => {
  const [activeTab, setActiveTab] = useState<'slides' | 'settings'>('slides');
  const [editingSlideId, setEditingSlideId] = useState<number | null>(null);
  const [newSlideName, setNewSlideName] = useState('');
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlideSubtitle, setNewSlideSubtitle] = useState('');
  const [newSlideBg, setNewSlideBg] = useState('');
  const [newSlideAccentColor, setNewSlideAccentColor] = useState('#2563eb');
  const [newSlideTitleColor, setNewSlideTitleColor] = useState('#0f172a');
  const [newSlideSubtitleColor, setNewSlideSubtitleColor] = useState('#334155');
  const [newSlideCtaBgColor, setNewSlideCtaBgColor] = useState('#2563eb');
  const [newSlideOverlay, setNewSlideOverlay] = useState<'light' | 'dark' | 'gradient' | 'glass' | 'none'>('light');

  if (!isOpen) return null;

  const handleStartEdit = (slide: SlideItem) => {
    setEditingSlideId(slide.id);
    setNewSlideName(slide.name);
    setNewSlideTitle(slide.title);
    setNewSlideSubtitle(slide.subtitle || '');
    setNewSlideBg(slide.bgImage);
    setNewSlideAccentColor(slide.accentColor || slide.tagColor || '#2563eb');
    setNewSlideTitleColor(slide.titleColor || '#0f172a');
    setNewSlideSubtitleColor(slide.subtitleColor || '#334155');
    setNewSlideCtaBgColor(slide.ctaBgColor || slide.accentColor || '#2563eb');
    setNewSlideOverlay(slide.overlayTint || 'light');
  };

  const handleSaveEdit = () => {
    if (editingSlideId === null) return;
    const updated = slides.map((s) =>
      s.id === editingSlideId
        ? {
            ...s,
            name: newSlideName.toLowerCase().trim() || s.name,
            title: newSlideTitle.trim() || s.title,
            subtitle: newSlideSubtitle.trim(),
            bgImage: newSlideBg.trim() || s.bgImage,
            accentColor: newSlideAccentColor,
            tagColor: newSlideAccentColor,
            titleColor: newSlideTitleColor,
            subtitleColor: newSlideSubtitleColor,
            ctaBgColor: newSlideCtaBgColor,
            overlayTint: newSlideOverlay,
          }
        : s
    );
    onUpdateSlides(updated);
    setEditingSlideId(null);
  };

  const handleAddSlide = () => {
    const nextId = Math.max(...slides.map((s) => s.id), 0) + 1;
    const newSlide: SlideItem = {
      id: nextId,
      name: `slide-${nextId}`,
      title: 'New Presentation Slide',
      subtitle: 'Add your custom slide summary or description text here.',
      bgImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2000&q=80',
    };
    onUpdateSlides([...slides, newSlide]);
    handleStartEdit(newSlide);
  };

  const handleDeleteSlide = (id: number) => {
    if (slides.length <= 1) return; // keep at least 1 slide
    onUpdateSlides(slides.filter((s) => s.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= slides.length) return;
    const newSlides = [...slides];
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIdx];
    newSlides[targetIdx] = temp;
    onUpdateSlides(newSlides);
  };

  const handleResetDefaults = () => {
    onUpdateSlides(defaultSlides);
    onUpdateInterval(3000);
    setEditingSlideId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#081220]/80 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-2xl bg-[#081220] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#081220]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#ff7e67]/10 text-[#ff7e67] border border-[#ff7e67]/30">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-100">Slide Manager & Settings</h3>
              <p className="text-xs text-slate-400">Customize slide content, images, and autoplay timer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl transition-colors border border-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs & Quick Actions */}
        <div className="px-6 py-3 border-b border-slate-800 bg-[#081220] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('slides')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'slides'
                  ? 'bg-[#ff7e67] text-slate-100'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-100'
              }`}
            >
              Slides ({slides.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#ff7e67] text-slate-100'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-100'
              }`}
            >
              Interval & Autoplay
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddSlide}
              className="px-3 py-1.5 bg-[#ff7e67]/15 hover:bg-[#ff7e67]/25 text-[#ff7e67] border border-[#ff7e67]/30 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Slide</span>
            </button>
            <button
              onClick={handleResetDefaults}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset to default slides"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'slides' && (
            <div className="space-y-3">
              {slides.map((slide, idx) => {
                const isEditing = editingSlideId === slide.id;

                if (isEditing) {
                  return (
                    <div
                      key={slide.id}
                      className="p-4 bg-[#081220] border border-[#ff7e67]/40 rounded-xl space-y-3 animate-in fade-in duration-200"
                    >
                      <div className="flex items-center justify-between text-xs text-[#ff7e67] font-medium">
                        <span>Editing Slide #{slide.id}</span>
                        <button
                          onClick={() => setEditingSlideId(null)}
                          className="text-slate-400 hover:text-slate-100 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Section Tag Name</label>
                          <input
                            type="text"
                            value={newSlideName}
                            onChange={(e) => setNewSlideName(e.target.value)}
                            className="w-full px-3 py-1.5 bg-[#050a12] border border-slate-800 rounded-lg text-xs text-slate-100"
                          />
                        </div>
                        <div>
                          <ImageField
                            label="Background Image (URL or Upload)"
                            value={newSlideBg}
                            onChange={setNewSlideBg}
                            placeholder="Enter image URL or select local file..."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Slide Title</label>
                        <input
                          type="text"
                          value={newSlideTitle}
                          onChange={(e) => setNewSlideTitle(e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#050a12] border border-slate-800 rounded-lg text-xs text-slate-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Slide Subtitle / Description</label>
                        <textarea
                          rows={2}
                          value={newSlideSubtitle}
                          onChange={(e) => setNewSlideSubtitle(e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#050a12] border border-slate-800 rounded-lg text-xs text-slate-100"
                        />
                      </div>

                      {/* Color Controls */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-[#050a12] border border-slate-800 rounded-lg">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Accent / Tag</label>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="color"
                              value={newSlideAccentColor}
                              onChange={(e) => setNewSlideAccentColor(e.target.value)}
                              className="w-7 h-7 rounded border border-slate-800 bg-transparent cursor-pointer"
                            />
                            <span className="text-[10px] text-slate-100 font-mono">{newSlideAccentColor}</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Title Color</label>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="color"
                              value={newSlideTitleColor}
                              onChange={(e) => setNewSlideTitleColor(e.target.value)}
                              className="w-7 h-7 rounded border border-slate-800 bg-transparent cursor-pointer"
                            />
                            <span className="text-[10px] text-slate-100 font-mono">{newSlideTitleColor}</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Button Color</label>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="color"
                              value={newSlideCtaBgColor}
                              onChange={(e) => setNewSlideCtaBgColor(e.target.value)}
                              className="w-7 h-7 rounded border border-slate-800 bg-transparent cursor-pointer"
                            />
                            <span className="text-[10px] text-slate-100 font-mono">{newSlideCtaBgColor}</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Backdrop Overlay</label>
                          <select
                            value={newSlideOverlay}
                            onChange={(e) => setNewSlideOverlay(e.target.value as any)}
                            className="w-full px-2 py-1 bg-[#050a12] border border-slate-800 rounded text-[11px] text-slate-100"
                          >
                            <option value="light">Light Frost</option>
                            <option value="dark">Dark Vignette</option>
                            <option value="gradient">Gradient Soft</option>
                            <option value="glass">Glass Blur</option>
                            <option value="none">None (Clean)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          onClick={handleSaveEdit}
                          className="px-4 py-1.5 bg-[#ff7e67] hover:bg-[#e06a54] text-slate-100 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={slide.id}
                    className="flex items-center justify-between p-3 bg-[#081220] border border-slate-800 rounded-xl hover:border-[#ff7e67]/60 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0 border border-slate-800"
                        style={{ backgroundImage: `url(${slide.bgImage})` }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-100 font-mono">
                            {slide.name}
                          </span>
                          <span className="text-xs text-slate-400">#{slide.id}</span>
                        </div>
                        <h4 className="text-sm font-medium text-slate-100 truncate max-w-xs sm:max-w-md">
                          {slide.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleMove(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 text-slate-400 hover:text-slate-100 disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMove(idx, 'down')}
                        disabled={idx === slides.length - 1}
                        className="p-1.5 text-slate-400 hover:text-slate-100 disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStartEdit(slide)}
                        className="p-1.5 text-slate-400 hover:text-[#ff7e67] cursor-pointer"
                        title="Edit Slide"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSlide(slide.id)}
                        disabled={slides.length <= 1}
                        className="p-1.5 text-slate-400 hover:text-rose-400 disabled:opacity-30 cursor-pointer"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#081220] border border-slate-800 rounded-xl space-y-3">
                <h4 className="text-sm font-medium text-slate-100">Autoplay Speed</h4>
                <p className="text-xs text-slate-400">
                  Select how frequently the slider automatically advances to the next item:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {[2000, 3000, 5000, 7000].map((interval) => (
                    <button
                      key={interval}
                      onClick={() => onUpdateInterval(interval)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        autoplayInterval === interval
                          ? 'bg-[#ff7e67] text-slate-100 border-[#ff7e67] shadow-md shadow-[#ff7e67]/20'
                          : 'bg-slate-800 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-100'
                      }`}
                    >
                      {interval / 1000} Seconds
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#081220] border border-slate-800 rounded-xl space-y-2 text-xs text-slate-400">
                <h4 className="text-sm font-medium text-slate-100 mb-1">Keyboard Shortcuts</h4>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Next Slide</span>
                  <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-100 font-mono">Right Arrow / Space</kbd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Previous Slide</span>
                  <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-100 font-mono">Left Arrow</kbd>
                </div>
                <div className="flex justify-between py-1">
                  <span>Pause/Play Autoplay</span>
                  <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-100 font-mono">Key P</kbd>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#081220] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#ff7e67] hover:bg-[#e06a54] text-slate-100 rounded-xl text-xs font-medium transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
