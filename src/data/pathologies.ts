import { PathologyInfo, PathologyId } from '../types/diet';

export const PATHOLOGIES_DATA: Record<PathologyId, PathologyInfo> = {
  diabetes: {
    id: 'diabetes',
    name: 'Diabete Tipo 2 / Insulino-Resistenza',
    badge: 'Zuccheri & Glicemia',
    severity: 'high',
    summary: 'Focus sul controllo della curva glicemica, assunzione di fibre solubili e riduzione di zuccheri ad alto impatto insulinico.',
    nutritionalRules: [
      'Privilegiare carboidrati complessi a basso indice glicemico (avena, orzo, farro integrale, legumi).',
      'Associare sempre i carboidrati a una fonte di proteine magre o grassi buoni per rallentare l\'assorbimento del glucosio.',
      'Limitare zuccheri semplici, bibite zuccherate, succhi di frutta industriali e dolciumi (<10% delle calorie totali).',
      'Assicurare un apporto di fibre di almeno 30-35g al giorno.'
    ],
    recommendedFoods: ['Avena integrale', 'Legumi (lenticchie, ceci)', 'Verdure a foglia verde', 'Salmone e pesce azzurro', 'Noci e mandorle', 'Olio extravergine d\'oliva'],
    avoidFoods: ['Zucchero bianco/canna', 'Bevande zuccherate', 'Farine ultra-raffinate e dolci industriali', 'Succhi di frutta concentrati', 'Riso bianco brillato in eccesso'],
    clinicalNotes: 'Il frazionamento dei carboidrati tra i pasti aiuta a prevenire picchi e cali glicemici reattivi.'
  },
  cholesterol: {
    id: 'cholesterol',
    name: 'Ipercolesterolemia (Colesterolo Alto)',
    badge: 'Lipidi & Cardiovascolare',
    severity: 'high',
    summary: 'Restrizione mirata dei grassi saturi e trans, con aumento di acidi grassi monoinsaturi, Omega-3 e steroli vegetali.',
    nutritionalRules: [
      'Mantenere i grassi saturi al di sotto del 7% dell\'apporto calorico giornaliero.',
      'Eliminare totalmente grassi idrogenati/trans (margarine, prodotti da forno industriali).',
      'Aumentare l\'introito di grassi monoinsaturi (olio extravergine d\'oliva) e polinsaturi Omega-3 (pesce grasso 2-3 volte/settimana, noci, semi di lino).',
      'Incrementare le fibre solubili (beta-glucani dell\'avena, pectina di mele e agrumi, legumi) che chelano il colesterolo enterico.'
    ],
    recommendedFoods: ['Olio extravergine d\'oliva a crudo', 'Salmone, sgombro, alici', 'Avena', 'Legumi', 'Frutta secca a guscio (30g/die)', 'Mele e agrumi'],
    avoidFoods: ['Burro, strutto, panna', 'Insaccati grassi e carni lavorate', 'Frattaglie (fegato, cervello)', 'Formaggi ad altissimo tenore lipidico'],
    clinicalNotes: 'L\'adozione del modello alimentare mediterraneo ha dimostrato la massima efficacia nella riduzione del rischio cardiovascolare.'
  },
  hypertension: {
    id: 'hypertension',
    name: 'Ipertensione Arteriosa (Protocollo DASH)',
    badge: 'Pressione & Sodio',
    severity: 'high',
    summary: 'Riduzione mirata del sodio con apporto generoso di potassio, magnesio e calcio da cibi freschi e non processati.',
    nutritionalRules: [
      'Limitare l\'assunzione di sodio a meno di 1.5 - 2g al giorno (equivalenti a un cucchiaino raso di sale).',
      'Sostituire il sale da cucina con erbe aromatiche fresche, spezie non piccanti, limone e aceto.',
      'Aumentare il consumo di alimenti ricchi di potassio e magnesio (spinaci, bietole, banane, legumi, patate al vapore).',
      'Evitare categoricamente snack salati, dadi da brodo industriali e salumi.'
    ],
    recommendedFoods: ['Verdure a foglia verde', 'Banane, albicocche e kiwi', 'Legumi', 'Yogurt bianco magro', 'Semi di zucca', 'Spezie aromatiche (rosmarino, timo, origano)'],
    avoidFoods: ['Sale aggiunto in eccesso', 'Salumi e insaccati (prosciutto crudo, salame)', 'Cibi in scatola salati o sott\'olio', 'Formaggi molto stagionati e sapidi'],
    clinicalNotes: 'Il pattern alimentare DASH riduce la pressione sistolica di oltre 8-11 mmHg già dopo poche settimane.'
  },
  nafld: {
    id: 'nafld',
    name: 'Steatosi Epatica (Fegato Grasso)',
    badge: 'Fegato & Metabolismo',
    severity: 'medium',
    summary: 'Riduzione del carico epatico mediante eliminazione del fruttosio aggiunto, cibi ultra-processati e moderato deficit calorico.',
    nutritionalRules: [
      'Abolizione completa di alcolici e bevande zuccherate (cola, tè freddi pronti, sciroppi di glucosio-fruttosio).',
      'Moderare la frutta a 2-3 porzioni al giorno, evitando succhi ed estratti privi di polpa/fibra.',
      'Incentivare cibi antiossidanti, ricchi di colina e polifenoli (carciofi, cicoria, rucola, tè verde, olio EVO).',
      'Evitare fritti e cotture a temperature eccessive.'
    ],
    recommendedFoods: ['Carciofi e cicoria amara', 'Olio EVO a crudo', 'Pesce azzurro', 'Tè verde', 'Carni bianche magre', 'Uova con moderazione'],
    avoidFoods: ['Alcol e superalcolici', 'Sciroppo di mais/fruttosio', 'Merendine e junk food', 'Fritti e intingoli pesanti'],
    clinicalNotes: 'Una graduale perdita di peso del 7-10% del peso corporeo porta alla regressione documentata dell\'infiltrazione grassa epatica.'
  },
  gout: {
    id: 'gout',
    name: 'Iperuricemia e Gotta',
    badge: 'Acido Urico & Purine',
    severity: 'medium',
    summary: 'Filtro specifico sugli alimenti ad alto contenuto di purine e stimolo all\'idratazione per favorire l\'escrezione renale.',
    nutritionalRules: [
      'Evitare carni rosse grasse, frattaglie (fegato, rognone, animelle) ed estratti concentrati di carne.',
      'Escludere o limitare frutti di mare, crostacei, acciughe e sardine conservate.',
      'Sospendere birra (anche analcolica) e superalcolici a causa dell\'effetto inibitorio sull\'escrezione di urati.',
      'Bere almeno 2.5 - 3 litri d\'acqua alcalina al giorno.'
    ],
    recommendedFoods: ['Uova (fonti proteiche prive di purine)', 'Latticini a basso contenuto di grassi (ricotta magra, yogurt)', 'Verdure fresche varie', 'Ciliegie e frutti di bosco (favoriscono l\'abbattimento dell\'acido urico)', 'Cereali integrali leggeri'],
    avoidFoods: ['Frattaglie e selvaggina', 'Crostacei e molluschi', 'Birra e alcolici', 'Brodi di carne concentrati'],
    clinicalNotes: 'I latticini magri e la vitamina C hanno mostrato un effetto protettivo nell\'aumentare l\'escrezione renale di acido urico.'
  },
  gerd_gastritis: {
    id: 'gerd_gastritis',
    name: 'Reflusso Gastroesofageo e Gastrite',
    badge: 'Stomaco & Acidità',
    severity: 'medium',
    summary: 'Prevenzione della risalita acida gastrica e dell\'irritazione della mucosa attraverso la selezione di alimenti a digestione rapida.',
    nutritionalRules: [
      'Frazionare l\'alimentazione in 4-5 piccoli pasti, evitando pasti serali abbondanti a ridosso del coricamento (attendere almeno 2-3 ore).',
      'Evitare cibi a forte acidità o che rilassano lo sfintere esofageo: agrumi, pomodoro crudo/cotto in quantità, cioccolato, menta, caffè.',
      'Evitare cibi ad alto tenore di grassi che allungano i tempi di svuotamento gastrico (formaggi grassi, fritti, carni grasse).',
      'Prediligere cotture leggere: vapore, cartoccio, piastra delicata.'
    ],
    recommendedFoods: ['Riso e patate', 'Pollo e tacchino lessi o ai ferri', 'Pesce bianco magro (merluzzo, spigola)', 'Zucchine e carote cotte', 'Fiocchi d\'avena', 'Banane'],
    avoidFoods: ['Pomodoro crudo e salse acide', 'Agrumi (limoni, arance, pompelmo)', 'Caffè anche decaffeinato e cioccolato', 'Menta e spezie piccanti (peperoncino, pepe)', 'Cibi fritti'],
    clinicalNotes: 'La temperatura dei cibi deve essere tiepida, evitando alimenti bollenti o ghiacciati.'
  },
  ibs_fodmap: {
    id: 'ibs_fodmap',
    name: 'Colon Irritabile (Protocollo Low-FODMAP)',
    badge: 'Intestino & Gonfiore',
    severity: 'medium',
    summary: 'Limitazione temporanea o mirata degli zuccheri a catena corta fermentabili per ridurre meteorismo, dolore addominale e disbiosi.',
    nutritionalRules: [
      'Limitare fruttosio in eccesso, lattosio, fruttani (cipolla, aglio, frumento), galattani (legumi tradizionali) e polioli.',
      'Privilegiare cereali privi di glutine come riso, quinoa, grano saraceno e patate per ridurre i fruttani.',
      'Utilizzare porzioni moderate di legumi decorticati o germogliati se tollerati.',
      'Mantenere una buona idratazione e una corretta masticazione lenta.'
    ],
    recommendedFoods: ['Riso basmati', 'Quinoa', 'Carote, zucchine, cetrioli', 'Frutti rossi, fragole, banane poco mature', 'Carni magre e pesce fresco', 'Olio EVO'],
    avoidFoods: ['Aglio e cipolla (anche in polvere)', 'Legumi con buccia dura in quantità', 'Cavolfiore e broccoli', 'Mele, pere, anguria', 'Dolcificanti artificiali in "-olo" (xilitolo, sorbitolo)'],
    clinicalNotes: 'La dieta Low-FODMAP permette una remissione del gonfiore in oltre il 70% dei pazienti con IBS.'
  },
  celiac: {
    id: 'celiac',
    name: 'Celiachia (Rigidamente Senza Glutine)',
    badge: 'Intolleranza Permanente',
    severity: 'high',
    summary: 'Esclusione totale e perenne di qualsiasi traccia di glutine (frumento, orzo, segale, farro, kamut e derivati contaminati).',
    nutritionalRules: [
      'Escludere rigorosamente frumento (grano tenero e duro), farro, orzo, segale, triticale, spelta, kamut.',
      'Sostituire con cereali e pseudocereali naturalmente senza glutine: riso, mais, grano saraceno, miglio, quinoa, amaranto e patate.',
      'Attenzione all\'avena: consumare solo avena certificata con spiga barrata senza glutine.',
      'Prestare attenzione alle contaminazioni crociate in cucina.'
    ],
    recommendedFoods: ['Riso di ogni varietà', 'Grano saraceno e quinoa', 'Mais e polenta', 'Patate e patate dolci', 'Tutte le carni, pesci, uova e verdure al naturale', 'Legumi secchi'],
    avoidFoods: ['Pasta e pane di grano convenzionali', 'Farro, orzo perlato, segale', 'Couscous e bulgur tradizionali', 'Birra da malto d\'orzo convenzionale', 'Pangrattato comune'],
    clinicalNotes: 'Anche minime tracce di glutine (oltre 20 ppm) innescano la risposta immunitaria e il danno ai villi intestinali.'
  },
  lactose: {
    id: 'lactose',
    name: 'Intolleranza al Lattosio',
    badge: 'Digestione Latticini',
    severity: 'low',
    summary: 'Gestione del deficit di lattasi mediante l\'impiego di prodotti delattosati o formaggi a stagionatura prolungata privi di lattosio.',
    nutritionalRules: [
      'Escludere latte vaccino standard, formaggi freschi ad alto contenuto di siero (mozzarella fresca non delattosata, ricotta vaccina fresca).',
      'Utilizzare prodotti con dicitura "senza lattosio" (< 0.01% o < 0.1%).',
      'Introdurre tranquillamente formaggi a pasta extraduro a lunga stagionatura (Parmigiano Reggiano o Grana Padano > 24 mesi) in cui il lattosio è degradato naturalmente dai fermenti lattici.',
      'Sostituire con bevande vegetali addizionate di calcio (soia, mandorla, avena).'
    ],
    recommendedFoods: ['Bevande vegetali (soia, mandorla)', 'Parmigiano Reggiano stagionato >24 mesi', 'Yogurt delattosato o greco a bassissimo lattosio', 'Uova, pesce, carni', 'Tofu al naturale'],
    avoidFoods: ['Latte vaccino intero/scremato normale', 'Formaggi spalmabili convenzionali', 'Panna da cucina normale', 'Gelati industriali tradizionali'],
    clinicalNotes: 'La tolleranza individuale può variare da zero a piccole dosi assunte durante i pasti principali.'
  },
  mild_renal: {
    id: 'mild_renal',
    name: 'Insufficienza Renale Lieve / Protezione Renale',
    badge: 'Reni & Azotemia',
    severity: 'high',
    summary: 'Controllo rigoroso del carico proteico (normoproteico moderato) e limitazione preventiva di fosforo e sodio.',
    nutritionalRules: [
      'Evitare regimi iperproteici: mantenere l\'apporto proteico tra 0.6 e 0.8 g/kg di peso corporeo ideale.',
      'Scegliere proteine ad alto valore biologico (uova, carni bianche magre, pesce) per minimizzare la produzione di scorie azotate.',
      'Controllare il consumo di alimenti ad alto contenuto di fosforo inorganico (additivi in bibite scure, insaccati).',
      'Assicurare un adeguato apporto energetico da carboidrati complessi per evitare il catabolismo muscolare endogeno.'
    ],
    recommendedFoods: ['Carboidrati complessi controllati', 'Verdure selezionate lessate', 'Olio extravergine d\'oliva', 'Albume d\'uovo', 'Mele e pere'],
    avoidFoods: ['Diete iperproteiche o beveroni proteici', 'Formaggi fusi con polifosfati', 'Carni trasformate con additivi fosfatici', 'Bevande alla cola'],
    clinicalNotes: 'Il controllo della pressione arteriosa e della glicemia è essenziale per rallentare la progressione del danno renale.'
  }
};
