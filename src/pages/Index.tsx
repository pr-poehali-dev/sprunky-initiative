import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";

const Index = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const playSound = (frequency: number, type: OscillatorType = 'sine', duration: number = 0.2) => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  };

  const handleCardHover = (index: number) => {
    setHoveredIndex(index);
    const notes = [523.25, 659.25, 783.99];
    playSound(notes[index], 'triangle', 0.3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <nav className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full animate-wave"
                  style={{
                    height: '24px',
                    animationDelay: `${i * 0.15}s`
                  }}
                />
              ))}
            </div>
            <h1 className="text-2xl font-bold font-rubik bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">POLO</h1>
          </div>
          
          <div className="hidden md:flex gap-8 font-inter">
            <a href="#" className="hover:text-primary transition-colors">Мужское</a>
            <a href="#" className="hover:text-primary transition-colors">Женское</a>
            <a href="#" className="hover:text-primary transition-colors">Дети</a>
            <a href="#" className="hover:text-primary transition-colors">Коллекции</a>
          </div>

          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => playSound(800, 'sine', 0.15)}
            >
              <Icon name="Search" size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => playSound(900, 'sine', 0.15)}
            >
              <Icon name="User" size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => playSound(1000, 'sine', 0.15)}
            >
              <Icon name="ShoppingBag" size={20} />
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <Badge className="mb-6 text-sm font-rubik px-6 py-2">Новая коллекция</Badge>
          
          <h2 className="text-6xl md:text-8xl font-bold font-rubik mb-6 animate-glow bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            POLO SPORT
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl font-inter">
            Классический стиль встречается с современным комфортом
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Button 
              size="lg" 
              className="rounded-full font-rubik font-semibold px-8 hover:scale-110 transition-transform shadow-lg animate-bounce-slow"
              onClick={() => playSound(523.25, 'square', 0.4)}
            >
              Мужская коллекция
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full font-rubik font-semibold px-8 hover:scale-110 transition-transform"
              onClick={() => playSound(659.25, 'square', 0.4)}
            >
              Женская коллекция
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold font-rubik text-center mb-12">Популярные категории</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Поло", icon: "Shirt", color: "bg-primary" },
              { title: "Свитера", icon: "Wind", color: "bg-secondary" },
              { title: "Брюки", icon: "Boxes", color: "bg-accent" }
            ].map((category, index) => (
              <Card 
                key={index}
                className="group relative overflow-hidden cursor-pointer hover:-translate-y-4 transition-all duration-300 hover:shadow-2xl border-2 hover:border-primary animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`${category.color} h-64 flex items-center justify-center relative overflow-hidden`}>
                  <Icon name={category.icon as any} size={80} className={`text-white/90 transition-transform ${hoveredIndex === index ? 'animate-bounce-slow scale-125' : ''}`} />
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-2xl font-bold font-rubik mb-2">{category.title}</h4>
                  <Button 
                    variant="ghost" 
                    className="mt-4 font-rubik"
                    onClick={() => playSound(440 + index * 100, 'sine', 0.3)}
                  >
                    Смотреть коллекцию
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 font-rubik">О бренде</Badge>
              <h3 className="text-4xl md:text-5xl font-bold font-rubik mb-6">
                Наследие стиля с 1967 года
              </h3>
              <p className="text-lg text-muted-foreground mb-6 font-inter leading-relaxed">
                Polo представляет классическую элегантность американского стиля. 
                От знаменитых рубашек поло до роскошных костюмов — каждая деталь 
                создана с вниманием к качеству и стилю.
              </p>
              <Button 
                size="lg" 
                className="font-rubik font-semibold"
                onClick={() => playSound(698.46, 'sawtooth', 0.3)}
              >
                Узнать больше
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { from: 'from-primary/40', to: 'to-accent/40' },
                { from: 'from-secondary/40', to: 'to-primary/40' },
                { from: 'from-accent/40', to: 'to-secondary/40' },
                { from: 'from-primary/40', to: 'to-secondary/40' }
              ].map((colors, i) => (
                <div 
                  key={i}
                  className={`aspect-square bg-gradient-to-br ${colors.from} ${colors.to} rounded-2xl hover:scale-110 transition-all duration-300 animate-glow cursor-pointer`}
                  style={{ animationDelay: `${i * 0.3}s` }}
                  onClick={() => playSound(400 + i * 150, 'sine', 0.2)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-float"
              style={{
                width: `${Math.random() * 60 + 20}px`,
                height: `${Math.random() * 60 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Icon name="Mail" size={48} className="mx-auto mb-6 animate-bounce-slow" />
          <h3 className="text-3xl md:text-4xl font-bold font-rubik mb-4">
            Подпишитесь на рассылку
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto font-inter">
            Получайте эксклюзивные предложения и новости о новых коллекциях
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Ваш email"
              className="flex-1 px-6 py-3 rounded-full text-foreground font-inter"
            />
            <Button 
              size="lg" 
              variant="secondary" 
              className="rounded-full font-rubik font-semibold"
              onClick={() => playSound(880, 'triangle', 0.5)}
            >
              Подписаться
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold font-rubik mb-4">О компании</h4>
              <ul className="space-y-2 font-inter text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Пресс-центр</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold font-rubik mb-4">Помощь</h4>
              <ul className="space-y-2 font-inter text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Возврат</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold font-rubik mb-4">Магазины</h4>
              <ul className="space-y-2 font-inter text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Найти магазин</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Онлайн</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold font-rubik mb-4">Соцсети</h4>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="hover:scale-125 transition-transform hover:text-primary">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="hover:scale-125 transition-transform hover:text-primary">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="hover:scale-125 transition-transform hover:text-primary">
                  <Icon name="Twitter" size={20} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-muted-foreground font-inter">
            <p>© 2025 POLO. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;