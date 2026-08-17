import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, Wifi, WifiOff, RefreshCw, CheckCircle, ShoppingBag, Receipt, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface InteractiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const SAMPLE_PRODUCTS: ProductItem[] = [
  { id: '1', name: 'Ceramic Coffee Mug (Matte Black)', category: 'Drinkware', price: 24.00, stock: 45 },
  { id: '2', name: 'Artisan Espresso Beans (500g)', category: 'Coffee', price: 18.50, stock: 32 },
  { id: '3', name: 'Handmade Leather Journal', category: 'Stationery', price: 42.00, stock: 18 },
  { id: '4', name: 'Minimalist Desktop Pen Stand', category: 'Desk Setup', price: 29.00, stock: 25 },
  { id: '5', name: 'Organic Cotton Canvas Tote', category: 'Apparel', price: 16.00, stock: 60 },
  { id: '6', name: 'Stainless Steel Pour Over Dripper', category: 'Brewing', price: 38.00, stock: 14 },
];

export const InteractiveDemoModal: React.FC<InteractiveDemoModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [cart, setCart] = useState<{ product: ProductItem; quantity: number }[]>([
    { product: SAMPLE_PRODUCTS[0], quantity: 2 },
    { product: SAMPLE_PRODUCTS[2], quantity: 1 },
  ]);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [offlineSyncQueue, setOfflineSyncQueue] = useState<number>(0);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Drinkware', 'Coffee', 'Stationery', 'Desk Setup', 'Apparel', 'Brewing'];

  const filteredProducts = activeCategory === 'All'
    ? SAMPLE_PRODUCTS
    : SAMPLE_PRODUCTS.filter((p) => p.category === activeCategory);

  const addToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: ProductItem; quantity: number }[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const orderData = {
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleTimeString(),
      items: [...cart],
      subtotal,
      tax,
      total,
      synced: !isOfflineMode,
    };

    if (isOfflineMode) {
      setOfflineSyncQueue((q) => q + 1);
    }

    setCompletedOrder(orderData);
    setCart([]);
  };

  const handleSyncOffline = () => {
    setIsOfflineMode(false);
    setTimeout(() => {
      setOfflineSyncQueue(0);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-[#0d0e12] border border-neutral-800 shadow-2xl p-4 sm:p-8 text-white z-10 max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neutral-900 border border-neutral-800">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extended text-lg font-bold uppercase tracking-tight text-white">
                      FLUTTER POS SIMULATOR
                    </h3>
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 bg-neutral-800 text-neutral-300 border border-neutral-700 uppercase">
                      v2.4.0 Engine
                    </span>
                  </div>
                  <p className="font-mono-tech text-xs text-neutral-400">
                    Interactive Offline-First Architecture & SQLite State Test
                  </p>
                </div>
              </div>

              {/* Offline toggle switch & Close */}
              <div className="flex items-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => (isOfflineMode ? handleSyncOffline() : setIsOfflineMode(true))}
                  className={`flex items-center gap-2 px-3 py-1.5 border font-mono-tech text-xs transition-colors ${
                    isOfflineMode
                      ? 'bg-amber-950/40 border-amber-500/60 text-amber-300'
                      : 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                  }`}
                >
                  {isOfflineMode ? (
                    <>
                      <WifiOff className="w-3.5 h-3.5" />
                      <span>OFFLINE ({offlineSyncQueue} queued)</span>
                    </>
                  ) : (
                    <>
                      <Wifi className="w-3.5 h-3.5" />
                      <span>ONLINE (SQLITE SYNCED)</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-neutral-400 hover:text-white border border-transparent hover:border-neutral-700 transition-colors"
                  aria-label="Close Demo"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Main POS Interface Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 overflow-y-auto flex-1">
              
              {/* Left: Product Catalog Grid */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                {/* Category selector */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 text-xs font-mono-tech tracking-wider uppercase whitespace-nowrap transition-colors border ${
                        activeCategory === cat
                          ? 'bg-white text-black border-white font-semibold'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Product cards */}
                <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <AnimatePresence>
                    {filteredProducts.map((p) => (
                      <motion.button
                        key={p.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => addToCart(p)}
                        className="p-3.5 text-left bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between group shadow-md"
                      >
                        <div>
                          <span className="font-mono-tech text-[10px] text-neutral-500 uppercase block mb-1">
                            {p.category}
                          </span>
                          <h4 className="font-extended text-xs font-bold text-neutral-100 group-hover:text-white line-clamp-2">
                            {p.name}
                          </h4>
                        </div>

                        <div className="mt-4 pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                          <span className="font-mono-tech text-xs font-semibold text-white">
                            ${p.price.toFixed(2)}
                          </span>
                          <span className="p-1 bg-neutral-800 text-neutral-300 group-hover:bg-white group-hover:text-black transition-colors">
                            <Plus className="w-3 h-3" />
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Right: Active Ticket / Cart Terminal */}
              <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 p-4 sm:p-5 flex flex-col justify-between">
                
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-neutral-400" />
                      <span className="font-mono-tech text-xs tracking-wider uppercase text-white font-semibold">
                        CURRENT TICKET
                      </span>
                    </div>
                    {cart.length > 0 && (
                      <button
                        onClick={clearCart}
                        className="font-mono-tech text-[10px] text-neutral-500 hover:text-red-400 uppercase"
                      >
                        CLEAR
                      </button>
                    )}
                  </div>

                  {/* Items List with Framer Motion AnimatePresence */}
                  <div className="py-3 space-y-3 max-h-56 overflow-y-auto">
                    {cart.length === 0 ? (
                      <div className="py-12 text-center text-neutral-600 font-mono-tech text-xs">
                        TICKET EMPTY. TAP ITEMS TO ADD.
                      </div>
                    ) : (
                      <AnimatePresence initial={false}>
                        {cart.map((item) => (
                          <motion.div
                            key={item.product.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-900"
                          >
                            <div className="flex-1 pr-2 truncate">
                              <p className="font-medium text-neutral-200 truncate">{item.product.name}</p>
                              <p className="font-mono-tech text-[10px] text-neutral-500">
                                ${item.product.price.toFixed(2)} each
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <div className="flex items-center border border-neutral-800 bg-neutral-900">
                                <button
                                  onClick={() => updateQuantity(item.product.id, -1)}
                                  className="p-1 hover:bg-neutral-800 text-neutral-400"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 font-mono-tech text-xs font-semibold">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, 1)}
                                  className="p-1 hover:bg-neutral-800 text-neutral-400"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-neutral-500 hover:text-red-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </div>
                </div>

                {/* Total Summary and Pay Button */}
                <div className="pt-4 border-t border-neutral-800 space-y-2">
                  <div className="flex justify-between font-mono-tech text-xs text-neutral-400">
                    <span>SUBTOTAL</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-mono-tech text-xs text-neutral-400">
                    <span>TAX (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-mono-tech text-sm text-white font-bold pt-2 border-t border-neutral-800">
                    <span>TOTAL DUE</span>
                    <span className="text-emerald-400">${total.toFixed(2)}</span>
                  </div>

                  <motion.button
                    id="demo-pos-checkout-btn"
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                    whileHover={{ scale: cart.length > 0 ? 1.02 : 1 }}
                    whileTap={{ scale: cart.length > 0 ? 0.98 : 1 }}
                    className="w-full mt-3 py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed font-mono-tech text-xs font-semibold tracking-widest uppercase transition-colors"
                  >
                    PROCESS PAYMENT (${total.toFixed(2)})
                  </motion.button>
                </div>

              </div>

            </div>

            {/* Receipt Modal confirmation */}
            <AnimatePresence>
              {completedOrder && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm z-20 flex items-center justify-center p-6"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 10 }}
                    className="bg-[#121318] border border-neutral-700 max-w-sm w-full p-6 text-center space-y-4 shadow-2xl"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                    </motion.div>

                    <h4 className="font-extended text-lg font-bold uppercase text-white">
                      TRANSACTION APPROVED
                    </h4>
                    <div className="font-mono-tech text-xs text-neutral-400 space-y-1 bg-neutral-900 p-3 text-left">
                      <p className="flex justify-between">
                        <span>Order:</span> <span className="text-white">{completedOrder.orderId}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Time:</span> <span className="text-white">{completedOrder.timestamp}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Storage:</span>{' '}
                        <span className={completedOrder.synced ? 'text-emerald-400' : 'text-amber-400'}>
                          {completedOrder.synced ? 'Cloud Server Synced' : 'SQLite Offline Queue (Pending)'}
                        </span>
                      </p>
                      <p className="flex justify-between pt-1 border-t border-neutral-800 font-bold">
                        <span>Paid:</span> <span className="text-white">${completedOrder.total.toFixed(2)}</span>
                      </p>
                    </div>
                    <motion.button
                      onClick={() => setCompletedOrder(null)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-2.5 bg-white text-black font-mono-tech text-xs font-semibold uppercase hover:bg-neutral-200"
                    >
                      NEW TRANSACTION
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

