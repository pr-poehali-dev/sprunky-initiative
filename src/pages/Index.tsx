import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect, useRef } from "react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
  icon: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Музыкальные ритмы в дизайне",
    excerpt: "Как создать визуальную гармонию, вдохновляясь музыкой и звуками Sprunki",
    category: "Дизайн",
    date: "28 окт 2025",
    readTime: "5 мин",
    color: "bg-primary",
    icon: "Music"
  },
  {
    id: 2,
    title: "Креативное мышление 2.0",
    excerpt: "Развивайте творческие способности через игровые механики и необычные подходы",
    category: "Творчество",
    date: "27 окт 2025",
    readTime: "7 мин",
    color: "bg-secondary",
    icon: "Sparkles"
  },
  {
    id: 3,
    title: "Цветовая психология",
    excerpt: "Влияние ярких цветов на настроение и восприятие контента",
    category: "Психология",
    date: "26 окт 2025",
    readTime: "6 мин",
    color: "bg-accent",
    icon: "Palette"
  },
  {
    id: 4,
    title: "Интерактивные элементы",
    excerpt: "Как сделать пользовательский опыт незабываемым с помощью анимаций",
    category: "Разработка",
    date: "25 окт 2025",
    readTime: "8 мин",
    color: "bg-[#0EA5E9]",
    icon: "Zap"
  },
  {
    id: 5,
    title: "Звуковой дизайн в вебе",
    excerpt: "Интеграция аудио-элементов для создания уникальной атмосферы",
    category: "Звук",
    date: "24 окт 2025",
    readTime: "4 мин",
    color: "bg-primary",
    icon: "Volume2"
  },
  {
    id: 6,
    title: "Игровые механики в UX",
    excerpt: "Геймификация пользовательского интерфейса на примере Sprunki",
    category: "UX",
    date: "23 окт 2025",
    readTime: "9 мин",
    color: "bg-secondary",
    icon: "Gamepad2"
  }
];

const Index = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const playOperaNote = (frequency: number, duration: number = 0.3) => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  };

  const handleCardHover = (articleId: number) => {
    setHoveredCard(articleId);
    const frequencies = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00];
    playOperaNote(frequencies[articleId - 1] || 440);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16 space-y-6">
          <div className="flex justify-center gap-2 mb-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full animate-wave"
                style={{
                  height: '40px',
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold font-rubik text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-glow">
            Sprunki Blog
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter">
            Креативные идеи, музыка и дизайн в одном месте
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button 
              size="lg" 
              className="rounded-full font-rubik font-semibold shadow-lg hover:scale-105 transition-transform"
              onClick={() => playOperaNote(523.25, 0.5)}
            >
              <Icon name="PenLine" size={20} className="mr-2" />
              Написать статью
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full font-rubik font-semibold hover:scale-105 transition-transform"
              onClick={() => playOperaNote(659.25, 0.5)}
            >
              <Icon name="Bell" size={20} className="mr-2" />
              Подписаться
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card
              key={article.id}
              className="group relative overflow-hidden border-2 hover:border-primary transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
              onMouseEnter={() => handleCardHover(article.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className={`${article.color} h-48 relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={hoveredCard === article.id ? 'animate-bounce-slow' : ''}>
                    <Icon name={article.icon as any} size={80} className="text-white/90" />
                  </div>
                </div>
                
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="rounded-full font-rubik font-semibold">
                    {article.category}
                  </Badge>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold font-rubik group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-muted-foreground font-inter leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <Button variant="ghost" className="w-full font-rubik font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Читать далее
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <footer className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-card rounded-full shadow-lg animate-float">
            <Icon name="Sparkles" size={24} className="text-primary" />
            <p className="text-muted-foreground font-inter">
              Создано с любовью к творчеству
            </p>
            <Icon name="Heart" size={24} className="text-accent" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;