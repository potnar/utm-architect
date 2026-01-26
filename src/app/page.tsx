"use client";

import { useUtmBuilder } from "@/hooks/useUtmBuilder";
import { toast } from "sonner";
import {
  Copy,
  RefreshCw,
  Link as LinkIcon,
  Save,
  Trash2,
  Play,
  MousePointerClick,
  Heart,
  Coffee,
} from "lucide-react";

// 👇 POPRAWIONE IMPORTY (z folderu _components)
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Button } from "@/_components/ui/button";

const SOURCE_OPTIONS = [
  "facebook",
  "linkedin",
  "google",
  "newsletter",
  "instagram",
  "tiktok",
];
const MEDIUM_OPTIONS = [
  "social",
  "cpc",
  "email",
  "banner",
  "organic",
  "referral",
];

export default function Home() {
  const {
    params,
    updateField,
    resultUrl,
    reset,
    presets,
    savePreset,
    loadPreset,
    deletePreset,
  } = useUtmBuilder();

  const handleCopy = () => {
    if (!resultUrl) return;
    navigator.clipboard.writeText(resultUrl);
    toast.success("Link skopiowany do schowka! 📋");
  };

  const handleSave = () => {
    const name = window.prompt(
      "Podaj nazwę dla tego szablonu (np. 'LinkedIn Promo'):",
    );
    if (name) {
      savePreset(name);
    }
  };

  return (
    <main className="bg-slate-50 p-4 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            UTM Architect 🏗️
          </h1>
          <p className="text-slate-500">
            Twórz, zapisuj i zarządzaj linkami śledzącymi. Wszystko lokalnie.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEWA KOLUMNA */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border-t-4 border-t-blue-600 shadow-sm">
              <CardHeader>
                <CardTitle>Parametry Kampanii</CardTitle>
                <CardDescription>
                  Wypełnij dane ręcznie lub wybierz z sugestii.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* BASE URL */}
                <div className="space-y-2">
                  <Label htmlFor="baseUrl" className="text-slate-700 font-bold">
                    Strona Docelowa (Base URL) *
                  </Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="baseUrl"
                      placeholder="https://twojastrona.pl/oferta"
                      className="pl-10 h-11"
                      value={params.baseUrl}
                      onChange={(e) => updateField("baseUrl", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* SOURCE */}
                  <div className="space-y-2">
                    <Label htmlFor="source">Źródło (utm_source) *</Label>
                    <Input
                      id="source"
                      placeholder="np. linkedin"
                      value={params.source}
                      onChange={(e) => updateField("source", e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {SOURCE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => updateField("source", opt)}
                          className="text-[10px] px-2 py-1 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 rounded-full text-slate-600 transition-colors border border-slate-200"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* MEDIUM */}
                  <div className="space-y-2">
                    <Label htmlFor="medium">Medium (utm_medium) *</Label>
                    <Input
                      id="medium"
                      placeholder="np. cpc"
                      value={params.medium}
                      onChange={(e) => updateField("medium", e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {MEDIUM_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => updateField("medium", opt)}
                          className="text-[10px] px-2 py-1 bg-slate-100 hover:bg-purple-100 hover:text-purple-700 rounded-full text-slate-600 transition-colors border border-slate-200"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CAMPAIGN */}
                <div className="space-y-2">
                  <Label htmlFor="campaign">
                    Nazwa Kampanii (utm_campaign) *
                  </Label>
                  <Input
                    id="campaign"
                    placeholder="np. black_friday_2024"
                    value={params.campaign}
                    onChange={(e) => updateField("campaign", e.target.value)}
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <Button
                    variant="outline"
                    onClick={reset}
                    className="text-slate-500 hover:text-red-600 w-full md:w-auto"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" /> Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PRAWA KOLUMNA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-8 space-y-6">
              {/* 1. KARTA WYNIKU */}
              <Card className="bg-slate-900 text-white border-slate-800 shadow-xl overflow-hidden">
                <CardHeader className="bg-slate-950/50 pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Play className="w-4 h-4 text-green-400" /> Twój Link
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="bg-slate-800 p-4 rounded-lg break-all min-h-[80px] flex items-center justify-center text-center border border-slate-700 font-mono text-sm leading-relaxed text-slate-300">
                    {resultUrl ? (
                      resultUrl
                    ) : (
                      <span className="opacity-30 italic">
                        Wpisz parametry...
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={handleCopy}
                      disabled={!resultUrl}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold"
                    >
                      <Copy className="w-4 h-4 mr-2" /> Kopiuj
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleSave}
                      disabled={!params.source || !params.baseUrl}
                      className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600"
                    >
                      <Save className="w-4 h-4 mr-2" /> Zapisz jako...
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 2. KARTA SZABLONÓW */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex justify-between items-center">
                    <span>📂 Twoje Szablony</span>
                    <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                      Zapisane w przeglądarce
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {presets.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
                      <Save className="w-8 h-8 mx-auto mb-2 opacity-20" />
                      <p>Brak zapisanych szablonów.</p>
                      <p className="text-xs">
                        Ustaw parametry i kliknij "Zapisz jako..."
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {presets.map((preset) => (
                        <li
                          key={preset.id}
                          className="group flex items-center justify-between p-3 rounded-md border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all bg-white shadow-sm"
                        >
                          <div
                            className="cursor-pointer flex-1"
                            onClick={() => loadPreset(preset)}
                          >
                            <div className="font-bold text-slate-700 text-sm flex items-center gap-2">
                              {preset.name}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-1 font-mono truncate max-w-[200px]">
                              {preset.params.source} / {preset.params.medium}
                            </div>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-blue-600"
                              onClick={() => loadPreset(preset)}
                              title="Załaduj"
                            >
                              <MousePointerClick className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-red-400 hover:text-red-600"
                              onClick={() => deletePreset(preset.id)}
                              title="Usuń"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              {/* 3. KARTA WSPARCIA */}
              <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-blue-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                    Podoba Ci się to narzędzie? 🙌
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-indigo-700 leading-relaxed">
                    Tworzę je po godzinach i udostępniam za darmo (Open Source).
                    Jeśli pomogło Ci w pracy, możesz mnie wesprzeć:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://buycoffee.to/potnar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 text-xs font-bold rounded-md transition-colors shadow-sm"
                    >
                      <Coffee className="w-3 h-3" /> Kawa (5zł)
                    </a>
                    <a
                      href="https://rejestracja.maratonwarszawski.com/pl/fundraising/78340dd5-a8e8-4540-8852-2222942ed145"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-md transition-colors shadow-sm"
                    >
                      <Heart className="w-3 h-3" /> Maraton
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
