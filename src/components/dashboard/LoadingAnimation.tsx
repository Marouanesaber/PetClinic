
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingAnimationProps {
  message?: string;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ message = "Loading data..." }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        animate={{ 
          rotate: 360,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Loader2 className="h-12 w-12 text-blue-500" />
      </motion.div>
      
      <motion.p
        className="mt-4 text-gray-600 text-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>
      
      <motion.div 
        className="mt-6 h-2 w-48 bg-gray-200 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "12rem" }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};
