import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, Umbrella, Wrench, Cpu,
  X, Mail, Send, ArrowUp, Users, Palette,
} from 'lucide-react';
import Umbrella3DScene from './components/Umbrella3DScene';

// ========================
//        TRANSLATIONS
// ========================
const translations = {
  en: {
    heroTitle: 'Smart Shadow.',
    heroSubtitle: 'The shade that follows you. Automatically.',
    heroCta: 'Discover more',
    modalTitle: 'Discover more',
    modalDescription: 'Our team is ready to show you how Smart Shadow can transform your outdoor space.',
    email: 'Email',
    telegram: 'Telegram',
    responseTime: 'We typically respond within a few hours.',
    close: 'Close',
    toggleTheme: 'Toggle theme',
    switchLanguage: 'Switch language (RU)',
    scrollToTop: 'Scroll to top and discover more',
    sticky1Title: 'Tracks the sun in real-time.',
    sticky1Desc: 'Our optical sensor continuously tracks the direction of the rays.',
    sticky2Title: 'Powered by the sun. No wires.',
    sticky2Desc: 'Solar panels on the canopy fully power the entire system.',
    sticky3Title: 'Perfect for beach clubs and hotel terraces.',
    sticky3Desc: 'Elevate guest experience with effortless, all-day shade.',
    teamTitle: 'Built by MIPT Engineers.',
    teamCaption: 'The Smart Shadow Team',
    ivanRole: 'Business Analysis & Programming',
    konstantinRole: 'Chief Engineer',
    antonRole: 'Marketing, Sales & Clients',
    alexanderRole: 'UX/UI Design',
    useCasesTitle: 'Where Comfort Meets Technology.',
    hotel: 'Hotel Terraces',
    beach: 'Beach Clubs',
    footer: '© 2026 Smart Shadow',
    qrTitle: 'Join our Telegram channel',
  },
  ru: {
    heroTitle: 'Smart Shadow.',
    heroSubtitle: 'Тень, которая следует за вами. Автоматически.',
    heroCta: 'Перейдём к делу?',
    modalTitle: 'Перейдём к делу?',
    modalDescription: 'Наша команда готова показать, как Smart Shadow преобразит ваше открытое пространство.',
    email: 'Почта',
    telegram: 'Телеграм',
    responseTime: 'Обычно отвечаем в течение пары часов.',
    close: 'Закрыть',
    toggleTheme: 'Переключить тему',
    switchLanguage: 'Сменить язык (EN)',
    scrollToTop: 'Наверх и перейти к делу',
    sticky1Title: 'Следит за Солнцем в реальном времени.',
    sticky1Desc: 'Наш оптический датчик непрерывно отслеживает направление лучей.',
    sticky2Title: 'Работает от Солнца. Без проводов.',
    sticky2Desc: 'Солнечные панели на куполе полностью питают всю систему.',
    sticky3Title: 'Идеально для пляжных зон и веранд отелей.',
    sticky3Desc: 'Улучшите впечатление гостей, обеспечив лёгкую тень на весь день.',
    teamTitle: 'Создано инженерами МФТИ.',
    teamCaption: 'Команда Smart Shadow',
    ivanRole: 'Бизнес-аналитика и разработка',
    konstantinRole: 'Главный инженер',
    antonRole: 'Маркетинг, продажи и клиенты',
    alexanderRole: 'Дизайн UX/UI',
    useCasesTitle: 'Где комфорт встречается с технологиями.',
    hotel: 'Террасы отелей',
    beach: 'Пляжные клубы',
    footer: '© 2026 Smart Shadow',
    qrTitle: 'Присоединяйтесь к нашему Телеграм-каналу',
  },
};

// ========================
//        LANGUAGE HOOK
// ========================
const useLanguage = () => {
  const [lang, setLang] = useState<'en' | 'ru'>('en');

  useEffect(() => {
    const stored = localStorage.getItem('lang') as 'en' | 'ru' | null;
    const browserLang = navigator.language.startsWith('ru') ? 'ru' : 'en';
    const initial = stored ?? browserLang;
    setLang(initial);
  }, []);

  const toggleLanguage = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'ru' : 'en';
      localStorage.setItem('lang', next);
      return next;
    });
  };

  const t = useCallback((key: keyof typeof translations['en']) => {
    return translations[lang]?.[key] ?? translations['en'][key] ?? key;
  }, [lang]);

  return { lang, toggleLanguage, t };
};

// ========================
//        THEME HOOK
// ========================
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ?? (systemPrefers ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  };

  return { theme, toggleTheme };
};

// ========================
//    CONTACT MODAL
// ========================
const ContactModal = ({
  isOpen,
  onClose,
  t,
  lang,
}: {
  isOpen: boolean;
  onClose: () => void;
  t: (key: keyof typeof translations['en']) => string;
  lang: 'en' | 'ru';
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-3xl bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors"
              aria-label={t('close')}
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="min-h-[4rem] mb-6">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={lang}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="text-2xl font-semibold text-gray-900 dark:text-white"
                >
                  {t('modalTitle')}
                </motion.h3>
              </AnimatePresence>
            </div>
            <div className="min-h-[4rem] mb-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={lang + 'desc'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  className="text-gray-700 dark:text-gray-200"
                >
                  {t('modalDescription')}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="space-y-5">
              <a
                href="mailto:smartshadowofficial@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-100 dark:bg-gray-900/70 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('email')}</div>
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    smartshadowofficial@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://t.me/suntrasher"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-100 dark:bg-gray-900/70 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('telegram')}</div>
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    @suntrasher
                  </div>
                </div>
              </a>
            </div>

            <div className="min-h-[2rem] mt-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={lang + 'resp'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                  className="text-sm text-center text-gray-500 dark:text-gray-400"
                >
                  {t('responseTime')}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ========================
//  SCROLL TO TOP BUTTON
// ========================
const ScrollToTopButton = ({
  onOpenModal,
  t,
}: {
  onOpenModal: () => void;
  t: (key: keyof typeof translations['en']) => string;
}) => {
  const { scrollY } = useScroll();

  const rawOpacity = useTransform(scrollY, [200, 400], [0, 1]);
  const opacity = useSpring(rawOpacity, { stiffness: 200, damping: 30 });

  const rawX = useTransform(rawOpacity, [0, 1], [-20, 0]);
  const x = useSpring(rawX, { stiffness: 200, damping: 30 });

  const smoothScrollToTop = (duration: number) => {
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      window.scrollTo(0, start * (1 - ease));
      if (progress < 1) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  };

  const handleClick = () => {
    smoothScrollToTop(800);
    setTimeout(() => onOpenModal(), 800);
  };

  return (
    <motion.button
      style={{ opacity, x }}
      onClick={handleClick}
      className="fixed top-6 left-6 z-40 flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-sm md:text-base font-medium shadow-lg shadow-blue-600/30 transition-all"
      aria-label={t('scrollToTop')}
    >
      <ArrowUp className="w-5 h-5" />
      {t('heroCta')}
    </motion.button>
  );
};

// ========================
//  STICKY SHOWCASE SECTION
// ========================
const StickyShowcase = ({
  t,
  lang,
  theme,
}: {
  t: (key: keyof typeof translations['en']) => string;
  lang: 'en' | 'ru';
  theme: 'light' | 'dark';
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Конвертируем MotionValue в обычный number для передачи в Canvas
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setProgress(v));
    return unsub;
  }, [scrollYProgress]);

  const opacity1 = useTransform(scrollYProgress, [0, 0.33, 0.4], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.66, 0.73], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.63, 0.73, 1], [0, 1, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-white dark:bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-1/2 h-[70vh] md:h-[80vh]">
            <Umbrella3DScene progress={progress} theme={theme} />
          </div>

          <div className="w-full md:w-1/2 relative h-64 md:h-80">

            <motion.div style={{ opacity: opacity1 }} className="absolute inset-0 flex flex-col justify-center">
              <div className="min-h-[12rem] md:min-h-[16rem]">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={lang + 's1t'}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white"
                  >
                    {t('sticky1Title')}
                  </motion.h3>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={lang + 's1d'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: 0.1 }}
                    className="mt-4 text-xl text-gray-500 dark:text-gray-400"
                  >
                    {t('sticky1Desc')}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div style={{ opacity: opacity2 }} className="absolute inset-0 flex flex-col justify-center">
              <div className="min-h-[12rem] md:min-h-[16rem]">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={lang + 's2t'}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white"
                  >
                    {t('sticky2Title')}
                  </motion.h3>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={lang + 's2d'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: 0.1 }}
                    className="mt-4 text-xl text-gray-500 dark:text-gray-400"
                  >
                    {t('sticky2Desc')}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div style={{ opacity: opacity3 }} className="absolute inset-0 flex flex-col justify-center">
              <div className="min-h-[12rem] md:min-h-[16rem]">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={lang + 's3t'}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white"
                  >
                    {t('sticky3Title')}
                  </motion.h3>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={lang + 's3d'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: 0.1 }}
                    className="mt-4 text-xl text-gray-500 dark:text-gray-400"
                  >
                    {t('sticky3Desc')}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};


// ========================
//      TEAM CARD (UPDATED)
// ========================
const TeamCard = ({
  name,
  role,
  icon: Icon,
  lang,
  image,
}: {
  name: string;
  role: string;
  icon: React.ElementType;
  lang: 'en' | 'ru';
  image?: string;
}) => (
  <div className="h-full bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 flex flex-col items-center text-center border border-gray-100 dark:border-gray-800">
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-medium mb-4 overflow-hidden">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        name.split(' ').map(n => n[0]).join('')
      )}
    </div>
    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h4>
    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400 min-h-[3rem]">
      <Icon className="w-4 h-4 flex-shrink-0" />
      <AnimatePresence mode="wait">
        <motion.span
          key={lang + name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {role}
        </motion.span>
      </AnimatePresence>
    </div>
  </div>
);

// ========================
//         MAIN APP
// ========================
function App() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="font-sans antialiased bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        t={t}
        lang={lang}
      />

      <ScrollToTopButton
        onOpenModal={() => setIsModalOpen(true)}
        t={t}
      />

      {/* Fixed controls: language + theme */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-3">
        <button
          onClick={toggleLanguage}
          className="p-3 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all text-sm font-medium text-gray-700 dark:text-gray-300"
          aria-label={t('switchLanguage')}
        >
          {lang === 'en' ? 'RU' : 'EN'}
        </button>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
          aria-label={t('toggleTheme')}
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.jpg"
            alt="Beach umbrella"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="min-h-[14rem] md:min-h-[18rem] mb-10">
            <AnimatePresence mode="wait">
              <motion.h1
                key={lang}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
              >
                {t('heroTitle')}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={lang + 'sub'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="text-xl md:text-2xl text-white/90"
              >
                {t('heroSubtitle')}
              </motion.p>
            </AnimatePresence>
          </div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium shadow-lg shadow-blue-600/30 transition-all"
          >
            {t('heroCta')}
          </motion.button>
        </div>
      </section>

      <StickyShowcase t={t} lang={lang} theme={theme} />

      {/* Team Section */}
      <section className="py-24 px-6 md:px-8 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 min-h-[5rem] md:min-h-[4rem]">
            <AnimatePresence mode="wait">
              <motion.h2
                key={lang}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {t('teamTitle')}
              </motion.h2>
            </AnimatePresence>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 max-w-5xl mx-auto mb-16">
            <img
              src="/images/team.jpeg"
              alt="Smart Shadow Team"
              className="w-full h-auto block"
            />
            <div className="absolute bottom-8 left-8 hidden sm:flex">
              <div className="px-6 py-3 rounded-full bg-black/70 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  <span key={lang} className="text-white text-xl md:text-2xl font-medium">
                    {t('teamCaption')}
                  </span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TeamCard name="Ivan Turubar" role={t('ivanRole')} icon={Cpu} lang={lang} image="/images/team/Ivan.jpeg" />
            <TeamCard name="Konstantin Lishik" role={t('konstantinRole')} icon={Wrench} lang={lang} image="/images/team/Konstantin.jpeg" />
            <TeamCard name="Anton Goryainov" role={t('antonRole')} icon={Users} lang={lang} image="/images/team/Anton.JPG" />
            <TeamCard name="Alexander Petryaev" role={t('alexanderRole')} icon={Palette} lang={lang} image="/images/team/Alexander.jpg" />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-6 md:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 min-h-[5rem] md:min-h-[4rem]">
            <AnimatePresence mode="wait">
              <motion.h2
                key={lang}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {t('useCasesTitle')}
              </motion.h2>
            </AnimatePresence>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="relative rounded-3xl overflow-hidden h-80 md:h-96 group">
              <img
                src="/images/hotel.jpeg"
                alt="Hotel terrace"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-8">
                <div className="px-6 py-3 rounded-full bg-black/50 backdrop-blur-sm min-h-[3rem] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={lang + 'hotel'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-3xl font-semibold text-white"
                    >
                      {t('hotel')}
                    </motion.h3>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-80 md:h-96 group">
              <img
                src="/images/beach.jpeg"
                alt="Beach club"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-8">
                <div className="px-6 py-3 rounded-full bg-black/50 backdrop-blur-sm min-h-[3rem] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={lang + 'beach'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-3xl font-semibold text-white"
                    >
                      {t('beach')}
                    </motion.h3>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="py-16 px-6 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
            {t('qrTitle')}
          </h3>
          <img
            src="/images/t_me.jpg"
            alt="Telegram QR code"
            className="mx-auto w-48 h-48 md:w-64 md:h-64 object-contain rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <Umbrella className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <AnimatePresence mode="wait">
              <span key={lang} className="text-gray-500 dark:text-gray-400">
                {t('footer')}
              </span>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-5 mt-4 md:mt-0">
            <img src="/images/FSI.png" alt="FSI emblem" className="h-20 w-auto object-contain" />
            <img src="/images/MIPT.png" alt="MIPT logo" className="h-20 w-auto object-contain" />
          </div>
          <a
            href="mailto:smartshadowofficial@gmail.com"
            className="mt-4 md:mt-0 text-blue-600 dark:text-blue-400 hover:underline"
          >
            smartshadowofficial@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;