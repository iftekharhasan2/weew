import React, { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Link2, Columns3, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import {
  defaultNavbarConfig,
  primaryNav as shippedNav,
  type PrimaryNavItem,
  type NavLinkItem,
  type NavColumnItem,
  type NavPromoItem,
  type NavbarConfig,
} from '../data/navigationData';
import { ImageField } from './ImageField';

/* --------------------------------- atoms --------------------------------- */

const inputCls =
  'w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors';

const Field: React.FC<{ label: string; children: React.ReactNode; hint?: string }> = ({ label, children, hint }) => (
  <label className="block space-y-1">
    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
    {children}
    {hint && <span className="block text-[10px] text-slate-600">{hint}</span>}
  </label>
);

const Toggle: React.FC<{ label: string; checked: boolean; onChange: (v: boolean) => void }> = ({
  label,
  checked,
  onChange,
}) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
      checked
        ? 'bg-blue-600/15 border-blue-500/50 text-blue-300'
        : 'bg-slate-950 border-slate-700 text-slate-500 hover:text-slate-300'
    }`}
  >
    <span className={`w-3.5 h-3.5 rounded border ${checked ? 'bg-blue-500 border-blue-400' : 'border-slate-600'}`} />
    <span>{label}</span>
  </button>
);

const PAGE_OPTIONS: Array<{ value: '' | 'home' | 'about' | 'approach' | 'focus' | 'services'; label: string }> = [
  { value: '', label: 'Scroll on current page' },
  { value: 'home', label: 'Home page' },
  { value: 'about', label: 'About page' },
  { value: 'approach', label: 'Approach page' },
  { value: 'focus', label: 'Focus Areas page' },
  { value: 'services', label: 'Our Services (5 Practices)' },
];

/* ------------------------------ link sub-editor --------------------------- */

const LinkRow: React.FC<{
  link: NavLinkItem;
  withDesc?: boolean;
  onChange: (link: NavLinkItem) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}> = ({ link, withDesc, onChange, onRemove, onMove }) => (
  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
    <div className="flex items-start gap-2">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <Field label="Label">
          <input className={inputCls} value={link.label} onChange={(e) => onChange({ ...link, label: e.target.value })} />
        </Field>
        <Field label="Href / Section">
          <input
            className={inputCls}
            value={link.href}
            placeholder="#services or /about"
            onChange={(e) => onChange({ ...link, href: e.target.value })}
          />
        </Field>
        <Field label="Scroll target id">
          <input
            className={inputCls}
            value={link.sectionId || ''}
            placeholder="#services"
            onChange={(e) => onChange({ ...link, sectionId: e.target.value || undefined })}
          />
        </Field>
        <Field label="Route">
          <select
            className={inputCls}
            value={link.page || ''}
            onChange={(e) =>
              onChange({ ...link, page: (e.target.value || undefined) as NavLinkItem['page'] })
            }
          >
            {PAGE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        {withDesc && (
          <div className="sm:col-span-2">
            <Field label="Description">
              <input
                className={inputCls}
                value={link.desc || ''}
                onChange={(e) => onChange({ ...link, desc: e.target.value || undefined })}
              />
            </Field>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 pt-4">
        <button type="button" onClick={() => onMove(-1)} className="p-1.5 rounded-md text-slate-500 hover:text-slate-200 hover:bg-slate-800 cursor-pointer" title="Move up">
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => onMove(1)} className="p-1.5 rounded-md text-slate-500 hover:text-slate-200 hover:bg-slate-800 cursor-pointer" title="Move down">
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={onRemove} className="p-1.5 rounded-md text-rose-500/80 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer" title="Delete link">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
);

/* ------------------------------- main editor ------------------------------ */

export const NavigationManager: React.FC = () => {
  const { data, updateNavigation, updateNavbar } = useCMS();

  const navigation: PrimaryNavItem[] = data.navigation || [];
  const navbar: NavbarConfig = {
    ...defaultNavbarConfig,
    ...(data.navbar || {}),
    brand: { ...defaultNavbarConfig.brand, ...(data.navbar?.brand || {}) },
    cta: { ...defaultNavbarConfig.cta, ...(data.navbar?.cta || {}) },
    topBar: { ...defaultNavbarConfig.topBar, ...(data.navbar?.topBar || {}) },
  };

  const [selectedId, setSelectedId] = useState<string>(navigation[0]?.id || '');
  const active = navigation.find((i) => i.id === selectedId) || navigation[0];

  const setNavbar = (patch: Partial<NavbarConfig>) => updateNavbar({ ...navbar, ...patch });

  const patchItem = (id: string, patch: Partial<PrimaryNavItem>) =>
    updateNavigation(navigation.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const move = <T,>(arr: T[], index: number, dir: -1 | 1): T[] => {
    const next = index + dir;
    if (next < 0 || next >= arr.length) return arr;
    const copy = [...arr];
    [copy[index], copy[next]] = [copy[next], copy[index]];
    return copy;
  };

  const addMenu = () => {
    const id = `menu-${Date.now()}`;
    updateNavigation([
      ...navigation,
      {
        id,
        label: 'New Menu',
        href: '#hero',
        sectionId: '#hero',
        links: [],
        columns: [],
        promos: [],
      },
    ]);
    setSelectedId(id);
  };

  const removeMenu = (id: string) => {
    const next = navigation.filter((i) => i.id !== id);
    updateNavigation(next);
    if (selectedId === id) setSelectedId(next[0]?.id || '');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Navigation & Header</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ff7e67]/20 border border-[#ff7e67]/30 text-[#ff7e67]">
              navbar / mega menu
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Brand, top bar, CTA, search, and every mega-menu column, link and promo card — all published from here.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (confirm('Restore the shipped navigation menus? Your current menu edits will be replaced.')) {
              updateNavigation(shippedNav);
              setSelectedId(shippedNav[0]?.id || '');
            }
          }}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset menus</span>
        </button>
      </div>

      {/* ------------------------------ Navbar chrome ------------------------------ */}
      <section className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-5">
        <h4 className="text-sm font-bold text-emerald-400">Brand & Actions</h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Logo badge text" hint="Shown when no logo image is set.">
            <input
              className={inputCls}
              value={navbar.brand.badgeText}
              onChange={(e) => setNavbar({ brand: { ...navbar.brand, badgeText: e.target.value } })}
            />
          </Field>
          <Field label="Wordmark">
            <input
              className={inputCls}
              value={navbar.brand.name}
              onChange={(e) => setNavbar({ brand: { ...navbar.brand, name: e.target.value } })}
            />
          </Field>
          <Field label="Tagline">
            <input
              className={inputCls}
              value={navbar.brand.tagline}
              onChange={(e) => setNavbar({ brand: { ...navbar.brand, tagline: e.target.value } })}
            />
          </Field>
        </div>

        <ImageField
          label="Logo image (optional)"
          value={navbar.brand.logoImage || ''}
          onChange={(url: string) => setNavbar({ brand: { ...navbar.brand, logoImage: url } })}
        />

        <div className="flex flex-wrap gap-2">
          <Toggle
            label="Status dot"
            checked={navbar.brand.showStatusDot}
            onChange={(v) => setNavbar({ brand: { ...navbar.brand, showStatusDot: v } })}
          />
          <Toggle label="Search button" checked={navbar.searchEnabled} onChange={(v) => setNavbar({ searchEnabled: v })} />
          <Toggle
            label="CTA button"
            checked={navbar.cta.enabled}
            onChange={(v) => setNavbar({ cta: { ...navbar.cta, enabled: v } })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="CTA label">
            <input
              className={inputCls}
              value={navbar.cta.label}
              onChange={(e) => setNavbar({ cta: { ...navbar.cta, label: e.target.value } })}
            />
          </Field>
          <Field label="CTA scroll target" hint="Any section id on the home page.">
            <input
              className={inputCls}
              value={navbar.cta.targetId}
              onChange={(e) => setNavbar({ cta: { ...navbar.cta, targetId: e.target.value } })}
            />
          </Field>
          <Field label="Search placeholder">
            <input
              className={inputCls}
              value={navbar.searchPlaceholder}
              onChange={(e) => setNavbar({ searchPlaceholder: e.target.value })}
            />
          </Field>
          <Field label="Mega-menu badge">
            <input
              className={inputCls}
              value={navbar.megaMenuBadge}
              onChange={(e) => setNavbar({ megaMenuBadge: e.target.value })}
            />
          </Field>
        </div>
      </section>

      {/* -------------------------------- Top bar -------------------------------- */}
      <section className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-emerald-400">Top Contact Bar</h4>
        <div className="flex flex-wrap gap-2">
          <Toggle label="Show bar" checked={navbar.topBar.enabled} onChange={(v) => setNavbar({ topBar: { ...navbar.topBar, enabled: v } })} />
          <Toggle label="Email" checked={navbar.topBar.showEmail} onChange={(v) => setNavbar({ topBar: { ...navbar.topBar, showEmail: v } })} />
          <Toggle label="Phone" checked={navbar.topBar.showPhone} onChange={(v) => setNavbar({ topBar: { ...navbar.topBar, showPhone: v } })} />
          <Toggle label="Location" checked={navbar.topBar.showLocation} onChange={(v) => setNavbar({ topBar: { ...navbar.topBar, showLocation: v } })} />
        </div>
        <Field label="Status label" hint="Email, phone and location come from Office Info.">
          <input
            className={inputCls}
            value={navbar.topBar.statusLabel}
            onChange={(e) => setNavbar({ topBar: { ...navbar.topBar, statusLabel: e.target.value } })}
          />
        </Field>
      </section>

      {/* ------------------------------ Menu editor ------------------------------ */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Menu list */}
        <div className="lg:col-span-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-emerald-400">Menus</h4>
            <button
              type="button"
              onClick={addMenu}
              className="p-1.5 rounded-lg bg-[#ff7e67] hover:bg-[#e06a54] text-white cursor-pointer"
              title="Add menu"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {navigation.map((item, idx) => (
            <div
              key={item.id}
              className={`rounded-xl border px-3 py-2 flex items-center gap-2 cursor-pointer transition-colors ${
                item.id === active?.id
                  ? 'bg-blue-600/15 border-blue-500/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
              onClick={() => setSelectedId(item.id)}
            >
              <span className="flex-1 text-xs font-bold text-slate-200 truncate">{item.label}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  updateNavigation(move(navigation, idx, -1));
                }}
                className="p-1 rounded text-slate-500 hover:text-slate-200 cursor-pointer"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  updateNavigation(move(navigation, idx, 1));
                }}
                className="p-1 rounded text-slate-500 hover:text-slate-200 cursor-pointer"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete the "${item.label}" menu?`)) removeMenu(item.id);
                }}
                className="p-1 rounded text-rose-500/80 hover:text-rose-400 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}

          {navigation.length === 0 && (
            <p className="text-xs text-slate-600 py-4 text-center">No menus yet. Add one to start.</p>
          )}
        </div>

        {/* Selected menu */}
        <div className="lg:col-span-3 space-y-5">
          {!active && <p className="text-xs text-slate-500">Select a menu to edit it.</p>}

          {active && (
            <>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Menu label">
                  <input className={inputCls} value={active.label} onChange={(e) => patchItem(active.id, { label: e.target.value })} />
                </Field>
                <Field label="Href">
                  <input className={inputCls} value={active.href} onChange={(e) => patchItem(active.id, { href: e.target.value })} />
                </Field>
                <Field label="Scroll target id">
                  <input
                    className={inputCls}
                    value={active.sectionId}
                    onChange={(e) => patchItem(active.id, { sectionId: e.target.value })}
                  />
                </Field>
                <Field label="Route">
                  <select
                    className={inputCls}
                    value={active.page || ''}
                    onChange={(e) => patchItem(active.id, { page: (e.target.value || undefined) as PrimaryNavItem['page'] })}
                  >
                    {PAGE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Featured links */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                    <Link2 className="w-4 h-4" /> Featured links ({active.links.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      patchItem(active.id, {
                        links: [...active.links, { label: 'New link', href: active.sectionId, sectionId: active.sectionId, desc: '' }],
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add link
                  </button>
                </div>

                {active.links.map((link, i) => (
                  <LinkRow
                    key={i}
                    link={link}
                    withDesc
                    onChange={(l) => patchItem(active.id, { links: active.links.map((x, xi) => (xi === i ? l : x)) })}
                    onRemove={() => patchItem(active.id, { links: active.links.filter((_, xi) => xi !== i) })}
                    onMove={(dir) => patchItem(active.id, { links: move(active.links, i, dir) })}
                  />
                ))}
              </div>

              {/* Columns */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                    <Columns3 className="w-4 h-4" /> Columns ({active.columns.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      patchItem(active.id, { columns: [...active.columns, { title: 'New Column', links: [] }] })
                    }
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add column
                  </button>
                </div>

                {active.columns.map((col: NavColumnItem, ci) => {
                  const setCol = (patch: Partial<NavColumnItem>) =>
                    patchItem(active.id, {
                      columns: active.columns.map((c, i) => (i === ci ? { ...c, ...patch } : c)),
                    });

                  return (
                    <div key={ci} className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <Field label="Column title">
                            <input className={inputCls} value={col.title || ''} onChange={(e) => setCol({ title: e.target.value })} />
                          </Field>
                        </div>
                        <button
                          type="button"
                          onClick={() => patchItem(active.id, { columns: move(active.columns, ci, -1) })}
                          className="p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 cursor-pointer"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => patchItem(active.id, { columns: move(active.columns, ci, 1) })}
                          className="p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 cursor-pointer"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => patchItem(active.id, { columns: active.columns.filter((_, i) => i !== ci) })}
                          className="p-2 rounded-lg text-rose-500/80 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 pl-1 border-l border-slate-800">
                        {col.links.map((link, li) => (
                          <LinkRow
                            key={li}
                            link={link}
                            onChange={(l) => setCol({ links: col.links.map((x, i) => (i === li ? l : x)) })}
                            onRemove={() => setCol({ links: col.links.filter((_, i) => i !== li) })}
                            onMove={(dir) => setCol({ links: move(col.links, li, dir) })}
                          />
                        ))}
                        <button
                          type="button"
                          onClick={() => setCol({ links: [...col.links, { label: 'New link', href: active.sectionId, sectionId: active.sectionId }] })}
                          className="px-3 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-300 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Add column link
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Promos */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" /> Promo cards ({active.promos.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      patchItem(active.id, {
                        promos: [
                          ...active.promos,
                          { eyebrow: 'FEATURED', title: 'New promo card', image: '', href: active.sectionId },
                        ],
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add promo
                  </button>
                </div>

                {active.promos.map((promo: NavPromoItem, pi) => {
                  const setPromo = (patch: Partial<NavPromoItem>) =>
                    patchItem(active.id, {
                      promos: active.promos.map((p, i) => (i === pi ? { ...p, ...patch } : p)),
                    });

                  return (
                    <div key={pi} className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <Field label="Eyebrow">
                          <input className={inputCls} value={promo.eyebrow} onChange={(e) => setPromo({ eyebrow: e.target.value })} />
                        </Field>
                        <Field label="Link target">
                          <input className={inputCls} value={promo.href} onChange={(e) => setPromo({ href: e.target.value })} />
                        </Field>
                        <div className="sm:col-span-2">
                          <Field label="Title">
                            <input className={inputCls} value={promo.title} onChange={(e) => setPromo({ title: e.target.value })} />
                          </Field>
                        </div>
                      </div>

                      <ImageField label="Promo image" value={promo.image} onChange={(url: string) => setPromo({ image: url })} />

                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => patchItem(active.id, { promos: move(active.promos, pi, -1) })}
                          className="p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 cursor-pointer"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => patchItem(active.id, { promos: move(active.promos, pi, 1) })}
                          className="p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 cursor-pointer"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => patchItem(active.id, { promos: active.promos.filter((_, i) => i !== pi) })}
                          className="p-2 rounded-lg text-rose-500/80 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default NavigationManager;
