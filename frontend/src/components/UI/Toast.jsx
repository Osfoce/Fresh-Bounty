import toast from "react-hot-toast";

// Reusable toast functions
export const showToast = {
  success: (message, duration = 3000) => {
    toast.success(message, {
      duration: duration,
      position: "top-right",
      style: {
        background: "#333",
        color: "#fff",
        border: "1px solid #4ade80",
      },
      icon: "✅",
    });
  },

  error: (message, duration = 4000) => {
    toast.error(message, {
      duration: duration,
      position: "top-right",
      style: {
        background: "#333",
        color: "#fff",
        border: "1px solid #ef4444",
      },
      icon: "❌",
    });
  },

  loading: (message) => {
    return toast.loading(message, {
      position: "top-right",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  },

  info: (message, duration = 3000) => {
    toast(message, {
      duration: duration,
      position: "top-right",
      style: {
        background: "#333",
        color: "#fff",
        border: "1px solid #3b82f6",
      },
      icon: "ℹ️",
    });
  },

  // For blockchain transactions (most useful!)
  promise: (promise, messages) => {
    return toast.promise(promise, messages, {
      success: {
        duration: 3000,
        icon: "🎉",
      },
      error: {
        duration: 4000,
        icon: "❌",
      },
      loading: {
        icon: "🔄",
      },
      position: "top-right",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  },
};
