'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCoffee } from '@/context/CoffeeContext';
import {
  Coffee,
  ShoppingBag,
  ShieldCheck,
  User,
  Clock,
  Sparkles,
  Menu,
  X,
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const {
    currentUser,
    switchRole,
    cartCount,
    setIsCartOpen,
    logout
  } = useCoffee();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isAdmin = currentUser?.role === 'admin';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(10, 9, 7, 0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(217, 119, 6, 0.15)',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--nav-height)' }}>
        {/* Brand Logo */}
        <Link href={isAdmin ? "/admin" : "/"} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 18px rgba(245, 158, 11, 0.4)'
            }}
          >
            <Coffee size={24} color="#120e09" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                KOPIYOO
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#9ca3af', margin: 0, letterSpacing: '0.3px' }}>
              Highland Specialty Coffee
            </p>
          </div>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav style={{ display: 'none', alignItems: 'center', gap: 26 }} className="desktop-nav">
          {!isAdmin ? (
            /* Standard Navigation (Both Guest & Customer): Only Beranda, Marketplace, Kontak */
            <>
              <Link
                href="/"
                style={{
                  fontSize: '0.94rem',
                  fontWeight: pathname === '/' ? 700 : 500,
                  color: pathname === '/' ? '#f59e0b' : 'var(--text-secondary)',
                  transition: 'color 0.2s ease'
                }}
              >
                Beranda
              </Link>

              <Link
                href="/marketplace"
                style={{
                  fontSize: '0.94rem',
                  fontWeight: pathname.startsWith('/marketplace') ? 700 : 500,
                  color: pathname.startsWith('/marketplace') ? '#f59e0b' : 'var(--text-secondary)',
                  transition: 'color 0.2s ease'
                }}
              >
                Marketplace
              </Link>

              <Link
                href="/contact"
                style={{
                  fontSize: '0.94rem',
                  fontWeight: (pathname.startsWith('/contact') || pathname.startsWith('/kontak')) ? 700 : 500,
                  color: (pathname.startsWith('/contact') || pathname.startsWith('/kontak')) ? '#f59e0b' : 'var(--text-secondary)',
                  transition: 'color 0.2s ease'
                }}
              >
                Kontak
              </Link>
            </>
          ) : (
            /* Admin Navigation: Only Admin Dashboard */
            <Link
              href="/admin"
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                color: pathname.startsWith('/admin') ? '#fda4af' : '#fca5a5',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 16px',
                borderRadius: 10,
                background: pathname.startsWith('/admin') ? 'rgba(159, 18, 57, 0.35)' : 'rgba(159, 18, 57, 0.15)',
                border: '1px solid rgba(225, 29, 72, 0.45)',
                boxShadow: '0 2px 8px rgba(159, 18, 57, 0.25)'
              }}
            >
              <ShieldCheck size={18} color="#fda4af" />
              <span>Admin Dashboard</span>
            </Link>
          )}
        </nav>

        {/* Right Action Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Cart Trigger */}
          {currentUser?.role !== 'admin' && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-icon"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(217, 119, 6, 0.2)',
                color: '#fcf9f2',
                position: 'relative'
              }}
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    background: '#f59e0b',
                    color: '#120e09',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* User Profile Menu OR Guest Login/Register Buttons */}
          {!currentUser ? (
            /* Guest Actions: Masuk & Daftar button (sesuai referensi gambar) */
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="guest-auth-actions">
              <Link
                href="/auth"
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: '#fcf9f2',
                  padding: '7px 14px',
                  borderRadius: 8,
                  transition: 'all 0.2s ease',
                  textDecoration: 'none'
                }}
                className="nav-btn-login"
              >
                Masuk
              </Link>

              <Link
                href="/auth?mode=register"
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  padding: '7px 20px',
                  borderRadius: 24,
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  boxShadow: '0 4px 14px rgba(22, 163, 74, 0.35)',
                  border: '1px solid rgba(34, 197, 94, 0.35)',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
                className="nav-btn-register"
              >
                <span>Daftar</span>
              </Link>
            </div>
          ) : (
            /* Logged in User Profile Menu */
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 10px',
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: isAdmin ? '1px solid rgba(159, 18, 57, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fcf9f2',
                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: isAdmin ? 'linear-gradient(135deg, #9f1239, #be123c)' : 'linear-gradient(135deg, #d97706, #f59e0b)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    boxShadow: isAdmin ? '0 2px 10px rgba(159, 18, 57, 0.4)' : '0 2px 10px rgba(217, 119, 6, 0.3)'
                  }}
                >
                  {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
                </div>
                <span style={{ fontSize: '0.85rem', maxWidth: 110, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentUser?.name?.split(' ')[0] || 'User'}
                </span>
                <ChevronDown size={14} color="#9ca3af" />
              </button>

            {profileDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: 240,
                  background: '#181512',
                  border: '1px solid rgba(217, 119, 6, 0.3)',
                  borderRadius: 14,
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8)',
                  padding: 8,
                  zIndex: 200
                }}
              >
                <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fcf9f2' }}>
                    {currentUser?.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                    {currentUser?.email}
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '3px 8px',
                        borderRadius: 6,
                        background: isAdmin ? 'rgba(159, 18, 57, 0.25)' : 'rgba(217, 119, 6, 0.25)',
                        color: isAdmin ? '#fda4af' : '#fbbf24',
                        border: isAdmin ? '1px solid rgba(159, 18, 57, 0.4)' : '1px solid rgba(217, 119, 6, 0.3)'
                      }}
                    >
                      {isAdmin ? '🛡️ Admin' : '👤 Customer'}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '4px 0' }}>
                  {!isAdmin && (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '9px 12px',
                          fontSize: '0.86rem',
                          color: '#fbbf24',
                          fontWeight: 700,
                          borderRadius: 8
                        }}
                      >
                        <User size={16} /> Profil Saya
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setProfileDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '9px 12px',
                          fontSize: '0.86rem',
                          color: '#d1c7bc',
                          borderRadius: 8
                        }}
                      >
                        <Clock size={16} /> Riwayat Pesanan
                      </Link>
                    </>
                  )}
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setProfileDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '9px 12px',
                        fontSize: '0.86rem',
                        color: '#fda4af',
                        fontWeight: 700,
                        borderRadius: 8
                      }}
                    >
                      <ShieldCheck size={16} /> Admin Dashboard
                    </Link>
                  )}
                </div>
                
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 4, marginTop: 4 }}>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                      if (isAdmin) {
                        window.location.href = '/admin/login';
                      } else {
                        window.location.href = '/';
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 12px',
                      fontSize: '0.85rem',
                      color: '#fca5a5',
                      borderRadius: 8,
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <LogOut size={16} /> Keluar Akun
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'flex', color: '#fcf9f2' }}
            className="mobile-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            padding: '16px 24px 24px',
            backgroundColor: '#12100d',
            borderTop: '1px solid rgba(217, 119, 6, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}
        >
          {!currentUser ? (
            /* Guest Mobile Menu */
            <>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1rem', color: '#fcf9f2', fontWeight: 600 }}
              >
                Beranda
              </Link>
              <Link
                href="/marketplace"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1rem', color: '#fcf9f2', fontWeight: 600 }}
              >
                Marketplace
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1rem', color: '#fcf9f2', fontWeight: 600 }}
              >
                Kontak
              </Link>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 14, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Masuk
                </Link>
                <Link
                  href="/auth?mode=register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                    borderColor: 'rgba(34, 197, 94, 0.3)'
                  }}
                >
                  Daftar Akun Baru
                </Link>
              </div>
            </>
          ) : isAdmin ? (
            /* Admin Mobile Menu */
            <>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1rem', color: '#fda4af', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <ShieldCheck size={18} /> Dashboard Admin
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                  window.location.href = '/admin/login';
                }}
                className="btn btn-danger btn-sm"
                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
              >
                <LogOut size={16} /> Keluar Akun
              </button>
            </>
          ) : (
            /* Customer Mobile Menu */
            <>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1rem', color: '#fcf9f2', fontWeight: 600 }}
              >
                Beranda
              </Link>
              <Link
                href="/marketplace"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1rem', color: '#fcf9f2', fontWeight: 600 }}
              >
                Marketplace
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1rem', color: '#fcf9f2', fontWeight: 600 }}
              >
                Kontak
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1rem', color: '#f59e0b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <User size={18} /> Profil Saya
              </Link>
              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1rem', color: '#fcf9f2', fontWeight: 600 }}
              >
                Pesanan Saya
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                  window.location.href = '/';
                }}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center', marginTop: 8, color: '#fca5a5' }}
              >
                <LogOut size={16} /> Keluar Akun
              </button>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
