import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useEffect, useRef } from "react";

interface Character {
  id: number;
  name: string;
  emoji: string;
  sound: number;
  color: string;
}

const characters: Character[] = [
  { id: 1, name: "Бит", emoji: "🎵", sound: 261.63, color: "bg-blue-500" },
  { id: 2, name: "Бас", emoji: "🎸", sound: 329.63, color: "bg-purple-500" },
  { id: 3, name: "Драм", emoji: "🥁", sound: 392.00, color: "bg-pink-500" },
  { id: 4, name: "Синт", emoji: "🎹", sound: 523.25, color: "bg-orange-500" },
  { id: 5, name: "Вокал", emoji: "🎤", sound: 659.25, color: "bg-green-500" },
  { id: 6, name: "Труба", emoji: "🎺", sound: 783.99, color: "bg-yellow-500" },
  { id: 7, name: "Скрипка", emoji: "🎻", sound: 880.00, color: "bg-red-500" },
  { id: 8, name: "Саксофон", emoji: "🎷", sound: 987.77, color: "bg-indigo-500" }
];

const Index = () => {
  const [activeChars, setActiveChars] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<Map<number, OscillatorNode>>(new Map());

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      oscillatorsRef.current.forEach(osc => osc.stop());
      audioContextRef.current?.close();
    };
  }, []);

  const toggleCharacter = (charId: number, frequency: number) => {
    if (activeChars.includes(charId)) {
      const osc = oscillatorsRef.current.get(charId);
      if (osc) {
        osc.stop();
        oscillatorsRef.current.delete(charId);
      }
      setActiveChars(activeChars.filter(id => id !== charId));
    } else {
      if (!audioContextRef.current) return;
      
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      
      oscillator.start();
      oscillatorsRef.current.set(charId, oscillator);
      
      setActiveChars([...activeChars, charId]);
      setScore(score + 10);
    }
  };

  const clearAll = () => {
    oscillatorsRef.current.forEach(osc => osc.stop());
    oscillatorsRef.current.clear();
    setActiveChars([]);
  };

  const playRandom = () => {
    clearAll();
    const randomCount = Math.floor(Math.random() * 4) + 2;
    const randomChars = characters
      .sort(() => Math.random() - 0.5)
      .slice(0, randomCount);
    
    randomChars.forEach(char => {
      toggleCharacter(char.id, char.sound);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-8 pt-8">
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-2 bg-white rounded-full animate-wave"
                style={{
                  height: '50px',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
          
          <h1 className="text-7xl font-bold font-rubik text-white drop-shadow-2xl mb-4 animate-bounce-slow">
            🎮 SPRUNKI 🎵
          </h1>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 inline-block shadow-xl">
            <p className="text-3xl font-bold font-rubik text-purple-600">
              Очки: {score} ⭐
            </p>
          </div>
        </header>

        <div className="mb-6 flex gap-4 justify-center flex-wrap">
          <Button 
            size="lg" 
            className="rounded-full font-rubik font-bold text-xl px-8 py-6 bg-green-500 hover:bg-green-600 hover:scale-110 transition-all shadow-xl"
            onClick={playRandom}
          >
            🎲 Случайная мелодия
          </Button>
          <Button 
            size="lg" 
            variant="destructive"
            className="rounded-full font-rubik font-bold text-xl px-8 py-6 hover:scale-110 transition-all shadow-xl"
            onClick={clearAll}
          >
            🗑️ Очистить всё
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {characters.map((char) => {
            const isActive = activeChars.includes(char.id);
            return (
              <Card
                key={char.id}
                className={`cursor-pointer transition-all duration-300 border-4 ${
                  isActive 
                    ? 'scale-110 shadow-2xl animate-bounce-slow border-white' 
                    : 'hover:scale-105 border-transparent'
                } ${char.color}`}
                onClick={() => toggleCharacter(char.id, char.sound)}
              >
                <div className="p-8 text-center">
                  <div className={`text-8xl mb-4 ${isActive ? 'animate-bounce-slow' : ''}`}>
                    {char.emoji}
                  </div>
                  <h3 className="text-2xl font-bold font-rubik text-white drop-shadow-lg">
                    {char.name}
                  </h3>
                  {isActive && (
                    <div className="mt-2 text-4xl animate-pulse">🔊</div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="bg-white/90 backdrop-blur-sm p-8 shadow-2xl">
          <h2 className="text-3xl font-bold font-rubik text-center mb-6 text-purple-600">
            📖 Как играть?
          </h2>
          <div className="space-y-4 text-xl font-inter">
            <p className="flex items-center gap-3">
              <span className="text-4xl">👆</span>
              <span>Нажми на персонажа, чтобы включить звук</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-4xl">🎵</span>
              <span>Объедини несколько персонажей и создай мелодию!</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-4xl">🎲</span>
              <span>Нажми "Случайная мелодия" для сюрприза</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="text-4xl">⭐</span>
              <span>Собирай очки за каждый включённый звук!</span>
            </p>
          </div>
        </Card>

        <footer className="text-center mt-8 pb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 inline-block shadow-lg">
            <p className="text-xl font-rubik text-purple-600">
              Привет, Глеб! Создай свою музыку! 🎨🎶
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
