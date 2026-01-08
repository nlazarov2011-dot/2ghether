import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  useStripe, 
  useElements, 
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';
import { useCartStore, useUserStore } from '../lib/store';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from '../lib/utils';
import { formatCurrency } from '../lib/utils';
import { ShieldCheck, Truck, CreditCard, Banknote, Lock, CheckCircle2, AlertCircle, ChevronLeft } from 'lucide-react';
import { motion as m, AnimatePresence } from 'framer-motion';

const motion = m as any;

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51Sn4YA171QHgark7IO0rf15rQ9WFFxqaNvCPb9EKWKX9cca6AJ9lA6QSHLLollZVkMKLYQei0douKpmLUZVj4Hw100UvTqi09s');

// Custom styling for Stripe Elements to match Tailwind components
const stripeElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: '"Inter", sans-serif',
      '::placeholder': {
        color: '#525252', // neutral-600
      },
      iconColor: '#06b6d4', // brand-accent
    },
    invalid: {
      color: '#ef4444',
    },
  },
};

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const { cart, cartTotal, clearCart } = useCartStore();
  const { user } = useUserStore();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'stripe'>('cod');

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '',
    city: '',
    address: '',
    postalCode: ''
  });

  // Separate state for Cardholder Name (Stripe)
  const [cardHolderName, setCardHolderName] = useState('');

  const total = cartTotal();

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !success) {
      navigate('/shop');
    }
  }, [cart, navigate, success]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createOrder = async (method: string, transactionId?: string) => {
    const { error: dbError } = await supabase.from('orders').insert({
      user_id: user?.id || null, // Allow guest checkout if needed, or null
      full_name: formData.fullName,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      postal_code: formData.postalCode,
      total_price: total,
      status: method === 'stripe' ? 'paid' : 'pending',
      payment_method: method,
      transaction_id: transactionId || null,
      items: cart, // Storing full cart JSON
      created_at: new Date().toISOString()
    });

    if (dbError) throw new Error('Грешка при създаване на поръчката. Моля опитайте отново.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic Validation
    if (!formData.fullName || !formData.phone || !formData.city || !formData.address || !formData.postalCode) {
      setError('Моля попълнете всички полета за доставка.');
      setLoading(false);
      return;
    }

    try {
      if (paymentMethod === 'cod') {
        // --- SCENARIO A: Cash On Delivery ---
        await createOrder('cod');
        setSuccess(true);
        clearCart();
      } else {
        // --- SCENARIO B: Stripe ---
        if (!stripe || !elements) return;

        // Validation for Card Name
        if (!cardHolderName.trim()) {
           setError('Моля въведете името на картодържателя.');
           setLoading(false);
           return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardNumberElement) return;

        const { error: stripeError, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardNumberElement,
          billing_details: {
            name: cardHolderName,
            phone: formData.phone,
            address: {
              city: formData.city,
              line1: formData.address,
              postal_code: formData.postalCode,
            }
          }
        });

        if (stripeError) {
          throw new Error(stripeError.message);
        }

        // In a real app, you would send stripePaymentMethod.id to your backend 
        // to create a PaymentIntent. For this demo, we assume client-side success implies payment.
        await createOrder('stripe', stripePaymentMethod.id);
        setSuccess(true);
        clearCart();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Възникна неочаквана грешка.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-500"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h1 className="text-4xl font-black text-white mb-4">Благодарим ви за поръчката!</h1>
        <p className="text-neutral-400 max-w-lg mb-8 text-lg">
          Вашата поръчка е приета успешно. Ще получите имейл с потвърждение и номер на товарителница веднага щом я изпратим.
        </p>
        <Link 
          to="/" 
          className="bg-brand-accent text-black font-bold uppercase py-4 px-10 rounded-xl hover:bg-white transition-colors"
        >
          Към Начало
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="mb-8">
           <Link to="/shop" className="text-neutral-500 hover:text-white flex items-center gap-2 mb-4 transition-colors">
              <ChevronLeft size={16} /> Обратно към магазина
           </Link>
           <h1 className="text-3xl md:text-4xl font-black text-white">Финализиране на поръчката</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Form & Payment */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Delivery Details */}
            <section className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-neutral-800 rounded-lg text-brand-accent">
                  <Truck size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Данни за доставка</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Име и Фамилия</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-white focus:border-brand-accent focus:outline-none transition-colors"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Телефон</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-white focus:border-brand-accent focus:outline-none transition-colors"
                    placeholder="088 123 4567"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Град</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-white focus:border-brand-accent focus:outline-none transition-colors"
                    placeholder="София"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Пощенски код</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-white focus:border-brand-accent focus:outline-none transition-colors"
                    placeholder="1000"
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Адрес за доставка (или офис на Еконт)</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-white focus:border-brand-accent focus:outline-none transition-colors"
                    placeholder="ул. Витоша 15, ап. 4"
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-neutral-800 rounded-lg text-brand-accent">
                  <ShieldCheck size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Метод на плащане</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* COD Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                    paymentMethod === 'cod' 
                      ? 'border-brand-accent bg-brand-accent/5' 
                      : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-brand-accent' : 'border-neutral-600'}`}>
                    {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />}
                  </div>
                  <Banknote className={paymentMethod === 'cod' ? 'text-white' : 'text-neutral-500'} size={24} />
                  <div>
                    <span className={`block font-bold ${paymentMethod === 'cod' ? 'text-white' : 'text-neutral-400'}`}>Наложен платеж</span>
                    <span className="text-xs text-neutral-500">Плащане при доставка</span>
                  </div>
                </button>

                {/* Stripe Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stripe')}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                    paymentMethod === 'stripe' 
                      ? 'border-brand-accent bg-brand-accent/5' 
                      : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'stripe' ? 'border-brand-accent' : 'border-neutral-600'}`}>
                    {paymentMethod === 'stripe' && <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />}
                  </div>
                  <CreditCard className={paymentMethod === 'stripe' ? 'text-white' : 'text-neutral-500'} size={24} />
                  <div>
                    <span className={`block font-bold ${paymentMethod === 'stripe' ? 'text-white' : 'text-neutral-400'}`}>Банкова карта</span>
                    <span className="text-xs text-neutral-500">Сигурно плащане със Stripe</span>
                  </div>
                </button>
              </div>

              {/* Stripe Elements (Split Fields) */}
              <AnimatePresence>
                {paymentMethod === 'stripe' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                      
                      {/* Row 1: Cardholder Name */}
                      <div className="space-y-1">
                         <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Име на картодържател</label>
                         <input
                           type="text"
                           value={cardHolderName}
                           onChange={(e) => setCardHolderName(e.target.value)}
                           className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-4 text-white focus:border-brand-accent focus:outline-none transition-colors placeholder-neutral-600"
                           placeholder="Име както е на картата"
                         />
                      </div>

                      {/* Row 2: Card Number */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Номер на карта</label>
                        <div className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3.5 px-4 transition-colors focus-within:border-brand-accent">
                          <CardNumberElement options={stripeElementOptions} />
                        </div>
                      </div>

                      {/* Row 3: Expiry & CVC */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Валидност</label>
                           <div className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3.5 px-4 transition-colors focus-within:border-brand-accent">
                             <CardExpiryElement options={stripeElementOptions} />
                           </div>
                        </div>
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-neutral-500 uppercase ml-1">CVC Код</label>
                           <div className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3.5 px-4 transition-colors focus-within:border-brand-accent">
                             <CardCvcElement options={stripeElementOptions} />
                           </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4 text-xs text-neutral-500">
                        <Lock size={12} />
                        Всички транзакции са криптирани и защитени.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sticky top-28">
              <h2 className="text-xl font-bold text-white mb-6">Вашата Поръчка</h2>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3">
                    <div className="w-16 h-16 bg-neutral-950 rounded border border-neutral-800 overflow-hidden flex-shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-neutral-500">
                        {item.quantity} x {formatCurrency(item.price)}
                      </p>
                      <p className="text-[10px] text-neutral-600 uppercase mt-1">Размер: {item.selectedSize}</p>
                    </div>
                    <div className="text-sm font-mono text-white">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-800 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-neutral-400 text-sm">
                  <span>Междинна сума</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-neutral-400 text-sm">
                  <span>Доставка</span>
                  <span>Безплатна</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-neutral-800 mt-2">
                  <span>Общо</span>
                  <span className="text-brand-accent font-mono">{formatCurrency(total)}</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-sm flex items-start gap-2 mb-4">
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || cart.length === 0}
                className="w-full bg-white text-black font-black uppercase py-4 rounded-xl hover:bg-brand-accent hover:shadow-lg hover:shadow-brand-accent/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    {paymentMethod === 'cod' ? 'Поръчай Сега' : 'Плати Сега'}
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Wrapper component to provide Stripe Context
const Checkout: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;