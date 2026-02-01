import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ChevronLeft, Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
};

const MENU_DATA: MenuItem[] = [
  // Khai Vị - Aperitivos
  { id: "a1", category: "Aperitivos", name: "A1 Chả Giò (2)", description: "Rollitos de huevo de cerdo crujientes vietnamitas", price: 6.95 },
  { id: "a2", category: "Aperitivos", name: "A2 Chả Giò Tôm (4)", description: "Rollitos de huevo con camarones crujientes", price: 7.95 },
  { id: "a3", category: "Aperitivos", name: "A3 Gỏi cuốn (2)", description: "Rollitos de primavera de camarones frescos y cerdo", price: 6.95 },
  { id: "a4", category: "Aperitivos", name: "A4 Tôm tàu hủ Ky", description: "Camarones envueltos en tofu", price: 7.95 },
  { id: "a5", category: "Aperitivos", name: "A5 Cánh Gà Chiên (6)", description: "Alitas de pollo fritas", price: 8.95 },
  { id: "a6", category: "Aperitivos", name: "A6 Nem nướng (2 brochetas)", description: "Albóndigas de cerdo a la parrilla", price: 7.95 },
  { id: "a7", category: "Aperitivos", name: "A7 Pot Stickers (6)", description: "Pollo o Cerdo. A) Al vapor B) Frito", price: 6.95 },

  // Súp - Sopa
  { id: "s1", category: "Sopa", name: "S1 Súp Hoành thánh", description: "Sopa wonton", price: 5.95 },
  { id: "s2", category: "Sopa", name: "S2 Súp bò viên", description: "Sopa de albóndigas de carne de res", price: 5.95 },
  { id: "s3", category: "Sopa", name: "S3 Súp Gà", description: "Sopa de pollo desmenuzado", price: 5.95 },

  // Phở - Pho
  { id: "p1", category: "Pho", name: "P1 Phở Đặc Biệt", description: "Pho especial con carne de res poco hecha, filete de falda bien hecho, tendón, callos y albóndigas de res. Servido con brotes de soja, jalapeño y lima.", price: "L $14.95 / XL $15.95" },
  { id: "p2", category: "Pho", name: "P2 Phở Tái", description: "Pho de carne poco hecha", price: "L $13.95 / XL $14.95" },
  { id: "p3", category: "Pho", name: "P3 Phở tái bò viên", description: "Pho de carne de res poco hecha y albóndigas de res", price: "L $13.95 / XL $14.95" },
  { id: "p4", category: "Pho", name: "P4 Phở Tái Nạm", description: "Pho de carne de res y pecho poco hecho", price: "L $13.95 / XL $14.95" },
  { id: "p5", category: "Pho", name: "P5 Phở Bò Viên", description: "Pho de albóndigas de ternera", price: "L $13.95 / XL $14.95" },
  { id: "p6", category: "Pho", name: "P6 Phở Gà", description: "Pho de pollo", price: "L $13.95 / XL $14.95" },
  { id: "p7", category: "Pho", name: "P7 Phở Đồ biển", description: "Pho de mariscos", price: "L $13.95 / XL $14.95" },
  { id: "p8", category: "Pho", name: "P8 Phở nạm", description: "Pho de pechuga", price: "L $13.95 / XL $14.95" },
  { id: "p9", category: "Pho", name: "P9 Phở đặc biệt thái lan", description: "Pho especial al estilo tailandés con carne de res poco hecha, filete de falda bien cocido, tendón, callos y albóndigas.", price: "L $14.95 / XL $15.95" },
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
  { id: "m8", category: "Fideos de Huevo", name: "Mì xào giòn thập cẩm", description: "Fideos de huevo combinados salteados (sin sopa)", price: 15.95 },
  { id: "m9", category: "Fideos de Huevo", name: "M9 Mì xào giòn đồbiển", description: "Fideos de huevo fritos con mariscos (sin sopa)", price: 15.95 },
  { id: "m10", category: "Fideos de Huevo", name: "M10 Mì xào giòn tôm, xá xíu", description: "Fideos de huevo fritos con camarones y cerdo a la barbacoa", price: 15.95 },
  { id: "m11", category: "Fideos de Huevo", name: "M11 Mì xào giòn tôm", description: "Fideos de huevo fritos con camarones", price: 15.95 },

  // Cơm - Platos de arroz
  { id: "c1", category: "Arroz", name: "C1 Cơm Sườn", description: "Chuletas de cerdo a la parrilla. Servido con arroz blanco, lechuga, pepino, tomate y sopa.", price: 13.95 },
  { id: "c2", category: "Arroz", name: "C2 Cơm sườn chả", description: "Chuletas de cerdo a la parrilla y pastel de carne de cerdo", price: 14.95 },
  { id: "c3", category: "Arroz", name: "C3 Cơm sườn, chả, ốp la", description: "Chuletas de cerdo a la parrilla, pastel de carne de cerdo y huevo frito", price: 15.95 },
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
  { id: "b1", category: "Bún (Ensalada)", name: "B1 Bún thịt nướng", description: "Cerdo a la parrilla. Servido con fideos, lechuga, brotes de soja, pepino, zanahoria y menta.", price: 13.95 },
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
  { id: "e16", category: "Extras", name: "Bok Choi", description: "Bok Choi fresco", price: 3.00 },
  { id: "e17", category: "Extras", name: "Mì", description: "Fideos al huevo", price: 3.00 },
  { id: "e18", category: "Extras", name: "Verduras", description: "Verduras adicionales", price: 3.50 },
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

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState<MenuCategory>("Aperitivos");
  const filteredMenu = useMemo(() => MENU_DATA.filter((m) => m.category === activeCat), [activeCat]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/logo-pho.jpg" alt="Pho Viet Logo" className="h-10 w-10 object-contain rounded-lg bg-white shadow-lg transition-transform group-hover:scale-110" />
            <span className="font-serif text-xl font-bold">Volver</span>
          </Link>
          <div className="text-right">
            <h1 className="font-serif text-2xl font-bold text-primary">Menú Completo</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Pho Viet Restaurant</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="mb-12 rounded-3xl bg-primary/5 border border-primary/10 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="h-16 w-16 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Info className="h-8 w-8" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold mb-1">Nota importante</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Por favor, informe a su camarero sobre cualquier alergia alimentaria antes de ordenar.
              Nuestros platos se preparan con ingredientes frescos diariamente.
            </p>
          </div>
        </div>

        <Tabs value={activeCat} onValueChange={(v) => setActiveCat(v as MenuCategory)} className="w-full">
          <div className="flex justify-start md:justify-center mb-12 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
            <TabsList className="bg-muted/50 p-1.5 rounded-full h-auto flex-nowrap shrink-0 border border-border">
              {CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-none border-none"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map((item) => (
              <Card key={item.id} className="group p-6 flex flex-col gap-4 bg-background hover:border-primary/50 transition-all border shadow-sm rounded-3xl">
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-bold text-base md:text-lg leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                      <span className="font-serif font-bold text-primary whitespace-nowrap text-base md:text-lg">
                        {typeof item.price === "number" ? `$${item.price.toFixed(2)}` : item.price}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Tabs>

        {filteredMenu.length === 0 && (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
            <p className="text-muted-foreground">Esta sección del menú estará disponible pronto.</p>
          </div>
        )}
      </main>

      <footer className="py-12 px-4 md:px-6 border-t bg-card/30">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold">Pho Viet Restaurant • Sabor Auténtico</p>
            <p className="mt-4 text-sm text-muted-foreground">Copyright © 2026 Pho Viet Restaurant - Todos los derechos reservados.</p>
            <p className="mt-2 text-primary font-bold">Gracias por su visita</p>
          </div>
      </footer>
    </div>
  );
}
