import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-rubik">POLO</h1>
          
          <div className="hidden md:flex gap-8 font-inter">
            <a href="#" className="hover:text-primary transition-colors">Мужское</a>
            <a href="#" className="hover:text-primary transition-colors">Женское</a>
            <a href="#" className="hover:text-primary transition-colors">Дети</a>
            <a href="#" className="hover:text-primary transition-colors">Коллекции</a>
          </div>

          <div className="flex gap-4">
            <Button variant="ghost" size="icon">
              <Icon name="Search" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="User" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="ShoppingBag" size={20} />
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <Badge className="mb-6 text-sm font-rubik px-6 py-2">Новая коллекция</Badge>
          
          <h2 className="text-6xl md:text-8xl font-bold font-rubik mb-6 animate-fade-in">
            POLO SPORT
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl font-inter">
            Классический стиль встречается с современным комфортом
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Button size="lg" className="rounded-full font-rubik font-semibold px-8">
              Мужская коллекция
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full font-rubik font-semibold px-8">
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
                className="group relative overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
              >
                <div className={`${category.color} h-64 flex items-center justify-center relative overflow-hidden`}>
                  <Icon name={category.icon as any} size={80} className="text-white/90 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-2xl font-bold font-rubik mb-2">{category.title}</h4>
                  <Button variant="ghost" className="mt-4 font-rubik">
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
              <Button size="lg" className="font-rubik font-semibold">
                Узнать больше
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Icon name="Mail" size={48} className="mx-auto mb-6" />
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
            <Button size="lg" variant="secondary" className="rounded-full font-rubik font-semibold">
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
                <Button variant="ghost" size="icon">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
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
