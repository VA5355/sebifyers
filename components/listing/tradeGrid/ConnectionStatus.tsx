import { motion } from "framer-motion";
import {
  Wifi,
  WifiOff,
  AlertTriangle,
  Loader2
} from "lucide-react";

export default function ConnectionStatus({ status }: any) {
  const config: any = {
    connecting: {
      text: "Connecting...",
      color: "text-yellow-500",
      icon: <Loader2 className="animate-spin" />
    },
    connected: {
      text: "Live",
      color: "text-green-500",
      icon: <Wifi />
    },
    disconnected: {
      text: "Reconnecting...",
      color: "text-yellow-500",
      icon: <WifiOff />
    },
    error: {
      text: "Disconnected",
      color: "text-red-500",
      icon: <AlertTriangle />
    },
    ssl_error: {
      text: "SSL Not Trusted",
      color: "text-red-500",
      icon: <AlertTriangle />
    }
  };

  const state = config[status];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center gap-2 ${state.color}`}
    >
      {state.icon}
      <span className="text-sm font-medium">{state.text}</span>
    </motion.div>
  );
}