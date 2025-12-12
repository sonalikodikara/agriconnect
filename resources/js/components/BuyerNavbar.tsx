import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { ShoppingCart, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface BuyerNavbarProps {
  cartCount?: number;
}

export default function BuyerNavbar({ cartCount = 0 }: BuyerNavbarProps) {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { auth } = usePage().props;

  const handleLogout = () => router.post(route('logout'));

  return (
    <nav className="bg-white shadow-lg border-b-4 border-green-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home */}
          <Link href={route('buyers.dashboard')} className="flex items-center gap-2 text-2xl font-bold text-green-800">
            AgriConnect
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href={route('buyers.cart')} className="relative p-2 text-green-800 hover:text-green-600">
              <ShoppingCart size={28} />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">{cartCount}</span>}
            </Link>
            <Link href={route('buyers.orders')} className="text-xl font-semibold text-green-800 hover:text-green-600">
              {t('Orders')}
            </Link>
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-2 text-green-800 hover:text-green-600"
              >
                <User size={28} />
                <span>{auth.user.name}</span>
                <ChevronDown size={20} className={`transition ${profileOpen ? 'rotate-180' : ''}`} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                  <Link href={route('buyers.profile.edit')} className="block px-4 py-2 hover:bg-green-50 text-green-800">
                    {t('Edit Profile')}
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600">
                    {t('Logout')}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-green-800">
            {mobileOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-green-50 border-t-4 border-green-600 py-4 px-4 space-y-4">
          <Link href={route('buyers.cart')} className="block text-xl font-bold text-green-800">
            {t('Cart')} {cartCount > 0 && `(${cartCount})`}
          </Link>
          <Link href={route('buyers.orders')} className="block text-xl font-bold text-green-800">
            {t('Orders')}
          </Link>
          <Link href={route('buyers.profile.edit')} className="block text-xl font-bold text-green-800">
            {t('Edit Profile')}
          </Link>
          <button onClick={handleLogout} className="w-full text-left text-xl font-bold text-red-600">
            {t('Logout')}
          </button>
        </div>
      )}
    </nav>
  );
}