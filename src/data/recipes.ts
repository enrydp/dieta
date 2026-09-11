import { RecipeItem } from '../types/recipe';

export const RECIPES_DATABASE: RecipeItem[] = [
  // --- PRIMI ---
  {
    id: 'pasta_integrale_ceci_rosmarino',
    title: 'Pasta Integrale con Ceci e Rosmarino',
    subtitle: 'Primo piatto ricco di proteine vegetali e fibre',
    category: 'primi',
    categoryLabel: '🍝 Primo',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    difficulty: 'Facile',
    servings: 2,
    estimatedCalories: 420,
    proteinGrams: 18,
    carbsGrams: 65,
    fatsGrams: 9,
    fiberGrams: 12,
    tags: ['Alto Contenuto Proteico', 'Alto Contenuto di Fibre', 'Cuore Sano', 'Basso Indice Glicemico'],
    suitablePathologies: ['cholesterol', 'diabetes', 'hypertension', 'nafld'],
    dietType: 'vegan',
    isGlutenFree: false,
    isLactoseFree: true,
    ingredients: [
      { name: 'Pasta integrale', amount: '160g' },
      { name: 'Ceci lessati', amount: '200g' },
      { name: 'Aglio', amount: '1 spicchio' },
      { name: 'Rosmarino fresco', amount: '2 rametti' },
      { name: 'Olio EVO', amount: '20ml (2 cucchiai)' },
      { name: 'Pomodorini datterini', amount: '100g', note: 'opzionale' },
      { name: 'Peperoncino', amount: 'q.b.' },
      { name: 'Sale integrale', amount: 'q.b.' },
    ],
    instructions: [
      'Cuoci la pasta integrale in abbondante acqua salata al dente.',
      'In una padella antiaderente scalda l\'olio EVO con l\'aglio schiacciato e il peperoncino.',
      'Aggiungi i ceci lessati e il rosmarino; rosola per 3-4 minuti fino a doratura leggera.',
      'Frulla il 30% dei ceci con un po\' di acqua di cottura per ottenere una crema legante.',
      'Unisci la pasta scolata nella padella con i ceci interi, la crema e un mestolo d\'acqua di cottura.',
      'Amalgama a fuoco vivo per 1-2 minuti, aggiusta di sale e servi con un filo d\'olio a crudo.',
    ],
    dietaryTips: 'L\'abbinamento pasta integrale + ceci fornisce una proteina vegetale completa, ricca di tutti gli amminoacidi essenziali. Il rosmarino ha proprietà antinfiammatorie.',
  },
  {
    id: 'riso_venere_salmone_avocado',
    title: 'Riso Venere con Salmone e Avocado',
    subtitle: 'Primo freddo ricco di Omega 3 e antiossidanti',
    category: 'primi',
    categoryLabel: '🍝 Primo',
    prepTimeMinutes: 15,
    cookTimeMinutes: 40,
    difficulty: 'Facile',
    servings: 2,
    estimatedCalories: 490,
    proteinGrams: 28,
    carbsGrams: 52,
    fatsGrams: 18,
    fiberGrams: 8,
    tags: ['Omega 3', 'Senza Lattosio', 'Senza Glutine', 'Cuore Sano', 'Antiossidante'],
    suitablePathologies: ['cholesterol', 'hypertension', 'nafld', 'diabetes'],
    dietType: 'pescatarian',
    isGlutenFree: true,
    isLactoseFree: true,
    ingredients: [
      { name: 'Riso Venere', amount: '160g' },
      { name: 'Salmone fresco', amount: '200g' },
      { name: 'Avocado Hass', amount: '1 medio (140g)' },
      { name: 'Cetriolo', amount: '100g' },
      { name: 'Limone', amount: '1' },
      { name: 'Olio EVO', amount: '15ml' },
      { name: 'Aneto o erba cipollina', amount: 'q.b.' },
      { name: 'Sale e pepe', amount: 'q.b.' },
    ],
    instructions: [
      'Cuoci il riso venere in acqua salata per 35-40 minuti; scolalo e lascialo raffreddare.',
      'Cuoci il salmone in padella antiaderente senza grassi per 3-4 minuti per lato; sbreiciola a pezzetti e lascia intiepidire.',
      'Taglia l\'avocado a cubetti e il cetriolo a rondelle.',
      'Prepara una vinaigrette con olio EVO, succo di limone, sale e pepe.',
      'In una ciotola mescola il riso raffreddato, il salmone, l\'avocado e il cetriolo.',
      'Condisci con la vinaigrette al limone e guarnisci con aneto o erba cipollina.',
    ],
    dietaryTips: 'Il riso Venere è ricco di antociani antiossidanti. Il salmone e l\'avocado forniscono Omega 3 protettivi per cuore e arterie. Ideale come piatto unico estivo.',
  },
  {
    id: 'minestrone_legumi_verdure',
    title: 'Minestrone Ricco di Legumi e Verdure',
    subtitle: 'Zuppa calda e nutriente, il piatto della tradizione italiana',
    category: 'contorni_zuppe',
    categoryLabel: '🥣 Zuppa',
    prepTimeMinutes: 20,
    cookTimeMinutes: 40,
    difficulty: 'Facile',
    servings: 4,
    estimatedCalories: 280,
    proteinGrams: 14,
    carbsGrams: 42,
    fatsGrams: 6,
    fiberGrams: 14,
    tags: ['Alto Contenuto di Fibre', 'Senza Glutine', 'Vegano', 'Cuore Sano', 'Basso Indice Glicemico'],
    suitablePathologies: ['cholesterol', 'diabetes', 'hypertension', 'nafld', 'gout'],
    dietType: 'vegan',
    isGlutenFree: true,
    isLactoseFree: true,
    ingredients: [
      { name: 'Fagioli cannellini lessati', amount: '200g' },
      { name: 'Lenticchie rosse decorticate', amount: '100g' },
      { name: 'Zucchine', amount: '2 medie' },
      { name: 'Carote', amount: '2' },
      { name: 'Sedano', amount: '2 coste' },
      { name: 'Pomodori pelati', amount: '200g' },
      { name: 'Spinaci freschi', amount: '100g' },
      { name: 'Patate', amount: '200g' },
      { name: 'Olio EVO', amount: '20ml' },
      { name: 'Rosmarino, salvia, alloro', amount: 'q.b.' },
      { name: 'Brodo vegetale', amount: '1,5 litri' },
    ],
    instructions: [
      'Soffriggi in olio EVO cipolla, sedano e carota tagliati a dadini per 5 minuti.',
      'Aggiungi le patate a cubetti e rosola per 3 minuti.',
      'Unisci i pomodori pelati schiacciati, le erbe aromatiche e il brodo vegetale; porta a ebollizione.',
      'Aggiungi le lenticchie rosse e cuoci per 20 minuti.',
      'Unisci le zucchine, i fagioli e gli spinaci; cuoci altri 10 minuti.',
      'Aggiusta di sale; servi con un filo di olio EVO a crudo e, se gradita, una spolverata di Grana.',
    ],
    dietaryTips: 'Il minestrone di legumi è un piatto completo e bilanciato: carboidrati complessi, proteine vegetali e fibre solubili riducono il picco glicemico e il colesterolo LDL.',
  },
  {
    id: 'orzo_risottato_verdure',
    title: 'Orzotto con Verdure di Stagione',
    subtitle: 'Cremoso come un risotto ma con più fibre e beta-glucani',
    category: 'primi',
    categoryLabel: '🍝 Primo',
    prepTimeMinutes: 10,
    cookTimeMinutes: 35,
    difficulty: 'Media',
    servings: 2,
    estimatedCalories: 380,
    proteinGrams: 12,
    carbsGrams: 68,
    fatsGrams: 7,
    fiberGrams: 10,
    tags: ['Basso Indice Glicemico', 'Cuore Sano', 'Alto Contenuto di Fibre'],
    suitablePathologies: ['cholesterol', 'diabetes', 'hypertension'],
    dietType: 'vegetarian',
    isGlutenFree: false,
    isLactoseFree: true,
    ingredients: [
      { name: 'Orzo perlato', amount: '160g' },
      { name: 'Zucchine', amount: '2' },
      { name: 'Asparagi', amount: '150g' },
      { name: 'Cipolla bianca', amount: '1' },
      { name: 'Brodo vegetale', amount: '800ml' },
      { name: 'Olio EVO', amount: '15ml' },
      { name: 'Grana Padano grattugiato', amount: '20g' },
      { name: 'Prezzemolo fresco', amount: 'q.b.' },
    ],
    instructions: [
      'Tosta l\'orzo in padella con un filo d\'olio per 2 minuti.',
      'Aggiungi la cipolla tritata e soffriggi fino a doratura.',
      'Bagna con il brodo caldo un mestolo per volta, come per un risotto, mescolando spesso.',
      'A metà cottura (circa 15 minuti) aggiungi le zucchine e gli asparagi tagliati a rondelle.',
      'Cuoci fino ad assorbimento del brodo (circa 35 minuti totali).',
      'Manteca con Grana, prezzemolo e un cucchiaio d\'olio EVO a crudo; servi.',
    ],
    dietaryTips: 'L\'orzo è ricco di beta-glucani, fibre solubili che abbassano il colesterolo LDL. La mantecatura con Grana aggiunge proteine e calcio senza eccedere i grassi.',
  },

  // --- SECONDI PESCE ---
  {
    id: 'salmone_al_forno_limone_erbe',
    title: 'Salmone al Forno con Limone ed Erbe',
    subtitle: 'Classico secondo leggero, ricchissimo di Omega 3',
    category: 'secondi_pesce',
    categoryLabel: '🐟 Secondo Pesce',
    prepTimeMinutes: 10,
    cookTimeMinutes: 18,
    difficulty: 'Facile',
    servings: 2,
    estimatedCalories: 320,
    proteinGrams: 36,
    carbsGrams: 2,
    fatsGrams: 18,
    fiberGrams: 0,
    tags: ['Omega 3', 'Senza Glutine', 'Senza Lattosio', 'Cuore Sano', 'High Protein'],
    suitablePathologies: ['cholesterol', 'hypertension', 'nafld', 'diabetes'],
    dietType: 'pescatarian',
    isGlutenFree: true,
    isLactoseFree: true,
    ingredients: [
      { name: 'Filetti di salmone fresco', amount: '300g (2 filetti da 150g)' },
      { name: 'Limone', amount: '1 (succo + scorza)' },
      { name: 'Aglio', amount: '1 spicchio' },
      { name: 'Olio EVO', amount: '15ml' },
      { name: 'Aneto fresco o timo', amount: '2 cucchiai' },
      { name: 'Sale integrale e pepe nero', amount: 'q.b.' },
    ],
    instructions: [
      'Preriscalda il forno a 200°C ventilato.',
      'Tampon asciuga i filetti di salmone con carta da cucina.',
      'In una piccola ciotola mescola olio EVO, succo di limone, aglio tritato fine, aneto, sale e pepe.',
      'Disponi i filetti su carta forno, versa la marinatura sopra e aggiungi la scorza di limone.',
      'Cuoci in forno per 15-18 minuti (o fino a cottura interna di 62°C).',
      'Servi con il salmone guarnito di fette di limone fresco e contorno di verdure o riso venere.',
    ],
    dietaryTips: 'Il salmone è tra le migliori fonti di EPA e DHA, acidi grassi Omega 3 che riducono i trigliceridi, migliorano la pressione arteriosa e proteggono il cuore.',
  },
  {
    id: 'merluzzo_al_vapore_gremolata',
    title: 'Filetto di Merluzzo al Vapore con Gremolata',
    subtitle: 'Leggerissimo e ricco di proteine nobili',
    category: 'secondi_pesce',
    categoryLabel: '🐟 Secondo Pesce',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    difficulty: 'Facile',
    servings: 2,
    estimatedCalories: 200,
    proteinGrams: 38,
    carbsGrams: 2,
    fatsGrams: 4,
    fiberGrams: 0,
    tags: ['Leggerissimo', 'High Protein', 'Senza Glutine', 'Senza Lattosio', 'Rene Sano'],
    suitablePathologies: ['cholesterol', 'diabetes', 'gerd_gastritis', 'mild_renal', 'hypertension'],
    dietType: 'pescatarian',
    isGlutenFree: true,
    isLactoseFree: true,
    ingredients: [
      { name: 'Filetti di merluzzo/nasello fresco', amount: '350g' },
      { name: 'Limone', amount: '1' },
      { name: 'Prezzemolo fresco', amount: '3 cucchiai' },
      { name: 'Aglio', amount: '1 spicchio piccolo' },
      { name: 'Olio EVO', amount: '10ml' },
      { name: 'Capperi dissalati', amount: '1 cucchiaio', note: 'opzionale' },
    ],
    instructions: [
      'Prepara la gremolata: trita finemente prezzemolo, aglio e scorza di limone; unisci capperi dissalati tritati.',
      'Cuoci i filetti di merluzzo a vapore per 12-15 minuti, finché la carne diventa opaca e si sfoglia.',
      'Disponi i filetti caldi nei piatti e condisci con la gremolata e un filo d\'olio EVO a crudo.',
      'Spremi del succo di limone fresco sopra e servi immediatamente.',
    ],
    dietaryTips: 'Il merluzzo è uno dei pesci più magri e digeribili. La gremolata sostituisce elegantemente condimenti più grassi aggiungendo vitamina C e proprietà antibatteriche.',
  },
  {
    id: 'polpo_insalata_patate_capperi',
    title: 'Insalata di Polpo con Patate e Capperi',
    subtitle: 'Piatto della tradizione mediterranea, leggero e saporito',
    category: 'secondi_pesce',
    categoryLabel: '🐟 Secondo Pesce',
    prepTimeMinutes: 20,
    cookTimeMinutes: 45,
    difficulty: 'Media',
    servings: 2,
    estimatedCalories: 290,
    proteinGrams: 25,
    carbsGrams: 28,
    fatsGrams: 7,
    fiberGrams: 4,
    tags: ['Dieta Mediterranea', 'Senza Glutine', 'Senza Lattosio', 'Cuore Sano'],
    suitablePathologies: ['cholesterol', 'diabetes', 'hypertension'],
    dietType: 'pescatarian',
    isGlutenFree: true,
    isLactoseFree: true,
    ingredients: [
      { name: 'Polpo verace', amount: '500g (fresco o decongelato)' },
      { name: 'Patate medie', amount: '250g' },
      { name: 'Sedano', amount: '2 coste' },
      { name: 'Capperi dissalati', amount: '2 cucchiai' },
      { name: 'Olive verdi denocciolate', amount: '50g', note: 'opzionale' },
      { name: 'Limone', amount: '1' },
      { name: 'Olio EVO', amount: '20ml' },
      { name: 'Prezzemolo', amount: 'un mazzetto' },
    ],
    instructions: [
      'Porta a ebollizione abbondante acqua con alloro e una carota; immergi il polpo per 3 volte prima di lasciarlo cuocere.',
      'Cuoci il polpo coperto per 35-45 minuti (a seconda della dimensione) finché è tenero.',
      'Lessa le patate con la buccia in acqua salata; sbucciale e tagliale a cubetti da fredde.',
      'Taglia il polpo a pezzi, il sedano a rondelle sottili.',
      'Prepara il condimento: olio EVO, succo di limone, prezzemolo tritato, sale e pepe.',
      'Mescola polpo, patate, sedano e capperi; condisci e fai riposare 15 minuti prima di servire.',
    ],
    dietaryTips: 'Il polpo è molto proteico e povero di grassi. Le patate forniscono potassio prezioso per la pressione. Ideale come piatto unico estivo.',
  },

  // --- SECONDI CARNE ---
  {
    id: 'pollo_al_limone_capperi',
    title: 'Petto di Pollo al Limone e Capperi',
    subtitle: 'Classico della cucina light, pronto in 20 minuti',
    category: 'secondi_carne',
    categoryLabel: '🍗 Secondo Carne',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    difficulty: 'Facile',
    servings: 2,
    estimatedCalories: 260,
    proteinGrams: 44,
    carbsGrams: 4,
    fatsGrams: 7,
    fiberGrams: 0,
    tags: ['High Protein', 'Senza Glutine', 'Senza Lattosio', 'Basso in Grassi'],
    suitablePathologies: ['cholesterol', 'diabetes', 'hypertension', 'nafld'],
    dietType: 'omnivore',
    isGlutenFree: true,
    isLactoseFree: true,
    ingredients: [
      { name: 'Petto di pollo', amount: '350g (battuto sottile)' },
      { name: 'Limone', amount: '1 grande' },
      { name: 'Capperi dissalati', amount: '2 cucchiai' },
      { name: 'Olio EVO', amount: '15ml' },
      { name: 'Aglio', amount: '1 spicchio' },
      { name: 'Prezzemolo', amount: 'q.b.' },
      { name: 'Farina di riso', amount: '20g', note: 'per infarinatura leggera, opzionale' },
    ],
    instructions: [
      'Batti il petto di pollo tra due fogli di pellicola finché è uniforme e sottile (~1cm).',
      'Scalda olio EVO in padella antiaderente con aglio; cuoci il pollo 3-4 minuti per lato.',
      'Rimuovi il pollo; nella stessa padella aggiungi succo di limone e capperi dissalati.',
      'Lascia ridurre il sughetto per 2 minuti a fuoco medio.',
      'Rimetti il pollo in padella, giralo nel sughetto e cuoci altri 2 minuti.',
      'Servi con prezzemolo fresco tritato e fette di limone.',
    ],
    dietaryTips: 'Il petto di pollo è la carne con il miglior rapporto proteine/grassi. I capperi aggiungono antiossidanti (quercetina e kaempferolo) senza calorie significative.',
  },
  {
    id: 'polpette_tacchino_al_forno',
    title: 'Polpette di Tacchino al Forno con Pomodoro',
    subtitle: 'Proteiche, gustose e cotte senza frittura',
    category: 'secondi_carne',
    categoryLabel: '🍗 Secondo Carne',
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    difficulty: 'Media',
    servings: 3,
    estimatedCalories: 300,
    proteinGrams: 38,
    carbsGrams: 12,
    fatsGrams: 10,
    fiberGrams: 2,
    tags: ['High Protein', 'Senza Glutine (con pane GF)', 'Cuore Sano', 'Basso in Grassi'],
    suitablePathologies: ['cholesterol', 'diabetes', 'hypertension'],
    dietType: 'omnivore',
    isGlutenFree: false,
    isLactoseFree: true,
    ingredients: [
      { name: 'Macinato di tacchino', amount: '450g' },
      { name: 'Pane integrale raffermo', amount: '50g (bagnato in latte scremato)' },
      { name: 'Uovo intero', amount: '1' },
      { name: 'Aglio tritato', amount: '1 spicchio' },
      { name: 'Prezzemolo', amount: '2 cucchiai' },
      { name: 'Passata di pomodoro', amount: '300ml' },
      { name: 'Basilico fresco', amount: 'q.b.' },
      { name: 'Olio EVO', amount: '10ml' },
    ],
    instructions: [
      'Preriscalda il forno a 200°C ventilato.',
      'Impasta il macinato di tacchino con pane strizzato, uovo, aglio e prezzemolo; forma polpette grandi come una pallina da golf.',
      'Disponi le polpette su una teglia con carta forno e cuoci 15 minuti, girandole a metà.',
      'In un tegame scalda la passata di pomodoro con olio EVO e basilico per 5 minuti.',
      'Trasferisci le polpette nel sugo di pomodoro e cuoci insieme altri 10 minuti coperto.',
      'Servi con contorno di verdure al vapore o insalata mista.',
    ],
    dietaryTips: 'La cottura al forno prima e in umido poi elimina i grassi della frittura mantenendo la morbidezza. Il tacchino è ricco di triptofano, precursore della serotonina.',
  },
  {
    id: 'straccetti_manzo_rucola',
    title: 'Straccetti di Manzo con Rucola e Grana',
    subtitle: 'Piatto veloce e raffinato, pronto in 10 minuti',
    category: 'secondi_carne',
    categoryLabel: '🍗 Secondo Carne',
    prepTimeMinutes: 5,
    cookTimeMinutes: 8,
    difficulty: 'Facile',
    servings: 2,
    estimatedCalories: 280,
    proteinGrams: 36,
    carbsGrams: 3,
    fatsGrams: 14,
    fiberGrams: 1,
    tags: ['High Protein', 'Senza Glutine', 'Veloce', 'Dieta Mediterranea'],
    suitablePathologies: ['cholesterol', 'diabetes', 'celiac'],
    dietType: 'omnivore',
    isGlutenFree: true,
    isLactoseFree: false,
    ingredients: [
      { name: 'Straccetti di manzo magro', amount: '280g (tagliati a strisce)' },
      { name: 'Rucola selvatica', amount: '80g' },
      { name: 'Grana Padano a scaglie', amount: '20g' },
      { name: 'Limone', amount: '½' },
      { name: 'Olio EVO', amount: '15ml' },
      { name: 'Sale e pepe', amount: 'q.b.' },
    ],
    instructions: [
      'Scaldi una padella antiaderente a fuoco alto senza grassi fino a fumante.',
      'Cuoci gli straccetti in padella caldissima per 1-2 minuti per lato (devono rimanere rosati internamente).',
      'Disponi la rucola fresca nel piatto da portata.',
      'Aggiungi gli straccetti caldi sopra la rucola (appassiranno leggermente con il calore).',
      'Condisci con olio EVO, succo di limone, sale e pepe.',
      'Completa con scaglie di Grana e servi immediatamente.',
    ],
    dietaryTips: 'Il manzo magro è ricco di ferro eme (altamente assorbibile), zinco e vitamina B12. La rucola aggiunge glucosinolati protettivi e vitamina K.',
  },

  // --- SECONDI VEGETARIANI ---
  {
    id: 'tofu_croccante_verdure_wok',
    title: 'Tofu Croccante con Verdure Saltate al Wok',
    subtitle: 'Piatto proteico vegano, ricco di colori e sapori orientali',
    category: 'secondi_veg',
    categoryLabel: '🥗 Secondo Veg',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    difficulty: 'Facile',
    servings: 2,
    estimatedCalories: 290,
    proteinGrams: 22,
    carbsGrams: 18,
    fatsGrams: 15,
    fiberGrams: 6,
    tags: ['Vegano', 'High Protein', 'Senza Glutine', 'Senza Lattosio', 'Basso Indice Glicemico'],
    suitablePathologies: ['cholesterol', 'diabetes', 'nafld', 'hypertension'],
    dietType: 'vegan',
    isGlutenFree: true,
    isLactoseFree: true,
    ingredients: [
      { name: 'Tofu compatto al naturale', amount: '300g' },
      { name: 'Peperoni rossi e gialli', amount: '200g' },
      { name: 'Broccoli', amount: '150g' },
      { name: 'Zucchine', amount: '1' },
      { name: 'Salsa tamari (soia GF)', amount: '2 cucchiai' },
      { name: 'Aglio e zenzero fresco', amount: '1 spicchio + 1cm' },
      { name: 'Olio di sesamo', amount: '10ml' },
      { name: 'Semi di sesamo', amount: '1 cucchiaio' },
    ],
    instructions: [
      'Togli il tofu dal liquido, asciugalo bene e taglialo a cubetti da 2cm.',
      'Cuocilo in padella antiaderente senza grassi a fuoco medio-alto 4-5 minuti per lato fino a doratura.',
      'In un wok o padella grande scialda olio di sesamo con aglio e zenzero grattugiato.',
      'Aggiungi i broccoli e rosola per 3 minuti; poi peperoni e zucchine per altri 4 minuti.',
      'Unisci il tofu croccante, la salsa tamari e mescola a fuoco vivo per 2 minuti.',
      'Servi con semi di sesamo tostati e, se gradito, riso basmati o riso integrale.',
    ],
    dietaryTips: 'Il tofu è una delle migliori fonti di proteina vegetale completa. Le isoflavoni della soia hanno effetti benefici su colesterolo e menopausa.',
  },
  {
    id: 'frittata_spinaci_ricotta',
    title: 'Frittata di Spinaci e Ricotta al Forno',
    subtitle: 'Proteica e cremosa, senza frittura nell\'olio',
    category: 'secondi_veg',
    categoryLabel: '🥗 Secondo Veg',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    difficulty: 'Facile',
    servings: 2,
    estimatedCalories: 260,
    proteinGrams: 24,
    carbsGrams: 4,
    fatsGrams: 16,
    fiberGrams: 2,
    tags: ['Vegetariano', 'High Protein', 'Senza Glutine', 'Basso in Carboidrati'],
    suitablePathologies: ['diabetes', 'cholesterol'],
    dietType: 'vegetarian',
    isGlutenFree: true,
    isLactoseFree: false,
    ingredients: [
      { name: 'Uova intere', amount: '4' },
      { name: 'Spinaci freschi', amount: '150g' },
      { name: 'Ricotta vaccina magra', amount: '80g' },
      { name: 'Grana Padano grattugiato', amount: '20g' },
      { name: 'Noce moscata', amount: 'q.b.' },
      { name: 'Olio EVO', amount: '10ml' },
      { name: 'Sale e pepe', amount: 'q.b.' },
    ],
    instructions: [
      'Preriscalda il forno a 180°C ventilato.',
      'Sbollenta gli spinaci per 2 minuti; scolali, strizzali bene e tritali.',
      'Sbatti le uova con ricotta, Grana, noce moscata, sale e pepe; aggiungi gli spinaci.',
      'Versa il composto in una teglia rotonda (20cm) unta con olio EVO.',
      'Cuoci in forno per 18-20 minuti finché è dorata e compatta al centro.',
      'Lascia intiepidire 5 minuti prima di tagliare a fette; ottima anche fredda.',
    ],
    dietaryTips: 'La cottura al forno invece che in padella riduce il fabbisogno di grassi. Gli spinaci forniscono ferro non-eme, meglio assorbito in presenza di vitamina C.',
  },
  {
    id: 'burger_ceci_patate_dolci',
    title: 'Burger di Ceci e Patate Dolci',
    subtitle: 'Hamburger vegetale saporito e saziante',
    category: 'secondi_veg',
    categoryLabel: '🥗 Secondo Veg',
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
    difficulty: 'Media',
    servings: 3,
    estimatedCalories: 310,
    proteinGrams: 14,
    carbsGrams: 50,
    fatsGrams: 7,
    fiberGrams: 10,
    tags: ['Vegano', 'Senza Glutine', 'Senza Lattosio', 'Alto Contenuto di Fibre', 'Saziante'],
    suitablePathologies: ['cholesterol', 'diabetes', 'hypertension', 'nafld'],
    dietType: 'vegan',
    isGlutenFree: true,
    isLactoseFree: true,
    ingredients: [
      { name: 'Ceci lessati', amount: '250g' },
      { name: 'Patate dolci (batata)', amount: '200g (cotte al forno)' },
      { name: 'Curcuma', amount: '1 cucchiaino' },
      { name: 'Cumino macinato', amount: '1 cucchiaino' },
      { name: 'Prezzemolo', amount: '2 cucchiai' },
      { name: 'Farina di ceci', amount: '30g (per legare)' },
      { name: 'Sale e pepe', amount: 'q.b.' },
      { name: 'Olio EVO', amount: '10ml' },
    ],
    instructions: [
      'Schiaccia i ceci con una forchetta (non frullare, deve rimanere rustico).',
      'Schiaccia anche le patate dolci cotte e mescola ai ceci con curcuma, cumino, prezzemolo, sale.',
      'Aggiungi la farina di ceci, amalgama e forma 6 burger alti circa 1,5cm.',
      'Cuoci in padella antiaderente con poco olio EVO per 5 minuti per lato, a fuoco medio.',
      'Oppure cuoci in forno a 200°C per 20 minuti, girando a metà.',
      'Servi con insalata di rucola, pomodorini e una salsa allo yogurt greco.',
    ],
    dietaryTips: 'La curcuma ha potenti proprietà antinfiammatorie (curcumina), potenziata dal pepe nero. I ceci + patate dolci danno una combinazione completa di aminoacidi.',
  },

  // --- COLAZIONE & SPUNTINI ---
  {
    id: 'porridge_avena_frutti_rossi',
    title: 'Porridge d\'Avena ai Frutti Rossi',
    subtitle: 'Colazione energetica, ricca di fibre e antiossidanti',
    category: 'colazione_snack',
    categoryLabel: '🥣 Colazione',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    difficulty: 'Facile',
    servings: 1,
    estimatedCalories: 350,
    proteinGrams: 14,
    carbsGrams: 54,
    fatsGrams: 9,
    fiberGrams: 10,
    tags: ['Senza Lattosio (con bevanda vegetale)', 'Alto Contenuto di Fibre', 'Cuore Sano', 'Basso Indice Glicemico'],
    suitablePathologies: ['cholesterol', 'diabetes', 'hypertension'],
    dietType: 'vegetarian',
    isGlutenFree: false,
    isLactoseFree: true,
    ingredients: [
      { name: 'Fiocchi d\'avena', amount: '50g' },
      { name: 'Latte scremato o bevanda d\'avena', amount: '200ml' },
      { name: 'Mirtilli freschi', amount: '80g' },
      { name: 'Lamponi', amount: '50g' },
      { name: 'Noci sgusciate', amount: '20g' },
      { name: 'Semi di chia', amount: '10g' },
      { name: 'Cannella', amount: 'q.b.' },
    ],
    instructions: [
      'In un pentolino mescola fiocchi d\'avena e latte; cuoci a fuoco medio mescolando per 8-10 minuti.',
      'Quando il porridge raggiunge la consistenza cremosa desiderata, togli dal fuoco.',
      'Versa in una ciotola e aggiungi i semi di chia mescolando rapidamente.',
      'Guarnisci con mirtilli, lamponi freschi, noci spezzettate e una spolverata di cannella.',
      'Consuma subito o prepara la sera per il giorno dopo (overnight oats a freddo).',
    ],
    dietaryTips: 'I beta-glucani dell\'avena abbassano il colesterolo LDL. I frutti rossi sono ricchissimi di antociani antiossidanti. I semi di chia aggiungono Omega 3 vegetali.',
  },
  {
    id: 'smoothie_verde_proteico',
    title: 'Smoothie Verde Proteico con Yogurt Greco',
    subtitle: 'Colazione o spuntino rapido, pronto in 3 minuti',
    category: 'colazione_snack',
    categoryLabel: '🥤 Spuntino',
    prepTimeMinutes: 3,
    cookTimeMinutes: 0,
    difficulty: 'Facile',
    servings: 1,
    estimatedCalories: 280,
    proteinGrams: 18,
    carbsGrams: 35,
    fatsGrams: 6,
    fiberGrams: 5,
    tags: ['High Protein', 'Senza Glutine', 'Veloce', 'Antiossidante'],
    suitablePathologies: ['cholesterol', 'diabetes', 'hypertension'],
    dietType: 'vegetarian',
    isGlutenFree: true,
    isLactoseFree: false,
    ingredients: [
      { name: 'Yogurt greco 0%', amount: '130g' },
      { name: 'Banana', amount: '½ (congelata per cremosità)' },
      { name: 'Spinaci freschi', amount: '30g' },
      { name: 'Kiwi', amount: '1' },
      { name: 'Acqua o latte scremato', amount: '100ml' },
      { name: 'Semi di lino macinati', amount: '10g' },
      { name: 'Miele acacia', amount: '1 cucchiaino', note: 'opzionale' },
    ],
    instructions: [
      'Metti tutti gli ingredienti nel frullatore nell\'ordine: liquido, verdure, frutta, yogurt.',
      'Frulla alla massima velocità per 60 secondi fino ad ottenere una crema omogenea.',
      'Assaggia e, se troppo denso, aggiungi acqua; se vuoi più dolce, aggiungi il miele.',
      'Servi immediatamente per preservare vitamine e antiossidanti.',
    ],
    dietaryTips: 'Gli spinaci nel frullato non si sentono ma aggiungono ferro, magnesio e folati. La banana congelata dà cremosità senza panna. Lo yogurt greco apporta proteine e probiotici.',
  },
  {
    id: 'yogurt_greco_frutta_secca',
    title: 'Ciotola di Yogurt Greco con Frutta e Semi',
    subtitle: 'Spuntino proteico bilanciatissimo, pronto in 2 minuti',
    category: 'colazione_snack',
    categoryLabel: '🥣 Spuntino',
    prepTimeMinutes: 2,
    cookTimeMinutes: 0,
    difficulty: 'Facile',
    servings: 1,
    estimatedCalories: 240,
    proteinGrams: 16,
    carbsGrams: 24,
    fatsGrams: 9,
    fiberGrams: 4,
    tags: ['High Protein', 'Senza Glutine', 'Veloce', 'Probiotici'],
    suitablePathologies: ['cholesterol', 'diabetes', 'hypertension', 'ibs_fodmap'],
    dietType: 'vegetarian',
    isGlutenFree: true,
    isLactoseFree: false,
    ingredients: [
      { name: 'Yogurt greco 0% naturale', amount: '150g' },
      { name: 'Fragole o mirtilli', amount: '80g' },
      { name: 'Mandorle', amount: '15g' },
      { name: 'Semi di chia', amount: '8g' },
      { name: 'Cannella o vaniglia', amount: 'q.b.' },
    ],
    instructions: [
      'Versa lo yogurt greco in una ciotola.',
      'Aggiungi la frutta fresca, le mandorle intere o spezzettate e i semi di chia.',
      'Profuma con una spolverata di cannella o estratto di vaniglia.',
      'Mescola leggermente e consuma subito.',
    ],
    dietaryTips: 'Questo spuntino bilancia proteine, grassi buoni e carboidrati complessi. I semi di chia assorbono acqua e riducono il picco glicemico. Ottimo anche come pre-allenamento.',
  },

  // --- CONTORNI E INSALATE ---
  {
    id: 'insalata_greca_rivisitata',
    title: 'Insalata Mediterranea Rivisitata',
    subtitle: 'Contorno colorato ricco di antiossidanti e minerali',
    category: 'contorni_zuppe',
    categoryLabel: '🥗 Contorno',
    prepTimeMinutes: 10,
    cookTimeMinutes: 0,
    difficulty: 'Facile',
    servings: 2,
    estimatedCalories: 185,
    proteinGrams: 8,
    carbsGrams: 12,
    fatsGrams: 12,
    fiberGrams: 4,
    tags: ['Vegano (senza feta)', 'Senza Glutine', 'Senza Cottura', 'Cuore Sano', 'Antiossidante'],
    suitablePathologies: ['cholesterol', 'hypertension', 'diabetes'],
    dietType: 'vegetarian',
    isGlutenFree: true,
    isLactoseFree: false,
    ingredients: [
      { name: 'Pomodorini datterini', amount: '200g' },
      { name: 'Cetriolo', amount: '1' },
      { name: 'Lattuga romana', amount: '100g' },
      { name: 'Rucola', amount: '40g' },
      { name: 'Peperoni rossi', amount: '100g' },
      { name: 'Mozzarella light', amount: '80g', note: 'o tofu per versione vegan' },
      { name: 'Olive verdi', amount: '30g' },
      { name: 'Olio EVO', amount: '15ml' },
      { name: 'Limone', amount: '½' },
      { name: 'Origano', amount: 'q.b.' },
    ],
    instructions: [
      'Lava e asciuga tutta la verdura.',
      'Taglia i pomodorini a metà, il cetriolo a rondelle, i peperoni a strisce.',
      'Spezza la lattuga romana e unisci la rucola.',
      'Aggiungi la mozzarella tagliata a cubetti e le olive.',
      'Condisci con olio EVO a crudo, limone, origano, sale e pepe al momento di servire.',
    ],
    dietaryTips: 'L\'olio EVO aggiunto a crudo preserva i polifenoli antiossidanti. Consumare le verdure crude preserva enzimi e vitamina C.',
  },
  {
    id: 'verdure_arrosto_erbe',
    title: 'Verdure di Stagione Arrosto alle Erbe',
    subtitle: 'Contorno colorato e versatile, perfetto con qualsiasi secondo',
    category: 'contorni_zuppe',
    categoryLabel: '🥕 Contorno',
    prepTimeMinutes: 10,
    cookTimeMinutes: 30,
    difficulty: 'Facile',
    servings: 3,
    estimatedCalories: 140,
    proteinGrams: 4,
    carbsGrams: 20,
    fatsGrams: 6,
    fiberGrams: 7,
    tags: ['Vegano', 'Senza Glutine', 'Senza Lattosio', 'Cuore Sano', 'Detox'],
    suitablePathologies: ['cholesterol', 'hypertension', 'diabetes', 'nafld'],
    dietType: 'vegan',
    isGlutenFree: true,
    isLactoseFree: true,
    ingredients: [
      { name: 'Zucchine', amount: '2' },
      { name: 'Melanzane', amount: '1 media' },
      { name: 'Peperoni rossi e gialli', amount: '2' },
      { name: 'Finocchi', amount: '1' },
      { name: 'Pomodorini', amount: '150g' },
      { name: 'Olio EVO', amount: '20ml' },
      { name: 'Rosmarino, timo, origano', amount: 'q.b.' },
      { name: 'Aglio', amount: '2 spicchi' },
      { name: 'Sale integrale', amount: 'q.b.' },
    ],
    instructions: [
      'Preriscalda il forno a 210°C ventilato.',
      'Taglia tutte le verdure in pezzi regolari (circa 3cm).',
      'Mescola in una ciotola grande con olio EVO, aglio, erbe aromatiche e sale.',
      'Distribuisci su una leccarda larga in strato singolo (fondamentale per tostare, non stufare).',
      'Cuoci per 25-30 minuti, girando a metà cottura, fino a colorazione dorata.',
      'Servi caldo o freddo come contorno o insalata.',
    ],
    dietaryTips: 'L\'arrostimento concentra i sapori e migliora la biodisponibilità del licopene del pomodoro. L\'aglio arrosto perde l\'acrore e mantiene le proprietà cardiovascolari.',
  },
  {
    id: 'zuppa_lenticchie_rosse_curcuma',
    title: 'Zuppa di Lenticchie Rosse e Curcuma',
    subtitle: 'Vellutata speziata pronta in 25 minuti, comfort food sano',
    category: 'contorni_zuppe',
    categoryLabel: '🥣 Zuppa',
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    difficulty: 'Facile',
    servings: 3,
    estimatedCalories: 235,
    proteinGrams: 15,
    carbsGrams: 38,
    fatsGrams: 5,
    fiberGrams: 10,
    tags: ['Vegano', 'Senza Glutine', 'Senza Lattosio', 'Antinfiammatorio', 'Basso Indice Glicemico'],
    suitablePathologies: ['cholesterol', 'diabetes', 'hypertension', 'nafld', 'ibs_fodmap'],
    dietType: 'vegan',
    isGlutenFree: true,
    isLactoseFree: true,
    ingredients: [
      { name: 'Lenticchie rosse decorticate', amount: '250g' },
      { name: 'Cipolla rossa', amount: '1' },
      { name: 'Carote', amount: '2' },
      { name: 'Curcuma', amount: '2 cucchiaini' },
      { name: 'Cumino macinato', amount: '1 cucchiaino' },
      { name: 'Zenzero fresco', amount: '1cm' },
      { name: 'Brodo vegetale', amount: '1 litro' },
      { name: 'Olio EVO', amount: '15ml' },
      { name: 'Succo di limone', amount: '½ limone' },
    ],
    instructions: [
      'Soffriggi cipolla e carote tritate in olio EVO per 5 minuti.',
      'Aggiungi curcuma, cumino e zenzero grattugiato; tosta le spezie per 1 minuto.',
      'Unisci le lenticchie rosse (precedentemente risciacquate) e il brodo caldo.',
      'Porta a ebollizione, abbassa la fiamma e cuoci per 20-25 minuti mescolando.',
      'Frulla con un frullatore a immersione fino a crema liscia.',
      'Aggiusta di sale, aggiungi succo di limone e servi con un filo d\'olio EVO e prezzemolo.',
    ],
    dietaryTips: 'Le lenticchie rosse sono tra i cibi con il più basso indice glicemico. La curcuma con il pepe nero aumenta la biodisponibilità della curcumina di 2000%. Ottima piatto unico.',
  },

  {
  "id": "pasta_pomodoro_datterino_basilico",
  "title": "Spaghetti Integrali al Pomodoro Datterino e Basilico",
  "subtitle": "Classico della dieta mediterranea ad alto potere antiossidante",
  "category": "primi",
  "categoryLabel": "🍝 Primo",
  "prepTimeMinutes": 10,
  "cookTimeMinutes": 12,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 350,
  "proteinGrams": 13,
  "carbsGrams": 64,
  "fatsGrams": 6,
  "fiberGrams": 8,
  "tags": [
    "Basso Indice Glicemico",
    "Licopene",
    "Vegano",
    "Cuore Sano"
  ],
  "suitablePathologies": [
    "cholesterol",
    "diabetes",
    "hypertension",
    "nafld"
  ],
  "dietType": "vegan",
  "isGlutenFree": false,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Spaghetti di semola integrale",
      "amount": "160g"
    },
    {
      "name": "Pomodorini datterini dolci",
      "amount": "300g"
    },
    {
      "name": "Olio EVO",
      "amount": "15ml (1 cucchiaio e mezzo)"
    },
    {
      "name": "Aglio",
      "amount": "1 spicchio"
    },
    {
      "name": "Basilico fresco",
      "amount": "8-10 foglie"
    },
    {
      "name": "Sale integrale",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Lava i datterini e tagliali a metà nel senso della lunghezza.",
    "In una padella fai imbiondire l'aglio nell'olio EVO a fiamma dolce, poi eliminalo se preferisci.",
    "Aggiungi i datterini e cuoci a fuoco vivo per 8-10 minuti, schiacciandoli leggermente con la forchetta per creare una salsa fresca.",
    "Lessa gli spaghetti in abbondante acqua poco salata, scolali al dente tenendo mezzo mestolo di acqua di cottura.",
    "Salta la pasta nella padella del sugo per 1 minuto, unendo le foglie di basilico spezzettate a mano.",
    "Servi fumante con un filo di olio EVO a crudo."
  ],
  "dietaryTips": "Il licopene dei pomodori diventa fino a tre volte più biodisponibile quando cotto brevemente insieme all'olio extravergine d'oliva."
},

  {
  "id": "riso_basmati_zucchine_curcuma",
  "title": "Riso Basmati con Zucchine Trifolate e Curcuma",
  "subtitle": "Primo leggero e profumato, altamente digeribile e antinfiammatorio",
  "category": "primi",
  "categoryLabel": "🍝 Primo",
  "prepTimeMinutes": 10,
  "cookTimeMinutes": 15,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 340,
  "proteinGrams": 8,
  "carbsGrams": 68,
  "fatsGrams": 5,
  "fiberGrams": 4,
  "tags": [
    "Senza Glutine",
    "Senza Lattosio",
    "Antinfiammatorio",
    "Digeribile"
  ],
  "suitablePathologies": [
    "celiac",
    "gerd_gastritis",
    "ibs_fodmap",
    "hypertension"
  ],
  "dietType": "vegan",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Riso Basmati",
      "amount": "160g"
    },
    {
      "name": "Zucchine medie",
      "amount": "2 (circa 300g)"
    },
    {
      "name": "Curcuma in polvere",
      "amount": "1 cucchiaino pieno"
    },
    {
      "name": "Pepe nero macinato",
      "amount": "1 pizzico (attiva la curcumina)"
    },
    {
      "name": "Olio EVO",
      "amount": "15ml"
    },
    {
      "name": "Scalogno",
      "amount": "1 piccolo"
    },
    {
      "name": "Prezzemolo fresco",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Sciacqua il riso basmati per rimuovere l'eccesso di amido superficiale e lessalo in acqua bollente salata per 10-12 minuti.",
    "Nel frattempo lava le zucchine e tagliale a dadini o a rondelle sottili.",
    "In una padella salta lo scalogno tritato fine con l'olio EVO, poi unisci le zucchine a fiamma vivace per 6-8 minuti lasciandole croccanti.",
    "Sciogli la curcuma e il pizzico di pepe in due cucchiai di acqua calda e versala sulle zucchine a fine cottura.",
    "Scola il riso basmati, uniscilo in padella e salta il tutto per un minuto per amalgamare i profumi e il colore dorato.",
    "Completa con prezzemolo fresco tritato e servi."
  ],
  "dietaryTips": "La curcumina associata alla piperina del pepe nero possiede spiccate azioni antiossidanti e protettive sul fegato e sul tratto gastrico."
},

  {
  "id": "gnocchi_patate_ricotta_pomodoro",
  "title": "Gnocchi di Patate al Sugo Leggero e Ricotta Vaccina",
  "subtitle": "Piatto confortante della domenica, soffice e a moderato apporto lipidico",
  "category": "primi",
  "categoryLabel": "🍝 Primo",
  "prepTimeMinutes": 10,
  "cookTimeMinutes": 10,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 380,
  "proteinGrams": 14,
  "carbsGrams": 64,
  "fatsGrams": 7,
  "fiberGrams": 4,
  "tags": [
    "Vegetariano",
    "Confortante",
    "Proteine Nobili"
  ],
  "suitablePathologies": [
    "hypertension",
    "gerd_gastritis"
  ],
  "dietType": "vegetarian",
  "isGlutenFree": false,
  "isLactoseFree": false,
  "ingredients": [
    {
      "name": "Gnocchi di patate freschi",
      "amount": "300g"
    },
    {
      "name": "Passata di pomodoro rustica",
      "amount": "250g"
    },
    {
      "name": "Ricotta vaccina fresca magra",
      "amount": "80g"
    },
    {
      "name": "Olio EVO",
      "amount": "10ml"
    },
    {
      "name": "Basilico fresco",
      "amount": "4-5 foglie"
    },
    {
      "name": "Sale marino",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Prepara un sugo leggero scaldando la passata di pomodoro con un filo d'olio, sale e basilico per circa 10 minuti.",
    "Lavora la ricotta in una ciotolina con una forchetta per renderla cremosa.",
    "Cuoci gli gnocchi in abbondante acqua bollente salata; scolali non appena salgono a galla con una schiumarola.",
    "Condisci gli gnocchi caldi con il sugo di pomodoro.",
    "Distribuisci nei piatti e completa con fiocchi di ricotta fresca e una foglia di basilico."
  ],
  "dietaryTips": "La ricotta apporta sieroproteine ad alto valore biologico e calcio biodisponibile, limitando l'impatto glicemico del pasto a base di patate."
},

  {
  "id": "pasta_lenticchie_crema_broccoli",
  "title": "Fusilli di Lenticchie Rosse con Crema di Broccoli",
  "subtitle": "Primo piatto 100% vegetale, ricchissimo di proteine e senza glutine",
  "category": "primi",
  "categoryLabel": "🍝 Primo",
  "prepTimeMinutes": 15,
  "cookTimeMinutes": 15,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 390,
  "proteinGrams": 26,
  "carbsGrams": 52,
  "fatsGrams": 8,
  "fiberGrams": 14,
  "tags": [
    "Senza Glutine",
    "Vegano",
    "High Protein",
    "Alto Contenuto di Fibre"
  ],
  "suitablePathologies": [
    "celiac",
    "diabetes",
    "cholesterol",
    "nafld"
  ],
  "dietType": "vegan",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Pasta 100% farina di lenticchie rosse",
      "amount": "140g"
    },
    {
      "name": "Cimette di broccoli",
      "amount": "300g"
    },
    {
      "name": "Olio EVO",
      "amount": "15ml"
    },
    {
      "name": "Aglio",
      "amount": "1 spicchio"
    },
    {
      "name": "Peperoncino dolce o piccante",
      "amount": "q.b."
    },
    {
      "name": "Lievito alimentare in scaglie",
      "amount": "10g",
      "note": "opzionale per sapore di formaggio"
    }
  ],
  "instructions": [
    "Lava i broccoli e cuoci le cimette a vapore per 8-10 minuti fino a renderle tenere.",
    "Frulla i tre quarti dei broccoli con olio EVO, sale, aglio scottato e un po' di acqua di cottura fino a ottenere una crema liscia.",
    "Cuoci la pasta di lenticchie in acqua bollente salata seguendo i tempi indicati sulla confezione (circa 6-7 minuti).",
    "Scola la pasta e mantecala con la crema di broccoli e le cimette tenute intere.",
    "Servi con una spolverata di lievito alimentare o peperoncino a piacere."
  ],
  "dietaryTips": "La pasta di legumi è una straordinaria alternativa per i celiaci e per chi vuole aumentare l'apporto proteico senza ricorrere a cibi di origine animale."
},

  {
  "id": "farro_freddo_tonno_pomodorini",
  "title": "Insalata di Farro Perlato con Tonno e Pomodorini",
  "subtitle": "Piatto unico fresco, bilanciato e perfetto anche da asporto per il lavoro",
  "category": "primi",
  "categoryLabel": "🍝 Primo",
  "prepTimeMinutes": 15,
  "cookTimeMinutes": 25,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 430,
  "proteinGrams": 27,
  "carbsGrams": 56,
  "fatsGrams": 10,
  "fiberGrams": 9,
  "tags": [
    "Piatto Unico",
    "Pranzo al Lavoro",
    "Alto Contenuto di Fibre",
    "Saziante"
  ],
  "suitablePathologies": [
    "cholesterol",
    "diabetes",
    "hypertension"
  ],
  "dietType": "pescatarian",
  "isGlutenFree": false,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Farro perlato",
      "amount": "150g"
    },
    {
      "name": "Tonno al naturale sgocciolato",
      "amount": "160g (2 scatolette)"
    },
    {
      "name": "Pomodorini ciliegino",
      "amount": "150g"
    },
    {
      "name": "Rucola fresca",
      "amount": "40g"
    },
    {
      "name": "Olive taggiasche",
      "amount": "20g"
    },
    {
      "name": "Olio EVO",
      "amount": "15ml"
    },
    {
      "name": "Succo di limone",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Lessa il farro perlato in acqua bollente salata per circa 25 minuti; scolalo al dente e passalo sotto acqua fredda per arrestare la cottura.",
    "Taglia i pomodorini a spicchi e la rucola a pezzetti.",
    "In una ciotola capiente unisci il farro freddo, il tonno spezzettato, i pomodorini, le olive e la rucola.",
    "Condisci con l'olio EVO, una spruzzata di succo di limone e un pizzico di sale e origano.",
    "Mescola bene e lascia riposare in frigorifero per 20 minuti prima di gustare."
  ],
  "dietaryTips": "Il farro perlato contiene carboidrati a lento rilascio e una quantità elevata di magnesio, minerale essenziale per il sistema muscolare e la regolazione pressoria."
},

  {
  "id": "couscous_verdure_ceci",
  "title": "Couscous Integrale alle Verdure Mediterranee e Ceci",
  "subtitle": "Piatto unico ricco di spezie aromatiche e fibre protettive per l'intestino",
  "category": "primi",
  "categoryLabel": "🍝 Primo",
  "prepTimeMinutes": 15,
  "cookTimeMinutes": 15,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 395,
  "proteinGrams": 15,
  "carbsGrams": 65,
  "fatsGrams": 8,
  "fiberGrams": 11,
  "tags": [
    "Vegano",
    "Dieta Mediterranea",
    "Fibra Solubile"
  ],
  "suitablePathologies": [
    "cholesterol",
    "diabetes",
    "hypertension"
  ],
  "dietType": "vegan",
  "isGlutenFree": false,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Couscous integrale",
      "amount": "140g"
    },
    {
      "name": "Ceci lessati",
      "amount": "150g"
    },
    {
      "name": "Zucchina",
      "amount": "1 media"
    },
    {
      "name": "Carota",
      "amount": "1 grande"
    },
    {
      "name": "Peperone giallo",
      "amount": "½"
    },
    {
      "name": "Brodo vegetale bollente",
      "amount": "180ml"
    },
    {
      "name": "Olio EVO",
      "amount": "15ml"
    },
    {
      "name": "Menta fresca e cumino",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Taglia tutte le verdure a piccoli cubetti regolari.",
    "In una padella scalda l'olio EVO e salta le verdure a fuoco medio per 10 minuti, tenendole croccanti; unisci i ceci e un pizzico di cumino per gli ultimi 3 minuti.",
    "Metti il couscous integrale in una ciotola, versa il brodo vegetale bollente, copri con un coperchio e lascia gonfiare per 5 minuti.",
    "Sgrana il couscous con una forchetta aggiungendo un filo d'olio a crudo.",
    "Unisci le verdure saltate e i ceci al couscous, profuma con foglie di menta fresca e servi tiepido o freddo."
  ],
  "dietaryTips": "La cottura per assorbimento del couscous preserva tutti i micronutrienti del cereale. L'aggiunta di ceci completa il profilo aminoacidico delle proteine."
},

  {
  "id": "orata_al_cartoccio_erbe",
  "title": "Orata al Cartoccio con Rosmarino, Aglio ed EVO",
  "subtitle": "Cottura leggera e pulita che preserva la morbidezza e i micronutrienti",
  "category": "secondi_pesce",
  "categoryLabel": "🐟 Secondo Pesce",
  "prepTimeMinutes": 10,
  "cookTimeMinutes": 22,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 230,
  "proteinGrams": 35,
  "carbsGrams": 1,
  "fatsGrams": 9,
  "fiberGrams": 0,
  "tags": [
    "Senza Glutine",
    "Senza Lattosio",
    "Ipocalorico",
    "Cuore Sano"
  ],
  "suitablePathologies": [
    "celiac",
    "cholesterol",
    "hypertension",
    "diabetes",
    "gerd_gastritis"
  ],
  "dietType": "pescatarian",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Filetti o orata intera pulita",
      "amount": "400g"
    },
    {
      "name": "Limone non trattato",
      "amount": "1 a fette"
    },
    {
      "name": "Pomodorini datterini",
      "amount": "6-8"
    },
    {
      "name": "Rosmarino e timo freschi",
      "amount": "2 rametti"
    },
    {
      "name": "Aglio",
      "amount": "1 spicchio a fettine"
    },
    {
      "name": "Olio EVO",
      "amount": "15ml"
    },
    {
      "name": "Sale e pepe",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Preriscalda il forno a 190°C.",
    "Stendi un foglio di carta forno su una teglia.",
    "Adagia l'orata o i filetti, inserisci all'interno o sopra le fette di limone, l'aglio, i pomodorini spaccati e i rametti di erbe aromatiche.",
    "Condisci con l'olio EVO, un pizzico di sale e una macinata di pepe.",
    "Chiudi la carta forno formando un cartoccio sigillato per trattenere il vapore aromatico.",
    "Inforna per 20-22 minuti. Apri il cartoccio a tavola per liberare i profumi e servi subito."
  ],
  "dietaryTips": "La cottura al cartoccio sfrutta l'umidità naturale del pesce evitando la formazione di composti tossici da bruciatura e non richiede grassi di cottura eccessivi."
},

  {
  "id": "pesce_spada_alla_griglia_salmoriglio",
  "title": "Trancio di Pesce Spada ai Ferri con Salmoriglio",
  "subtitle": "Pesce nobile magrissimo arricchito dall'emulsione tradizionale siciliana",
  "category": "secondi_pesce",
  "categoryLabel": "🐟 Secondo Pesce",
  "prepTimeMinutes": 10,
  "cookTimeMinutes": 6,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 240,
  "proteinGrams": 34,
  "carbsGrams": 1,
  "fatsGrams": 10,
  "fiberGrams": 0,
  "tags": [
    "High Protein",
    "Senza Glutine",
    "Senza Lattosio",
    "Veloce"
  ],
  "suitablePathologies": [
    "celiac",
    "cholesterol",
    "diabetes",
    "nafld"
  ],
  "dietType": "pescatarian",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Tranci di pesce spada fresco",
      "amount": "300g (2 fette)"
    },
    {
      "name": "Succo di limone fresco",
      "amount": "2 cucchiai"
    },
    {
      "name": "Olio EVO",
      "amount": "15ml"
    },
    {
      "name": "Origano essiccato",
      "amount": "1 cucchiaino"
    },
    {
      "name": "Prezzemolo fresco tritato",
      "amount": "1 cucchiaio"
    },
    {
      "name": "Aglio grattugiato",
      "amount": "½ spicchio",
      "note": "facoltativo"
    }
  ],
  "instructions": [
    "Prepara il salmoriglio: in una tazza emulsiona energicamente con una forchetta l'olio EVO, il succo di limone, un cucchiaio d'acqua tiepida, l'origano, il prezzemolo e il sale.",
    "Scalda molto bene una piastra in ghisa o una padella antiaderente scanalata.",
    "Spennella leggermente i tranci di spada e cuocili sulla griglia caldissima per circa 2-3 minuti per lato.",
    "Toglili subito dal fuoco non appena il centro è cotto per mantenerli morbidi e succosi.",
    "Disponi nei piatti e versa sopra l'emulsione fresca di salmoriglio."
  ],
  "dietaryTips": "Il pesce spada è una fonte eccezionale di selenio e vitamina B12, nutrienti cardine per il buon funzionamento della tiroide e la sintesi dei globuli rossi."
},

  {
  "id": "calamari_alla_piastra_prezzemolo",
  "title": "Calamari Freschi alla Piastra con Limone e Prezzemolo",
  "subtitle": "Secondo di mare leggerissimo, ipocalorico e a bassissimo contenuto di grassi",
  "category": "secondi_pesce",
  "categoryLabel": "🐟 Secondo Pesce",
  "prepTimeMinutes": 10,
  "cookTimeMinutes": 5,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 190,
  "proteinGrams": 30,
  "carbsGrams": 3,
  "fatsGrams": 5,
  "fiberGrams": 0,
  "tags": [
    "Ipocalorico",
    "High Protein",
    "Senza Glutine",
    "Senza Lattosio"
  ],
  "suitablePathologies": [
    "celiac",
    "diabetes",
    "cholesterol"
  ],
  "dietType": "pescatarian",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Calamari freschi puliti",
      "amount": "350g"
    },
    {
      "name": "Olio EVO",
      "amount": "15ml"
    },
    {
      "name": "Limone",
      "amount": "1"
    },
    {
      "name": "Prezzemolo fresco",
      "amount": "un mazzetto abbondante"
    },
    {
      "name": "Aglio",
      "amount": "1 spicchio"
    },
    {
      "name": "Pepe nero",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Asciuga benissimo le sacche e i tentacoli dei calamari con carta assorbente da cucina (fondamentale per non farli bollire sulla piastra).",
    "Incidi delicatamente la superficie delle sacche a rombi senza tagliarle del tutto.",
    "Scalda la piastra finché è rovente.",
    "Cuoci i calamari per circa 2 minuti sul primo lato e 1-2 minuti sul secondo lato finché si arricciano e compaiono striature dorate.",
    "Trasferiscili su un tagliere, taglia le sacche ad anelli larghi e condisci con un'emulsione di olio EVO, succo di limone, prezzemolo fresco tritato e pepe nero."
  ],
  "dietaryTips": "I calamari contengono pochissimi lipidi (meno del 2%) e apportano proteine nobili ad alto valore biologico, perfetti nei regimi di dimagrimento e tonificazione."
},

  {
  "id": "trota_iridea_al_forno_mandorle",
  "title": "Filetto di Trota Iridea al Forno con Lamelle di Mandorle",
  "subtitle": "Pesce d'acqua dolce tenero e delicato, ricco di grassi polinsaturi salutari",
  "category": "secondi_pesce",
  "categoryLabel": "🐟 Secondo Pesce",
  "prepTimeMinutes": 10,
  "cookTimeMinutes": 15,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 280,
  "proteinGrams": 32,
  "carbsGrams": 2,
  "fatsGrams": 15,
  "fiberGrams": 1,
  "tags": [
    "Omega 3",
    "Senza Glutine",
    "Senza Lattosio",
    "Cuore Sano"
  ],
  "suitablePathologies": [
    "celiac",
    "cholesterol",
    "hypertension",
    "diabetes"
  ],
  "dietType": "pescatarian",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Filetti di trota iridea spinati",
      "amount": "320g"
    },
    {
      "name": "Mandorle a lamelle",
      "amount": "20g"
    },
    {
      "name": "Succo di limone",
      "amount": "1 cucchiaio"
    },
    {
      "name": "Timo fresco",
      "amount": "2 rametti"
    },
    {
      "name": "Olio EVO",
      "amount": "10ml"
    },
    {
      "name": "Sale e pepe bianco",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Preriscalda il forno a 180°C in modalità ventilata.",
    "Disponi i filetti di trota su una placca foderata con carta forno con la pelle rivolta verso il basso.",
    "Spennella la superficie della polpa con il succo di limone e l'olio EVO, aggiungi un pizzico di sale e timo.",
    "Distribuisci le mandorle a lamelle sulla superficie premendo leggermente per farle aderire.",
    "Inforna per 12-15 minuti, gli ultimi 2 minuti con la funzione grill per dorare le mandorle.",
    "Servi con un contorno di fagiolini o zucchine al vapore."
  ],
  "dietaryTips": "La trota iridea è un pesce a bassissimo accumulo di metalli pesanti rispetto ai grandi predatori marini, ricchissima di acidi grassi essenziali protettivi per il cuore."
},

  {
  "id": "alici_scottate_origano_limone",
  "title": "Alici Fresche Scottate con Origano e Limone",
  "subtitle": "Regina del pesce azzurro locale, un tesoro naturale di Omega 3 e calcio",
  "category": "secondi_pesce",
  "categoryLabel": "🐟 Secondo Pesce",
  "prepTimeMinutes": 12,
  "cookTimeMinutes": 5,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 220,
  "proteinGrams": 28,
  "carbsGrams": 1,
  "fatsGrams": 11,
  "fiberGrams": 0,
  "tags": [
    "Pesce Azzurro",
    "Omega 3",
    "Economico",
    "Senza Glutine"
  ],
  "suitablePathologies": [
    "celiac",
    "cholesterol",
    "hypertension",
    "diabetes"
  ],
  "dietType": "pescatarian",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Alici fresche aperte a libro e spinate",
      "amount": "300g"
    },
    {
      "name": "Origano selvatico secco",
      "amount": "1 cucchiaino"
    },
    {
      "name": "Limone",
      "amount": "1"
    },
    {
      "name": "Aglio",
      "amount": "1 spicchio a fettine sottili"
    },
    {
      "name": "Olio EVO",
      "amount": "15ml"
    },
    {
      "name": "Prezzemolo",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Lava delicatamente le alici già spinate e asciugale con carta da cucina.",
    "In una padella antiaderente scalda l'olio EVO con le fettine di aglio.",
    "Disponi le alici aperte in un unico strato e cuocile a fiamma viva per 2 minuti.",
    "Girale con delicatezza con una paletta, spolvera con origano e una presa di sale e cuoci per un altro minuto.",
    "Spegni la fiamma, bagna con succo di limone fresco e cospargi di prezzemolo.",
    "Servi subito accompagnate da fette di pane integrale o patate novelle."
  ],
  "dietaryTips": "Le alici contengono elevate concentrazioni di calcio biodisponibile e acidi grassi EPA/DHA che abbassano i trigliceridi e contrastano l'infiammazione cellulare."
},

  {
  "id": "gamberi_saltati_zucchine_zenzero",
  "title": "Mazzancolle Saltate con Zucchine e Zenzero Fresco",
  "subtitle": "Piatto leggero, profumato ed elegante pronto in meno di 15 minuti",
  "category": "secondi_pesce",
  "categoryLabel": "🐟 Secondo Pesce",
  "prepTimeMinutes": 8,
  "cookTimeMinutes": 7,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 210,
  "proteinGrams": 30,
  "carbsGrams": 4,
  "fatsGrams": 6,
  "fiberGrams": 2,
  "tags": [
    "High Protein",
    "Ipocalorico",
    "Veloce",
    "Senza Glutine"
  ],
  "suitablePathologies": [
    "celiac",
    "diabetes",
    "nafld"
  ],
  "dietType": "pescatarian",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Code di mazzancolle o gamberi sgusciati",
      "amount": "300g"
    },
    {
      "name": "Zucchine novelle",
      "amount": "2 medie"
    },
    {
      "name": "Zenzero fresco grattugiato",
      "amount": "1 cucchiaino"
    },
    {
      "name": "Olio EVO",
      "amount": "15ml"
    },
    {
      "name": "Scorza di lime o limone",
      "amount": "q.b."
    },
    {
      "name": "Sale marino e pepe bianco",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Taglia le zucchine a nastro o a bastoncini sottili.",
    "In una padella antiaderente scalda l'olio EVO e salta le zucchine a fiamma viva per 3 minuti lasciandole croccanti.",
    "Aggiungi le mazzancolle pulite e lo zenzero grattugiato.",
    "Salta tutto insieme per 3-4 minuti finché i crostacei diventano opachi e rosati.",
    "Spegni, aggiungi la scorza grattugiata di lime e un pizzico di sale.",
    "Servi immediatamente ben caldo."
  ],
  "dietaryTips": "Lo zenzero aggiunge gingerolo ad azione termogenica e digestiva, abbinandosi perfettamente alla proteina magra dei crostacei."
},

  {
  "id": "fesa_tacchino_alla_piastra_rosmarino",
  "title": "Fesa di Tacchino ai Ferri con Zucchine al Vapore",
  "subtitle": "Piatto principe per regimi ipocalorici e di tonificazione muscolare",
  "category": "secondi_carne",
  "categoryLabel": "🍗 Secondo Carne",
  "prepTimeMinutes": 5,
  "cookTimeMinutes": 10,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 220,
  "proteinGrams": 42,
  "carbsGrams": 3,
  "fatsGrams": 4,
  "fiberGrams": 2,
  "tags": [
    "Magrissimo",
    "High Protein",
    "Senza Glutine",
    "Senza Lattosio"
  ],
  "suitablePathologies": [
    "celiac",
    "cholesterol",
    "diabetes",
    "nafld",
    "hypertension"
  ],
  "dietType": "omnivore",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Fette di fesa di tacchino",
      "amount": "350g"
    },
    {
      "name": "Zucchine",
      "amount": "2 medie"
    },
    {
      "name": "Rosmarino fresco",
      "amount": "1 rametto"
    },
    {
      "name": "Succo di limone",
      "amount": "1 cucchiaio"
    },
    {
      "name": "Olio EVO",
      "amount": "10ml"
    },
    {
      "name": "Sale alle erbe",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Taglia le zucchine a rondelle e cuocile a vapore per 7-8 minuti.",
    "Scalda molto bene una piastra antiaderente con qualche ago di rosmarino.",
    "Cuoci le fette di fesa di tacchino per 2-3 minuti per lato a fiamma vivace, senza farle asciugare troppo.",
    "Adagia la carne nel piatto insieme alle zucchine calde.",
    "Condisci a crudo con l'olio EVO, il succo di limone e un pizzico di sale alle erbe."
  ],
  "dietaryTips": "La carne di tacchino contiene pochissimi grassi intramuscolari e un eccellente profilo aminoacidico ad alta digeribilità, ideale anche per la cena."
},

  {
  "id": "fesa_vitello_ai_ferri_rucola",
  "title": "Fesa di Vitello Magra ai Ferri con Rucola e Limone",
  "subtitle": "Fonte eccezionale di ferro eme facilmente assimilabile ed elementi chelanti",
  "category": "secondi_carne",
  "categoryLabel": "🍗 Secondo Carne",
  "prepTimeMinutes": 5,
  "cookTimeMinutes": 6,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 250,
  "proteinGrams": 38,
  "carbsGrams": 1,
  "fatsGrams": 8,
  "fiberGrams": 1,
  "tags": [
    "Ferro Eme",
    "High Protein",
    "Senza Glutine",
    "Senza Lattosio"
  ],
  "suitablePathologies": [
    "celiac",
    "cholesterol",
    "diabetes"
  ],
  "dietType": "omnivore",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Fettine di fesa di vitello magra",
      "amount": "300g"
    },
    {
      "name": "Rucola selvatica fresca",
      "amount": "60g"
    },
    {
      "name": "Limone",
      "amount": "1"
    },
    {
      "name": "Olio EVO",
      "amount": "15ml"
    },
    {
      "name": "Pepe nero macinato fresco",
      "amount": "q.b."
    },
    {
      "name": "Sale fino",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Togli la carne dal frigorifero 10 minuti prima di cuocerla per evitare lo shock termico.",
    "Scalda una bistecchiera a fuoco sostenuto.",
    "Adagia le fettine e cuocile per circa 1-2 minuti per lato mantenendo l'interno morbido e rosato.",
    "Componi il piatto con un letto di rucola fresca lavata e asciugata.",
    "Poggia sopra la carne ben calda, condisci con l'olio EVO, abbondante succo di limone fresco e pepe nero."
  ],
  "dietaryTips": "La vitamina C presente nel succo di limone potenzia ulteriormente l'assorbimento del ferro eme presente nella carne di vitello."
},

  {
  "id": "cosce_pollo_senza_pelle_erbe",
  "title": "Fusi di Pollo al Forno Senza Pelle agli Aromi di Collina",
  "subtitle": "Carne bianca succosa e saporita, naturalmente povera di grassi togliendo la pelle",
  "category": "secondi_carne",
  "categoryLabel": "🍗 Secondo Carne",
  "prepTimeMinutes": 10,
  "cookTimeMinutes": 35,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 290,
  "proteinGrams": 36,
  "carbsGrams": 1,
  "fatsGrams": 12,
  "fiberGrams": 0,
  "tags": [
    "Senza Pelle",
    "Senza Glutine",
    "Senza Lattosio",
    "Saporito"
  ],
  "suitablePathologies": [
    "celiac",
    "cholesterol",
    "diabetes",
    "hypertension"
  ],
  "dietType": "omnivore",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Fusi di pollo privati della pelle",
      "amount": "4 fusi (circa 400g)"
    },
    {
      "name": "Rosmarino, salvia e timo",
      "amount": "un trito abbondante"
    },
    {
      "name": "Aglio in polvere o 2 spicchi interi",
      "amount": "q.b."
    },
    {
      "name": "Vino bianco secco",
      "amount": "30ml",
      "note": "per sfumare"
    },
    {
      "name": "Olio EVO",
      "amount": "15ml"
    },
    {
      "name": "Sale marino e pepe",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Preriscalda il forno a 200°C.",
    "Massaggia i fusi di pollo con l'olio EVO, il trito di erbe aromatiche, sale e pepe.",
    "Disponili in una pirofila da forno senza sovrapporli.",
    "Inforna per circa 20 minuti, poi bagna con il vino bianco e prosegui la cottura per altri 15 minuti finché la carne è ben cotta e dorata vicino all'osso.",
    "Servi caldi accompagnati da insalata verde o verdure al forno."
  ],
  "dietaryTips": "Rimuovendo la pelle prima della cottura, i fusi di pollo perdono oltre il 55% dei grassi totali, preservando un'eccellente concentrazione di zinco e ferro."
},

  {
  "id": "uova_strapazzate_avocado_toast",
  "title": "Uova Strapazzate con Avocado e Pane Integrale",
  "subtitle": "Colazione salata proteica o pasto veloce ad altissimo potere saziante",
  "category": "secondi_veg",
  "categoryLabel": "🥗 Secondo Veg",
  "prepTimeMinutes": 5,
  "cookTimeMinutes": 5,
  "difficulty": "Facile",
  "servings": 1,
  "estimatedCalories": 380,
  "proteinGrams": 20,
  "carbsGrams": 28,
  "fatsGrams": 18,
  "fiberGrams": 6,
  "tags": [
    "Vegetariano",
    "Grassi Buoni",
    "Veloce",
    "Saziante"
  ],
  "suitablePathologies": [
    "diabetes",
    "hypertension"
  ],
  "dietType": "vegetarian",
  "isGlutenFree": false,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Uova bio intere",
      "amount": "2"
    },
    {
      "name": "Pane integrale di segale o frumento",
      "amount": "50g (1 fetta spessa)"
    },
    {
      "name": "Avocado maturo schiacciato",
      "amount": "50g (circa un quarto)"
    },
    {
      "name": "Olio EVO",
      "amount": "5ml (1 cucchiaino)"
    },
    {
      "name": "Sale marino, pepe e succo di limone",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Tosta la fetta di pane integrale nel tostapane o in padella finché diventa croccante.",
    "Schiaccia la polpa di avocado con una forchetta unendo poche gocce di succo di limone e un pizzico di sale; spalmala sulla fetta tostata.",
    "In una ciotola sbatti leggermente le due uova con un pizzico di sale e pepe.",
    "Scalda un cucchiaino d'olio in una padella antiaderente a fuoco medio-basso; versa le uova e muovile delicatamente con una spatola per 2 minuti fino a ottenere una consistenza cremosa.",
    "Poggia le uova strapazzate calde sul pane con avocado e gusta subito."
  ],
  "dietaryTips": "La combinazione di acidi grassi monoinsaturi dell'avocado con le proteine nobili dell'uovo rallenta lo svuotamento gastrico, garantendo sazietà prolungata per ore."
},

  {
  "id": "omelette_albumi_funghi",
  "title": "Omelette Proteica di Albumi e Funghi Champignon",
  "subtitle": "Ipocalorica e purissima di proteine, senza colesterolo aggiunto",
  "category": "secondi_veg",
  "categoryLabel": "🥗 Secondo Veg",
  "prepTimeMinutes": 8,
  "cookTimeMinutes": 8,
  "difficulty": "Facile",
  "servings": 1,
  "estimatedCalories": 210,
  "proteinGrams": 26,
  "carbsGrams": 4,
  "fatsGrams": 7,
  "fiberGrams": 2,
  "tags": [
    "High Protein",
    "Ipocalorico",
    "Senza Glutine",
    "Senza Lattosio"
  ],
  "suitablePathologies": [
    "celiac",
    "cholesterol",
    "diabetes",
    "nafld"
  ],
  "dietType": "vegetarian",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Albume d'uovo pastorizzato",
      "amount": "180ml"
    },
    {
      "name": "Uovo intero",
      "amount": "1 (per sapore e vitamine liposolubili)"
    },
    {
      "name": "Funghi champignon freschi affettati",
      "amount": "120g"
    },
    {
      "name": "Olio EVO",
      "amount": "10ml"
    },
    {
      "name": "Prezzemolo fresco",
      "amount": "1 cucchiaio"
    },
    {
      "name": "Aglio",
      "amount": "½ spicchio"
    },
    {
      "name": "Sale e pepe",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "In una padella antiaderente salta i funghi champignon con aglio, un filo d'olio, sale e prezzemolo per 5 minuti finché rilasciano l'acqua e dorano.",
    "In una ciotola sbatti l'albume con l'uovo intero, sale e pepe con una forchetta.",
    "Versa il composto di uova direttamente sopra i funghi in padella, abbassando la fiamma.",
    "Copri con un coperchio per 3 minuti per cuocere uniformemente anche la parte superiore.",
    "Ripiega l'omelette a mezzaluna e falla scivolare nel piatto."
  ],
  "dietaryTips": "Gli albumi d'uovo sono tra le fonti proteiche con il più alto valore biologico (pari a 100), privi di lipidi e purine."
},

  {
  "id": "hummus_ceci_pinzimonio",
  "title": "Hummus Cremoso di Ceci con Pinzimonio di Verdure",
  "subtitle": "Piatto della tradizione levantina, ricco di fibre e grassi sani dal sesamo",
  "category": "secondi_veg",
  "categoryLabel": "🥗 Secondo Veg",
  "prepTimeMinutes": 10,
  "cookTimeMinutes": 0,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 280,
  "proteinGrams": 11,
  "carbsGrams": 30,
  "fatsGrams": 12,
  "fiberGrams": 9,
  "tags": [
    "Vegano",
    "Senza Glutine",
    "Senza Lattosio",
    "Antinfiammatorio"
  ],
  "suitablePathologies": [
    "celiac",
    "cholesterol",
    "diabetes",
    "hypertension"
  ],
  "dietType": "vegan",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Ceci lessati e scolati",
      "amount": "250g"
    },
    {
      "name": "Pasta di sesamo (Tahina)",
      "amount": "20g (1 cucchiaio colmo)"
    },
    {
      "name": "Succo di limone",
      "amount": "2 cucchiai"
    },
    {
      "name": "Olio EVO",
      "amount": "15ml"
    },
    {
      "name": "Acqua fredda",
      "amount": "3-4 cucchiai"
    },
    {
      "name": "Aglio",
      "amount": "½ spicchio",
      "note": "facoltativo"
    },
    {
      "name": "Bastoncini di carote, cetrioli e finocchi",
      "amount": "250g"
    }
  ],
  "instructions": [
    "Metti nel frullatore o robot da cucina i ceci, la tahina, il succo di limone, l'aglio schiacciato, un pizzico di sale e l'olio EVO.",
    "Frulla aggiungendo l'acqua fredda poco alla volta fino a ottenere una crema liscia, vellutata e omogenea.",
    "Trasferisci l'hummus in una ciotola, crea un solco al centro e aggiungi un filo d'olio a crudo e un pizzico di paprika dolce.",
    "Servi con bastoncini di carote, cetrioli e finocchi freschi per intingere."
  ],
  "dietaryTips": "La tahina ricavata dai semi di sesamo è una delle fonti vegetali più ricche di calcio, magnesio e lignani protettivi per il cuore."
},

  {
  "id": "bowl_fiocchi_latte_semi",
  "title": "Bowl Proteica Fresca con Fiocchi di Latte e Semi di Zucca",
  "subtitle": "Pasto veloce senza cottura, freschissimo e ricchissimo di caseine a lento rilascio",
  "category": "secondi_veg",
  "categoryLabel": "🥗 Secondo Veg",
  "prepTimeMinutes": 5,
  "cookTimeMinutes": 0,
  "difficulty": "Facile",
  "servings": 1,
  "estimatedCalories": 260,
  "proteinGrams": 25,
  "carbsGrams": 8,
  "fatsGrams": 12,
  "fiberGrams": 3,
  "tags": [
    "Senza Cottura",
    "High Protein",
    "Senza Glutine",
    "Veloce"
  ],
  "suitablePathologies": [
    "celiac",
    "diabetes",
    "hypertension"
  ],
  "dietType": "vegetarian",
  "isGlutenFree": true,
  "isLactoseFree": false,
  "ingredients": [
    {
      "name": "Fiocchi di latte magri",
      "amount": "200g"
    },
    {
      "name": "Cetriolo novello",
      "amount": "1 piccolo a rondelle"
    },
    {
      "name": "Pomodorini datterini",
      "amount": "5-6 tagliati a metà"
    },
    {
      "name": "Semi di zucca decorticati tostati",
      "amount": "15g"
    },
    {
      "name": "Olio EVO",
      "amount": "5ml"
    },
    {
      "name": "Origano o basilico fresco",
      "amount": "q.b."
    }
  ],
  "instructions": [
    "Versa i fiocchi di latte in una ciotola.",
    "Disponi sopra le rondelle di cetriolo e i pomodorini tagliati a metà.",
    "Cospargi con i semi di zucca tostati per dare una nota croccante.",
    "Condisci con un filo d'olio EVO, un pizzico di origano essiccato e pepe nero.",
    "Consuma subito come pranzo fresco estivo o cena leggera."
  ],
  "dietaryTips": "I fiocchi di latte contengono caseina micellare, proteina che richiede diverse ore per essere digerita, rilasciando amminoacidi nel sangue in modo costante."
},

  {
  "id": "tempeh_saltato_peperoni_tamari",
  "title": "Tempeh Fermentato Saltato con Peperoni e Tamari",
  "subtitle": "Proteina vegetale fermentata d'eccellenza, amica del microbiota intestinale",
  "category": "secondi_veg",
  "categoryLabel": "🥗 Secondo Veg",
  "prepTimeMinutes": 10,
  "cookTimeMinutes": 12,
  "difficulty": "Facile",
  "servings": 2,
  "estimatedCalories": 310,
  "proteinGrams": 23,
  "carbsGrams": 14,
  "fatsGrams": 16,
  "fiberGrams": 7,
  "tags": [
    "Vegano",
    "Fermentato",
    "Senza Glutine",
    "Microbiota Amico"
  ],
  "suitablePathologies": [
    "celiac",
    "cholesterol",
    "diabetes",
    "ibs_fodmap"
  ],
  "dietType": "vegan",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Tempeh naturale",
      "amount": "200g"
    },
    {
      "name": "Peperone rosso dolce",
      "amount": "1 medio"
    },
    {
      "name": "Zucchina",
      "amount": "1"
    },
    {
      "name": "Salsa Tamari (soia senza glutine)",
      "amount": "2 cucchiai"
    },
    {
      "name": "Olio EVO",
      "amount": "15ml"
    },
    {
      "name": "Semi di sesamo",
      "amount": "1 cucchiaino"
    }
  ],
  "instructions": [
    "Taglia il panetto di tempeh a striscioline o cubetti spessi 1 cm.",
    "In una padella antiaderente scotta il tempeh a secco per 3 minuti per lato fino a fargli assumere un bel colore dorato nocciola.",
    "Aggiungi l'olio EVO e le verdure tagliate a listarelle sottili; cuoci a fuoco vivace per 5 minuti saltando continuamente.",
    "Abbassa la fiamma, versa la salsa tamari e mescola bene per glassare il tempeh e le verdure.",
    "Spegni, guarnisci con semi di sesamo e servi caldo."
  ],
  "dietaryTips": "La fermentazione dei fagioli di soia che dà origine al tempeh distrugge i fitati e rende i minerali e le proteine molto più digeribili rispetto alla soia non fermentata."
},

  {
  "id": "pancake_avena_albume_mirtilli",
  "title": "Pancake Proteici d'Avena e Albume con Mirtilli",
  "subtitle": "Colazione fitness per eccellenza, senza zuccheri raffinati e soffice",
  "category": "colazione_snack",
  "categoryLabel": "🥣 Colazione",
  "prepTimeMinutes": 5,
  "cookTimeMinutes": 8,
  "difficulty": "Facile",
  "servings": 1,
  "estimatedCalories": 270,
  "proteinGrams": 22,
  "carbsGrams": 35,
  "fatsGrams": 4,
  "fiberGrams": 5,
  "tags": [
    "High Protein",
    "Colazione Fitness",
    "Senza Lattosio",
    "Senza Zuccheri Aggiunti"
  ],
  "suitablePathologies": [
    "diabetes",
    "cholesterol",
    "hypertension"
  ],
  "dietType": "vegetarian",
  "isGlutenFree": false,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Farina d'avena integrale o fiocchi frullati",
      "amount": "45g"
    },
    {
      "name": "Albume d'uovo",
      "amount": "120ml"
    },
    {
      "name": "Lievito per dolci",
      "amount": "½ cucchiaino"
    },
    {
      "name": "Cannella",
      "amount": "1 pizzico"
    },
    {
      "name": "Mirtilli freschi",
      "amount": "60g"
    },
    {
      "name": "Olio di cocco o EVO per ungere la padella",
      "amount": "1 goccia"
    }
  ],
  "instructions": [
    "In una ciotola mescola energicamente con una frusta la farina d'avena, l'albume, il lievito e la cannella fino a ottenere una pastella liscia e densa.",
    "Scalda un padellino antiaderente unto con una goccia d'olio rimossa con carta assorbente.",
    "Versa un mestolino di pastella; incastona qualche mirtillo fresco nell'impasto ancora umido.",
    "Cuoci a fiamma bassa per circa 2 minuti fino a quando compaiono le prime bollicine in superficie, poi gira il pancake e cuoci un altro minuto.",
    "Impila i pancake e gustali caldi con i restanti mirtilli freschi."
  ],
  "dietaryTips": "L'avena fornisce carboidrati a basso indice glicemico mentre l'albume garantisce una dose proteica ottimale per iniziare la giornata senza cali energetici a metà mattina."
},

  {
  "id": "overnight_oats_chia_mela",
  "title": "Overnight Oats Cremoso con Semi di Chia e Mela alla Cannella",
  "subtitle": "Si prepara la sera prima in 3 minuti e al mattino è pronto da mangiare fresco",
  "category": "colazione_snack",
  "categoryLabel": "🥣 Colazione",
  "prepTimeMinutes": 5,
  "cookTimeMinutes": 0,
  "difficulty": "Facile",
  "servings": 1,
  "estimatedCalories": 310,
  "proteinGrams": 11,
  "carbsGrams": 48,
  "fatsGrams": 8,
  "fiberGrams": 9,
  "tags": [
    "Senza Cottura",
    "Meal Prep",
    "Fibra Solubile",
    "Vegano"
  ],
  "suitablePathologies": [
    "cholesterol",
    "diabetes",
    "hypertension"
  ],
  "dietType": "vegan",
  "isGlutenFree": false,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Fiocchi d'avena piccoli",
      "amount": "45g"
    },
    {
      "name": "Semi di chia",
      "amount": "10g (1 cucchiaino colmo)"
    },
    {
      "name": "Bevanda d'avena o mandorla senza zuccheri",
      "amount": "130ml"
    },
    {
      "name": "Mela tagliata a cubetti piccoli",
      "amount": "½ mela"
    },
    {
      "name": "Cannella in polvere",
      "amount": "1 cucchiaino"
    }
  ],
  "instructions": [
    "In un barattolo di vetro con coperchio unisci i fiocchi d'avena, i semi di chia e la cannella.",
    "Versa la bevanda vegetale fredda e mescola bene con un cucchiaio.",
    "Aggiungi i dadini di mela fresca in superficie.",
    "Chiudi il barattolo e riponilo in frigorifero per tutta la notte (almeno 6 ore).",
    "Al mattino l'avena e la chia avranno assorbito il liquido diventando un budino cremoso; mescola e gusta freddo o a temperatura ambiente."
  ],
  "dietaryTips": "I semi di chia creano un gel di mucillagini solubili che nutre la flora batterica intestinale e rallenta l'assorbimento degli zuccheri nel sangue."
},

  {
  "id": "kefir_frutti_bosco_noci",
  "title": "Bicchiere di Kefir con Frutti di Bosco e Noci Sgusciate",
  "subtitle": "Spuntino ad altissima concentrazione di fermenti lattici vivi e grassi Omega 3",
  "category": "colazione_snack",
  "categoryLabel": "🥣 Spuntino",
  "prepTimeMinutes": 3,
  "cookTimeMinutes": 0,
  "difficulty": "Facile",
  "servings": 1,
  "estimatedCalories": 210,
  "proteinGrams": 10,
  "carbsGrams": 16,
  "fatsGrams": 12,
  "fiberGrams": 4,
  "tags": [
    "Probiotico",
    "Senza Glutine",
    "Antiossidante",
    "Veloce"
  ],
  "suitablePathologies": [
    "celiac",
    "cholesterol",
    "hypertension",
    "ibs_fodmap"
  ],
  "dietType": "vegetarian",
  "isGlutenFree": true,
  "isLactoseFree": true,
  "ingredients": [
    {
      "name": "Kefir bianco magro naturale da bere",
      "amount": "180ml"
    },
    {
      "name": "Mirtilli o lamponi freschi",
      "amount": "70g"
    },
    {
      "name": "Gherigli di noci",
      "amount": "15g (circa 3 noci intere)"
    }
  ],
  "instructions": [
    "Versa il kefir fresco in una tazza o bicchiere largo.",
    "Aggiungi i frutti di bosco lavati e asciugati.",
    "Spezza i gherigli di noce con le dita e cospargili in superficie.",
    "Consuma subito con un cucchiaino come merenda o spuntino di metà mattina."
  ],
  "dietaryTips": "Il kefir contiene oltre 30 ceppi diversi di batteri e lieviti probiotici benefici, capaci di colonizzare l'intestino e rinforzare le difese immunitarie."
},
{
  id: 'avocado_toast_salmone_affumicato',
  title: 'Avocado Toast con Salmone Affumicato',
  subtitle: 'Colazione salata ricca di Omega 3 e grassi sani',
  category: 'colazione_snack',
  categoryLabel: '🍳 Colazione/Snack',
  prepTimeMinutes: 8,
  cookTimeMinutes: 0,
  difficulty: 'Facile',
  servings: 1,
  estimatedCalories: 380,
  proteinGrams: 24,
  carbsGrams: 28,
  fatsGrams: 20,
  fiberGrams: 8,
  tags: ['Omega 3', 'Senza Lattosio', 'Senza Glutine', 'Grassi Buoni', 'Proteico', 'Veloce'],
  suitablePathologies: ['cholesterol', 'nafld', 'diabetes', 'hypertension'],
  dietType: 'pescatarian',
  isGlutenFree: true,
  isLactoseFree: true,
  ingredients: [
    { name: 'Pane integrale o gallette di riso/mais senza glutine', amount: '60g (2 fette)' },
    { name: 'Avocado Hass maturo', amount: '80g (½ avocado medio)' },
    { name: 'Salmone affumicato selvaggio', amount: '60g (4-5 fettine)' },
    { name: 'Pomodorini datterini', amount: '60g' },
    { name: 'Succo di limone fresco', amount: '½ limone' },
    { name: 'Erba cipollina o aneto', amount: 'q.b.' },
    { name: 'Pepe nero macinato fresco', amount: 'q.b.' },
    { name: 'Sale integrale', amount: 'una piccola presa' },
  ],
  instructions: [
    'Tosta leggermente il pane integrale o usa le gallette senza glutine come base croccante.',
    'Schiaccia la polpa di avocado con una forchetta in una ciotola; aggiungi il succo di limone, un pizzico di sale e pepe. Amalgama bene.',
    'Spalma il purè di avocado sulle fette di pane/gallette in modo generoso.',
    'Disponi le fettine di salmone affumicato sopra l\'avocado.',
    'Aggiungi i pomodorini tagliati a metà, l\'erba cipollina tritata finemente.',
    'Concludi con una spruzzata di limone fresco e serviti subito.',
  ],
  dietaryTips: 'Il salmone affumicato è ricchissimo di Omega 3 EPA/DHA, che riducono l\'infiammazione e supportano la salute cardiovascolare. L\'avocado fornisce grassi monoinsaturi, vitamina E e K. Ottima colazione per chi pratica attività fisica al mattino.',
},
{
  id: 'toast_uova_strapazzate_spinaci',
  title: 'Toast Proteico con Uova Strapazzate e Spinacini',
  subtitle: 'Colazione salata energetica con proteine nobili e ferro',
  category: 'colazione_snack',
  categoryLabel: '🍳 Colazione/Snack',
  prepTimeMinutes: 5,
  cookTimeMinutes: 8,
  difficulty: 'Facile',
  servings: 1,
  estimatedCalories: 320,
  proteinGrams: 22,
  carbsGrams: 30,
  fatsGrams: 14,
  fiberGrams: 6,
  tags: ['Alto Contenuto Proteico', 'Ferro', 'Senza Glutine', 'Saziante', 'Veloce', 'Uova'],
  suitablePathologies: ['diabetes', 'hypertension', 'nafld', 'celiac', 'lactose'],
  dietType: 'vegetarian',
  isGlutenFree: true,
  isLactoseFree: true,
  ingredients: [
    { name: 'Pane integrale o gallette/wasa senza glutine', amount: '60g (2 fette)' },
    { name: 'Uova intere fresche', amount: '2 (120g totali)' },
    { name: 'Spinacini freschi baby', amount: '50g (una manciata)' },
    { name: 'Pomodorini ciliegini', amount: '60g' },
    { name: 'Olio EVO a crudo', amount: '8ml (1 cucchiaino)' },
    { name: 'Erbe aromatiche (erba cipollina, prezzemolo, basilico)', amount: 'q.b.' },
    { name: 'Pepe nero e sale integrale', amount: 'q.b.' },
  ],
  instructions: [
    'Tosta le fette di pane integrale o usa le gallette/wasa come base.',
    'Scalda una padella antiaderente a fuoco medio-basso, aggiungi un filo d\'olio EVO.',
    'Aggiungi gli spinacini, appassiscili per 1-2 minuti fino ad ammorbidimento. Tieni da parte.',
    'Sbatti le uova in una ciotola con un pizzico di sale e pepe.',
    'Nella stessa padella (fuoco basso), cuoci le uova sbattute, mescolando delicatamente con una spatola per 2-3 minuti fino a consistenza cremosa (non asciutta).',
    'Disponi gli spinacini sulla base di pane, poi aggiungi le uova strapazzate cremose sopra.',
    'Completa con i pomodorini tagliati a metà, le erbe tritate, un filo di olio EVO a crudo e serviti immediatamente.',
  ],
  dietaryTips: 'Le uova sono una fonte completa di proteine nobili (9 amminoacidi essenziali) e contengono colina, essenziale per il cervello. Gli spinacini apportano ferro, folati, vitamina C e K. Questa colazione salata mantiene i livelli di energia stabili per 4-5 ore.',
}
];

