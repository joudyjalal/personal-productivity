import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Languages, Trash2, AlertTriangle, Palette } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { customThemes, applyTheme } from "@/lib/utlis/theme.ts";

export default function Setting() {
  const { theme } = useTheme();

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("life_os_language") || "en";
  });

  const [activeThemeKey, setActiveThemeKey] = useState<keyof typeof customThemes>(() => {
    const saved = localStorage.getItem("life_os_custom_theme");
    return saved && saved in customThemes ? (saved as keyof typeof customThemes) : "ocean";
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    applyTheme(activeThemeKey, theme as "light" | "dark");
  }, [activeThemeKey, theme]);

  const handleThemeChange = (key: keyof typeof customThemes) => {
    setActiveThemeKey(key);
    applyTheme(key, theme as "light" | "dark");
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("life_os_language", lang);
    window.location.reload();
  };

  const handleConfirmReset = () => {
    localStorage.setItem("daily_schedule_items", JSON.stringify([]));
    localStorage.setItem("weekly_goals_items", JSON.stringify([]));
    localStorage.setItem("app_notes_content_v2", "");
    localStorage.setItem("life_os_sleep_records", JSON.stringify([]));
    localStorage.setItem("life_os_endofday_checkins", JSON.stringify([]));

    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 px-2 sm:px-0">
      <div className="flex items-center gap-3">
        <SettingsIcon className="w-6 h-6 text-(--primary)" />
        <div>
          <h2 className="text-xl font-bold text-(--foreground)">
            {language === "ar" ? "الإعدادات" : "Settings"}
          </h2>
          <p className="text-xs text-(--muted-foreground)">
            {language === "ar"
              ? "إدارة تفضيلات التطبيق والبيانات"
              : "Manage your application preferences and data"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
      
        <Card className="bg-(--surface) border-(--border)">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-(--primary)" />
              <h3 className="text-sm font-bold text-(--foreground)">
                {language === "ar" ? "اللغة والاتجاه" : "Language & Direction"}
              </h3>
            </div>
            <p className="text-xs text-(--muted-foreground)">
              {language === "ar"
                ? "اختر لغة عرض الواجهة."
                : "Choose interface language preferences."}
            </p>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant={language === "en" ? "default" : "outline"}
                onClick={() => handleLanguageChange("en")}
                className="text-xs h-9 rounded-xl font-medium px-6 cursor-pointer"
              >
                English
              </Button>
              <Button
                type="button"
                variant={language === "ar" ? "default" : "outline"}
                onClick={() => handleLanguageChange("ar")}
                className="text-xs h-9 rounded-xl font-medium px-6 cursor-pointer"
              >
                العربية
              </Button>
            </div>
          </CardContent>
        </Card>

   
        <Card className="bg-(--surface) border-(--border)">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-(--primary)" />
              <h3 className="text-sm font-bold text-(--foreground)">
                {language === "ar" ? "ثيمات الألوان" : "Color Themes"}
              </h3>
            </div>
            <p className="text-xs text-(--muted-foreground)">
              {language === "ar"
                ? "اختر الثيم المفضل لديك لتخصيص ألوان التطبيق بالكامل."
                : "Choose your favorite theme preset to customize the app interface."}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {Object.entries(customThemes).map(([key, themeObj]) => {
                const isSelected = activeThemeKey === key;
                const currentVars = themeObj[theme as "light" | "dark"];

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleThemeChange(key as keyof typeof customThemes)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "border-(--primary) bg-(--secondary) text-(--secondary-foreground) shadow-sm ring-1 ring-(--primary)"
                        : "border-(--border) bg-(--background) text-(--foreground) hover:bg-(--surface-muted)"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0 border border-black/10"
                      style={{ backgroundColor: currentVars["--primary"] }}
                    />
                    <span className="truncate">{themeObj.name}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

       
        <Card className="bg-(--surface) border-(--border)">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-500" />
              <h3 className="text-sm font-bold text-(--foreground)">
                {language === "ar" ? "إعادة ضبط البيانات" : "Reset Data"}
              </h3>
            </div>
            <p className="text-xs text-(--muted-foreground)">
              {language === "ar"
                ? "مسح كافة البيانات والتسجيلات المخزنة محلياً وإعادة التطبيق لحالته الأصلية."
                : "Clear all local records and reset the app to its factory state."}
            </p>
            <div className="pt-2">
              <Button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-xs h-9 rounded-xl font-semibold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
              >
                {language === "ar" ? "مسح جميع البيانات" : "Reset All Data"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

     
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-(--surface) border border-(--border) rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="flex items-center gap-3 text-rose-500">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-(--foreground)">
                {language === "ar" ? "تأكيد مسح البيانات" : "Confirm Data Reset"}
              </h3>
            </div>
            <p className="text-xs text-(--muted-foreground) leading-relaxed">
              {language === "ar"
                ? "هل أنت متأكد من مسح جميع بيانات التطبيق؟ سيتم تفريغ كافة الجداول، الأهداف، الملاحظات والسجلات ولن يمكنك الاستعادة."
                : "Are you sure you want to reset all data? This will clear all schedule tasks, goals, notes, and sleep records permanently."}
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="text-xs h-9 rounded-xl cursor-pointer"
              >
                {language === "ar" ? "إلغاء" : "Cancel"}
              </Button>
              <Button
                type="button"
                onClick={handleConfirmReset}
                className="text-xs h-9 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold cursor-pointer"
              >
                {language === "ar" ? "نعم، إزالة الكل" : "Yes, Reset All"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
