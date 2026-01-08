import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, CheckCircle2, Phone, AlertCircle } from 'lucide-react';
import { useAuthModalStore } from '../lib/store';
import { supabase } from '../lib/supabase';

const motion = m as any;

const AuthModal: React.FC = () => {
  const { isAuthOpen, closeAuth } = useAuthModalStore();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setPhone('');
    setConfirmPassword('');
    setErrorMsg(null);
  };

  const handleClose = () => {
    closeAuth();
    setTimeout(resetForm, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (activeTab === 'register') {
        if (password !== confirmPassword) {
          throw new Error('Паролите не съвпадат');
        }

        // 1. Get the values from your input fields
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              full_name: fullName, // Make sure you have a state variable for this
              phone: phone,        // Make sure you have a state variable for this
            },
          },
        });

        if (error) throw error;

        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          handleClose();
        }, 3000); // Increased timeout to read message

      } else {
        // Login Logic
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          handleClose();
        }, 1500);
      }
    } catch (error: any) {
      let message = error.message || "Възникна грешка";
      
      // Handle specific error messages
      if (message.includes("Email not confirmed")) {
        message = "Имейлът не е потвърден.";
      } else if (message.includes("Invalid login credentials")) {
        message = "Грешен имейл или парола.";
      }
      
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors z-10"
          >
            <X size={20} />
          </button>

          {success ? (
             <div className="p-12 flex flex-col items-center justify-center text-center">
               <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4"
               >
                 <CheckCircle2 size={32} />
               </motion.div>
               <h3 className="text-2xl font-bold text-white mb-2">
                 {activeTab === 'login' ? 'Успешен вход!' : 'Успешна регистрация!'}
               </h3>
               <p className="text-neutral-400">
                 {activeTab === 'login' ? 'Добре дошли отново.' : 'Регистрацията е успешна. Проверете имейла си за потвърждение.'}
               </p>
             </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-8 pb-0 text-center">
                <h2 className="text-2xl font-black text-white mb-1">Добре дошли</h2>
                <p className="text-neutral-400 text-sm">
                  {activeTab === 'login' ? 'Влезте в профила си' : 'Създайте нов профил'}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex px-8 mt-6 mb-6">
                <button
                  onClick={() => { setActiveTab('login'); setErrorMsg(null); }}
                  className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${
                    activeTab === 'login' 
                      ? 'border-brand-accent text-white' 
                      : 'border-neutral-800 text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  Вход
                </button>
                <button
                  onClick={() => { setActiveTab('register'); setErrorMsg(null); }}
                  className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${
                    activeTab === 'register' 
                      ? 'border-brand-accent text-white' 
                      : 'border-neutral-800 text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  Регистрация
                </button>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="mx-8 mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400 text-sm">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
                {activeTab === 'register' && (
                  <>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <input 
                        type="text" 
                        placeholder="Име и Фамилия"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-600 focus:border-brand-accent focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <input 
                        type="tel" 
                        placeholder="Телефон"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-600 focus:border-brand-accent focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <input 
                    type="email" 
                    placeholder="Имейл"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-600 focus:border-brand-accent focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <input 
                    type="password" 
                    placeholder="Парола"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-600 focus:border-brand-accent focus:outline-none transition-colors"
                    required
                  />
                </div>

                {activeTab === 'register' && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                    <input 
                      type="password" 
                      placeholder="Повтори Парола"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-600 focus:border-brand-accent focus:outline-none transition-colors"
                      required
                    />
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-brand-accent transition-colors mt-4 relative disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin block mx-auto" />
                  ) : (
                    activeTab === 'login' ? 'Влез' : 'Регистрирай се'
                  )}
                </button>

                {activeTab === 'login' && (
                  <button type="button" className="w-full text-center text-xs text-neutral-500 hover:text-white transition-colors">
                    Забравена парола?
                  </button>
                )}
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;