import { CheckCircle2, CreditCard, Trash, X, XCircle, MapPin, Box } from "lucide-react";
import { cloneElement } from "react";
import toast from "react-hot-toast";

const iconVariants = {
  card: <CreditCard />,
  trash: <Trash />,
  location: <MapPin />,
  box: <Box />,
};

const toastStyles = {
  background: "transparent",
  boxShadow: "none",
  padding: "0",
  margin: "0",
  maxWidth: "420px",
  width: "100%",
};

export const successToast = (title, message, options = {}) => {
  const { icon, variant } = options;
  const customIcon = icon || (variant && iconVariants[variant.toLowerCase()]);

  toast(
    (t) => (
      <ToastTemplate
        type="success"
        title={title}
        message={message}
        defaultIcon={<CheckCircle2 />}
        customIcon={customIcon}
        t={t}
      />
    ),
    { 
      style: toastStyles,
      duration: 4000,
    }
  );
};

export const errorToast = (title, message, options = {}) => {
  const { icon, variant } = options;
  const customIcon = icon || (variant && iconVariants[variant.toLowerCase()]);

  toast(
    (t) => (
      <ToastTemplate
        type="error"
        title={title}
        message={message}
        defaultIcon={<XCircle />}
        customIcon={customIcon}
        t={t}
      />
    ),
    {
      style: toastStyles,
      duration: 5000,
    }
  );
};

const ToastTemplate = ({ type, defaultIcon, title, message, customIcon, t }) => {
  const isSuccess = type === "success";
  
  return (
    <div className={`
      relative overflow-hidden rounded-2xl backdrop-blur-md border
      ${isSuccess 
        ? 'bg-emerald-500/90 border-emerald-400/50 shadow-lg shadow-emerald-500/25' 
        : 'bg-rose-500/90 border-rose-400/50 shadow-lg shadow-rose-500/25'
      }
      transform transition-all duration-300 hover:scale-105
    `}>
      
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      
      <div className="relative z-10 p-4 flex items-start gap-3 min-w-[250px]">
        
        <div className={`
          flex-shrink-0 p-2 rounded-full
          ${isSuccess ? 'bg-white/20' : 'bg-white/20'}
        `}>
          {customIcon
            ? cloneElement(customIcon, { 
                className: "h-5 w-5 text-white drop-shadow-sm" 
              })
            : cloneElement(defaultIcon, { 
                className: "h-5 w-5 text-white drop-shadow-sm" 
              })
          }
        </div>
        
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-semibold text-white text-sm mb-1 drop-shadow-sm">
              {title}
            </h4>
          )}
          <p className="text-white/90 text-sm leading-relaxed drop-shadow-sm">
            {message}
          </p>
        </div>
        
        <button
          onClick={() => toast.dismiss(t.id)}
          className="
            flex-shrink-0 p-1.5 rounded-full 
            hover:bg-white/20 active:bg-white/30
            transition-all duration-200 group
          "
          aria-label="Close notification"
        >
          <X className="h-4 w-4 text-white/80 group-hover:text-white drop-shadow-sm" />
        </button>
      </div>
      
      <div 
        className={`
          absolute bottom-0 left-0 h-0.5 bg-white/40
          transition-all duration-100 ease-out
        `}
        style={{
          width: t.visible ? '100%' : '0%',
          animation: `shrink ${isSuccess ? '4000' : '5000'}ms linear forwards`
        }}
      />
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <div className={`
          absolute -top-4 -right-4 w-8 h-8 rounded-full opacity-30
          ${isSuccess ? 'bg-emerald-300' : 'bg-rose-300'}
          animate-pulse
        `} />
        <div className={`
          absolute -bottom-2 -left-2 w-4 h-4 rounded-full opacity-20
          ${isSuccess ? 'bg-emerald-200' : 'bg-rose-200'}
          animate-pulse delay-500
        `} />
      </div>
      
      
    </div>
  );
};