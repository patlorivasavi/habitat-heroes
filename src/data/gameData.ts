export type Zone = 'ocean' | 'forest';

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
  description: string;
  sdg: 14 | 15;
  items: GameItem[];
  timeLimit?: number;
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
  { id: 'eco-warrior', name: 'Eco Warrior', emoji: '🌍', description: 'Master of all habitats', requirement: 'Complete Level 3 perfectly' },
  { id: 'speed-hero', name: 'Speed Hero', emoji: '⚡', description: 'Beat the timed challenge', requirement: 'Complete Level 4 with time remaining' },
  { id: 'choco-master', name: 'Choco Master', emoji: '🍫', description: 'Earned 200+ Choco Coins', requirement: 'Accumulate 200 Choco Coins' },
];

export const levels: Level[] = [
  {
    id: 1,
    name: 'Animal Kingdom',
    description: 'Sort animals into their natural habitats',
    sdg: 14,
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
    description: 'Learn about underwater and terrestrial plant life',
    sdg: 14,
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
    name: 'Ecosystem Experts',
    description: 'Advanced habitat classification challenge',
    sdg: 15,
    items: [
      { id: '3-1', name: 'Octopus', emoji: '🐙', zone: 'ocean', fact: 'Octopuses have 3 hearts and blue blood!' },
      { id: '3-2', name: 'Bear', emoji: '🐻', zone: 'forest', fact: 'Bears play a vital role in forest ecosystems!' },
      { id: '3-3', name: 'Starfish', emoji: '⭐', zone: 'ocean', fact: 'Starfish can regenerate their arms!' },
      { id: '3-4', name: 'Eagle', emoji: '🦅', zone: 'forest', fact: 'Eagles are apex predators that indicate ecosystem health!' },
      { id: '3-5', name: 'Seahorse', emoji: '🐴', zone: 'ocean', fact: 'Male seahorses carry babies — unique in the animal kingdom!' },
      { id: '3-6', name: 'Fox', emoji: '🦊', zone: 'forest', fact: 'Foxes help control rodent populations in forests!' },
      { id: '3-7', name: 'Stingray', emoji: '🐟', zone: 'ocean', fact: 'Stingrays are closely related to sharks!' },
      { id: '3-8', name: 'Hedgehog', emoji: '🦔', zone: 'forest', fact: 'Hedgehogs eat garden pests and help maintain healthy ecosystems!' },
    ],
  },
  {
    id: 4,
    name: 'Speed Challenge!',
    description: 'Race against the clock — sort them all!',
    sdg: 15,
    timeLimit: 45,
    items: [
      { id: '4-1', name: 'Shark', emoji: '🦈', zone: 'ocean', fact: 'Sharks keep ocean ecosystems balanced!' },
      { id: '4-2', name: 'Wolf', emoji: '🐺', zone: 'forest', fact: 'Wolves help control deer populations in forests!' },
      { id: '4-3', name: 'Penguin', emoji: '🐧', zone: 'ocean', fact: 'Penguins are excellent swimmers and spend most of their life in water!' },
      { id: '4-4', name: 'Owl', emoji: '🦉', zone: 'forest', fact: 'Owls can rotate their heads 270 degrees!' },
      { id: '4-5', name: 'Crab', emoji: '🦀', zone: 'ocean', fact: 'Crabs help clean the ocean floor!' },
      { id: '4-6', name: 'Rabbit', emoji: '🐇', zone: 'forest', fact: 'Rabbits help aerate soil with their burrows!' },
      { id: '4-7', name: 'Seal', emoji: '🦭', zone: 'ocean', fact: 'Seals can hold their breath for up to 2 hours!' },
      { id: '4-8', name: 'Squirrel', emoji: '🐿️', zone: 'forest', fact: 'Squirrels plant thousands of trees by forgetting where they buried acorns!' },
      { id: '4-9', name: 'Orca', emoji: '🐋', zone: 'ocean', fact: 'Orcas are the largest members of the dolphin family!' },
      { id: '4-10', name: 'Parrot', emoji: '🦜', zone: 'forest', fact: 'Parrots help spread seeds across tropical forests!' },
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
    question: 'How many hearts does an octopus have?',
    options: ['1', '2', '3', '4'],
    correct: 2,
  },
  {
    levelId: 4,
    question: 'What percentage of Earth\'s oxygen does seaweed produce?',
    options: ['10%', '25%', '50%', '75%'],
    correct: 2,
  },
];
