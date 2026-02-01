import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ChevronLeft, Info, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MenuCategory =
  | "Appetizers"
  | "Soup"
  | "Pho"
  | "Rice Noodles"
  | "Egg Noodles"
  | "Rice Platters"
  | "Bún (Salad)"
  | "Fried Rice"
  | "Vegetarian"
  | "Drinks"
  | "Extras";

type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: string | number;
};

const MENU_DATA: MenuItem[] = [
  // Khai Vị - Appetizers
  { id: "a1", category: "Appetizers", name: "A1 Chả Giò (2)", description: "Crispy Vietnamese pork egg rolls", price: 6.95 },
  { id: "a2", category: "Appetizers", name: "A2 Chả Giò Tôm (4)", description: "Crispy shrimp egg rolls", price: 7.95 },
  { id: "a3", category: "Appetizers", name: "A3 Gỏi cuốn (2)", description: "Fresh shrimp and pork spring rolls", price: 6.95 },
  { id: "a4", category: "Appetizers", name: "A4 Tôm tàu hủ Ky", description: "Shrimp wrapped in bean curd", price: 7.95 },
  { id: "a5", category: "Appetizers", name: "A5 Cánh Gà Chiên (6)", description: "Fried chicken wings", price: 8.95 },
  { id: "a6", category: "Appetizers", name: "A6 Nem nướng (2 skewers)", description: "Grilled pork meatballs", price: 7.95 },
  { id: "a7", category: "Appetizers", name: "A7 Pot Stickers (6)", description: "Chicken or Pork. A) Steamed B) Fried", price: 6.95 },

  // Súp - Soup
  { id: "s1", category: "Soup", name: "S1 Súp Hoành thánh", description: "Wonton soup", price: 5.95 },
  { id: "s2", category: "Soup", name: "S2 Súp bò viên", description: "Beef meatball soup", price: 5.95 },
  { id: "s3", category: "Soup", name: "S3 Súp Gà", description: "Shredded chicken soup", price: 5.95 },

  // Phở - Pho
  { id: "p1", category: "Pho", name: "P1 Phở Đặc Biệt", description: "Special Pho with rare beef, well-done flank, tendon, tripe, and beef meatballs. Served with bean sprouts, jalapeño, and lime.", price: "L $14.95 / XL $15.95" },
  { id: "p2", category: "Pho", name: "P2 Phở Tái", description: "Rare beef Pho", price: "L $13.95 / XL $14.95" },
  { id: "p3", category: "Pho", name: "P3 Phở tái bò viên", description: "Rare beef and beef meatball Pho", price: "L $13.95 / XL $14.95" },
  { id: "p4", category: "Pho", name: "P4 Phở Tái Nạm", description: "Rare beef and brisket Pho", price: "L $13.95 / XL $14.95" },
  { id: "p5", category: "Pho", name: "P5 Phở Bò Viên", description: "Beef meatball Pho", price: "L $13.95 / XL $14.95" },
  { id: "p6", category: "Pho", name: "P6 Phở Gà", description: "Chicken Pho", price: "L $13.95 / XL $14.95" },
  { id: "p7", category: "Pho", name: "P7 Phở Đồ biển", description: "Seafood Pho", price: "L $13.95 / XL $14.95" },
  { id: "p8", category: "Pho", name: "P8 Phở nạm", description: "Brisket Pho", price: "L $13.95 / XL $14.95" },
  { id: "p9", category: "Pho", name: "P9 Phở đặc biệt thái lan", description: "Thai style special Pho with rare beef, well-done flank, tendon, tripe, and meatballs.", price: "L $14.95 / XL $15.95" },
  { id: "p10", category: "Pho", name: "P10 PhỞ TÔM", description: "Shrimp Pho", price: "L $13.95 / XL $14.95" },

  // Hủ Tiếu - Rice Noodles
  { id: "h1", category: "Rice Noodles", name: "H1 Hủ tiếu thập cẩm", description: "Rice noodle combination soup. Chicken broth.", price: 14.95 },
  { id: "h2", category: "Rice Noodles", name: "H2 Hủ tiếu đồ biển", description: "Seafood rice noodle soup", price: 13.95 },
  { id: "h3", category: "Rice Noodles", name: "H3 Hủ tiếu tôm", description: "Shrimp rice noodle soup", price: 12.95 },
  { id: "h4", category: "Rice Noodles", name: "H4 Hủ tiếu tôm viên, cá viên", description: "Shrimp and fish ball rice noodle soup", price: 12.95 },
  { id: "h5", category: "Rice Noodles", name: "H5 Hủ tiếu gà", description: "Shredded chicken rice noodle soup", price: 12.95 },
  { id: "h6", category: "Rice Noodles", name: "H6 Hủ tiếu xá xíu", description: "BBQ pork rice noodle soup", price: 12.95 },

  // Mì - Egg Noodles
  { id: "m1", category: "Egg Noodles", name: "M1 Mì thập cẩm", description: "Combination yellow egg noodle soup. Chicken broth.", price: 14.95 },
  { id: "m2", category: "Egg Noodles", name: "M2 Mì đồ biển", description: "Seafood egg noodle soup", price: 13.95 },
  { id: "m3", category: "Egg Noodles", name: "M3 Mi tôm", description: "Shrimp egg noodle soup", price: 13.95 },
  { id: "m4", category: "Egg Noodles", name: "M4 Mì tôm viên, cá viên", description: "Shrimp ball, fish ball egg noodle soup", price: 13.95 },
  { id: "m5", category: "Egg Noodles", name: "M5 Mi gá", description: "Shredded chicken egg noodle soup", price: 13.95 },
  { id: "m6", category: "Egg Noodles", name: "M6 Mì hoành thánh", description: "Wonton egg noodle soup", price: 13.95 },
  { id: "m7", category: "Egg Noodles", name: "M7 Mì xá xíu", description: "BBQ pork egg noodle soup", price: 13.95 },
  { id: "m8", category: "Egg Noodles", name: "Mì xào giòn thập cẩm", description: "Stir-fried combination egg noodles (no soup)", price: 15.95 },
  { id: "m9", category: "Egg Noodles", name: "M9 Mì xào giòn đồbiển", description: "Seafood fried egg noodles (no soup)", price: 15.95 },
  { id: "m10", category: "Egg Noodles", name: "M10 Mì xào giòn tôm, xá xíu", description: "Shrimp and BBQ pork fried egg noodles", price: 15.95 },
  { id: "m11", category: "Egg Noodles", name: "M11 Mì xào giòn tôm", description: "Shrimp fried egg noodles", price: 15.95 },

  // Cơm - Rice platters
  { id: "c1", category: "Rice Platters", name: "C1 Cơm Sườn", description: "Grilled pork chops. Served with white rice, lettuce, cucumber, tomato, and soup.", price: 13.95 },
  { id: "c2", category: "Rice Platters", name: "C2 Cơm sườn chả", description: "Grilled pork chops and pork meatloaf", price: 14.95 },
  { id: "c3", category: "Rice Platters", name: "C3 Cơm sườn, chả, ốp la", description: "Grilled pork chops, pork meatloaf and fried egg", price: 15.95 },
  { id: "c4", category: "Rice Platters", name: "C4 Cơm Tôm Nướng", description: "Grilled shrimp", price: 14.95 },
  { id: "c5", category: "Rice Platters", name: "C5 Cơm gà nướng", description: "Grilled chicken", price: 13.95 },
  { id: "c6", category: "Rice Platters", name: "C6 Cơm gà nướng, chả", description: "Grilled chicken, meatloaf", price: 14.95 },
  { id: "c7", category: "Rice Platters", name: "C7 Cơm bò nướng", description: "Grilled beef", price: 13.95 },
  { id: "c8", category: "Rice Platters", name: "C8 Cơm bò nướng, chả", description: "Grilled beef, meatloaf", price: 14.95 },
  { id: "c9", category: "Rice Platters", name: "C9 Cơm thịt heo nướng", description: "Grilled pork", price: 13.95 },
  { id: "c10", category: "Rice Platters", name: "C10 Cơm thịt heo nướng, chả", description: "Grilled pork, meatloaf", price: 14.95 },
  { id: "c11", category: "Rice Platters", name: "C11 Cơm sườn, tôm nướng", description: "Grilled pork chop, shrimp skewers", price: 16.95 },
  { id: "c12", category: "Rice Platters", name: "C12 Cơm bò lúc lắc", description: "Stir-fried shaking beef", price: 15.95 },

  // Bún - Salad noodles
  { id: "b1", category: "Bún (Salad)", name: "B1 Bún thịt nướng", description: "Grilled pork. Served with noodles, lettuce, bean sprouts, cucumber, carrot, and mint.", price: 13.95 },
  { id: "b2", category: "Bún (Salad)", name: "B2 Bún thịt nướng, chả giò", description: "Grilled pork and crispy egg roll", price: 14.95 },
  { id: "b3", category: "Bún (Salad)", name: "B3 Bún chả giò", description: "Crispy egg rolls", price: 13.95 },
  { id: "b4", category: "Bún (Salad)", name: "B4 Bún tôm nướng", description: "Grilled shrimp skewers", price: 14.95 },
  { id: "b5", category: "Bún (Salad)", name: "B5 Bún tôm nướng, chả giò", description: "Grilled shrimp skewers and egg roll", price: 15.95 },
  { id: "b6", category: "Bún (Salad)", name: "B6 Bún gà nướng", description: "Grilled chicken", price: 13.95 },
  { id: "b7", category: "Bún (Salad)", name: "B7 Bún gà nướng, chả giò", description: "Grilled chicken and egg roll", price: 14.95 },
  { id: "b8", category: "Bún (Salad)", name: "B8 Bún bò nướng", description: "Grilled beef", price: 13.95 },
  { id: "b9", category: "Bún (Salad)", name: "B9 Bún bò nướng, chả giò", description: "Grilled beef and egg roll", price: 14.95 },
  { id: "b10", category: "Bún (Salad)", name: "B10 Bún nem nướng", description: "Grilled pork meatballs", price: 13.95 },
  { id: "b11", category: "Bún (Salad)", name: "B11 Bún nem nướng, chả giò", description: "Grilled pork meatballs and egg roll", price: 14.95 },

  // Cơm Chiên - Fried Rice
  { id: "cc1", category: "Fried Rice", name: "CC1 Cơm chiên dương châu", description: "Combination fried rice", price: 14.95 },
  { id: "cc2", category: "Fried Rice", name: "CC2 Cơm chiên gà", description: "Chicken fried rice", price: 13.95 },
  { id: "cc3", category: "Fried Rice", name: "CC3 Cơm chiên tôm", description: "Shrimp fried rice", price: 14.95 },
  { id: "cc4", category: "Fried Rice", name: "CC4 Cơm chiên gà cá mặn", description: "Salted fish with chicken fried rice", price: 15.95 },
  { id: "cc5", category: "Fried Rice", name: "CC5 Cơm chiên tôm cá mặn", description: "Salted fish with shrimp fried rice", price: 15.95 },
  { id: "cc6", category: "Fried Rice", name: "CC6 Cơm chiên cá xíu", description: "BBQ pork fried rice", price: 13.95 },
  { id: "cc7", category: "Fried Rice", name: "CC7 Cơm chiên tôm cari", description: "Shrimp fried rice (curry flavor)", price: 14.95 },
  { id: "cc8", category: "Fried Rice", name: "CC8 Cơm chiên gà cari", description: "Chicken fried rice (curry flavor)", price: 14.95 },
  { id: "cc9", category: "Fried Rice", name: "CC9 Cơm chiên tôm thái lan", description: "Shrimp fried rice (Thai style)", price: 15.95 },
  { id: "cc10", category: "Fried Rice", name: "CC10 Cơm chiên gà thái lan", description: "Chicken fried rice (Thai style)", price: 14.95 },
  { id: "cc11", category: "Fried Rice", name: "CC11 Cơm chiên bò", description: "Beef fried rice", price: 14.95 },
  { id: "cc12", category: "Fried Rice", name: "CC12 Cơm gà Asador Chiên", description: "Roasted chicken with fried rice", price: 15.95 },

  // Chay - Vegetarian
  { id: "v1", category: "Vegetarian", name: "V1 Gỏi cuốn chay", description: "Vegetarian fresh spring rolls", price: 6.95 },
  { id: "v2", category: "Vegetarian", name: "V2 Tàu hủ chiên", description: "Fried tofu", price: 6.95 },
  { id: "v3", category: "Vegetarian", name: "V3 Súp chay", description: "Vegetarian soup (chicken broth)", price: 6.95 },
  { id: "v4", category: "Vegetarian", name: "V4 Phở chay", description: "Vegetarian Pho (beef or veggie broth)", price: "L $14.95 / XL 15.95" },
  { id: "v5", category: "Vegetarian", name: "V5 Hủ tiếu chay", description: "Vegetarian rice noodle soup (chicken broth)", price: 14.95 },
  { id: "v6", category: "Vegetarian", name: "V6 Bún chay", description: "Vegetarian noodles in a salad bowl", price: 15.95 },
  { id: "v7", category: "Vegetarian", name: "V7 Vamos chay", description: "Vegetarian rice platter", price: 13.95 },
  { id: "v8", category: "Vegetarian", name: "V8 Mì chay", description: "Vegetarian egg noodle soup (chicken broth)", price: 14.95 },
  { id: "v9", category: "Vegetarian", name: "V9 Cơm chiên chay", description: "Vegetarian fried rice", price: 13.95 },
  { id: "v10", category: "Vegetarian", name: "V10 Mì xào giòn chay", description: "Vegetarian stir-fried noodles (no soup)", price: 15.95 },

  // Thức uống - Drinks
  { id: "n1", category: "Drinks", name: "N1 Cafe đen đá", description: "Vietnamese iced black coffee", price: 4.95 },
  { id: "n2", category: "Drinks", name: "N2 cafe sữa đá", description: "Vietnamese iced coffee with condensed milk", price: 4.95 },
  { id: "n3", category: "Drinks", name: "N3 Cafe sữa nóng", description: "Vietnamese hot coffee with condensed milk", price: 4.95 },
  { id: "n4", category: "Drinks", name: "N4 Nước trái vải", description: "Lychee drink (can)", price: 3.95 },
  { id: "n5", category: "Drinks", name: "N5 Nước xoài", description: "Mango drink (can)", price: 3.95 },
  { id: "n6", category: "Drinks", name: "N6 Sữa đậu nành", description: "Soy milk (can)", price: 3.95 },
  { id: "n7", category: "Drinks", name: "N7 Nước đào", description: "Peach drink (can)", price: 3.95 },
  { id: "n8", category: "Drinks", name: "N8 Nước dừa", description: "Coconut juice", price: 4.95 },
  { id: "n9", category: "Drinks", name: "N9 Trà đá", description: "Iced tea", price: 1.50 },
  { id: "n10", category: "Drinks", name: "N10 Trà nóng", description: "Hot tea", price: 4.95 },
  { id: "n11", category: "Drinks", name: "N11 Thai Tea", description: "Refreshing Thai Tea", price: 4.95 },
  { id: "n12", category: "Drinks", name: "N12 nước ngọt", description: "Soft drink (Pepsi, Sprite, Sunkist)", price: 1.50 },

  // Extras
  { id: "e1", category: "Extras", name: "Tái", description: "Rare beef", price: 5.00 },
  { id: "e2", category: "Extras", name: "Nạm", description: "Well-done flank", price: 5.00 },
  { id: "e3", category: "Extras", name: "Gân", description: "Tendon", price: 5.00 },
  { id: "e4", category: "Extras", name: "Sách", description: "Tripe", price: 5.00 },
  { id: "e5", category: "Extras", name: "Bò Viên", description: "Beef Meatball", price: 5.00 },
  { id: "e6", category: "Extras", name: "Hủ tiếu", description: "Rice Noodles", price: 5.00 },
  { id: "e7", category: "Extras", name: "Gà nướng", description: "Grilled chicken (1)", price: 5.50 },
  { id: "e8", category: "Extras", name: "Sườn", description: "Grilled pork chops (1)", price: 5.50 },
  { id: "e9", category: "Extras", name: "Bò", description: "Grilled beef (1)", price: 5.50 },
  { id: "e10", category: "Extras", name: "Thịt nướng", description: "Grilled pork (1)", price: 5.50 },
  { id: "e11", category: "Extras", name: "Chả", description: "Pork meatloaf (1)", price: 2.50 },
  { id: "e12", category: "Extras", name: "Ốp la", description: "Sunny side up egg (1)", price: 2.50 },
  { id: "e13", category: "Extras", name: "Nem nướng", description: "Pork meatballs", price: 3.50 },
  { id: "e14", category: "Extras", name: "Tôm nướng", description: "Grilled shrimp", price: 3.50 },
  { id: "e15", category: "Extras", name: "Cơm trắng", description: "Steamed white rice", price: 2.50 },
  { id: "e16", category: "Extras", name: "Bok Choi", description: "Fresh Bok Choi", price: 3.00 },
  { id: "e17", category: "Extras", name: "Mì", description: "Egg noodles", price: 3.00 },
  { id: "e18", category: "Extras", name: "Vegetables", description: "Extra vegetables", price: 3.50 },
];

const CATEGORIES: MenuCategory[] = [
  "Appetizers",
  "Soup",
  "Pho",
  "Rice Noodles",
  "Egg Noodles",
  "Rice Platters",
  "Bún (Salad)",
  "Fried Rice",
  "Vegetarian",
  "Drinks",
  "Extras",
];

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState<MenuCategory>("Appetizers");
  const filteredMenu = useMemo(() => MENU_DATA.filter((m) => m.category === activeCat), [activeCat]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/logo-pho.jpg" alt="Pho Viet Logo" className="h-10 w-10 object-contain rounded-lg bg-white shadow-lg transition-transform group-hover:scale-110" />
            <span className="font-serif text-xl font-bold">Back</span>
          </Link>
          <div className="text-right">
            <h1 className="font-serif text-2xl font-bold text-primary">Full Menu</h1>
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
            <h2 className="text-lg font-bold mb-1">Important Note</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Please inform your server of any food allergies before ordering.
              Our dishes are prepared with fresh ingredients daily.
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
            <p className="text-muted-foreground">This menu section will be available soon.</p>
          </div>
        )}
      </main>

      <footer className="py-12 px-4 md:px-6 border-t bg-card/30">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold">Pho Viet Restaurant • Authentic Flavor</p>
            <p className="mt-4 text-sm text-muted-foreground">Copyright © 2026 Pho Viet Restaurant - All rights reserved.</p>
            <p className="mt-2 text-primary font-bold">Thank you for visiting</p>
          </div>
      </footer>

      {/* Botón flotante de llamar */}
      <a
        href="tel:+13017455030"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-all hover:scale-110 active:scale-95 animate-bounce md:h-16 md:w-16"
        aria-label="Llamar a Pho Viet Restaurant"
      >
        <Phone className="h-6 w-6 md:h-7 md:w-7" />
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white ring-2 ring-background">
          1
        </span>
      </a>
    </div>
  );
}
