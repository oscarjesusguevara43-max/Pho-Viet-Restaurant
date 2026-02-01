import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ExternalLink,
  Phone,
  Star,
} from "lucide-react";

import heroPho from "@/assets/images/hero-pho.png";
import chefTeam from "@/assets/images/chef-team.png";
import galleryInterior from "@/assets/images/gallery-interior.png";
import menuBun from "@/assets/images/menu-bun.png";
import menuRice from "@/assets/images/menu-rice.png";
import menuSpringrolls from "@/assets/images/menu-springrolls.png";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const SECTION_FADE = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

type MenuCategory =
  | "Aperitivos"
  | "Sopa"
  | "Pho"
  | "Fideos de Arroz"
  | "Fideos de Huevo"
  | "Arroz"
  | "Bún (Ensalada)"
  | "Arroz Frito"
  | "Vegetariano"
  | "Bebidas";

type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: string | number;
  image?: string;
  chefPick?: boolean;
};

const MENU: MenuItem[] = [
  // Khai Vị - Aperitivos
  { id: "a1", category: "Aperitivos", name: "A1 Chả Giò (2)", description: "Rollitos de huevo de cerdo crujientes vietnamitas", price: 6.95 },
  { id: "a2", category: "Aperitivos", name: "A2 Chả Giò Tôm (4)", description: "Rollitos de huevo con camarones crujientes", price: 7.95 },
  { id: "a3", category: "Aperitivos", name: "A3 Gỏi cuốn (2)", description: "Rollitos de primavera de camarones frescos y cerdo", price: 6.95, image: menuSpringrolls },
  { id: "a4", category: "Aperitivos", name: "A4 Tôm tàu hủ Ky", description: "Camarones envueltos en tofu", price: 7.95 },
  { id: "a5", category: "Aperitivos", name: "A5 Cánh Gà Chiên (6)", description: "Alitas de pollo fritas", price: 8.95 },
  { id: "a6", category: "Aperitivos", name: "A6 Nem nướng (2 brochetas)", description: "Albóndigas de cerdo a la parrilla", price: 7.95 },
  { id: "a7", category: "Aperitivos", name: "A7 Pot Stickers (6)", description: "Pollo o Cerdo. A) Al vapor B) Frito", price: 6.95 },

  // Súp - Sopa
  { id: "s1", category: "Sopa", name: "S1 Súp Hoành thánh", description: "Sopa wonton", price: 5.95 },
  { id: "s2", category: "Sopa", name: "S2 Súp bò viên", description: "Sopa de albóndigas de carne de res", price: 5.95 },
  { id: "s3", category: "Sopa", name: "S3 Súp Gà", description: "Sopa de pollo desmenuzado", price: 5.95 },

  // Phở - Pho
  { id: "p1", category: "Pho", name: "P1 Phở Đặc Biệt", description: "Pho especial con carne de res poco hecha, filete de falda bien hecho, tendón, callos y albóndigas de res", price: "L $14.95 / XL $15.95", image: heroPho, chefPick: true },
  { id: "p2", category: "Pho", name: "P2 Phở Tái", description: "Pho de carne poco hecha", price: "L $13.95 / XL $14.95" },
  { id: "p3", category: "Pho", name: "P3 Phở tái bò viên", description: "Pho de carne de res poco hecha y albóndigas de res", price: "L $13.95 / XL $14.95" },
  { id: "p4", category: "Pho", name: "P4 Phở Tái Nạm", description: "Pho de carne de res y pecho poco hecho", price: "L $13.95 / XL $14.95" },
  { id: "p5", category: "Pho", name: "P5 Phở Bò Viên", description: "Pho de albóndigas de ternera", price: "L $13.95 / XL $14.95" },
  { id: "p6", category: "Pho", name: "P6 Phở Gà", description: "Pho de pollo", price: "L $13.95 / XL $14.95" },
  { id: "p7", category: "Pho", name: "P7 Phở Đồ biển", description: "Pho de mariscos", price: "L $13.95 / XL $14.95" },
  { id: "p8", category: "Pho", name: "P8 Phở nạm", description: "Pho de pechuga", price: "L $13.95 / XL $14.95" },
  { id: "p9", category: "Pho", name: "P9 Phở đặc biệt thái lan", description: "Pho especial al estilo tailandés", price: "L $14.95 / XL $15.95" },
  { id: "p10", category: "Pho", name: "P10 PhỞ TÔM", description: "Pho de camarones", price: "L $13.95 / XL $14.95" },

  // Hủ Tiếu - Fideos de Arroz
  { id: "h1", category: "Fideos de Arroz", name: "H1 Hủ tiếu thập cẩm", description: "Sopa combinada de fideos de arroz", price: 14.95 },
  { id: "h2", category: "Fideos de Arroz", name: "H2 Hủ tiếu đồ biển", description: "Sopa de fideos de arroz con mariscos", price: 13.95 },
  { id: "h3", category: "Fideos de Arroz", name: "H3 Hủ tiếu tôm", description: "Sopa de fideos de arroz con camarones", price: 12.95 },

  // Mì - Fideos de Huevo
  { id: "m1", category: "Fideos de Huevo", name: "M1 Mì thập cẩm", description: "Sopa combinada de fideos con huevo", price: 14.95 },
  { id: "m2", category: "Fideos de Huevo", name: "M2 Mì đồ biển", description: "Sopa de fideos de huevo con mariscos", price: 13.95 },
  { id: "m8", category: "Fideos de Huevo", name: "M8 Mì xào giòn thập cẩm", description: "Fideos de huevo combinados salteados (sin sopa)", price: 15.95, chefPick: true },

  // Cơm - Platos de arroz
  { id: "c1", category: "Arroz", name: "C1 Cơm Sườn", description: "Chuletas de cerdo a la parrilla", price: 13.95 },
  { id: "c3", category: "Arroz", name: "C3 Cơm sườn, chả, ốp la", description: "Chuletas de cerdo a la parrilla, pastel de carne de cerdo y huevo frito", price: 15.95, image: menuRice, chefPick: true },
  { id: "c12", category: "Arroz", name: "C12 Cơm bò lúc lắc", description: "Carne de res salteada y temblorosa", price: 15.95 },

  // Bún - Fideos en ensalada
  { id: "b1", category: "Bún (Ensalada)", name: "B1 Bún thịt nướng", description: "Cerdo a la parrilla", price: 13.95, image: menuBun },
  { id: "b2", category: "Bún (Ensalada)", name: "B2 Bún thịt nướng, chả giò", description: "Cerdo a la parrilla y rollo de huevo crujiente", price: 14.95 },

  // Cơm Chiên - Arroz frito
  { id: "cc1", category: "Arroz Frito", name: "CC1 Arroz frito dương châu", description: "Arroz frito combinado", price: 14.95 },
  { id: "cc12", category: "Arroz Frito", name: "CC12 Cơm gà Asador Chiên", description: "Pollo asado con arroz frito", price: 15.95 },

  // Chay - Vegetarian
  { id: "v1", category: "Vegetariano", name: "V1 Gỏi cuốn chay", description: "Rollitos de primavera frescos vegetarianos", price: 6.95 },
  { id: "v4", category: "Vegetariano", name: "V4 Phở chay", description: "Pho vegetariano (caldo de res o caldo de verduras)", price: "L $14.95 / XL 15.95" },

  // Thức uống - Bebidas
  { id: "n2", category: "Bebidas", name: "N2 Cafe sữa đá", description: "Café helado con leche condensada", price: 4.95 },
  { id: "n11", category: "Bebidas", name: "N11 Té tailandés", description: "Thai Tea refrescante", price: 4.95 },
];

const CATEGORIES: MenuCategory[] = [
  "Aperitivos",
  "Sopa",
  "Pho",
  "Fideos de Arroz",
  "Fideos de Huevo",
  "Arroz",
  "Bún (Ensalada)",
  "Arroz Frito",
  "Vegetariano",
  "Bebidas",
];

const REVIEWS = [
  { id: "r1", name: "María L.", text: "El caldo del pho tiene profundidad real. Se siente casero y premium a la vez.", rating: 5 },
  { id: "r2", name: "Daniel R.", text: "Servicio cálido, porciones perfectas y sabores súper frescos. Vuelvo seguro.", rating: 5 },
  { id: "r3", name: "Sofía G.", text: "Los spring rolls y el café vietnamita son obligatorios. Todo impecable.", rating: 4 },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatPrice(price: string | number) {
  if (typeof price === "string") return price;
  return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function Stars({ rating, idPrefix }: { rating: number; idPrefix: string }) {
  return (
    <div className="flex items-center gap-1" data-testid={`stars-${idPrefix}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-secondary text-secondary" : "fill-transparent text-muted-foreground/35"
          )}
        />
      ))}
    </div>
  );
}

function useSectionInView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  return { ref, inView };
}

export default function Home() {
  const [activeCat, setActiveCat] = useState<MenuCategory>("Aperitivos");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filteredMenu = useMemo(() => MENU.filter((m) => m.category === activeCat), [activeCat]);
  const chefPicks = useMemo(() => MENU.filter((m) => m.chefPick), []);
  const gallery = [heroPho, menuSpringrolls, galleryInterior, chefTeam, menuBun, menuRice];

  const hero = useSectionInView();
  const story = useSectionInView();
  const menu = useSectionInView();
  const gallerySection = useSectionInView();
  const reservation = useSectionInView();
  const reviews = useSectionInView();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/72 backdrop-blur shadow-sm" data-testid="header-nav">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <a href="#" className="flex items-center gap-2" data-testid="link-home">
            <div className="grid h-9 w-9 place-items-center rounded-xl border bg-card shadow-sm font-serif font-bold">PV</div>
            <div className="leading-tight">
              <div className="font-serif text-sm font-bold tracking-tight">Pho Viet</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Authentic</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium" data-testid="nav-main">
            <a href="#menu" className="hover:text-primary transition-colors">Menú</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Galería</a>
            <a href="#reservations" className="hover:text-primary transition-colors">Reservas</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex"><a href="tel:+15551234567">Llamar</a></Button>
            <Button size="sm" asChild><a href="#reservations">Reservar</a></Button>
          </div>
        </div>
      </header>

      <main id="main">
        <section id="top" className="pv-hero-grid py-12 md:py-20 px-4 md:px-6">
          <motion.div ref={hero.ref} initial="hidden" animate={hero.inView ? "show" : "hidden"} variants={SECTION_FADE} className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-accent">Desde 2014</div>
              <h1 className="mt-6 font-serif text-4xl md:text-6xl font-bold leading-[1.1]" data-testid="text-hero-title">Sabores que conquistan desde el primer sorbo.</h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">Pho Viet trae el alma de Vietnam a tu mesa con caldos de 12 horas y los ingredientes más frescos.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild><a href="#menu">Explorar Menú</a></Button>
                <Button variant="secondary" size="lg" asChild><a href="#reservations">Reservar Mesa</a></Button>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-secondary/20 rounded-[2rem] blur-3xl group-hover:bg-secondary/30 transition-colors" />
              <img src={heroPho} alt="Pho" className="relative rounded-[2rem] border shadow-2xl object-cover aspect-[4/5] w-full" />
            </div>
          </motion.div>
        </section>

        <section id="menu" className="py-20 px-4 md:px-6 bg-card/30">
          <motion.div ref={menu.ref} initial="hidden" animate={menu.inView ? "show" : "hidden"} variants={SECTION_FADE} className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Nuestro Menú</h2>
              <p className="mt-4 text-muted-foreground">Autenticidad en cada categoría, frescura en cada plato.</p>
            </div>

            <Tabs value={activeCat} onValueChange={(v) => setActiveCat(v as MenuCategory)} className="w-full">
              <div className="flex justify-center mb-10 overflow-x-auto pb-4">
                <TabsList className="bg-muted/50 p-1 rounded-full h-auto flex-nowrap">
                  {CATEGORIES.map((cat) => (
                    <TabsTrigger key={cat} value={cat} className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs font-bold uppercase tracking-wider">
                      {cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMenu.map((item) => (
                  <Card key={item.id} className="group p-4 flex gap-4 bg-background hover:shadow-lg transition-all border-none">
                    <div className="h-24 w-24 shrink-0 rounded-2xl overflow-hidden bg-muted">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-[10px] uppercase font-bold text-muted-foreground opacity-50">Sabor</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4 mb-1">
                        <h3 className="font-bold text-base truncate">{item.name}</h3>
                        <span className="font-bold text-primary whitespace-nowrap">{formatPrice(item.price)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{item.description}</p>
                      {item.chefPick && <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-secondary"><Star className="h-3 w-3 fill-secondary" /> Especialidad</div>}
                    </div>
                  </Card>
                ))}
              </div>
            </Tabs>
          </motion.div>
        </section>

        <section id="gallery" className="py-20 px-4 md:px-6">
          <motion.div ref={gallerySection.ref} initial="hidden" animate={gallerySection.inView ? "show" : "hidden"} variants={SECTION_FADE} className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-12">Galería Visual</h2>
            <div className="columns-2 md:columns-3 gap-6">
              {gallery.map((src, i) => (
                <button key={i} onClick={() => setLightbox(src)} className="w-full mb-6 rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl transition-all group">
                  <img src={src} alt="Gallery" className="w-full group-hover:scale-105 transition-transform duration-700" />
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="reservations" className="py-20 px-4 md:px-6 bg-foreground text-background">
          <motion.div ref={reservation.ref} initial="hidden" animate={reservation.inView ? "show" : "hidden"} variants={SECTION_FADE} className="mx-auto max-w-4xl grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Reserva una mesa</h2>
              <p className="mt-6 text-background/70 leading-relaxed">Asegura tu lugar y disfruta de la mejor comida vietnamita en un ambiente inigualable.</p>
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30"><Phone className="h-5 w-5 text-primary" /></div>
                  <div>
                    <div className="text-xs uppercase font-bold tracking-widest text-background/50">Llámanos</div>
                    <a href="tel:+15551234567" className="text-xl font-bold hover:text-primary transition-colors">(555) 123-4567</a>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-8 text-foreground bg-background border-none shadow-2xl rounded-[2rem]">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input placeholder="Tu nombre" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Hora</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Comensales</Label>
                  <Input type="number" defaultValue={2} />
                </div>
                <Button className="w-full h-12 text-base font-bold" size="lg">Confirmar Reserva</Button>
              </form>
            </Card>
          </motion.div>
        </section>
      </main>

      <footer className="py-12 px-4 md:px-6 border-t bg-card/50">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="font-serif text-2xl font-bold">Pho Viet</div>
            <p className="mt-2 text-sm text-muted-foreground">© 2026 Authentic Vietnamese Cuisine. Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-6 text-sm font-bold uppercase tracking-widest">
            <a href="#menu" className="hover:text-primary">Menú</a>
            <a href="#gallery" className="hover:text-primary">Galería</a>
            <a href="#reservations" className="hover:text-primary">Reservas</a>
          </div>
        </div>
      </footer>

      <Dialog open={!!lightbox} onOpenChange={(o) => setLightbox(o ? lightbox : null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none">
          {lightbox && <img src={lightbox} className="w-full h-auto rounded-3xl" alt="Lightbox" />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
