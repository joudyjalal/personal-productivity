import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { translations } from "@/lib/utlis/translation";

export function NotFound() {
  const navigate = useNavigate();
  const currentLang = (localStorage.getItem("life_os_language") as "en" | "ar") || "en";
  const t = translations[currentLang];

  const handleGoDashboard = () => {
    
    navigate("/", { state: { title: t.dashboard } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-4">
      <div className="w-16 h-16 bg-(--surface-muted) text-(--primary) rounded-full flex items-center justify-center mx-auto">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-(--foreground)">
          {t.notFoundTitle}
        </h1>
        <p className="text-xs sm:text-sm text-(--muted-foreground) leading-relaxed">
          {t.notFoundSubtitle}
        </p>
      </div>

      <button
        onClick={handleGoDashboard}
        className="btn btn-primary text-xs sm:text-sm py-2.5 px-5 flex items-center justify-center gap-2 mt-2 cursor-pointer"
      >
       
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
        <span>{t.backToDashboard}</span>
      </button>
    </div>
  );
}

export default NotFound;