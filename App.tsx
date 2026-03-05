
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Diamond, Shield, Users, TrendingUp, Menu, X, ChevronDown, ArrowLeft, CheckCircle, MapPin } from 'lucide-react';
import { Feature, FAQItem } from './types';

const VerificationStamp: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite] opacity-20">
      <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
      <text className="text-[8px] font-black uppercase tracking-[0.2em] fill-[#d4af37]">
        <textPath xlinkHref="#circlePath">
          PT GRAHA CITRA PRIMA • OFFICIAL PARTNER • VERIFIED 2024 •
        </textPath>
      </text>
    </svg>
    <div className="relative z-10 bg-white border-4 border-[#d4af37] rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex flex-col items-center justify-center shadow-xl transform -rotate-12">
      <CheckCircle className="text-[#d4af37] mb-1" size={20} />
      <span className="text-[7px] sm:text-[8px] font-black text-black uppercase tracking-tighter text-center leading-none">Official<br/>Verified</span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'registration'>('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [activeFeature, setActiveFeature] = useState<{ title: string; desc: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    tier: 'Junior Partner (Rp 100.000 - Rp 500.000)'
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi Scroll yang lebih robust
  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Berikan waktu render untuk elemen muncul di DOM sebelum scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const navOffset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navOffset,
            behavior: 'smooth'
          });
        }
      }, 200);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const navOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navOffset,
          behavior: 'smooth'
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navigateToRegistration = () => {
    setCurrentPage('registration');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setShowSuccess(false);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleAdminChat = () => {
    // Membuka WhatsApp Admin Registrasi
    const message = "Halo Admin Registrasi Gucci Elite, saya ingin bertanya mengenai program kemitraan.";
    window.open(`https://wa.me/6285973690850?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `Nama: ${formData.name}\nUmur: ${formData.age}\nNomor Telepon: ${formData.phone}\nTarget: ${formData.tier}\n\nSaya ingin menjadi partner GUCCI, tolong bantu daftarkan akun kerja saya.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285973690850?text=${encodedMessage}`;

    // Simulasi pengiriman data ke server sebelum redirect
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      window.open(whatsappUrl, '_blank');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const commissionTiers = [
    { level: "Junior Partner", range: "Modal Rp 100.000", commission: "20%", benefits: "Akses Admin Dasar, Grup Komunitas" },
    { level: "Associate Partner", range: "Modal Rp 500.000+", commission: "35%", benefits: "Prioritas Grup, Workshop Mingguan" },
    { level: "Senior Partner", range: "Modal Rp 1.000.000+", commission: "50%", benefits: "Admin Hotline 24/7, Profit Sharing Bonus" },
  ];

  const faqs: FAQItem[] = [
    {
      question: "Apa itu Gucci Elite Partnership?",
      answer: "Ini adalah program kemitraan profesional yang dikelola oleh PT Graha Citra Prima sebagai penanggung jawab resmi mitra bisnis Gucci di Indonesia. Kami mengadopsi sistem manajemen akun mewah untuk membantu individu menghasilkan pendapatan harian."
    },
    {
      question: "Berapa modal minimal pendaftaran?",
      answer: "Pendaftaran hanya membutuhkan modal minimal Rp 100.000. Modal ini digunakan untuk aktivasi Akun Kerja Anda yang akan dipandu langsung oleh Admin Registrasi kami."
    },
    {
      question: "Apa itu Akun Kerja (Work Account)?",
      answer: "Akun Kerja adalah platform dashboard khusus yang berfungsi seperti e-wallet. Di sini Anda dapat memantau saldo pendapatan, riwayat transaksi, dan melakukan penarikan komisi secara real-time."
    },
    {
      question: "Apakah bisnis ini memiliki legalitas resmi?",
      answer: "Ya, program ini berada di bawah naungan PT Graha Citra Prima dan didukung oleh berbagai lembaga resmi di Indonesia untuk menjamin keamanan dan transparansi bagi seluruh mitra bisnis."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#d4af37] selection:text-white font-sans">
      {/* Feature Detail Modal */}
      <AnimatePresence>
        {activeFeature && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFeature(null)}
              className="absolute inset-0 bg-white/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl luxury-card p-10 md:p-16 rounded-[3rem] border-[#d4af37]/50 shadow-[0_0_100px_rgba(212,175,55,0.1)]"
            >
              <button 
                onClick={() => setActiveFeature(null)}
                className="absolute top-8 right-8 text-gray-400 hover:text-[#d4af37] transition-colors"
              >
                <X size={32} />
              </button>
              <div className="text-[#d4af37] mb-8"><Shield size={48} /></div>
              <h3 className="text-3xl md:text-5xl font-serif font-bold mb-8 gold-gradient">{activeFeature.title}</h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-10">
                {activeFeature.desc}
              </p>
              <button 
                onClick={() => setActiveFeature(null)}
                className="bg-gold-gradient text-black px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Tutup Penjelasan
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled || isMobileMenuOpen ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={navigateToHome}>
            <span className="text-2xl font-serif font-bold gold-gradient tracking-widest uppercase transition-transform group-hover:scale-105">Gucci Elite</span>
          </div>

          {/* Desktop Links - Semua Tombol Aktif */}
          <div className="hidden lg:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] items-center">
            <button onClick={() => scrollToSection('about')} className="hover:text-[#d4af37] transition-all py-2 border-b-2 border-transparent hover:border-[#d4af37] cursor-pointer outline-none">Tentang Bisnis</button>
            <button onClick={() => scrollToSection('evaluation')} className="hover:text-[#d4af37] transition-all py-2 border-b-2 border-transparent hover:border-[#d4af37] cursor-pointer outline-none">Evaluasi</button>
            <button onClick={() => scrollToSection('commission')} className="hover:text-[#d4af37] transition-all py-2 border-b-2 border-transparent hover:border-[#d4af37] cursor-pointer outline-none">Komisi</button>
            <button onClick={() => scrollToSection('security')} className="hover:text-[#d4af37] transition-all py-2 border-b-2 border-transparent hover:border-[#d4af37] cursor-pointer outline-none">Keamanan</button>
            <button onClick={() => scrollToSection('gallery')} className="hover:text-[#d4af37] transition-all py-2 border-b-2 border-transparent hover:border-[#d4af37] cursor-pointer outline-none">Gallery</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-[#d4af37] transition-all py-2 border-b-2 border-transparent hover:border-[#d4af37] cursor-pointer outline-none">FAQ</button>
            <button onClick={() => scrollToSection('location')} className="hover:text-[#d4af37] transition-all py-2 border-b-2 border-transparent hover:border-[#d4af37] cursor-pointer outline-none">Lokasi</button>
            <button 
              onClick={navigateToRegistration}
              className="bg-gold-gradient text-black px-8 py-2.5 rounded-full font-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              Join Program
            </button>
          </div>

          {/* Mobile Menu Button - Aktif */}
          <button 
            className="lg:hidden text-[#d4af37] p-2 active:bg-black/5 rounded-lg border border-[#d4af37]/20 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Content - Semua Link Aktif */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden fixed inset-0 top-[60px] bg-white/98 z-[90] p-10 flex flex-col gap-4 text-center"
            >
              <button onClick={() => scrollToSection('about')} className="text-3xl font-serif gold-gradient py-4 border-b border-black/5">Tentang Bisnis</button>
              <button onClick={() => scrollToSection('evaluation')} className="text-3xl font-serif py-4 border-b border-black/5">Evaluasi</button>
              <button onClick={() => scrollToSection('commission')} className="text-3xl font-serif py-4 border-b border-black/5">Komisi</button>
              <button onClick={() => scrollToSection('security')} className="text-3xl font-serif py-4 border-b border-black/5">Keamanan</button>
              <button onClick={() => scrollToSection('gallery')} className="text-3xl font-serif py-4 border-b border-black/5">Gallery</button>
              <button onClick={() => scrollToSection('faq')} className="text-3xl font-serif py-4 border-b border-black/5">FAQ</button>
              <button onClick={() => scrollToSection('location')} className="text-3xl font-serif py-4 border-b border-black/5">Lokasi</button>
              <button 
                onClick={navigateToRegistration}
                className="bg-gold-gradient text-black px-8 py-5 rounded-full font-black text-xl mt-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                Join Program Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.main 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
          {/* Hero Section */}
          <section className="relative h-screen flex items-center justify-center pt-16 overflow-hidden border-b-4 border-[#d4af37]/20 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.ctfassets.net/brzb6u29244a/3QlIAJhAncaOSuNA0NKjva/ce65cb585b6542da6e13669b750b748a/HeroCategory-Desktop_A0020YAAGRB1000_001_Default.png?w=2000&fm=avif&q=50" 
                alt="Luxury Background" 
                className="w-full h-full object-cover opacity-100 brightness-75 contrast-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            <div className="relative z-10 text-center px-6 max-w-5xl">
              <div className="flex justify-center mb-4 sm:mb-6">
                <VerificationStamp />
              </div>
              <p className="text-white tracking-[0.3em] sm:tracking-[0.5em] uppercase text-[9px] sm:text-[10px] mb-6 sm:mb-8 font-bold">Official Partnership Network</p>
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 leading-tight tracking-tighter uppercase font-serif text-white">
                Eksklusivitas <br />
                <span className="gold-gradient italic">Berpenghasilan</span>
              </h1>
              <p className="text-sm sm:text-base md:text-xl text-white mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
                Platform kemitraan resmi Gucci Elite. Hubungkan diri Anda dengan sistem manajemen akun profesional dan mulai hasilkan profit harian dengan bimbingan Admin Registrasi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <button 
                  onClick={navigateToRegistration}
                  className="bg-gold-gradient text-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-black text-base sm:text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl"
                >
                  Daftar Kemitraan
                </button>
                <button 
                  onClick={handleAdminChat}
                  className="border-2 border-white text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-white/10 transition-all transform hover:-translate-y-1 active:scale-95"
                >
                  Chat Advisor
                </button>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 sm:py-32 px-6 border-y border-black/5 scroll-mt-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-8 sm:mb-10 leading-none">Visi <span className="gold-gradient">Gucci Elite</span></h2>
                <div className="space-y-6 sm:space-y-8 text-gray-600 leading-relaxed text-base sm:text-lg">
                  <p>
                    Kami menyediakan ekosistem kerja digital yang aman dan terstruktur di bawah naungan <strong>PT Graha Citra Prima</strong>. Fokus utama kami adalah pemberdayaan mitra melalui sistem <strong>Akun Kerja (E-Wallet)</strong> yang transparan.
                  </p>
                  <p>
                    Setiap mitra diberikan panduan langsung oleh <strong>Admin Registrasi</strong> untuk membuat akun kerja dengan modal minimal hanya <strong>Rp 100.000</strong>. Sistem ini dirancang untuk memantau saldo pendapatan Anda secara akurat setiap harinya.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div 
                      onClick={() => setActiveFeature({
                        title: "Admin Registrasi",
                        desc: "Admin Registrasi adalah pendamping resmi yang akan membimbing Anda mulai dari proses pendaftaran hingga aktivasi Akun Kerja. Mereka memastikan setiap langkah dilakukan dengan benar sesuai prosedur PT Graha Citra Prima untuk menjamin keamanan data and dana Anda."
                      })}
                      className="luxury-card p-8 rounded-3xl group cursor-pointer hover:border-[#d4af37]/50 transition-all hover:bg-black/5"
                    >
                      <div className="text-[#d4af37] mb-4 group-hover:scale-110 transition-transform"><Users size={32} /></div>
                      <h4 className="text-black font-bold mb-2">Admin Registrasi</h4>
                      <p className="text-sm">Panduan langkah demi langkah dalam pembuatan Akun Kerja untuk memastikan operasional Anda berjalan lancar.</p>
                      <div className="mt-4 text-[10px] text-[#d4af37] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Klik untuk detail →</div>
                    </div>
                    <div 
                      onClick={() => setActiveFeature({
                        title: "E-Wallet System (Akun Kerja)",
                        desc: "Akun Kerja Anda berfungsi sebagai dompet digital (e-wallet) terpusat. Di sini, Anda dapat melihat arus kas masuk dari komisi harian, memantau pertumbuhan saldo secara real-time, and melakukan penarikan dana (withdraw) langsung ke rekening bank lokal pilihan Anda di Indonesia."
                      })}
                      className="luxury-card p-8 rounded-3xl group cursor-pointer hover:border-[#d4af37]/50 transition-all hover:bg-black/5"
                    >
                      <div className="text-[#d4af37] mb-4 group-hover:scale-110 transition-transform"><TrendingUp size={32} /></div>
                      <h4 className="text-black font-bold mb-2">E-Wallet System</h4>
                      <p className="text-sm">Pantau saldo pendapatan, riwayat komisi, and status penarikan dana Anda secara real-time melalui dashboard eksklusif.</p>
                      <div className="mt-4 text-[10px] text-[#d4af37] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Klik untuk detail →</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img src="https://media.gucci.com/dynamic/b3c8/2rUHbBMu3+u5kwys8NjSe_e5TdaLQ_EmFlweIdALxThfmgkUDHb0n+6actN+iZz+chIjeODxZtKZLaq1a9rgvc6LPj8hZRakgnbzgl5xpLuGnmADOikWMOgxEqDgufLZeXd+TPh5jkqwpGtv9tMExStM9tHQHIz5T7aY+dJvK+UkVJgOfZVWT35mI3a8i1hPdTbj+OLxtIgmfJxsZfE+2MGR9bpKc2ipGLhG00WJ2I4=/HBG_A0020_1920x1080.jpg" className="rounded-3xl border border-black/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]" alt="Work Account" />
                <div className="absolute -bottom-8 -right-8 bg-gold-gradient p-10 rounded-3xl text-black font-black text-center shadow-2xl transform rotate-3">
                  <div className="text-6xl font-serif">50%</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold">Max Commission</div>
                </div>
                <VerificationStamp className="absolute -top-12 -left-12 scale-75 md:scale-100" />
              </div>
            </div>
          </section>

          {/* Showcase Section */}
          <section className="py-20 sm:py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 sm:mb-20">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-6 italic gold-gradient">Excellence & Heritage</h2>
                <p className="text-gray-600 text-base sm:text-xl">Standar kemewahan global dalam setiap langkah operasional kami.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] h-[350px] sm:h-[450px] md:h-[500px] shadow-2xl">
                  <img src="https://nypost.com/wp-content/uploads/sites/2/2022/07/former-gucci-hq-london-sale-99.jpg?quality=75&strip=all&w=744" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Gucci HQ" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-10">
                    <h4 className="text-white text-xl sm:text-2xl font-serif font-bold mb-2">Global Headquarters</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">Pusat komando operasional kemitraan elit dunia.</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] h-[350px] sm:h-[450px] md:h-[500px] shadow-2xl lg:mt-12">
                  <img src="https://images.adsttc.com/media/images/5372/d042/c07a/80ac/fd00/0062/medium_jpg/1_est_giorno.jpg?1400033323" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Interior" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-10">
                    <h4 className="text-white text-xl sm:text-2xl font-serif font-bold mb-2">Luxury Environment</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">Ekosistem kerja yang dirancang untuk kenyamanan and prestise.</p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] h-[350px] sm:h-[450px] md:h-[500px] shadow-2xl">
                  <img src="http://t3.gstatic.com/images?q=tbn:ANd9GcSuW11C7FIMttHFqlG9GB1Pa5Kh6crd3m-WAxDq79gV1AdcEoFqEFzS9ibF9f7q7w" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Store" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-10">
                    <h4 className="text-white text-xl sm:text-2xl font-serif font-bold mb-2">Brand Presence</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">Identitas kuat yang menjamin kepercayaan pasar global.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Evaluation Section */}
          <section id="evaluation" className="py-20 sm:py-32 px-6 bg-gray-50 scroll-mt-24">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-12 sm:mb-20 italic">Program Evaluasi Resmi</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                  { [
                    { step: "01", title: "Aktivasi Modal", desc: "Aktivasi modal minimal Rp 100.000 untuk pembukaan slot Akun Kerja and biaya sistem operasional Anda.", detail: "Modal minimal Rp 100.000 digunakan untuk mengaktifkan lisensi kemitraan and membuka akses ke sistem operasional Gucci Elite. Dana ini sepenuhnya menjadi saldo awal atau biaya aktivasi sistem yang dikelola secara transparan." },
                    { step: "02", title: "Pembuatan Akun", desc: "Proses pembuatan Akun Kerja (E-Wallet) yang dipandu langsung oleh Admin Registrasi resmi.", detail: "Proses ini melibatkan verifikasi identitas and pembuatan kredensial login untuk Akun Kerja Anda. Admin Registrasi akan memberikan panduan teknis melalui WhatsApp untuk memastikan akun Anda siap digunakan dalam hitungan menit." },
                    { step: "03", title: "Monitoring Hasil", desc: "Pantau saldo pendapatan harian Anda and lakukan penarikan komisi langsung ke rekening pribadi.", detail: "Setelah akun aktif, Anda dapat mulai menjalankan tugas kemitraan. Setiap hasil kerja akan langsung dikreditkan ke saldo Akun Kerja Anda. Transparansi adalah prioritas kami, sehingga Anda memiliki kendali penuh atas setiap rupiah yang Anda hasilkan." }
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setActiveFeature({ title: item.title, desc: item.detail })}
                      className="luxury-card p-12 rounded-[3.5rem] relative overflow-hidden group hover:bg-[#d4af37]/5 transition-all cursor-pointer"
                    >
                      <div className="text-9xl font-serif italic absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">{item.step}</div>
                      <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center text-black font-black text-2xl mb-8 mx-auto shadow-lg">{item.step}</div>
                      <h3 className="text-2xl font-bold mb-6 text-[#d4af37]">{item.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
                      <div className="mt-6 text-[10px] text-[#d4af37] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Lihat Penjelasan Lengkap →</div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* Commission Section */}
          <section id="commission" className="py-20 sm:py-32 px-6 scroll-mt-24">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-6 uppercase tracking-tight">Struktur Komisi Kemitraan</h2>
              <p className="text-gray-600 text-base sm:text-xl mb-12 sm:mb-20 max-w-2xl mx-auto">Sistem pembagian profit yang adil and transparan bagi seluruh level mitra.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {commissionTiers.map((tier, idx) => (
                  <div key={idx} className={`p-1 rounded-[3rem] ${idx === 2 ? 'bg-gold-gradient shadow-[0_0_40px_rgba(212,175,55,0.2)]' : 'bg-black/5'}`}>
                    <div className="bg-white p-12 rounded-[2.8rem] h-full flex flex-col items-center">
                      <h4 className="text-sm font-bold text-[#d4af37] mb-4 uppercase tracking-[0.3em]">{tier.level}</h4>
                      <div className="text-7xl font-serif font-black gold-gradient mb-8 leading-none">{tier.commission}</div>
                      <div className="w-full h-[1px] bg-black/10 mb-8"></div>
                      <p className="text-gray-600 mb-8 font-medium">{tier.range}</p>
                      <p className="text-black font-bold italic text-sm">{tier.benefits}</p>
                      <button 
                        onClick={navigateToRegistration}
                        className={`mt-10 w-full py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all ${idx === 2 ? 'bg-gold-gradient text-black hover:scale-105' : 'border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10'}`}
                      >
                        Pilih Level Ini
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Security & Legality Section */}
          <section id="security" className="py-32 px-6 bg-white scroll-mt-24">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="luxury-card p-12 rounded-[4rem] border-[#d4af37]/30 shadow-2xl">
                  <div className="flex justify-center mb-8 bg-gold-gradient/10 w-24 h-24 rounded-full items-center mx-auto text-[#d4af37]"><Shield size={48} /></div>
                  <h4 className="text-3xl font-serif font-bold mb-8 text-center text-[#d4af37]">Legalitas & Keamanan</h4>
                  <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                    <p>
                      Program ini dikelola secara profesional oleh <strong>PT Graha Citra Prima</strong> sebagai entitas hukum resmi yang bertanggung jawab atas kemitraan bisnis Gucci di Indonesia.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex gap-4 items-start">
                        <span className="text-[#d4af37] font-bold">●</span>
                        <span><strong>Entitas Resmi:</strong> Terdaftar di bawah naungan PT Graha Citra Prima dengan legalitas hukum Indonesia yang lengkap.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="text-[#d4af37] font-bold">●</span>
                        <span><strong>Dukungan Lembaga:</strong> Operasional kami didukung oleh standar keamanan data nasional and pengawasan lembaga terkait.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="text-[#d4af37] font-bold">●</span>
                        <span><strong>Transparansi Dana:</strong> Sistem Akun Kerja memastikan setiap rupiah modal and pendapatan Anda tercatat secara transparan.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-10">
                  <h2 className="text-4xl md:text-6xl font-serif font-bold leading-none italic uppercase tracking-tighter">Kemitraan <br/> <span className="gold-gradient">Resmi Indonesia</span></h2>
                  <p className="text-gray-600 text-xl leading-relaxed">
                    Kami menjamin keamanan investasi Anda melalui sistem <strong>Escrow Terpadu</strong> and pengawasan langsung oleh <strong>PT Graha Citra Prima</strong>. Setiap mitra memiliki hak penuh atas saldo di Akun Kerja mereka.
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <div 
                      onClick={() => setActiveFeature({
                        title: "PT Graha Citra Prima",
                        desc: "Sebagai penanggung jawab tunggal mitra bisnis Gucci di Indonesia, PT Graha Citra Prima menjamin seluruh operasional berjalan sesuai dengan hukum perdagangan and regulasi digital yang berlaku di Republik Indonesia. Kami memiliki izin resmi untuk mengelola jaringan kemitraan ini secara nasional."
                      })}
                      className="bg-black/5 p-6 rounded-2xl border border-black/10 flex-1 min-w-[120px] text-center cursor-pointer hover:border-[#d4af37] transition-all group"
                    >
                      <div className="font-black text-2xl gold-gradient mb-2 uppercase group-hover:scale-105 transition-transform">PT GCP</div>
                      <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Penanggung Jawab</div>
                    </div>
                    <div 
                      onClick={() => setActiveFeature({
                        title: "Sistem Terdaftar KOMINFO",
                        desc: "Sistem digital kami telah melalui proses standarisasi and pendaftaran pada lembaga terkait (PSE KOMINFO) untuk memastikan keamanan siber and perlindungan data pribadi seluruh mitra kami di Indonesia. Kami berkomitmen pada transparansi and kepatuhan regulasi."
                      })}
                      className="bg-black/5 p-6 rounded-2xl border border-black/10 flex-1 min-w-[120px] text-center cursor-pointer hover:border-[#d4af37] transition-all group"
                    >
                      <div className="font-black text-2xl gold-gradient mb-2 uppercase group-hover:scale-105 transition-transform">KOMINFO</div>
                      <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Sistem Terdaftar</div>
                    </div>
                    <div 
                      onClick={() => setActiveFeature({
                        title: "Pengawasan Lembaga Keuangan",
                        desc: "Seluruh lalu lintas dana pada sistem Akun Kerja (E-Wallet) dipantau untuk memastikan kepatuhan terhadap regulasi anti-pencucian uang and perlindungan konsumen digital di Indonesia, memberikan rasa aman ekstra bagi setiap mitra."
                      })}
                      className="bg-black/5 p-6 rounded-2xl border border-black/10 flex-1 min-w-[120px] text-center cursor-pointer hover:border-[#d4af37] transition-all group"
                    >
                      <div className="font-black text-2xl gold-gradient mb-2 uppercase group-hover:scale-105 transition-transform">OJK / BI</div>
                      <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Pengawasan Dana</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Lifestyle & Heritage Gallery */}
          <section id="gallery" className="py-24 sm:py-32 px-6 bg-[#050505] overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 sm:mb-20">
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold gold-gradient leading-none italic uppercase tracking-tighter mb-6">
                  Lifestyle <br/> <span className="text-white">Heritage</span>
                </h2>
                <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
                  Visualisasi eksklusivitas and kemewahan yang menjadi standar dalam ekosistem Gucci Elite.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="space-y-4 sm:gap-6 flex flex-col">
                  <motion.img 
                    whileHover={{ scale: 1.02 }}
                    src="https://i.pinimg.com/1200x/d2/9b/d8/d29bd8472ea6752ed8ef9bbc1a7ed50d.jpg" 
                    className="w-full h-64 sm:h-80 object-cover rounded-3xl border border-white/10 shadow-2xl" 
                    alt="Luxury 1"
                    referrerPolicy="no-referrer"
                  />
                  <motion.img 
                    whileHover={{ scale: 1.02 }}
                    src="https://i.pinimg.com/736x/51/4c/de/514cde91fccea67b7048277ac74348f5.jpg" 
                    className="w-full h-48 sm:h-60 object-cover rounded-3xl border border-white/10 shadow-2xl" 
                    alt="Luxury 2"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4 sm:gap-6 flex flex-col pt-8 sm:pt-12">
                  <motion.img 
                    whileHover={{ scale: 1.02 }}
                    src="https://i.pinimg.com/736x/89/a3/e8/89a3e83709910ed091c9fb1e5ce46c61.jpg" 
                    className="w-full h-80 sm:h-[400px] object-cover rounded-3xl border border-white/10 shadow-2xl" 
                    alt="Luxury 3"
                    referrerPolicy="no-referrer"
                  />
                  <motion.img 
                    whileHover={{ scale: 1.02 }}
                    src="https://i.pinimg.com/736x/16/e4/18/16e418a4e478b4b20fa5991febf039e3.jpg" 
                    className="w-full h-40 sm:h-52 object-cover rounded-3xl border border-white/10 shadow-2xl" 
                    alt="Luxury 4"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4 sm:gap-6 flex flex-col">
                  <motion.img 
                    whileHover={{ scale: 1.02 }}
                    src="https://i.pinimg.com/736x/ea/63/37/ea6337f95e86a29f7187f82915c32084.jpg" 
                    className="w-full h-48 sm:h-64 object-cover rounded-3xl border border-white/10 shadow-2xl" 
                    alt="Luxury 5"
                    referrerPolicy="no-referrer"
                  />
                  <motion.img 
                    whileHover={{ scale: 1.02 }}
                    src="https://i.pinimg.com/736x/e4/9d/a9/e49da9e3521e3d909b1efd4ee876a507.jpg" 
                    className="w-full h-64 sm:h-96 object-cover rounded-3xl border border-white/10 shadow-2xl" 
                    alt="Luxury 6"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4 sm:gap-6 flex flex-col pt-12 sm:pt-20">
                  <motion.img 
                    whileHover={{ scale: 1.02 }}
                    src="https://i.pinimg.com/736x/e8/f9/9e/e8f99e9327b49458f9fa7c65c3668b6d.jpg" 
                    className="w-full h-80 sm:h-[450px] object-cover rounded-3xl border border-white/10 shadow-2xl" 
                    alt="Luxury 7"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-20 sm:py-32 px-6 scroll-mt-24">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold mb-12 sm:mb-20 text-center italic gold-gradient">FAQ</h2>
              <div className="space-y-4 sm:space-y-6">
                {faqs.map((faq, index) => (
                  <details key={index} className="luxury-card rounded-3xl group transition-all duration-300">
                    <summary className="p-10 cursor-pointer font-bold list-none flex justify-between items-center text-xl md:text-2xl hover:text-[#d4af37] transition-colors">
                      {faq.question}
                      <ChevronDown className="text-[#d4af37] group-open:rotate-180 transition-transform" size={32} />
                    </summary>
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="px-10 pb-10 text-gray-600 text-lg leading-relaxed border-t border-black/5 pt-8 mt-2 overflow-hidden"
                    >
                      {faq.answer}
                    </motion.div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Location Section */}
          <section id="location" className="py-20 sm:py-32 px-6 bg-gray-50 scroll-mt-24">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-3 bg-gold-gradient/10 px-6 py-2 rounded-full border border-[#d4af37]/20 mb-6 sm:mb-8">
                  <MapPin className="text-[#d4af37]" size={20} />
                  <span className="text-[#d4af37] font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em]">Kantor Pusat Operasional</span>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight italic gold-gradient uppercase tracking-tighter">
                  Kunjungi <br/> <span className="text-black">Headquarters Kami</span>
                </h2>
              </div>

              <div className="flex justify-center">
                {/* Address Card */}
                <div className="luxury-card p-10 md:p-16 rounded-[3rem] border-[#d4af37]/30 shadow-xl bg-white flex flex-col justify-center max-w-2xl w-full text-center">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[#d4af37] font-black text-xs uppercase tracking-widest mb-4">Alamat Resmi</h4>
                      <p className="text-gray-600 text-xl md:text-2xl leading-relaxed">
                        <strong>Gedung Pusat Grosir Cililitan (PGC)</strong><br/>
                        Lantai 6 Jl. Dewi Sartika RT 001 RW 013,<br/>
                        Kelurahan Cililitan, RW.11, Kecamatan,<br/>
                        Kec. Kramat Jati, Kota Jakarta Timur,<br/>
                        DKI Jakarta 13630, Indonesia
                      </p>
                    </div>
                    
                    <div className="pt-8 border-t border-black/5">
                      <div className="flex items-center justify-center gap-4 text-sm font-bold text-gray-400 mb-8">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span>OPERASIONAL: SENIN - JUMAT (09:00 - 18:00)</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Gedung+Pusat+Grosir+Cililitan+PGC+Lantai+6', '_blank')}
                          className="bg-gold-gradient text-black px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2 flex-1"
                        >
                          Navigasi Langsung →
                        </button>
                        <button 
                          onClick={handleAdminChat}
                          className="border border-[#d4af37] text-[#d4af37] px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#d4af37]/10 transition-all flex items-center justify-center gap-2 flex-1"
                        >
                          Hubungi Kantor
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="py-24 sm:py-40 px-6 relative overflow-hidden bg-gradient-to-t from-white to-transparent">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[800px] h-[200px] sm:h-[400px] bg-[#d4af37]/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none"></div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-8 sm:mb-10 italic leading-none tracking-tighter uppercase font-serif">Masa Depan <br/> <span className="gold-gradient">Dimulai Sekarang</span>.</h2>
              <p className="text-lg sm:text-xl md:text-3xl text-gray-600 mb-10 sm:mb-16 max-w-3xl mx-auto">Jadilah bagian dari jaringan bisnis elit dengan penghasilan yang terus bertumbuh.</p>
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 justify-center items-center">
                <button 
                  onClick={navigateToRegistration}
                  className="w-full sm:w-auto bg-gold-gradient text-black px-10 sm:px-20 py-5 sm:py-8 rounded-full font-black text-xl sm:text-3xl hover:scale-110 transition-transform shadow-[0_0_60px_rgba(212,175,55,0.3)] animate-bounce"
                >
                  JOIN PROGRAM ELITE
                </button>
              </div>
              <p className="mt-10 sm:mt-12 text-[#d4af37] font-mono text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.5em] font-bold">Limited Slots: 8 Left</p>
            </div>
          </section>
          </motion.main>
        ) : (
          /* Registration Page - Tampilan Baru Aktif */
          <motion.section 
            key="registration"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-40 pb-20 px-6 bg-white"
          >
            <div className="max-w-4xl mx-auto">
              {!showSuccess ? (
                <>
                  <div className="text-center mb-16">
                    <button onClick={navigateToHome} className="text-[#d4af37] text-sm font-black uppercase tracking-widest mb-6 hover:opacity-70 transition-opacity flex items-center gap-2 mx-auto">
                      <ArrowLeft size={16} /> BERANDA
                    </button>
                  <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold gold-gradient mb-6 uppercase tracking-tight">Kemitraan Baru</h1>
                  <p className="text-lg sm:text-xl md:text-2xl font-medium">Isi formulir pendaftaran untuk memulai program evaluasi resmi.</p>
                </div>

                <div className="luxury-card p-8 sm:p-10 md:p-20 rounded-[2.5rem] sm:rounded-[4rem] border-[#d4af37]/40 shadow-[0_0_50px_rgba(212,175,55,0.05)] relative">
                  {isSubmitting && (
                    <div className="absolute inset-0 bg-white/80 rounded-[2.5rem] sm:rounded-[4rem] z-50 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-6"></div>
                      <p className="text-[#d4af37] text-sm sm:text-base font-bold tracking-widest animate-pulse">MEMPROSES DATA MITRA...</p>
                    </div>
                  )}

                  <form className="space-y-8 sm:space-y-10" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
                      <div className="space-y-4">
                        <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400">Nama Lengkap (KTP)</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Masukkan nama resmi Anda" 
                          className="w-full bg-black/5 border-2 border-black/10 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-4 sm:py-5 outline-none focus:border-[#d4af37] transition-all text-base sm:text-lg font-medium" 
                          required 
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400">Kontak WhatsApp</label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Contoh: 0812xxxxxxxx" 
                          className="w-full bg-black/5 border-2 border-black/10 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-4 sm:py-5 outline-none focus:border-[#d4af37] transition-all text-base sm:text-lg font-medium" 
                          required 
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400">Umur</label>
                        <input 
                          type="number" 
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          placeholder="Masukkan umur Anda" 
                          className="w-full bg-black/5 border-2 border-black/10 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-4 sm:py-5 outline-none focus:border-[#d4af37] transition-all text-base sm:text-lg font-medium" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400">Target Kemitraan</label>
                      <select 
                        value={formData.tier}
                        onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                        className="w-full bg-black/5 border-2 border-black/10 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-4 sm:py-5 outline-none focus:border-[#d4af37] transition-all text-base sm:text-lg font-medium appearance-none"
                      >
                        <option className="bg-white" value="Junior Partner (Rp 100.000 - Rp 500.000)">Junior Partner (Rp 100.000 - Rp 500.000)</option>
                        <option className="bg-white" value="Associate Partner (Rp 500.000 - Rp 1.000.000)">Associate Partner (Rp 500.000 - Rp 1.000.000)</option>
                        <option className="bg-white" value="Senior Partner (Rp 1.000.000+)">Senior Partner (Rp 1.000.000+)</option>
                      </select>
                    </div>

                    <div className="p-6 sm:p-8 bg-gold-gradient/5 rounded-2xl sm:rounded-[2rem] border-2 border-[#d4af37]/20">
                      <h5 className="text-[#d4af37] font-bold mb-2 text-xs sm:text-sm uppercase tracking-widest">Informasi Penting:</h5>
                      <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                        Data Anda akan diverifikasi secara manual oleh tim Admin Registrasi pusat. Pastikan nomor kontak aktif agar kami dapat segera menghubungi Anda melalui WhatsApp untuk tahap pembuatan Akun Kerja (E-Wallet).
                      </p>
                    </div>

                    <button type="submit" className="w-full bg-gold-gradient text-black py-5 sm:py-8 rounded-full font-black text-xl sm:text-2xl hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all transform active:scale-95 shadow-2xl">
                      KIRIM PERMOHONAN RESMI
                    </button>
                  </form>
                </div>
              </>
            ) : (
              /* Success State - Tombol Kembali Aktif */
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12 sm:py-20"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-8 sm:mb-12 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                    <Shield size={48} className="sm:hidden text-black" />
                    <Shield size={64} className="hidden sm:block text-black" />
                  </div>
                  <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold gold-gradient mb-6 sm:mb-8 uppercase italic">Pendaftaran Berhasil!</h2>
                  <p className="text-lg sm:text-2xl text-gray-600 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">Admin Registrasi kami sedang melakukan verifikasi data Anda. Mohon tunggu pesan resmi melalui WhatsApp dalam waktu 1x24 jam.</p>
                  <div className="flex flex-col md:flex-row gap-4 sm:gap-6 justify-center">
                    <button onClick={navigateToHome} className="bg-black/5 text-black px-10 sm:px-14 py-4 sm:py-6 rounded-full font-black text-lg sm:text-xl hover:bg-black/10 transition-all active:scale-95">
                      KEMBALI KE BERANDA
                    </button>
                    <button onClick={handleAdminChat} className="bg-gold-gradient text-black px-10 sm:px-14 py-4 sm:py-6 rounded-full font-black text-lg sm:text-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all active:scale-95 shadow-xl">
                      HUBUNGI ADMIN REGISTRASI
                    </button>
                  </div>
                </motion.div>
            )}
          </div>
        </motion.section>
      )}
    </AnimatePresence>

      {/* Standard Footer - Semua Tombol Aktif */}
      <footer className="py-24 px-6 border-t border-black/5 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-left">
          <div className="col-span-1 md:col-span-2">
            <button onClick={navigateToHome} className="text-4xl font-serif font-bold gold-gradient tracking-widest uppercase mb-8 hover:scale-105 transition-transform outline-none cursor-pointer">Gucci Elite</button>
            <p className="text-gray-600 mt-6 max-w-sm mx-auto md:mx-0 leading-relaxed text-lg italic">
              "Pemberdayaan mitra melalui manajemen aset digital yang cerdas and transparan."
            </p>
            <div className="mt-10 flex justify-center md:justify-start gap-6">
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:border-[#d4af37] transition-colors cursor-pointer text-black"><Crown size={20} /></div>
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:border-[#d4af37] transition-colors cursor-pointer text-black"><Diamond size={20} /></div>
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:border-[#d4af37] transition-colors cursor-pointer text-black"><Shield size={20} /></div>
            </div>
          </div>
          <div>
            <h5 className="text-black font-black mb-8 uppercase text-[10px] tracking-[0.4em]">Navigasi Utama</h5>
            <ul className="space-y-6 text-gray-600 text-sm font-bold uppercase tracking-widest">
              <li><button onClick={() => scrollToSection('about')} className="hover:text-[#d4af37] transition-colors cursor-pointer outline-none">Tentang Bisnis</button></li>
              <li><button onClick={() => scrollToSection('evaluation')} className="hover:text-[#d4af37] transition-colors cursor-pointer outline-none">Program Evaluasi</button></li>
              <li><button onClick={navigateToRegistration} className="hover:text-[#d4af37] transition-colors cursor-pointer outline-none">Join Mitra Baru</button></li>
              <li><button onClick={handleAdminChat} className="hover:text-[#d4af37] transition-colors cursor-pointer outline-none">Pusat Admin</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-black font-black mb-8 uppercase text-[10px] tracking-[0.4em]">Alamat Kantor</h5>
            <p className="text-gray-500 text-[10px] leading-relaxed font-bold uppercase tracking-widest">
              Gedung PGC Lantai 6<br/>
              Jl. Dewi Sartika RT 001 RW 013<br/>
              Cililitan, Kramat Jati<br/>
              Jakarta Timur, 13630<br/>
              Indonesia
            </p>
          </div>
          <div>
            <h5 className="text-black font-black mb-8 uppercase text-[10px] tracking-[0.4em]">Legalitas & Izin</h5>
            <ul className="space-y-6 text-gray-600 text-sm font-bold uppercase tracking-widest">
              <li>Terdaftar PSE KOMINFO</li>
              <li>Izin PT Graha Citra Prima</li>
              <li>Pengawasan Siber RI</li>
              <li>Sertifikasi Keamanan</li>
            </ul>
          </div>
        </div>
        <div className="mt-24 pt-12 border-t border-black/5 text-center text-gray-500 text-[10px] uppercase font-black tracking-[0.5em] animate-pulse">
          &copy; 2024 Gucci Elite Network. Managed by PT Graha Citra Prima.
        </div>
      </footer>
    </div>
  );
};

export default App;
