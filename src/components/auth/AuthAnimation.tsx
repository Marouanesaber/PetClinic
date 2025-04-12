
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

const successIconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 20,
      delay: 0.6
    }
  }
};

interface AuthAnimationProps {
  isSuccess?: boolean;
  isLogin?: boolean;
}

export const AuthAnimation: React.FC<AuthAnimationProps> = ({ 
  isSuccess = false,
  isLogin = true
}) => {
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {isSuccess ? (
        <motion.div 
          className="bg-green-500 text-white rounded-full p-4"
          variants={successIconVariants}
        >
          <Check className="h-10 w-10" />
        </motion.div>
      ) : (
        <motion.div className="flex flex-col items-center">
          <motion.div 
            className="w-16 h-16 mb-4 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"
            variants={itemVariants}
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.div
            className="bg-white p-6 rounded-lg shadow-xl max-w-md"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-xl font-bold mb-2 text-center"
              variants={itemVariants}
            >
              {isLogin ? 'Welcome Back!' : 'Join Our Community'}
            </motion.h3>
            <motion.p 
              className="text-gray-600 text-center"
              variants={itemVariants}
            >
              {isLogin 
                ? 'Securely access your pet care account' 
                : 'Create your account to get started with premium pet care'
              }
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
