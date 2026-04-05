import { motion } from "framer-motion";

export default function EmptyState({ onCreate, title, description, buttonText }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="text-6xl mb-4">📝</div>

      <h2 className="text-2xl font-semibold mb-2">
        {title}
      </h2>

      <p className="text-gray-500 mb-6 max-w-sm">
        {description}
      </p>

      <button onClick={onCreate} className="px-6 py-2 rounded-xl bg-black text-white hover:opacity-80 transition">
        {buttonText}
      </button>
    </motion.div>
  );
}