import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/68ef8bc0-d8e5-4b57-afd0-349502515ebc/files/cbc9c9ee-b6ba-4420-ae99-47c60fad428e.jpg";
const LOGO = "https://cdn.poehali.dev/projects/68ef8bc0-d8e5-4b57-afd0-349502515ebc/bucket/ff03a736-40dd-4c71-a260-6e0d35e93039.png";

const albums = [
  { id: 1, title: "Герои Кинематограф", year: "2009", url: "https://band.link/heroes_of_cinema", cover: "https://cdn.poehali.dev/projects/68ef8bc0-d8e5-4b57-afd0-349502515ebc/bucket/e8709d3a-6e1e-4588-8946-f23122422960.jpg" },
  { id: 2, title: "Тёмный мир фэнтэзи", year: "2024", url: "https://band.link/ooy5e", cover: "https://cdn.poehali.dev/projects/68ef8bc0-d8e5-4b57-afd0-349502515ebc/bucket/f299cfba-aa60-47b5-9637-0e27f7a2f1e9.jpg" },
  { id: 3, title: "Кровавый коридор", year: "2024", url: "https://band.link/krovavyjkoridor", cover: "https://cdn.poehali.dev/projects/68ef8bc0-d8e5-4b57-afd0-349502515ebc/bucket/7be33d19-55fe-4bd0-b546-58df6a9fc985.jpg" },
];

const videos = [
  { id: 1, title: "Пустота внутри — Live at Dark Fest", views: "128K", date: "март 2024", thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" },
  { id: 2, title: "Кровь асфальта — Official Video", views: "84K", date: "янв 2024", thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" },
  { id: 3, title: "VOID — Interview 2024", views: "31K", date: "дек 2023", thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "music", "video", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const navItems = [
    { id: "music", label: "МУЗЫКА" },
    { id: "video", label: "ВИДЕО" },
    { id: "contact", label: "КОНТАКТЫ" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-oswald overflow-x-hidden">

      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
        }}
      />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, transparent 100%)" }}>
        <button onClick={() => scrollTo("hero")} className="hover:opacity-80 transition-opacity duration-300">
          <img src={LOGO} alt="Horror Thriller" className="h-10 w-auto object-contain" style={{ filter: "drop-shadow(0 0 8px rgba(220,38,38,0.4))" }} />
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`font-oswald text-sm tracking-[0.2em] transition-all duration-300 border-b-2 pb-0.5 ${
                activeSection === item.id
                  ? "text-red-500 border-red-500"
                  : "text-gray-400 border-transparent hover:text-white hover:border-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile burger */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-oswald text-4xl font-bold tracking-[0.3em] text-white hover:text-red-500 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-end pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="VOID"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.35) contrast(1.2)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.3) 50%, transparent 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.8) 100%)" }} />
        </div>

        {/* Red accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 opacity-80" />

        <div className="relative z-10 px-8 md:px-16 max-w-5xl">
          <div
            className="overflow-hidden mb-2"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 1s ease-out" }}
          >
            <p className="font-mono text-red-500 text-xs tracking-[0.5em] mb-6">— ОФИЦИАЛЬНЫЙ САЙТ —</p>
          </div>

          <div
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-60px)", transition: "all 1.2s ease-out 0.2s" }}
          >
            <img
              src={LOGO}
              alt="Horror Thriller"
              className="mb-6 w-full max-w-2xl"
              style={{ filter: "drop-shadow(0 0 60px rgba(220,38,38,0.5)) drop-shadow(0 0 120px rgba(220,38,38,0.2))" }}
            />
          </div>

          <div
            style={{ opacity: visible ? 1 : 0, transition: "opacity 1s ease-out 0.8s" }}
          >
            <p className="font-cormorant italic text-gray-300 text-2xl md:text-3xl mb-10 max-w-lg" style={{ fontStyle: "italic" }}>
              «Там, где кончается свет — начинается музыка»
            </p>
            <button
              onClick={() => scrollTo("music")}
              className="group flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-oswald text-sm tracking-[0.2em] px-8 py-4 transition-all duration-300 hover:scale-105"
            >
              СЛУШАТЬ СЕЙЧАС
              <Icon name="ChevronRight" size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[10px] tracking-widest rotate-90 mb-4">SCROLL</span>
          <div className="w-px h-16 bg-white animate-pulse" />
        </div>
      </section>

      {/* MUSIC */}
      <section id="music" className="relative py-28 px-6 md:px-16">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />

        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-6 mb-16">
            <h2 className="font-oswald font-bold text-6xl md:text-8xl tracking-tight leading-none">МУЗЫКА</h2>
            <div className="mb-2 pb-3 border-b border-red-600">
              <span className="font-mono text-red-500 text-xs tracking-widest">ДИСКОГРАФИЯ</span>
            </div>
          </div>

          <div className="space-y-0">
            {albums.map((album, i) => (
              <a
                key={album.id}
                href={album.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 py-6 border-b border-white/10 transition-all duration-300 hover:bg-white/[0.03] px-4 -mx-4"
              >
                <span className="font-mono text-xs text-gray-600 w-8 text-center group-hover:text-red-500 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="w-16 h-16 shrink-0 overflow-hidden border border-white/10 group-hover:border-red-600 transition-all duration-300">
                  <img src={album.cover} alt={album.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" style={{ filter: "brightness(0.85) contrast(1.1)" }} />
                </div>

                <div className="flex-1">
                  <p className="font-oswald text-xl tracking-wide text-white group-hover:text-red-400 transition-colors duration-200">
                    {album.title}
                  </p>
                  <p className="font-mono text-xs text-gray-600 mt-0.5">{album.year}</p>
                </div>

                <div className="flex items-center gap-2 text-gray-600 group-hover:text-red-500 transition-colors">
                  <span className="font-mono text-xs tracking-widest hidden sm:block">СЛУШАТЬ</span>
                  <Icon name="ExternalLink" size={14} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video" className="relative py-28 px-6 md:px-16 bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />

        <div className="max-w-5xl mx-auto">
          <div className="flex items-end gap-6 mb-16">
            <h2 className="font-oswald font-bold text-6xl md:text-8xl tracking-tight leading-none">ВИДЕО</h2>
            <div className="mb-2 pb-3 border-b border-red-600">
              <span className="font-mono text-red-500 text-xs tracking-widest">YOUTUBE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-3" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={video.thumb}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ filter: "grayscale(0.6) brightness(0.7)" }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/30 group-hover:border-red-500 group-hover:bg-red-600/30 transition-all duration-300">
                      <Icon name="Play" size={20} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 w-1 h-8 bg-red-600" />
                </div>
                <h3 className="font-oswald text-sm tracking-wide text-white group-hover:text-red-400 transition-colors leading-snug mb-1">
                  {video.title}
                </h3>
                <p className="font-mono text-xs text-gray-600">{video.views} просмотров · {video.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="relative py-20 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          background: "repeating-linear-gradient(90deg, #dc2626 0px, #dc2626 1px, transparent 1px, transparent 80px)"
        }} />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <p className="font-mono text-red-500 text-xs tracking-[0.5em] mb-4">РАССЫЛКА</p>
          <h2 className="font-oswald font-bold text-4xl md:text-5xl tracking-tight mb-4">
            ЭКСКЛЮЗИВНЫЙ КОНТЕНТ
          </h2>
          <p className="font-cormorant text-gray-400 text-xl mb-10">
            Первым узнавай о релизах, концертах и закулисье группы
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-3 text-red-400">
              <Icon name="CheckCircle" size={20} />
              <span className="font-oswald tracking-widest text-sm">ДОБРО ПОЖАЛОВАТЬ В ТЬМУ</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ВАШ EMAIL"
                required
                className="flex-1 bg-white/5 border border-white/20 text-white font-mono text-sm tracking-widest px-6 py-4 placeholder:text-gray-600 focus:outline-none focus:border-red-600 transition-colors"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-oswald text-sm tracking-[0.2em] px-8 py-4 transition-colors duration-300 whitespace-nowrap"
              >
                ПОДПИСАТЬСЯ
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-28 px-6 md:px-16 bg-[#080808]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />

        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-6 mb-16">
            <h2 className="font-oswald font-bold text-6xl md:text-8xl tracking-tight leading-none">КОНТАКТЫ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <p className="font-mono text-red-500 text-xs tracking-[0.4em] mb-3">БРОНИРОВАНИЕ / КОНЦЕРТЫ</p>
                <p className="font-oswald text-2xl text-white">booking@voidband.ru</p>
              </div>
              <div>
                <p className="font-mono text-red-500 text-xs tracking-[0.4em] mb-3">ПРЕССА / ИНТЕРВЬЮ</p>
                <p className="font-oswald text-2xl text-white">press@voidband.ru</p>
              </div>
              <div>
                <p className="font-mono text-red-500 text-xs tracking-[0.4em] mb-3">ОБЩИЕ ВОПРОСЫ</p>
                <p className="font-oswald text-2xl text-white">info@voidband.ru</p>
              </div>
            </div>

            <div>
              <p className="font-mono text-red-500 text-xs tracking-[0.4em] mb-8">МЫ В СЕТИ</p>
              <div className="space-y-4">
                {[
                  { icon: "Music", label: "ВКонтакте", handle: "@voidband" },
                  { icon: "Video", label: "YouTube", handle: "@voidband" },
                  { icon: "Headphones", label: "Яндекс Музыка", handle: "VOID" },
                  { icon: "Radio", label: "Spotify", handle: "VOID" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600/10 transition-all duration-300">
                      <Icon name={s.icon} fallback="Music" size={14} className="text-gray-500 group-hover:text-red-400" />
                    </div>
                    <div>
                      <p className="font-oswald text-sm tracking-wide text-white group-hover:text-red-400 transition-colors">{s.label}</p>
                      <p className="font-mono text-xs text-gray-600">{s.handle}</p>
                    </div>
                    <Icon name="ArrowRight" size={14} className="ml-auto text-gray-700 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 md:px-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={LOGO} alt="Horror Thriller" className="h-8 w-auto object-contain opacity-20" />
          <p className="font-mono text-xs text-gray-700 tracking-widest">© 2024 VOID. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
          <div className="w-16 h-px bg-red-600 opacity-40" />
        </div>
      </footer>
    </div>
  );
}