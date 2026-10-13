import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 space-y-4">
   
      <div className="w-16 h-16 bg-(--surface-muted) text-(--primary) rounded-full flex items-center justify-center mx-auto">
        <AlertCircle className="w-8 h-8" />
      </div>

     
      <div className="space-y-1.5 max-w-sm">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-(--foreground)">
          404 - Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-(--muted-foreground) leading-relaxed">
          The page you are trying to reach doesn't exist or has been moved.
        </p>
      </div>

   
      <button
        onClick={() =>navigate("/dashboard", { state: { title: "Dashboard" } })}
        className="btn btn-primary text-xs sm:text-sm py-2.5 px-5 flex items-center justify-center gap-2 mt-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>
    </div>
  );
}

export default NotFound;