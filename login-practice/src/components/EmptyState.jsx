import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function EmptyState({ onCreate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="text-6xl mb-4">📝</div>

      <h2 className="text-2xl font-semibold mb-2">
        No tienes tareas aún
      </h2>

      <p className="text-gray-500 mb-6 max-w-sm">
        Organiza tu día creando tu primera tarea.
        Empieza pequeño. Mantente constante.
      </p>

      <Link
        to='/createTodo'
        className="px-6 py-2 rounded-xl bg-black text-white hover:opacity-80 transition"
      >
        Crear primera tarea
      </Link>
    </motion.div>
  );
}