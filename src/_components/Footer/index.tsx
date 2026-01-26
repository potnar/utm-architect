import { Heart, Coffee, Linkedin, Globe, Wrench } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-20 pt-12 pb-8 text-slate-400">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* KOLUMNA 1: MARKA */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
              🏗️ UTM Architect
            </h3>
            <p className="text-sm leading-relaxed max-w-sm">
              Darmowe narzędzie dla marketerów i founderów. Generuj linki
              śledzące bezbłędnie i zapisuj szablony lokalnie w przeglądarce.
              Alternatywa dla Google Campaign URL Builder, która szanuje Twój
              czas.
            </p>
          </div>

          {/* KOLUMNA 2: WSPARCIE I KONTAKT */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-100">Autor & Wsparcie</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://rejestracja.maratonwarszawski.com/pl/fundraising/78340dd5-a8e8-4540-8852-2222942ed145"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 flex items-center gap-2 transition-colors"
                >
                  <Heart className="w-4 h-4 text-red-500" /> Zbiórka na Maraton
                </a>
              </li>
              <li>
                <a
                  href="https://buycoffee.to/potnar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 flex items-center gap-2 transition-colors"
                >
                  <Coffee className="w-4 h-4 text-yellow-500" /> Postaw mi kawę
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mikołaj-cholewa-4b909573/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 flex items-center gap-2 transition-colors"
                >
                  <Linkedin className="w-4 h-4" /> Mój LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* KOLUMNA 3: INNE PROJEKTY */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-100">Inne narzędzia</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://data-janitor-pl.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 flex items-center gap-2 transition-colors"
                >
                  <Wrench className="w-4 h-4" /> Data Janitor (Excel)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2024 UTM Architect. Open Source.</p>
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3" />
            <span>Made with Next.js in Warsaw 🇵🇱</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
