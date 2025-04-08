
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useSignUp } from '@/contexts/SignUpContext';
import { Lock } from 'lucide-react';
import Confetti from '@/components/Confetti';

const Welcome: React.FC = () => {
  const [showLock, setShowLock] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const { firstName } = useSignUp();

  useEffect(() => {
    // First show the lock
    const lockTimer = setTimeout(() => {
      setShowLock(false); // Start transitioning to unlocked state
    }, 1500);

    // Then reveal the welcome content
    const contentTimer = setTimeout(() => {
      setShowContent(true);
      setShowConfetti(true); // Show confetti when content is revealed
    }, 2000);

    return () => {
      clearTimeout(lockTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden"
      style={{ backgroundColor: '#1FA598' }}
    >
      {showConfetti && <Confetti duration={5000} />}

      <AnimatePresence>
        {showContent ? (
          <motion.div 
            className="text-center z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {firstName ? `${firstName}, welcome to Kiki!` : 'Welcome to Kiki!'}
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <img 
                src="/Kiki_welcome_card.svg" 
                alt="Welcome to Kiki" 
                className="max-w-full w-64 md:w-80 mx-auto mb-8" 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button 
                onClick={handleContinue}
                variant="secondary"
                size="lg"
                className="mt-4 text-lg px-8 font-medium bg-white text-primary hover:bg-white/90"
              >
                Let's go!
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center"
            animate={{ 
              rotate: showLock ? 0 : [0, -10, 10, -10, 10, 0], 
              scale: showLock ? 1 : [1, 1.2, 1],
            }}
            transition={{ 
              duration: 0.5,
              times: [0, 0.2, 0.4, 0.6, 0.8, 1] 
            }}
          >
            <Lock 
              size={80} 
              className="text-white mb-4"
              style={{
                margin: '0 auto',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Welcome;
