import { useState, useEffect } from 'react';
import { themes, languages, PRICE_PER_SLIDE, MIN_SLIDES, MAX_SLIDES } from './data/themes';

function App() {
  const [topic, setTopic] = useState('');
  const [details, setDetails] = useState('');
  const [slideCount, setSlideCount] = useState(8);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [showThemes, setShowThemes] = useState(false);
  const [showLangs, setShowLangs] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tg = window.Telegram?.WebApp;

  const totalPrice = slideCount * PRICE_PER_SLIDE;
  const isValidTopic = topic.trim().length >= 3;
  const canSubmit = isValidTopic && !isSubmitting;

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#ffffff');
      tg.setBackgroundColor('#f8fafc');
    }
  }, []);

  const handleSubmit = () => {
    if (!canSubmit) return;
    setIsSubmitting(true);

    const data = {
      type: 'presentation',
      topic: topic.trim(),
      details: details.trim(),
      slide_count: slideCount,
      theme_id: selectedTheme.id,
      language: selectedLang.id,
      total_price: totalPrice
    };

    if (tg?.sendData) {
      tg.sendData(JSON.stringify(data));
    } else {
      console.log('📤 Data:', data);
      alert(JSON.stringify(data, null, 2));
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  const formatMoney = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-32">
      
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-5 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Prezentatsiya</h1>
            <p className="text-sm text-slate-500">AI yordamida yarating</p>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="px-4 py-6 space-y-4">

        {/* MAVZU */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/60">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            Mavzu
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Masalan: Raqamli marketing strategiyasi"
            className="w-full text-lg font-medium text-slate-900 placeholder:text-slate-300 outline-none bg-transparent"
          />
          {topic.length > 0 && topic.length < 3 && (
            <p className="text-xs text-rose-500 mt-2 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Kamida 3 ta belgi kiriting
            </p>
          )}
        </div>

        {/* QO'SHIMCHA */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/60">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">
            Qo'shimcha izoh <span className="text-slate-300 font-normal">(ixtiyoriy)</span>
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Maxsus talablar yoki yo'nalishlar..."
            rows={2}
            className="w-full text-base text-slate-700 placeholder:text-slate-300 outline-none resize-none bg-transparent"
          />
        </div>

        {/* SLAYD SONI */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/60">
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Slaydlar soni
            </label>
            <div className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
              {formatMoney(PRICE_PER_SLIDE)} so'm / slayd
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setSlideCount(Math.max(MIN_SLIDES, slideCount - 1))}
              disabled={slideCount <= MIN_SLIDES}
              className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 active:scale-95 transition-all disabled:opacity-40"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M20 12H4" />
              </svg>
            </button>
            
            <div className="flex-1 text-center">
              <span className="text-5xl font-bold text-slate-900 tabular-nums">{slideCount}</span>
              <p className="text-sm text-slate-400 mt-1">{MIN_SLIDES} dan {MAX_SLIDES} gacha</p>
            </div>
            
            <button
              onClick={() => setSlideCount(Math.min(MAX_SLIDES, slideCount + 1))}
              disabled={slideCount >= MAX_SLIDES}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center active:scale-95 transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-40"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          {/* Slider */}
          <div className="mt-5">
            <input
              type="range"
              min={MIN_SLIDES}
              max={MAX_SLIDES}
              value={slideCount}
              onChange={(e) => setSlideCount(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        {/* THEME & TIL */}
        <div className="grid grid-cols-2 gap-3">
          {/* THEME */}
          <button
            onClick={() => setShowThemes(true)}
            className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/60 text-left active:scale-[0.98] transition-all"
          >
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-sm"
              style={{ background: `linear-gradient(135deg, ${selectedTheme.colors[0]}, ${selectedTheme.colors[2]})` }}
            >
              {selectedTheme.emoji}
            </div>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Dizayn</p>
            <p className="text-base font-semibold text-slate-900 mt-0.5">{selectedTheme.name}</p>
          </button>

          {/* TIL */}
          <button
            onClick={() => setShowLangs(true)}
            className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/60 text-left active:scale-[0.98] transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl mb-3">
              {selectedLang.flag}
            </div>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Til</p>
            <p className="text-base font-semibold text-slate-900 mt-0.5">{selectedLang.label}</p>
          </button>
        </div>

      </main>

      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/60 p-4 pb-8">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full h-14 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all ${
            canSubmit
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white active:scale-[0.98] shadow-lg shadow-indigo-500/30'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          ) : (
            <>
              <span>Yaratish</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              <span className="font-bold">{formatMoney(totalPrice)} so'm</span>
            </>
          )}
        </button>
      </div>

      {/* THEME MODAL */}
      {showThemes && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowThemes(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[28px] max-h-[85vh] overflow-hidden animate-slideUp shadow-2xl">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold text-slate-900">Dizayn tanlang</h2>
              <button
                onClick={() => setShowThemes(false)}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 pb-10 overflow-y-auto max-h-[calc(85vh-65px)]">
              <div className="grid grid-cols-2 gap-3">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setSelectedTheme(t); setShowThemes(false); }}
                    className={`relative p-3 rounded-2xl transition-all active:scale-[0.97] border-2 ${
                      selectedTheme.id === t.id 
                        ? 'border-indigo-500 bg-indigo-50/50' 
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div 
                      className="h-24 rounded-xl flex items-center justify-center text-3xl mb-2"
                      style={{ background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]}, ${t.colors[2]})` }}
                    >
                      {t.emoji}
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.description}</p>
                    {selectedTheme.id === t.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LANG MODAL */}
      {showLangs && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowLangs(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[28px] animate-slideUp shadow-2xl">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Til tanlang</h2>
              <button
                onClick={() => setShowLangs(false)}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 pb-10 space-y-2">
              {languages.map((l) => (
                <button
                  key={l.id}
                  onClick={() => { setSelectedLang(l); setShowLangs(false); }}
                  className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all active:scale-[0.98] ${
                    selectedLang.id === l.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                      : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{l.flag}</span>
                    <span className="font-semibold">{l.label}</span>
                  </div>
                  {selectedLang.id === l.id && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
        }
      `}</style>
    </div>
  );
}

export default App;