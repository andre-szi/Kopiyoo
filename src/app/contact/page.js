'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Coffee,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Building2,
  ArrowRight
} from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';

export default function ContactPage() {
  const { showToast } = useCoffee();

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Pemesanan & Produk',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Mohon lengkapi nama, email, dan pesan Anda!', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending form
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Pesan Anda berhasil dikirim! Tim kami akan menghubungi Anda segera.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Pemesanan & Produk',
        message: ''
      });
    }, 1200);
  };

  const faqs = [
    {
      q: 'Apakah KopiYoo melayani pasokan berkala untuk Coffee Shop atau Restoran (B2B)?',
      a: 'Ya, tentu! Kami menyediakan program kemitraan B2B dengan harga grosir khusus, batch roasting sesuai pesanan (custom roast profile), serta konsistensi pasokan bulanan langsung dari sentra perkebunan Aceh Tengah.'
    },
    {
      q: 'Berapa lama waktu simpan (shelf life) dan waktu istirahat (resting time) biji kopi?',
      a: 'Biji kopi kami di-roasting segar mingguan. Kami menyarankan masa resting (degassing) 7–14 hari setelah tanggal roast untuk ekstraksi rasa optimal. Biji kopi dapat bertahan dalam kondisi prima hingga 6–8 bulan dalam kemasan valve bersegel.'
    },
    {
      q: 'Apakah bisa memesan kopi dalam bentuk bubuk gilingan (grind size) khusus?',
      a: 'Bisa. Pada saat checkout atau pemesanan, Anda dapat memilih profil gilingan: Biji Utuh (Whole Bean), Giling Kasar (Cold Brew, French Press), Giling Medium (V60, Aeropress), atau Giling Halus (Espresso, Mokapot, Tubruk).'
    },
    {
      q: 'Bagaimana garansi pengiriman dan keaslian produk?',
      a: 'Kami menjamin 100% Single Origin Arabika Dataran Tinggi Gayo tanpa campuran. Jika kemasan diterima dalam keadaan cacat atau tidak sesuai pesanan, kami menyediakan garansi penggantian baru tanpa biaya tambahan.'
    },
    {
      q: 'Apakah pengunjung bisa berkunjung langsung ke fasilitas Roastery di Takengon?',
      a: 'Kami sangat menyambut kunjungan Anda! Roastery & Tasting Room kami buka untuk umum dari hari Senin hingga Sabtu. Silakan konfirmasi via WhatsApp sebelum berkunjung untuk menjadwalkan sesi cupping eksklusif.'
    }
  ];

  return (
    <div style={{ paddingTop: 36, paddingBottom: 80 }} className="container">
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#9ca3af', marginBottom: 28 }}>
        <Link href="/" style={{ color: '#d1c7bc', textDecoration: 'none' }}>
          Beranda
        </Link>
        <span>/</span>
        <span style={{ color: '#f59e0b', fontWeight: 600 }}>Kontak</span>
      </div>

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#fbbf24',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: 16
          }}
        >
          <Sparkles size={14} />
          <span>ROASTERY &amp; LAYANAN PELANGGAN RESMI</span>
        </div>

        <h1 className="font-serif" style={{ fontSize: '2.5rem', color: '#fcf9f2', marginBottom: 14, lineHeight: 1.2 }}>
          Hubungi Kami &amp; Terhubung dengan Perkebunan Kopi Gayo
        </h1>
        <p style={{ fontSize: '1rem', color: '#d1c7bc', lineHeight: 1.6 }}>
          Punya pertanyaan seputar varietas biji kopi spesialti, pesanan partai besar (Café &amp; Roastery Supply), atau ingin konsultasi profil seduh? Tim KopiYoo siap melayani Anda sepenuh hati.
        </p>
      </motion.div>

      {/* 4 Direct Contact Channels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
          marginBottom: 48
        }}
      >
        {/* Card 1: WhatsApp */}
        <a
          href="https://wa.me/6281234567890?text=Halo%20Admin%20KopiYoo,%20saya%20ingin%20bertanya%20seputar%20produk%20kopi%20Gayo."
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel"
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            textDecoration: 'none',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            background: 'rgba(24, 20, 17, 0.85)',
            transition: 'all 0.25s ease'
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(22, 163, 74, 0.35)'
            }}
          >
            <Phone size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#86efac', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              WhatsApp (Respon Cepat)
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fcf9f2', marginTop: 4 }}>
              +62 812-3456-7890
            </div>
            <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: 4, margin: 0 }}>
              Chat langsung dengan Customer Support kami.
            </p>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#4ade80', fontWeight: 600 }}>
            <span>Buka WhatsApp</span>
            <ExternalLink size={13} />
          </div>
        </a>

        {/* Card 2: Email */}
        <a
          href="mailto:halo@kopiyoo.id"
          className="glass-panel"
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            textDecoration: 'none',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            background: 'rgba(24, 20, 17, 0.85)',
            transition: 'all 0.25s ease'
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#120e09',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)'
            }}
          >
            <Mail size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Email Resmi
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fcf9f2', marginTop: 4 }}>
              halo@kopiyoo.id
            </div>
            <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: 4, margin: 0 }}>
              Untuk kerjasama B2B &amp; pertanyaan resmi.
            </p>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#fbbf24', fontWeight: 600 }}>
            <span>Kirim Email</span>
            <ExternalLink size={13} />
          </div>
        </a>

        {/* Card 3: Roastery & Office */}
        <div
          className="glass-panel"
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(24, 20, 17, 0.85)'
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #78350f, #451a03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fbbf24',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)'
            }}
          >
            <MapPin size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#d1c7bc', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Alamat Roastery Pusat
            </div>
            <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fcf9f2', marginTop: 4, lineHeight: 1.4 }}>
              Jl. Takengon - Bebesen No. 45
            </div>
            <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: 4, margin: 0 }}>
              Aceh Tengah, Dataran Tinggi Gayo, Aceh 24519
            </p>
          </div>
          <div style={{ marginTop: 'auto', fontSize: '0.78rem', color: '#a8a29e' }}>
            Elevasi: 1.450 - 1.650 mdpl
          </div>
        </div>

        {/* Card 4: Operating Hours */}
        <div
          className="glass-panel"
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(24, 20, 17, 0.85)'
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: 'rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fbbf24',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)'
            }}
          >
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#d1c7bc', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Jam Operasional
            </div>
            <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fcf9f2', marginTop: 4 }}>
              Senin – Sabtu: 08:00 – 21:00 WIB
            </div>
            <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: 4, margin: 0 }}>
              Minggu &amp; Hari Libur: 10:00 – 18:00 WIB
            </p>
          </div>
          <div style={{ marginTop: 'auto', fontSize: '0.78rem', color: '#86efac', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            <span>Roasting Mingguan Berjalan</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Contact Form + Location Panel */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 32,
          marginBottom: 64
        }}
      >
        {/* Contact Form Container */}
        <div
          className="glass-panel"
          style={{
            padding: '36px 32px',
            border: '1.5px solid rgba(217, 119, 6, 0.3)',
            borderRadius: 20,
            background: 'rgba(24, 20, 18, 0.95)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)'
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <h2 className="font-serif" style={{ fontSize: '1.65rem', color: '#fcf9f2', marginBottom: 6 }}>
              Kirim Pesan Langsung
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#9ca3af', margin: 0 }}>
              Isi formulir di bawah ini dan barista atau tim roaster kami akan merespons dalam waktu singkat.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: '32px 24px',
                textAlign: 'center',
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                borderRadius: 16
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#fff',
                  boxShadow: '0 4px 16px rgba(22, 163, 74, 0.4)'
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#fcf9f2', marginBottom: 8, fontWeight: 700 }}>
                Terima Kasih, Pesan Terkirim!
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#d1c7bc', lineHeight: 1.6, marginBottom: 20 }}>
                Pesan Anda telah berhasil kami terima. Tim KopiYoo akan segera menghubungi Anda melalui email atau WhatsApp yang Anda cantumkan.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="btn btn-secondary btn-sm"
              >
                Kirim Pesan Lainnya
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                  Nama Lengkap <span style={{ color: '#f59e0b' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Contoh: Andi Pratama"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '0.9rem',
                    background: 'rgba(15, 12, 10, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 10,
                    color: '#fcf9f2'
                  }}
                />
              </div>

              {/* Email & Phone Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                    Alamat Email <span style={{ color: '#f59e0b' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: '0.9rem',
                      background: 'rgba(15, 12, 10, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 10,
                      color: '#fcf9f2'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                    Nomor WhatsApp / HP
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="0812-xxxx-xxxx"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: '0.9rem',
                      background: 'rgba(15, 12, 10, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 10,
                      color: '#fcf9f2'
                    }}
                  />
                </div>
              </div>

              {/* Subject Dropdown */}
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                  Subjek Pertanyaan
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '0.9rem',
                    background: '#161311',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 10,
                    color: '#fcf9f2'
                  }}
                >
                  <option value="Pemesanan & Produk">Pertanyaan Pemesanan &amp; Produk Kopi</option>
                  <option value="Kerjasama Grosir B2B">Pasokan Grosir B2B / Kedai Kopi</option>
                  <option value="Konsultasi Roasting">Konsultasi Profil Roasting &amp; Seduh</option>
                  <option value="Kunjungan Roastery">Reservasi Kunjungan Roastery &amp; Cupping</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                  Pesan Anda <span style={{ color: '#f59e0b' }}>*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tuliskan detail pertanyaan, kebutuhan pasokan kopi, atau hal yang ingin Anda tanyakan..."
                  value={formData.message}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '0.9rem',
                    background: 'rgba(15, 12, 10, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 10,
                    color: '#fcf9f2',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  marginTop: 6,
                  gap: 8,
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  boxShadow: '0 6px 20px rgba(245, 158, 11, 0.35)',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? (
                  <span>Mengirim Pesan...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Kirim Pesan Sekarang</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Location & Roastery Information Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Map Preview Box */}
          <div
            className="glass-panel"
            style={{
              padding: 28,
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(28, 23, 19, 0.95) 0%, rgba(18, 14, 12, 0.95) 100%)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                <Coffee size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#fcf9f2', margin: 0, fontWeight: 700 }}>
                  Lokasi Roastery &amp; Sentra Kopi
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Kabupaten Aceh Tengah &amp; Bener Meriah</div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#d1c7bc', lineHeight: 1.6, marginBottom: 20 }}>
              Fasilitas roasting dan cupping lab kami berlokasi tepat di jantung dataran tinggi Takengon, dekat dengan Danau Laut Tawar. Biji kopi dipetik dari perkebunan binaan di ketinggian 1.450 hingga 1.700 mdpl.
            </p>

            {/* Visual Location Card */}
            <div
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(10, 8, 6, 0.7)',
                padding: 16,
                marginBottom: 20
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#fbbf24', fontWeight: 600 }}>
                  <Building2 size={16} />
                  <span>KopiYoo Roastery Headquarters</span>
                </div>
                <span style={{ fontSize: '0.72rem', background: 'rgba(34, 197, 94, 0.15)', color: '#86efac', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>
                  Aktif Buka
                </span>
              </div>

              <div style={{ fontSize: '0.84rem', color: '#a8a29e', lineHeight: 1.5 }}>
                Kecamatan Bebesen, Takengon, Kabupaten Aceh Tengah, Nanggroe Aceh Darussalam.
              </div>

              <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, fontSize: '0.78rem', color: '#9ca3af' }}>
                <span>GPS: 4.6291° N, 96.8458° E</span>
                <span>Ketinggian: 1.520 mdpl</span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Takengon+Aceh+Tengah"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center', gap: 8, fontSize: '0.88rem' }}
            >
              <MapPin size={16} color="#f59e0b" />
              <span>Buka Lokasi di Google Maps</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Quick Partnership Banner */}
          <div
            className="glass-panel"
            style={{
              padding: 24,
              border: '1.5px solid rgba(22, 163, 74, 0.3)',
              borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.12) 0%, rgba(20, 16, 14, 0.95) 100%)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', color: '#fcf9f2', margin: 0, fontWeight: 700 }}>
                  Ingin Sampel Kopi Gratis untuk Kedai?
                </h4>
                <div style={{ fontSize: '0.78rem', color: '#86efac' }}>Khusus Pemilik Coffee Shop &amp; Roaster</div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#d1c7bc', lineHeight: 1.5, marginBottom: 16 }}>
              Kirimkan nama kedai kopi Anda beserta alamat lengkap via WhatsApp untuk mendapatkan taster sample box biji kopi varietas Wine, Honey, dan Natural Kopi Gayo.
            </p>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20KopiYoo,%20saya%20pemilik%20kedai%20kopi%20dan%20ingin%20mengajukan%20sample%20box%20B2B."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                borderColor: 'rgba(34, 197, 94, 0.4)',
                gap: 6
              }}
            >
              <span>Ajukan Sampel Kopi B2B</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* FAQ (Pertanyaan yang Sering Diajukan) */}
      <div style={{ maxWidth: 840, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#fbbf24', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
            <HelpCircle size={15} />
            <span>TANYA JAWAB</span>
          </div>
          <h2 className="font-serif" style={{ fontSize: '1.85rem', color: '#fcf9f2', margin: 0 }}>
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: 14,
                  border: isOpen ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isOpen ? 'rgba(32, 26, 21, 0.85)' : 'rgba(20, 16, 14, 0.65)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    color: isOpen ? '#fbbf24' : '#fcf9f2',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                      color: isOpen ? '#fbbf24' : '#9ca3af'
                    }}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div
                        style={{
                          padding: '0 22px 20px',
                          fontSize: '0.88rem',
                          color: '#d1c7bc',
                          lineHeight: 1.6,
                          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                          paddingTop: 14
                        }}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
