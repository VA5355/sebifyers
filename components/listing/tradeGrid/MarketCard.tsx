import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function MarketCard({ name, value, change }: any) {
  const isUp = change >= 0;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-xl rounded-2xl p-4 flex flex-col gap-2"
    >
      <h2 className="text-lg font-bold">{name}</h2>

      <div className="text-2xl font-semibold">  {value ? value.toFixed(2) : "--"}</div>

      <div className={`flex items-center gap-2 ${isUp ? "text-green-500" : "text-red-500"}`}>
        {isUp ? <TrendingUp /> : <TrendingDown />}
           {change ? change.toFixed(2) : "--"}
      </div>
    </motion.div>
  );
}
