import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ExternalLink,
  Phone,
  Star,
  Info,
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
  | "Bebidas"
  | "Extras";

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
  { id: "p1", category: "Pho", name: "P1 Phở Đặc Biệt", description: "Pho especial con carne de res poco hecha, filete de falda bien hecho, tendón, callos y albóndigas de res. Servido con brotes de soja, jalapeño y lima.", price: "L $14.95 / XL $15.95", image: heroPho, chefPick: true },
  { id: "p2", category: "Pho", name: "P2 Phở Tái", description: "Pho de carne poco hecha", price: "L $13.95 / XL $14.95" },
  { id: "p3", category: "Pho", name: "P3 Phở tái bò viên", description: "Pho de carne de res poco hecha y albóndigas de res", price: "L $13.95 / XL $14.95" },
  { id: "p4", category: "Pho", name: "P4 Phở Tái Nạm", description: "Pho de carne de res y pecho poco hecho", price: "L $13.95 / XL $14.95" },
  { id: "p5", category: "Pho", name: "P5 Phở Bò Viên", description: "Pho de albóndigas de ternera", price: "L $13.95 / XL $14.95" },
  { id: "p6", category: "Pho", name: "P6 Phở Gà", description: "Pho de pollo", price: "L $13.95 / XL $14.95" },
  { id: "p7", category: "Pho", name: "P7 Phở Đồ biển", description: "Pho de mariscos", price: "L $13.95 / XL $14.95" },
  { id: "p8", category: "Pho", name: "P8 Phở nạm", description: "Pho de pechuga", price: "L $13.95 / XL $14.95" },
  { id: "p9", category: "Pho", name: "P9 Phở đặc biệt thái lan", description: "Pho especial al estilo tailandés con carne de res poco hecha, filete de falda, tendón, callos y albóndigas.", price: "L $14.95 / XL $15.95" },
  { id: "p10", category: "Pho", name: "P10 PhỞ TÔM", description: "Pho de camarones", price: "L $13.95 / XL $14.95" },

  // Hủ Tiếu - Fideos de Arroz
  { id: "h1", category: "Fideos de Arroz", name: "H1 Hủ tiếu thập cẩm", description: "Sopa combinada de fideos de arroz. Caldo de pollo.", price: 14.95 },
  { id: "h2", category: "Fideos de Arroz", name: "H2 Hủ tiếu đồ biển", description: "Sopa de fideos de arroz con mariscos", price: 13.95 },
  { id: "h3", category: "Fideos de Arroz", name: "H3 Hủ tiếu tôm", description: "Sopa de fideos de arroz con camarones", price: 12.95 },
  { id: "h4", category: "Fideos de Arroz", name: "H4 Hủ tiếu tôm viên, cá viên", description: "Sopa de fideos de arroz con albóndigas de camarones y pescado", price: 12.95 },
  { id: "h5", category: "Fideos de Arroz", name: "H5 Hủ tiếu gà", description: "Sopa de fideos de arroz con pollo desmenuzado", price: 12.95 },
  { id: "h6", category: "Fideos de Arroz", name: "H6 Hủ tiếu xá xíu", description: "Sopa de fideos de arroz con cerdo a la barbacoa", price: 12.95 },

  // Mì - Fideos de Huevo
  { id: "m1", category: "Fideos de Huevo", name: "M1 Mì thập cẩm", description: "Sopa combinada de fideos con huevo amarillos. Caldo de pollo.", price: 14.95 },
  { id: "m2", category: "Fideos de Huevo", name: "M2 Mì đồ biển", description: "Sopa de fideos de huevo con mariscos", price: 13.95 },
  { id: "m3", category: "Fideos de Huevo", name: "M3 Mi tôm", description: "Sopa de fideos con huevo y camarones", price: 13.95 },
  { id: "m4", category: "Fideos de Huevo", name: "M4 Mì tôm viên, cá viên", description: "Albóndigas de camarones, albóndigas de pescado, sopa de fideos con huevo", price: 13.95 },
  { id: "m5", category: "Fideos de Huevo", name: "M5 Mi gá", description: "Sopa de fideos con huevo y pollo desmenuzado", price: 13.95 },
  { id: "m6", category: "Fideos de Huevo", name: "M6 Mì hoành thánh", description: "Sopa de fideos con huevo y wonton", price: 13.95 },
  { id: "m7", category: "Fideos de Huevo", name: "M7 Mì xá xíu", description: "Sopa de fideos con huevo y cerdo a la barbacoa", price: 13.95 },
  { id: "m8", category: "Fideos de Huevo", name: "Mì xào giòn thập cẩm", description: "Fideos de huevo combinados salteados (sin sopa)", price: 15.95, chefPick: true },
  { id: "m9", category: "Fideos de Huevo", name: "M9 Mì xào giòn đồbiển", description: "Fideos de huevo fritos con mariscos (sin sopa)", price: 15.95 },
  { id: "m10", category: "Fideos de Huevo", name: "M10 Mì xào giòn tôm, xá xíu", description: "Fideos de huevo fritos con camarones y cerdo a la barbacoa", price: 15.95 },
  { id: "m11", category: "Fideos de Huevo", name: "M11 Mì xào giòn tôm", description: "Fideos de huevo fritos con camarones", price: 15.95 },

  // Cơm - Platos de arroz
  { id: "c1", category: "Arroz", name: "C1 Cơm Sườn", description: "Chuletas de cerdo a la parrilla. Servido con arroz blanco, lechuga, pepino, tomate y sopa.", price: 13.95 },
  { id: "c2", category: "Arroz", name: "C2 Cơm sườn chả", description: "Chuletas de cerdo a la parrilla y pastel de carne de cerdo", price: 14.95 },
  { id: "c3", category: "Arroz", name: "C3 Cơm sườn, chả, ốp la", description: "Chuletas de cerdo a la parrilla, pastel de carne de cerdo y huevo frito", price: 15.95, image: menuRice, chefPick: true },
  { id: "c4", category: "Arroz", name: "C4 Cơm Tôm Nướng", description: "Camarones a la parrilla", price: 14.95 },
  { id: "c5", category: "Arroz", name: "C5 Cơm gà nướng", description: "Pollo a la parrilla", price: 13.95 },
  { id: "c6", category: "Arroz", name: "C6 Cơm gà nướng, chả", description: "Pollo a la parrilla, pastel de carne", price: 14.95 },
  { id: "c7", category: "Arroz", name: "C7 Cơm bò nướng", description: "Carne de res a la parrilla", price: 13.95 },
  { id: "c8", category: "Arroz", name: "C8 Cơm bò nướng, chả", description: "Carne de res a la parrilla, pastel de carne", price: 14.95 },
  { id: "c9", category: "Arroz", name: "C9 Cơm thịt heo nướng", description: "Cerdo a la parrilla", price: 13.95 },
  { id: "c10", category: "Arroz", name: "C10 Cơm thịt heo nướng, chả", description: "Cerdo a la parrilla, pastel de carne", price: 14.95 },
  { id: "c11", category: "Arroz", name: "C11 Cơm sườn, tôm nướng", description: "Chuleta de cerdo a la parrilla, brochetas de camarones", price: 16.95 },
  { id: "c12", category: "Arroz", name: "C12 Cơm bò lúc lắc", description: "Carne de res salteada y temblorosa", price: 15.95 },

  // Bún - Fideos en ensalada
  { id: "b1", category: "Bún (Ensalada)", name: "B1 Bún thịt nướng", description: "Cerdo a la parrilla. Servido con fideos, lechuga, brotes de soja, pepino, zanahoria y menta.", price: 13.95, image: menuBun },
  { id: "b2", category: "Bún (Ensalada)", name: "B2 Bún thịt nướng, chả giò", description: "Cerdo a la parrilla y rollo de huevo crujiente", price: 14.95 },
  { id: "b3", category: "Bún (Ensalada)", name: "B3 Bún chả giò", description: "Rollitos de huevo crujientes", price: 13.95 },
  { id: "b4", category: "Bún (Ensalada)", name: "B4 Bún tôm nướng", description: "Brochetas de camarones a la parrilla", price: 14.95 },
  { id: "b5", category: "Bún (Ensalada)", name: "B5 Bún tôm nướng, chả giò", description: "Brochetas de camarones a la parrilla y rollo de huevo", price: 15.95 },
  { id: "b6", category: "Bún (Ensalada)", name: "B6 Bún gà nướng", description: "Pollo a la parrilla", price: 13.95 },
  { id: "b7", category: "Bún (Ensalada)", name: "B7 Bún gà nướng, chả giò", description: "Rollito de pollo y huevo a la parrilla", price: 14.95 },
  { id: "b8", category: "Bún (Ensalada)", name: "B8 Bún bò nướng", description: "Carne de res a la parrilla", price: 13.95 },
  { id: "b9", category: "Bún (Ensalada)", name: "B9 Bún bò nướng, chả giò", description: "Rollito de carne a la parrilla y huevo", price: 14.95 },
  { id: "b10", category: "Bún (Ensalada)", name: "B10 Bún nem nướng", description: "Albóndigas de carne de cerdo a la parrilla", price: 13.95 },
  { id: "b11", category: "Bún (Ensalada)", name: "B11 Bún nem nướng, chả giò", description: "Albóndigas de carne de cerdo a la parrilla y rollo de huevo", price: 14.95 },

  // Cơm Chiên - Arroz frito
  { id: "cc1", category: "Arroz Frito", name: "CC1 Cơm chiên dương châu", description: "Arroz frito combinado", price: 14.95 },
  { id: "cc2", category: "Arroz Frito", name: "CC2 Cơm chiên gà", description: "Arroz frito con pollo", price: 13.95 },
  { id: "cc3", category: "Arroz Frito", name: "CC3 Cơm chiên tôm", description: "Arroz frito con camarones", price: 14.95 },
  { id: "cc4", category: "Arroz Frito", name: "CC4 Cơm chiên gà cá mặn", description: "Pescado salado con arroz frito con pollo", price: 15.95 },
  { id: "cc5", category: "Arroz Frito", name: "CC5 Cơm chiên tôm cá mặn", description: "Pescado salado con arroz frito con camarón", price: 15.95 },
  { id: "cc6", category: "Arroz Frito", name: "CC6 Cơm chiên cá xíu", description: "Arroz frito con cerdo a la barbacoa", price: 13.95 },
  { id: "cc7", category: "Arroz Frito", name: "CC7 Cơm chiên tôm cari", description: "Arroz frito con camarones (sabor a curry)", price: 14.95 },
  { id: "cc8", category: "Arroz Frito", name: "CC8 Cơm chiên gà cari", description: "Arroz frito con pollo (sabor a curry)", price: 14.95 },
  { id: "cc9", category: "Arroz Frito", name: "CC9 Cơm chiên tôm thái lan", description: "Arroz frito con camarones (estilo tailandés)", price: 15.95 },
  { id: "cc10", category: "Arroz Frito", name: "CC10 Cơm chiên gà thái lan", description: "Arroz frito con pollo (estilo tailandés)", price: 14.95 },
  { id: "cc11", category: "Arroz Frito", name: "CC11 Cơm chiên bò", description: "Arroz frito con carne", price: 14.95 },
  { id: "cc12", category: "Arroz Frito", name: "CC12 Cơm gà Asador Chiên", description: "Pollo asado con arroz frito", price: 15.95 },

  // Chay - Vegetarian
  { id: "v1", category: "Vegetariano", name: "V1 Gỏi cuốn chay", description: "Rollitos de primavera frescos vegetarianos", price: 6.95 },
  { id: "v2", category: "Vegetariano", name: "V2 Tàu hủ chiên", description: "Tofu frito", price: 6.95 },
  { id: "v3", category: "Vegetariano", name: "V3 Súp chay", description: "Sopa vegetariana (caldo de pollo)", price: 6.95 },
  { id: "v4", category: "Vegetariano", name: "V4 Phở chay", description: "Pho vegetariano (caldo de res o caldo de verduras)", price: "L $14.95 / XL 15.95" },
  { id: "v5", category: "Vegetariano", name: "V5 Hủ tiếu chay", description: "Sopa vegetariana de fideos de arroz (caldo de pollo)", price: 14.95 },
  { id: "v6", category: "Vegetariano", name: "V6 Bún chay", description: "Fideos vegetarianos en una ensaladera", price: 15.95 },
  { id: "v7", category: "Vegetariano", name: "V7 Vamos chay", description: "Plato de arroz vegetariano", price: 13.95 },
  { id: "v8", category: "Vegetariano", name: "V8 Mì chay", description: "Sopa vegetariana de fideos con huevo (caldo de pollo)", price: 14.95 },
  { id: "v9", category: "Vegetariano", name: "V9 Cơm chiên chay", description: "Arroz frito vegetariano", price: 13.95 },
  { id: "v10", category: "Vegetariano", name: "V10 Mì xào giòn chay", description: "Fideos vegetarianos salteados (sin sopa)", price: 15.95 },

  // Thức uống - Bebidas
  { id: "n1", category: "Bebidas", name: "N1 Cafe đen đá", description: "Café helado vietnamita", price: 4.95 },
  { id: "n2", category: "Bebidas", name: "N2 cafe sữa đá", description: "Café helado con leche condensada", price: 4.95 },
  { id: "n3", category: "Bebidas", name: "N3 Cafe sữa nóng", description: "Café caliente con leche condensada", price: 4.95 },
  { id: "n4", category: "Bebidas", name: "N4 Nước trái vải", description: "Bebida de lichi (lata)", price: 3.95 },
  { id: "n5", category: "Bebidas", name: "N5 Nước xoài", description: "Bebida de mango (lata)", price: 3.95 },
  { id: "n6", category: "Bebidas", name: "N6 Sữa đậu nành", description: "Leche de soja (lata)", price: 3.95 },
  { id: "n7", category: "Bebidas", name: "N7 Nước đào", description: "Bebida de melocotón (lata)", price: 3.95 },
  { id: "n8", category: "Bebidas", name: "N8 Nước dừa", description: "Jugo de coco", price: 4.95 },
  { id: "n9", category: "Bebidas", name: "N9 Trà đá", description: "Té helado", price: 1.50 },
  { id: "n10", category: "Bebidas", name: "N10 Trà nóng", description: "Té caliente", price: 4.95 },
  { id: "n11", category: "Bebidas", name: "N11 Té tailandés", description: "Thai Tea refrescante", price: 4.95 },
  { id: "n12", category: "Bebidas", name: "N12 nước ngọt", description: "Refresco (Pepsi, Sprite, Sunkist)", price: 1.50 },

  // Extras
  { id: "e1", category: "Extras", name: "Tái", description: "Carne cruda", price: 5.00 },
  { id: "e2", category: "Extras", name: "Nombre", description: "Filete de falda bien cocido", price: 5.00 },
  { id: "e3", category: "Extras", name: "Gân", description: "Tendón", price: 5.00 },
  { id: "e4", category: "Extras", name: "Sách", description: "Callos", price: 5.00 },
  { id: "e5", category: "Extras", name: "Bò Viên", description: "Albóndiga de Res", price: 5.00 },
  { id: "e6", category: "Extras", name: "Hủ tiếu", description: "Fideos", price: 5.00 },
  { id: "e7", category: "Extras", name: "Gà nướng", description: "Pollo asado (1)", price: 5.50 },
  { id: "e8", category: "Extras", name: "Sườn", description: "Chuletas de cerdo a la parrilla (1)", price: 5.50 },
  { id: "e9", category: "Extras", name: "Bò", description: "Carne a la parrilla (1)", price: 5.50 },
  { id: "e10", category: "Extras", name: "Thịt nướng", description: "Cerdo asado (1)", price: 5.50 },
  { id: "e11", category: "Extras", name: "Chả", description: "Pastel de carne de cerdo (1)", price: 2.50 },
  { id: "e12", category: "Extras", name: "Ốp la", description: "Huevo con el lado soleado hacia arriba (1)", price: 2.50 },
  { id: "e13", category: "Extras", name: "Nem nướng", description: "Albóndigas de cerdo", price: 3.50 },
  { id: "e14", category: "Extras", name: "Tôm nướng", description: "Camarones a la parrilla", price: 3.50 },
  { id: "e15", category: "Extras", name: "Cơm trắng", description: "Arroz blanco al vapor", price: 2.50 },
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
  "Extras",
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
  const gallery = [heroPho, menuSpringrolls, galleryInterior, chefTeam, menuBun, menuRice];

  const hero = useSectionInView();
  const menu = useSectionInView();
  const gallerySection = useSectionInView();
  const reservation = useSectionInView();

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
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-xs font-medium text-primary border border-primary/20">
                <Info className="h-4 w-4" />
                <span>Por favor, informe a su camarero sobre cualquier alergia alimentaria.</span>
              </div>
            </div>

            <Tabs value={activeCat} onValueChange={(v) => setActiveCat(v as MenuCategory)} className="w-full">
              <div className="flex justify-center mb-10 overflow-x-auto pb-4 scrollbar-hide">
                <TabsList className="bg-muted/50 p-1 rounded-full h-auto flex-nowrap shrink-0">
                  {CATEGORIES.map((cat) => (
                    <TabsTrigger key={cat} value={cat} className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap">
                      {cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenu.map((item) => (
                  <Card key={item.id} className="group p-4 flex flex-col gap-4 bg-background hover:shadow-lg transition-all border shadow-sm rounded-2xl">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="font-bold text-sm md:text-base leading-tight">{item.name}</h3>
                          <span className="font-bold text-primary whitespace-nowrap text-sm">{formatPrice(item.price)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
                      </div>
                      {item.image && (
                        <div className="h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-muted border">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                      )}
                    </div>
                    {item.chefPick && (
                      <div className="mt-auto pt-2 border-t border-dashed flex items-center gap-1.5 text-[10px] font-bold uppercase text-secondary">
                        <Star className="h-3 w-3 fill-secondary" /> Especialidad del Chef
                      </div>
                    )}
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
              <p className="mt-6 text-background/70 leading-relaxed">Disfruta de la experiencia completa en nuestro local. Pho humeante y el mejor servicio.</p>
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
            <p className="mt-2 text-sm text-muted-foreground">© 2026 Authentic Vietnamese Cuisine.</p>
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
