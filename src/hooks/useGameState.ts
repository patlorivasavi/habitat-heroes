import { useState, useCallback, useEffect, useRef } from 'react';
import { levels, type Zone, type GameItem, type Badge, badges } from '@/data/gameData';

export interface GameState {
  currentLevel: number;
  chocoCoins: number;
  mistakes: number;
  placedItems: Record<string, Zone>;
  completedLevels: number[];
  earnedBadges: string[];
  timeRemaining: number | null;
  feedback: { type: 'correct' | 'incorrect'; item: GameItem; message: string } | null;
  showLevelComplete: boolean;
  showQuiz: boolean;
  stars: number;
}

export function useGameState() {
  const [state, setState] = useState<GameState>({
    currentLevel: 1,
    chocoCoins: 0,
    mistakes: 0,
    placedItems: {},
    completedLevels: [],
    earnedBadges: [],
    timeRemaining: null,
    feedback: null,
    showLevelComplete: false,
    showQuiz: false,
    stars: 0,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentLevelData = levels.find(l => l.id === state.currentLevel)!;
  const remainingItems = currentLevelData.items.filter(item => !state.placedItems[item.id]);

  // Timer for timed levels
  useEffect(() => {
    if (currentLevelData.timeLimit && state.timeRemaining === null && !state.showLevelComplete) {
      setState(s => ({ ...s, timeRemaining: currentLevelData.timeLimit! }));
    }
  }, [state.currentLevel, currentLevelData.timeLimit, state.timeRemaining, state.showLevelComplete]);

  useEffect(() => {
    if (state.timeRemaining !== null && state.timeRemaining > 0 && !state.showLevelComplete) {
      timerRef.current = setInterval(() => {
        setState(s => {
          if (s.timeRemaining !== null && s.timeRemaining <= 1) {
            return { ...s, timeRemaining: 0, showLevelComplete: true, stars: 0 };
          }
          return { ...s, timeRemaining: (s.timeRemaining ?? 0) - 1 };
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [state.timeRemaining, state.showLevelComplete]);

  const placeItem = useCallback((itemId: string, zone: Zone) => {
    const item = currentLevelData.items.find(i => i.id === itemId);
    if (!item || state.placedItems[itemId]) return;

    const isCorrect = item.zone === zone;

    setState(s => {
      const newPlaced = { ...s.placedItems, [itemId]: zone };
      const newCoins = s.chocoCoins + (isCorrect ? 10 : -5);
      const newMistakes = s.mistakes + (isCorrect ? 0 : 1);
      const allPlaced = currentLevelData.items.every(i => newPlaced[i.id]);

      // Calculate stars
      const totalItems = currentLevelData.items.length;
      const correctCount = currentLevelData.items.filter(i => newPlaced[i.id] === i.zone).length;
      const accuracy = correctCount / totalItems;
      const stars = accuracy >= 1 ? 3 : accuracy >= 0.7 ? 2 : accuracy >= 0.4 ? 1 : 0;

      return {
        ...s,
        placedItems: isCorrect ? newPlaced : s.placedItems,
        chocoCoins: Math.max(0, newCoins),
        mistakes: newMistakes,
        feedback: {
          type: isCorrect ? 'correct' : 'incorrect',
          item,
          message: isCorrect
            ? `🎉 +10 Choco Coins! ${item.fact}`
            : `Oops! ${item.name} doesn't belong there. Hint: ${item.zone === 'ocean' ? '🌊 This belongs in the ocean!' : item.zone === 'forest' ? '🌱 This belongs in the forest!' : '♻️ This should be recycled!'}`,
        },
        showLevelComplete: allPlaced && isCorrect,
        stars: allPlaced && isCorrect ? stars : s.stars,
      };
    });

    // Auto-clear feedback
    setTimeout(() => {
      setState(s => ({ ...s, feedback: null }));
    }, 2500);
  }, [currentLevelData, state.placedItems]);

  const nextLevel = useCallback(() => {
    const next = state.currentLevel + 1;
    if (next > levels.length) return;

    // Check badges
    const newBadges = [...state.earnedBadges];
    if (state.currentLevel === 1 && state.stars === 3) newBadges.push('ocean-protector');
    if (state.currentLevel === 2 && state.stars === 3) newBadges.push('forest-guardian');
    if (state.currentLevel === 3 && state.stars === 3) newBadges.push('eco-warrior');
    if (state.currentLevel === 4 && (state.timeRemaining ?? 0) > 0) newBadges.push('speed-hero');
    if (state.chocoCoins >= 200) newBadges.push('choco-master');

    setState(s => ({
      ...s,
      currentLevel: next,
      placedItems: {},
      completedLevels: [...new Set([...s.completedLevels, s.currentLevel])],
      earnedBadges: [...new Set(newBadges)],
      showLevelComplete: false,
      showQuiz: false,
      timeRemaining: null,
      feedback: null,
    }));
  }, [state]);

  const restartLevel = useCallback(() => {
    setState(s => ({
      ...s,
      placedItems: {},
      mistakes: 0,
      showLevelComplete: false,
      showQuiz: false,
      timeRemaining: null,
      feedback: null,
    }));
  }, []);

  const restartGame = useCallback(() => {
    setState({
      currentLevel: 1,
      chocoCoins: 0,
      mistakes: 0,
      placedItems: {},
      completedLevels: [],
      earnedBadges: [],
      timeRemaining: null,
      feedback: null,
      showLevelComplete: false,
      showQuiz: false,
      stars: 0,
    });
  }, []);

  return {
    state,
    currentLevelData,
    remainingItems,
    placeItem,
    nextLevel,
    restartLevel,
    restartGame,
    allBadges: badges,
  };
}
