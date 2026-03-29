export type Zone = 'ocean' | 'forest' | 'recycle';

export interface GameItem {
  id: string;
  name: string;
  emoji: string;
  zone: Zone;
  fact: string;
}

export interface Level {
  id: number;
  name: string;
  items: GameItem[];
  timeLimit?: number; // seconds, for timed levels
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requirement: string;
}

export const badges: Badge[] = [
  { id: 'ocean-protector', name: 'Ocean Protector', emoji: '🐋', description: 'Correctly sorted all ocean creatures', requirement: 'Complete Level 1 with no ocean mistakes' },
  { id: 'forest-guardian', name: 'Forest Guardian', emoji: '🦁', description: 'Protected the forest habitat', requirement: 'Complete Level 2 with no forest mistakes' },
  { id: 'eco-warrior', name: 'Eco Warrior', emoji: '♻️', description: 'Identified all pollution items', requirement: 'Complete Level 3 perfectly' },
  { id: 'speed-hero', name: 'Speed Hero', emoji: '⚡', description: 'Beat the timed challenge', requirement: 'Complete Level 4 with time remaining' },
  { id: 'choco-master', name: 'Choco Master', emoji: '🍫', description: 'Earned 200+ Choco Coins', requirement: 'Accumulate 200 Choco Coins' },
];

export const levels: Level[] = [
  {
    id: 1,
    name: 'Animal Kingdom',
    items: [
      { id: '1-1', name: 'Clownfish', emoji: '🐠', zone: 'ocean', fact: 'Clownfish live among sea anemones in warm ocean waters!' },
      { id: '1-2', name: 'Lion', emoji: '🦁', zone: 'forest', fact: 'Lions are called the King of the Jungle and live in grasslands and forests!' },
      { id: '1-3', name: 'Sea Turtle', emoji: '🐢', zone: 'ocean', fact: 'Sea turtles travel thousands of miles across oceans!' },
      { id: '1-4', name: 'Oak Tree', emoji: '🌳', zone: 'forest', fact: 'Oak trees can live for hundreds of years and support many species!' },
      { id: '1-5', name: 'Dolphin', emoji: '🐬', zone: 'ocean', fact: 'Dolphins are super smart and use echolocation to find food!' },
      { id: '1-6', name: 'Deer', emoji: '🦌', zone: 'forest', fact: 'Deer help spread seeds through forests as they move around!' },
    ],
  },
  {
    id: 2,
    name: 'Plants & Corals',
    items: [
      { id: '2-1', name: 'Coral Reef', emoji: '🪸', zone: 'ocean', fact: 'Coral reefs support 25% of all marine life!' },
      { id: '2-2', name: 'Sunflower', emoji: '🌻', zone: 'forest', fact: 'Sunflowers follow the sun across the sky each day!' },
      { id: '2-3', name: 'Jellyfish', emoji: '🪼', zone: 'ocean', fact: 'Jellyfish have been around for over 500 million years!' },
      { id: '2-4', name: 'Mushroom', emoji: '🍄', zone: 'forest', fact: 'Mushrooms help decompose dead plants and recycle nutrients!' },
      { id: '2-5', name: 'Seaweed', emoji: '🌿', zone: 'ocean', fact: 'Seaweed produces over 50% of the world\'s oxygen!' },
      { id: '2-6', name: 'Butterfly', emoji: '🦋', zone: 'forest', fact: 'Butterflies are important pollinators for forest flowers!' },
      { id: '2-7', name: 'Whale', emoji: '🐋', zone: 'ocean', fact: 'Blue whales are the largest animals ever on Earth!' },
      { id: '2-8', name: 'Fern', emoji: '🌿', zone: 'forest', fact: 'Ferns are ancient plants that existed before dinosaurs!' },
    ],
  },
  {
    id: 3,
    name: 'Pollution Alert!',
    items: [
      { id: '3-1', name: 'Plastic Bottle', emoji: '🧴', zone: 'recycle', fact: 'Plastic bottles take 450 years to decompose in the ocean!' },
      { id: '3-2', name: 'Octopus', emoji: '🐙', zone: 'ocean', fact: 'Octopuses have 3 hearts and blue blood!' },
      { id: '3-3', name: 'Shopping Bag', emoji: '🛍️', zone: 'recycle', fact: 'Plastic bags kill 100,000 marine animals every year!' },
      { id: '3-4', name: 'Bear', emoji: '🐻', zone: 'forest', fact: 'Bears play a vital role in forest ecosystems!' },
      { id: '3-5', name: 'Oil Barrel', emoji: '🛢️', zone: 'recycle', fact: 'Oil spills can devastate marine ecosystems for decades!' },
      { id: '3-6', name: 'Starfish', emoji: '⭐', zone: 'ocean', fact: 'Starfish can regenerate their arms!' },
      { id: '3-7', name: 'Trash Can', emoji: '🗑️', zone: 'recycle', fact: 'Proper waste disposal keeps habitats clean and safe!' },
      { id: '3-8', name: 'Eagle', emoji: '🦅', zone: 'forest', fact: 'Eagles are apex predators that indicate ecosystem health!' },
    ],
  },
  {
    id: 4,
    name: 'Speed Challenge!',
    timeLimit: 45,
    items: [
      { id: '4-1', name: 'Shark', emoji: '🦈', zone: 'ocean', fact: 'Sharks keep ocean ecosystems balanced!' },
      { id: '4-2', name: 'Wolf', emoji: '🐺', zone: 'forest', fact: 'Wolves help control deer populations in forests!' },
      { id: '4-3', name: 'Soda Can', emoji: '🥫', zone: 'recycle', fact: 'Recycling one aluminum can saves enough energy to power a TV for 3 hours!' },
      { id: '4-4', name: 'Seahorse', emoji: '🐴', zone: 'ocean', fact: 'Male seahorses carry babies — unique in the animal kingdom!' },
      { id: '4-5', name: 'Owl', emoji: '🦉', zone: 'forest', fact: 'Owls can rotate their heads 270 degrees!' },
      { id: '4-6', name: 'Battery', emoji: '🔋', zone: 'recycle', fact: 'Batteries contain toxic chemicals that pollute soil and water!' },
      { id: '4-7', name: 'Crab', emoji: '🦀', zone: 'ocean', fact: 'Crabs help clean the ocean floor!' },
      { id: '4-8', name: 'Rabbit', emoji: '🐇', zone: 'forest', fact: 'Rabbits help aerate soil with their burrows!' },
      { id: '4-9', name: 'Newspaper', emoji: '📰', zone: 'recycle', fact: 'Recycling paper saves 17 trees per ton!' },
      { id: '4-10', name: 'Penguin', emoji: '🐧', zone: 'ocean', fact: 'Penguins are excellent swimmers and spend most of their life in water!' },
    ],
  },
];

export const quizQuestions = [
  {
    levelId: 1,
    question: 'Which of these animals lives in the ocean?',
    options: ['Lion', 'Dolphin', 'Deer', 'Eagle'],
    correct: 1,
  },
  {
    levelId: 2,
    question: 'How much of marine life do coral reefs support?',
    options: ['5%', '10%', '25%', '50%'],
    correct: 2,
  },
  {
    levelId: 3,
    question: 'How long does a plastic bottle take to decompose?',
    options: ['10 years', '50 years', '100 years', '450 years'],
    correct: 3,
  },
  {
    levelId: 4,
    question: 'What percentage of Earth\'s oxygen does seaweed produce?',
    options: ['10%', '25%', '50%', '75%'],
    correct: 2,
  },
];
