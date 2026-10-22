import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { translations } from "@/lib/utlis/translation";

const initialCategories = ["Project", "English", "Data", "Ideas", "Personal"];

const initialNotes: Record<string, string> = {
  Project: "• Build portfolio website\nFinish UI design",
  English: "• Practice listening 20 mins daily\nRead 2 articles",
  Data: "• 💡 Ideas for this week:\n\nBuild portfolio website\nComplete Python Pandas course\n\nRemember:",
  Ideas: "• New SaaS dashboard concept\n",
  Personal: "• Grocery shopping\nGym schedule",
};

export default function Notes() {
  const currentLang = (localStorage.getItem("life_os_language") as "en" | "ar") || "en";
  const t = translations[currentLang];

  const [categories, setCategories] = useState<string[]>(() => {
    const savedCats = localStorage.getItem("app_notes_categories");
    if (savedCats !== null) {
      try {
        return JSON.parse(savedCats);
      } catch (e) {
        console.error(e);
      }
    }
    return initialCategories;
  });

  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0] || "Project",
  );

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("app_notes_content");
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialNotes;
  });

  useEffect(() => {
    localStorage.setItem("app_notes_categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("app_notes_content", JSON.stringify(notes));
  }, [notes]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNotes((prev) => ({
      ...prev,
      [activeCategory]: text,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;

      const newValue =
        value.substring(0, start) + "\n• " + value.substring(end);

      setNotes((prev) => ({
        ...prev,
        [activeCategory]: newValue,
      }));

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 3;
      }, 0);
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newCategoryName.trim();
    if (trimmedName && !categories.includes(trimmedName)) {
      const updatedCategories = [...categories, trimmedName];
      setCategories(updatedCategories);
      setActiveCategory(trimmedName);
      setNewCategoryName("");
      setIsAddingCategory(false);
    }
  };

  const getCategoryLabel = (cat: string) => {
    return (t as Record<string, string>)[cat] || cat;
  };

  const currentText = notes[activeCategory] || "";
  const characterCount = currentText.length;
  const lineCount = currentText ? currentText.split("\n").length : 0;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto pb-10 px-2 sm:px-0">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-(--foreground)">
          {t.notesTitle}
        </h2>
        <p className="text-xs text-(--muted-foreground)">
          {t.notesSubtitle}
        </p>
      </div>

      <Card className="bg-(--surface) border-(--border) shadow-sm">
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none flex-wrap sm:flex-nowrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                type="button"
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className="rounded-full text-xs font-semibold whitespace-nowrap px-4 h-8"
              >
                {getCategoryLabel(cat)}
              </Button>
            ))}

            {!isAddingCategory ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddingCategory(true)}
                className="rounded-full text-xs font-semibold whitespace-nowrap px-3 h-8 border-dashed"
              >
                {t.newCategory}
              </Button>
            ) : (
              <form
                onSubmit={handleAddCategory}
                className="flex items-center gap-1"
              >
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder={t.categoryNamePlaceholder}
                  autoFocus
                  className="px-3 py-1 text-xs rounded-full border border-(--border) bg-(--background) text-(--foreground) focus:outline-none focus:ring-1 focus:ring-(--ring) h-8"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-8 px-3 text-xs rounded-full"
                >
                  {t.addBtn}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsAddingCategory(false);
                    setNewCategoryName("");
                  }}
                  className="h-8 px-2 text-xs"
                >
                  {t.cancel}
                </Button>
              </form>
            )}
          </div>

          <div className="space-y-2">
            <textarea
              value={currentText}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              placeholder={t.notesPlaceholder}
              rows={10}
              className="w-full p-4 rounded-xl border border-(--border) bg-(--background) text-(--foreground) text-sm font-mono focus:outline-none focus:ring-2 focus:ring-(--ring) shadow-inner leading-relaxed resize-none"
            />

            <div className="flex items-center justify-between text-xs text-(--muted-foreground) px-1">
              <span>{t.characters}: {characterCount}</span>
              <span>{t.lines}: {lineCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
