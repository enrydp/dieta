# 🥗 NutriPlan Pro - Web App per Piani Alimentari Intelligenti & Clinici

NutriPlan Pro è un'applicazione web moderna, reattiva e fruibile da **PC, Tablet e Smartphone**, progettata per calcolare i fabbisogni nutrizionali su base scientifica e generare piani alimentari giornalieri e settimanali dettagliati con porzioni, sostituzioni intelligenti e gestione avanzata di patologie clinico-nutrizionali.

---

## 🌟 Funzionalità Principali

- **🩺 Supporto Clinico a 10 Patologie & Fabbisogni**:
  - Diabete Mellito Tipo 2 / Insulino-resistenza (controllo indice e carico glicemico, esclusione zuccheri semplici)
  - Ipercolesterolemia / Dislipidemia (restrizione grassi saturi <7%, aumento Omega-3 e fibre solubili)
  - Ipertensione Arteriosa (Protocollo DASH con drastica riduzione del sodio <1.5g/die)
  - Steatosi Epatica (Fegato Grasso / NAFLD)
  - Gotta e Iperuricemia (esclusione purine e idratazione elevata)
  - Reflusso Gastroesofageo (GERD) e Gastrite (cibi a rapida digestione, esclusione cibi acidi/irritanti)
  - Colon Irritabile (IBS / Protocollo Low-FODMAP)
  - Celiachia (100% Gluten-Free certificato)
  - Intolleranza al Lattosio (prodotti delattosati e formaggi a lunga stagionatura)
  - Insufficienza Renale Lieve (controllo protettivo dell'apporto proteico a 0.75 g/kg)

- **⚖️ Calcolo Scientifico Personalizzato**:
  - Calcolo del **BMR** con formula **Mifflin-St Jeor**
  - Calcolo del **TDEE** (Fabbisogno calorico di mantenimento con livelli di attività fisica da sedentario ad atleta)
  - Calcolo **BMI** e stima della **% di massa grassa** (Formula US Navy)
  - Obiettivi: Dimagrimento Graduale o Rapido, Mantenimento, Ipertrofia muscolare o Ricomposizione

- **📅 Piani Alimentari Giornalieri e Settimanali (7 Giorni)**:
  - Generazione automatica con bilanciamento al grammo dei macronutrienti (Proteine, Carboidrati, Grassi, Fibre)
  - **Sostituzione Equivalente Intelligente ("Scambia")**: ricalcola al volo la grammatura di un alimento alternativo mantenendo invariati i macro del pasto
  - Editing manuale delle grammature (+/- 10g o input diretto)
  - Ricerca e aggiunta alimenti da un database nutrizionale completo

- **🛒 Lista della Spesa Automatica**:
  - Somma automatica delle quantità per l'intera settimana
  - Raggruppamento per reparto del supermercato (Ortofrutta, Macelleria/Pescheria, Latticini/Uova, Dispensa, Condimenti)
  - Checkbox interattive per spuntare i prodotti dal cellulare durante la spesa
  - Funzione copia negli appunti per condivisione veloce (es. WhatsApp)

- **📄 Stampa & Esportazione PDF Formattata A4**:
  - Modale pronto per la stampa o salvataggio PDF di singolo giorno o intera settimana con intestazione e parametri

- **📱 Mobile-First & PWA**:
  - Interfaccia ottimizzata per touch da smartphone (bottom navigation bar, card grandi, usabilità con una mano)
  - Installabile come applicazione nativa tramite la funzione "Aggiungi a schermata Home"

- **🔒 Privacy Totale**:
  - Nessun dato personale inviato a server esterni; tutti i profili e le modifiche sono memorizzati in locale nel browser (`localStorage`).

---

## 🛠️ Stack Tecnologico

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icone**: Lucide React
- **Tipizzazione & Linting**: TypeScript con configurazione modulare

---

## 🚀 Avvio Locale

1. Clona il repository:
   ```bash
   git clone https://github.com/TUO-USERNAME/nutriplan.git
   cd nutriplan
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Avvia il server di sviluppo (accessibile anche da smartphone nella stessa rete Wi-Fi):
   ```bash
   npm run dev
   ```

4. Compila per la produzione:
   ```bash
   npm run build
   ```

---

## ⚠️ Nota Deontologica & Disclaimer Medico
NutriPlan Pro è uno strumento informativo e organizzativo basato su formule matematico-nutrizionali riconosciute. Non costituisce atto medico né sostituisce diagnosi, terapie o diete prescritte da medici specialisti o biologi nutrizionisti.
