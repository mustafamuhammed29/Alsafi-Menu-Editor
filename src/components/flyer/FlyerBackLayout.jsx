import React from 'react';
import EditableText from '../common/EditableText';
import RestaurantLogo from '../common/RestaurantLogo';
import PageDecorativeBorder from '../common/PageDecorativeBorder';
import { useMenu } from '../../context/MenuContext';
import { Phone, MapPin, Clock, Truck, Flame, ShieldCheck, HeartHandshake, Sparkles, QrCode } from 'lucide-react';

export const FlyerBackLayout = ({ flyerData }) => {
  const { updateFlyerBack } = useMenu();

  const back = flyerData?.back || {};
  const categories = back.categories || [];
  const combo = back.specialCombo || {};
  const contact = back.contact || {};
  const qrCodes = back.qrCodes || [];

  const handleUpdateCategoryTitle = (catIdx, title) => {
    const updated = [...categories];
    updated[catIdx] = { ...updated[catIdx], title };
    updateFlyerBack('categories', updated);
  };

  const handleUpdateItem = (catIdx, itemIdx, field, val) => {
    const updated = [...categories];
    const items = [...updated[catIdx].items];
    items[itemIdx] = { ...items[itemIdx], [field]: val };
    updated[catIdx] = { ...updated[catIdx], items };
    updateFlyerBack('categories', updated);
  };

  const handleUpdateCombo = (field, val) => {
    updateFlyerBack('specialCombo', { ...combo, [field]: val });
  };

  const handleUpdateContact = (field, val) => {
    updateFlyerBack('contact', { ...contact, [field]: val });
  };

  return (
    <div className="a4-page-wrapper" id="flyer-back">
      <div
        className="a4-page relative overflow-hidden flex flex-col justify-between select-none bg-[#030e07]"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 10%, #0d2e1c 0%, #05140b 55%, #010603 100%)',
        }}
      >
        {/* Layer 1: Royal Double Gold Border */}
        <PageDecorativeBorder
          showBorder={true}
          borderTop={true}
          borderBottom={true}
          borderLeft={true}
          borderRight={true}
          cornerStyle="royal"
          borderInset={14}
          borderWidth={2}
          borderOpacity={95}
        />

        {/* ─── 1. TOP HEADER (ترويسة قائمة أشهى المأكولات) ────────────────────────────── */}
        <header className="relative z-20 pt-6 px-8 flex flex-col items-center text-center shrink-0">
          <div className="flex items-center justify-between w-full border-b border-brand-gold/30 pb-2 mb-1.5">
            <div className="flex items-center gap-2.5">
              <RestaurantLogo src="logo.jpg" size={42} multiplier={1} showSubtext={false} />
              <div className="text-right">
                <span className="font-cinzel text-xs font-black text-brand-gold tracking-wider block uppercase">
                  ALSAFI RESTAURANT
                </span>
                <span className="text-[8.5px] text-gray-300 font-medium">
                  HEIDELBERG · ORIENTALISCHE SPEZIALITÄTEN
                </span>
              </div>
            </div>

            <div className="text-left">
              <span className="bg-brand-gold/15 border border-brand-gold/60 text-brand-goldLight text-[8.5px] font-cinzel font-bold px-3 py-1 rounded-full shadow">
                100% HALAL ZERTIFIZIERT
              </span>
            </div>
          </div>

          <EditableText
            value={back.header?.title || 'AUSZUG AUS UNSERER SPEISEKARTE'}
            onChange={(v) => updateFlyerBack('header', { ...back.header, title: v })}
            className="font-cinzel text-lg font-black text-white tracking-widest uppercase block"
          />
          <EditableText
            value={back.header?.subtitle || '✦ TÄGLICH FRISCH ZUBEREITET MIT BESTEN ZUTATEN ✦'}
            onChange={(v) => updateFlyerBack('header', { ...back.header, subtitle: v })}
            className="font-serif italic text-[10px] text-brand-goldLight font-bold tracking-wider uppercase block mt-0.5"
          />
        </header>

        {/* ─── 2. MINI MENU CATEGORIES GRID (قائمة أشهر الوجبات) ───────────────────────── */}
        <div className="relative z-20 mx-7 my-1 flex-1 flex flex-col gap-2.5 min-h-0">
          <div className="grid grid-cols-2 gap-2.5">
            {categories.slice(0, 2).map((cat, catIdx) => (
              <div
                key={cat.id || `cat-${catIdx}`}
                className="bg-black/60 border border-brand-gold/40 rounded-xl p-2.5 shadow-lg backdrop-blur-sm flex flex-col justify-between"
              >
                {/* Category Header */}
                <div className="border-b border-brand-gold/30 pb-1 mb-1.5 flex items-center justify-between">
                  <EditableText
                    value={cat.title}
                    onChange={(v) => handleUpdateCategoryTitle(catIdx, v)}
                    className="font-cinzel text-[10px] font-black text-brand-gold uppercase tracking-wider block"
                  />
                </div>

                {/* Items List */}
                <div className="space-y-1.5">
                  {cat.items.map((item, itmIdx) => (
                    <div key={item.nr || `itm-${itmIdx}`} className="flex items-start justify-between gap-1.5 border-b border-white/5 pb-1">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] font-mono font-bold text-brand-gold/80">{item.nr}.</span>
                          <span className="text-[9px] font-bold text-white font-cinzel truncate">
                            <EditableText
                              value={item.name}
                              onChange={(v) => handleUpdateItem(catIdx, itmIdx, 'name', v)}
                            />
                          </span>
                        </div>
                        <div className="text-[7.5px] text-gray-300 leading-tight">
                          <EditableText
                            value={item.desc}
                            onChange={(v) => handleUpdateItem(catIdx, itmIdx, 'desc', v)}
                          />
                        </div>
                      </div>
                      <span className="text-[9px] font-bold font-mono text-yellow-300 bg-brand-gold/15 px-1.5 py-0.5 rounded border border-brand-gold/30 shrink-0">
                        <EditableText
                          value={item.price}
                          onChange={(v) => handleUpdateItem(catIdx, itmIdx, 'price', v)}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Third Category: Mezze & Veggie */}
          {categories[2] && (
            <div className="bg-black/60 border border-brand-gold/40 rounded-xl p-2.5 shadow-lg backdrop-blur-sm">
              <div className="border-b border-brand-gold/30 pb-1 mb-1.5 flex items-center justify-between">
                <EditableText
                  value={categories[2].title}
                  onChange={(v) => handleUpdateCategoryTitle(2, v)}
                  className="font-cinzel text-[10px] font-black text-brand-gold uppercase tracking-wider block"
                />
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {categories[2].items.map((item, itmIdx) => (
                  <div key={item.nr || `itm-veg-${itmIdx}`} className="flex items-start justify-between gap-1 border-b border-white/5 pb-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-mono font-bold text-brand-gold/80">{item.nr}.</span>
                        <span className="text-[9px] font-bold text-white font-cinzel truncate">
                          <EditableText
                            value={item.name}
                            onChange={(v) => handleUpdateItem(2, itmIdx, 'name', v)}
                          />
                        </span>
                      </div>
                      <div className="text-[7.5px] text-gray-300 leading-tight truncate">
                        <EditableText
                          value={item.desc}
                          onChange={(v) => handleUpdateItem(2, itmIdx, 'desc', v)}
                        />
                      </div>
                    </div>
                    <span className="text-[9px] font-bold font-mono text-yellow-300 bg-brand-gold/15 px-1.5 py-0.5 rounded border border-brand-gold/30 shrink-0">
                      <EditableText
                        value={item.price}
                        onChange={(v) => handleUpdateItem(2, itmIdx, 'price', v)}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── 3. GRAND COMBO BANNER (صينية المشاوي والوجبة العائلية) ───────────────── */}
          {combo.show !== false && (
            <div className="bg-gradient-to-r from-[#180905] via-[#241006] to-[#180905] border-2 border-brand-gold/80 rounded-xl p-2.5 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="font-cinzel text-[10.5px] font-black text-yellow-300 uppercase tracking-wider">
                      <EditableText
                        value={combo.title || '👑 ALSAFI MIX PLATTE FÜR 2 PERSONEN'}
                        onChange={(v) => handleUpdateCombo('title', v)}
                      />
                    </span>
                  </div>
                  <div className="text-[8px] text-gray-200 mt-0.5 leading-relaxed">
                    <EditableText
                      value={combo.desc || 'Schisch Tawook, Kafta, Lammspieße & Schawarma mit Pommes, Duftreis, 3 Dips, Salat & Fladenbrot.'}
                      onChange={(v) => handleUpdateCombo('desc', v)}
                    />
                  </div>
                </div>

                <div className="ml-3 text-center bg-black/80 border border-brand-gold rounded-lg px-3 py-1.5 shadow shrink-0">
                  <div className="text-[7.5px] text-gray-300 uppercase font-semibold">Nur</div>
                  <div className="font-mono text-xs font-black text-yellow-400">
                    <EditableText
                      value={combo.price || '49,90 €'}
                      onChange={(v) => handleUpdateCombo('price', v)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─── 4. BOTTOM CONTACT, HOURS & 3 QR CODES ──────────────────────────────────── */}
        <footer className="relative z-20 mx-7 mb-5 p-3 rounded-2xl bg-[#03140a]/95 border-2 border-brand-gold/70 backdrop-blur-md shadow-2xl shrink-0 space-y-2.5">
          {/* 3 QR Codes */}
          <div className="grid grid-cols-3 gap-2 border-b border-brand-gold/30 pb-2">
            {qrCodes.map((qr) => (
              <div key={qr.id} className="flex items-center gap-2 bg-black/60 border border-brand-gold/40 rounded-xl p-1.5 shadow">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(qr.url || 'https://alsafi-restaurant.de')}`}
                  alt={qr.title}
                  className="w-8 h-8 rounded bg-white p-0.5 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[7.5px] font-cinzel font-black text-brand-gold uppercase truncate">
                    {qr.title}
                  </div>
                  <div className="text-[6.5px] text-gray-300 truncate">
                    {qr.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Details & Delivery */}
          <div className="grid grid-cols-3 gap-2 text-slate-200 text-[8.5px]">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-brand-gold shrink-0" />
              <span className="font-mono font-bold truncate">
                <EditableText
                  value={contact.phone || '06221 72 59 000'}
                  onChange={(v) => handleUpdateContact('phone', v)}
                />
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-brand-gold shrink-0" />
              <span className="font-semibold truncate">
                <EditableText
                  value={contact.address || 'Hertzstraße 1, 69126 Heidelberg (Kaufland)'}
                  onChange={(v) => handleUpdateContact('address', v)}
                />
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Truck className="w-3 h-3 text-brand-gold shrink-0" />
              <span className="font-semibold text-brand-goldLight truncate">
                <EditableText
                  value={contact.delivery || 'Lieferando · Uber Eats · Wolt'}
                  onChange={(v) => handleUpdateContact('delivery', v)}
                />
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FlyerBackLayout;
