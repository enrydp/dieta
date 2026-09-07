import { AllergyInfo } from '../types/diet';

export const ALLERGIES_DATA: AllergyInfo[] = [
  {
    id: 'gluten',
    name: 'Glutine / Frumento',
    badge: '🌾 Senza Glutine',
    type: 'intolleranza',
    description: 'Esclude frumento, pasta tradizionale, pane, pizza, farro, orzo, segale e cereali con glutine.',
    commonFoods: ['Pasta di grano duro', 'Pane comune', 'Farro', 'Orzo', 'Biscotti e fette biscottate classiche']
  },
  {
    id: 'lactose',
    name: 'Lattosio & Latticini',
    badge: '🥛 Senza Lattosio',
    type: 'intolleranza',
    description: 'Esclude latte vaccino, yogurt tradizionale, ricotta, mozzarella e derivati con lattosio.',
    commonFoods: ['Latte vaccino', 'Yogurt greco classico', 'Mozzarella', 'Fiocchi di latte con lattosio', 'Ricotta fresca']
  },
  {
    id: 'eggs',
    name: 'Uova',
    badge: '🥚 Senza Uova',
    type: 'allergia',
    description: 'Esclude uova intere, albumi d\'uovo, maionese e pasta all\'uovo.',
    commonFoods: ['Uova intere', 'Albume d\'uovo', 'Frittate', 'Maionese']
  },
  {
    id: 'nuts',
    name: 'Frutta a Guscio (Noci, Mandorle)',
    badge: '🌰 No Frutta a Guscio',
    type: 'allergia',
    description: 'Esclude noci, mandorle, nocciole, pistacchi, anacardi e noci del Brasile.',
    commonFoods: ['Noci sgusciate', 'Mandorle pelate', 'Nocciole', 'Pistacchi', 'Crema di mandorle']
  },
  {
    id: 'peanuts',
    name: 'Arachidi',
    badge: '🥜 No Arachidi',
    type: 'allergia',
    description: 'Esclude arachidi tostate, burro d\'arachidi e derivati.',
    commonFoods: ['Arachidi', 'Burro d\'arachidi 100%']
  },
  {
    id: 'fish',
    name: 'Pesce',
    badge: '🐟 No Pesce',
    type: 'allergia',
    description: 'Esclude salmone, merluzzo, tonno, orata, spigola, sgombro e tutti i pesci d\'acqua dolce e salata.',
    commonFoods: ['Salmone fresco', 'Filetto di merluzzo', 'Tonno al naturale', 'Orata', 'Sgombro']
  },
  {
    id: 'crustaceans',
    name: 'Crostacei & Molluschi',
    badge: '🦐 No Crostacei/Molluschi',
    type: 'allergia',
    description: 'Esclude gamberi, mazzancolle, calamari, polpo, seppie, cozze e vongole.',
    commonFoods: ['Gamberi', 'Calamari', 'Polpo', 'Cozze e vongole']
  },
  {
    id: 'soy',
    name: 'Soia',
    badge: '🌱 Senza Soia',
    type: 'allergia',
    description: 'Esclude tofu, edamame, bevande di soia, salsa di soia e tempeh.',
    commonFoods: ['Tofu al naturale', 'Edamame', 'Bevanda di soia', 'Tempeh']
  },
  {
    id: 'nickel',
    name: 'Sensibilità al Nichel',
    badge: '🍅 Low Nichel',
    type: 'intolleranza',
    description: 'Esclude cibi naturalmente ricchi di nichel: pomodoro, spinaci, cacao/cioccolato, legumi secchi e frutta secca.',
    commonFoods: ['Pomodori e passata', 'Spinaci', 'Cacao amaro', 'Cioccolato fondente', 'Lenticchie']
  },
  {
    id: 'histamine',
    name: 'Intolleranza all\'Istamina',
    badge: '⚡ Low Istamina',
    type: 'intolleranza',
    description: 'Esclude alimenti ad alto contenuto di istamina: tonno in scatola, salumi, formaggi molto stagionati e cibi fermentati.',
    commonFoods: ['Tonno in scatola', 'Sgombro sott\'olio', 'Parmigiano stagionato', 'Bresaola', 'Salumi']
  },
  {
    id: 'sesame',
    name: 'Sesamo',
    badge: '🥯 No Sesamo',
    type: 'allergia',
    description: 'Esclude semi di sesamo, tahina e prodotti da forno al sesamo.',
    commonFoods: ['Semi di sesamo', 'Tahina / Salsa di sesamo']
  }
];
