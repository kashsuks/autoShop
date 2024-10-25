import { motion } from 'framer-motion';

const Button = ({ onClick, children }) => {
  return (
    <motion.button
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
