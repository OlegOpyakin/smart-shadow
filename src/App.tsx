import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Umbrella, Wrench, Eye, Box, Cpu, X, Mail, Send, Phone } from 'lucide-react';

// --- Theme Toggle Hook ---
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

// --- Contact Modal Component ---
const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Request a Demo
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Our team is ready to show you how Smart Shadow can transform your outdoor space.
            </p>

            <div className="space-y-5">
              <a
                href="mailto:hello@smartshadow.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    hello@smartshadow.com
                  </div>
                </div>
              </a>

              <a
                href="https://t.me/smartshadow"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Telegram</div>
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    @smartshadow
                  </div>
                </div>
              </a>

              <a
                href="tel:+1234567890"
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    +1 (234) 567-890
                  </div>
                </div>
              </a>
            </div>

            <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
              We typically respond within a few hours.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Sticky Scroll Section with Apple-style text swap ---
const StickyShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.33, 0.4], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.66, 0.73], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.63, 0.73, 1], [0, 1, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-white dark:bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
              <UmbrellaIllustration />
            </div>
          </div>

          <div className="w-full md:w-1/2 relative h-64 md:h-80">
            <motion.div style={{ opacity: opacity1 }} className="absolute inset-0 flex flex-col justify-center">
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Tracks the sun in real-time.
              </h3>
              <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                Our proprietary optical sensors continuously adjust the canopy angle.
              </p>
            </motion.div>

            <motion.div style={{ opacity: opacity2 }} className="absolute inset-0 flex flex-col justify-center">
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Powered by motion. No batteries, no wires.
              </h3>
              <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                A whisper-quiet mechanism harvests energy from the sun's movement.
              </p>
            </motion.div>

            <motion.div style={{ opacity: opacity3 }} className="absolute inset-0 flex flex-col justify-center">
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Perfect for hotel terraces and beachfronts.
              </h3>
              <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                Elevate guest experience with effortless, all-day shade.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Sleek Umbrella SVG ---
const UmbrellaIllustration = () => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path
      d="M60 180 C60 80, 160 40, 200 40 C240 40, 340 80, 340 180"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      className="text-blue-500 dark:text-blue-400"
      fill="none"
    />
    <path
      d="M80 160 C100 100, 160 70, 200 70 C240 70, 300 100, 320 160"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className="text-blue-400/60 dark:text-blue-300/60"
      fill="none"
    />
    <line x1="200" y1="180" x2="200" y2="320" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-gray-700 dark:text-gray-300" />
    <rect x="170" y="310" width="60" height="20" rx="10" fill="currentColor" className="text-gray-600 dark:text-gray-400" />
    <circle cx="200" cy="330" r="15" fill="currentColor" className="text-gray-500 dark:text-gray-500" />
    <circle cx="200" cy="330" r="8" fill="currentColor" className="text-gray-300 dark:text-gray-600" />
    <circle cx="200" cy="190" r="30" stroke="currentColor" strokeWidth="2" className="text-gray-400/50 dark:text-gray-500/50" fill="none" />
    <circle cx="200" cy="190" r="22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-gray-400/70 dark:text-gray-500/70" fill="none" />
  </svg>
);

// --- Team Member Card ---
const TeamCard = ({ name, role, icon: Icon }: { name: string; role: string; icon: React.ElementType }) => (
  <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 flex flex-col items-center text-center border border-gray-100 dark:border-gray-800">
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-medium mb-4">
      {name.split(' ').map(n => n[0]).join('')}
    </div>
    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h4>
    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
      <Icon className="w-4 h-4" />
      <span>{role}</span>
    </div>
  </div>
);

// --- Main App ---
function App() {
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="font-sans antialiased bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Fixed Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-40 p-3 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </button>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
            alt="Beach umbrella"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
          >
            Smart Shadow.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl md:text-2xl text-white/90 mb-10"
          >
            The shade that follows you. Automatically.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium shadow-lg shadow-blue-600/30 transition-all"
          >
            Request a Demo
          </motion.button>
        </div>
      </section>

      <StickyShowcase />

      {/* The Team Section */}
      <section className="py-24 px-6 md:px-8 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-16 text-gray-900 dark:text-white">
            Built by Engineers.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TeamCard name="Anton Goryainov" role="Mechanical Rotation System" icon={Wrench} />
            <TeamCard name="Konstantin Lishik" role="Optical Sensors" icon={Eye} />
            <TeamCard name="Alexander Petryaev" role="Enclosure & Materials" icon={Box} />
            <TeamCard name="Ivan Turubar" role="Microcontroller Firmware" icon={Cpu} />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-6 md:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-16 text-gray-900 dark:text-white">
            Where Comfort Meets Technology.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="relative rounded-3xl overflow-hidden h-80 md:h-96 group">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Hotel terrace"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-8">
                <h3 className="text-3xl font-semibold text-white">Hotel Terraces</h3>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-80 md:h-96 group">
              <img
                src="https://images.unsplash.com/photo-1533636721331-7d7e4d3e5e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Beach club"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-8">
                <h3 className="text-3xl font-semibold text-white">Beach Clubs</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Umbrella className="w-5 h-5" />
            <span>© 2026 Smart Shadow</span>
          </div>
          <a
            href="mailto:hello@smartshadow.com"
            className="mt-4 md:mt-0 text-blue-600 dark:text-blue-400 hover:underline"
          >
            hello@smartshadow.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;