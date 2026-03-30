import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MountStartVerification = ({ token, isOpen, onClose }) => {
  const [complycubeInstance, setComplycubeInstance] = useState(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(false);
  // ✅ Load external script + CSS once
  useEffect(() => {
    if (!isOpen) return;

    // Load CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.complycube.com/web-sdk/v1/style.css";
    document.head.appendChild(link);

    // Load Script
    const script = document.createElement("script");
    script.src = "https://assets.complycube.com/web-sdk/v1/complycube.min.js";
    script.async = true;

    script.onload = () => {
      setSdkLoaded(true);
      console.log("✅ ComplyCube SDK Loaded");
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup (optional but recommended)
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, [isOpen]);

  // ✅ Start Verification
  const startVerification = () => {
    if (!window.ComplyCube) {
      console.error("❌ SDK not loaded yet");
      return;
    }

     const instance =  window.ComplyCube.mount({
      token: token, // 🔥 from backend
      containerId: "complycube-mount",
      onComplete: function (data) {
        console.log("✅ Capture complete", data);
           // ✅ Unmount SDK UI
            if (instance) {
                  instance.unmount();
            }

         const very =    document.getElementById("header");
        // if(very !==undefined)
        // very.setAttribute('display', 'none');
          // ✅ 2. Clear container manually (extra safety)
           const el = document.getElementById("based-verification-div");
              if (el) {  //el.innerHTML = ""; 
                  setVerificationStatus(true);
                   setTimeout((onClose, instance) => {
                   onClose && onClose();
                   console.log("closing using parent onClose main overlay ");
                   // ✅ Unmount SDK UI
                     if (complycubeInstance) {
                           complycubeInstance.unmount();
                     }
                 }, 1200);
              } 

    
           
       
      },
    });

     setComplycubeInstance(instance);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           id="based-verification-div"
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
          >
            {/* Header */}
            <div id="header" className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Verify Your Identity
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>

            {/* Mount Container */}
            <div
              id="complycube-mount"
              className="w-full min-h-[200px] border rounded-lg mb-4"
            ></div>

            {/* Button */}
            <button
              onClick={startVerification}
              disabled={!sdkLoaded}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                sdkLoaded
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {sdkLoaded ? ( verificationStatus ? "Verification Done"  : "Start Verification" ) : "Loading SDK..."}
            
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MountStartVerification;