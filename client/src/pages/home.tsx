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
  | "Pho"
  | "Vermicelli"
  | "Rice Platters"
  | "Appetizers"
  | "Drinks";

type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: number;
  image?: string;
  chefPick?: boolean;
};

type Review = {
  id: string;
  name: string;
  text: string;
  rating: 4 | 5;
};

const MENU: MenuItem[] = [
  {
    id: "pho-dac-biet",
    category: "Pho",
    name: "Pho Dac Biet",
    description: "Caldo de res de cocción lenta, brisket, albóndigas y hierbas frescas.",
    price: 15.95,
    image: heroPho,
    chefPick: true,
  },
  {
    id: "pho-ga",
    category: "Pho",
    name: "Pho Ga",
    description: "Pollo jugoso, jengibre y limón; terminado con cebollín y cilantro.",
    price: 14.5,
  },
  {
    id: "bun-thit-nuong",
    category: "Vermicelli",
    name: "Bún Thịt Nướng",
    description: "Vermicelli con cerdo a la parrilla, hierbas, vegetales encurtidos y nuoc cham.",
    price: 16.25,
    image: menuBun,
    chefPick: true,
  },
  {
    id: "com-tam",
    category: "Rice Platters",
    name: "Cơm Tấm",
    description: "Arroz partido con cerdo a la parrilla, huevo y pickles — equilibrio perfecto.",
    price: 17.75,
    image: menuRice,
  },
  {
    id: "goi-cuon",
    category: "Appetizers",
    name: "Gỏi Cuốn",
    description: "Spring rolls frescos con camarón y salsa de maní (2 piezas).",
    price: 8.75,
    image: menuSpringrolls,
  },
  {
    id: "cha-gio",
    category: "Appetizers",
    name: "Chả Giò",
    description: "Rollitos crujientes de cerdo y verduras con hojas frescas.",
    price: 9.25,
  },
  {
    id: "ca-phe-sua-da",
    category: "Drinks",
    name: "Cà Phê Sữa Đá",
    description: "Café vietnamita con leche condensada — intenso y sedoso.",
    price: 5.75,
  },
  {
    id: "tra-dao",
    category: "Drinks",
    name: "Trà Đào",
    description: "Té helado de durazno, cítrico y refrescante.",
    price: 4.95,
  },
];

const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "María L.",
    text: "El caldo del pho tiene profundidad real. Se siente casero y premium a la vez.",
    rating: 5,
  },
  {
    id: "r2",
    name: "Daniel R.",
    text: "Servicio cálido, porciones perfectas y sabores súper frescos. Vuelvo seguro.",
    rating: 5,
  },
  {
    id: "r3",
    name: "Sofía G.",
    text: "Los spring rolls y el café vietnamita son obligatorios. Todo impecable.",
    rating: 4,
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function Stars({ rating, idPrefix }: { rating: number; idPrefix: string }) {
  return (
    <div className="flex items-center gap-1" data-testid={`stars-${idPrefix}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const on = i < rating;
        return (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              on
                ? "fill-secondary text-secondary"
                : "fill-transparent text-muted-foreground/35",
            )}
          />
        );
      })}
    </div>
  );
}

function useSectionInView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  return { ref, inView };
}

export default function Home() {
  const [activeCat, setActiveCat] = useState<MenuCategory>("Pho");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filteredMenu = useMemo(() => {
    return MENU.filter((m) => m.category === activeCat);
  }, [activeCat]);

  const chefPicks = useMemo(() => {
    return MENU.filter((m) => m.chefPick);
  }, []);

  const gallery = useMemo(() => {
    return [
      heroPho,
      menuSpringrolls,
      galleryInterior,
      chefTeam,
      menuBun,
      menuRice,
    ];
  }, []);

  const hero = useSectionInView();
  const story = useSectionInView();
  const menu = useSectionInView();
  const gallerySection = useSectionInView();
  const reservation = useSectionInView();
  const reviews = useSectionInView();

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        data-testid="link-skip"
      >
        Saltar al contenido
      </a>

      <header
        className="sticky top-0 z-40 border-b bg-background/72 backdrop-blur supports-[backdrop-filter]:bg-background/56"
        data-testid="header-nav"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <a
            href="#top"
            className="group flex items-center gap-2"
            data-testid="link-home"
          >
            <div
              className="grid h-9 w-9 place-items-center rounded-xl border bg-card shadow-sm"
              data-testid="logo-mark"
            >
              <span
                className="font-serif text-base font-semibold tracking-tight"
                data-testid="text-logo"
              >
                PV
              </span>
            </div>
            <div className="leading-tight">
              <div
                className="font-serif text-sm font-semibold tracking-tight"
                data-testid="text-brand"
              >
                Pho Viet
              </div>
              <div
                className="text-xs text-muted-foreground"
                data-testid="text-brand-sub"
              >
                Authentic Vietnamese Cuisine
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex" data-testid="nav-main">
            <a
              href="#menu"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              data-testid="link-menu"
            >
              Menú
            </a>
            <a
              href="#gallery"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              data-testid="link-gallery"
            >
              Galería
            </a>
            <a
              href="#reservations"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              data-testid="link-reservations"
            >
              Reservas
            </a>
            <a
              href="#reviews"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              data-testid="link-reviews"
            >
              Reseñas
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="hidden md:inline-flex"
              asChild
            >
              <a
                href="#reservations"
                data-testid="button-reservar-header"
                aria-label="Reservar mesa"
              >
                Reservar
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href="#menu" data-testid="button-vermenu-header">
                Ver Menú
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main id="main" data-testid="main-content">
        <section
          id="top"
          className="relative overflow-hidden"
          aria-label="Hero"
          data-testid="section-hero"
        >
          <div className="pv-hero-grid">
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute inset-0 pv-noise opacity-70" />
            </div>

            <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-2 md:px-6 md:py-18">
              <motion.div
                ref={hero.ref}
                initial="hidden"
                animate={hero.inView ? "show" : "hidden"}
                variants={SECTION_FADE}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="flex flex-col justify-center"
              >
                <div
                  className="inline-flex w-fit items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur"
                  data-testid="badge-hero"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  Cocina vietnamita auténtica
                </div>

                <h1
                  className="mt-5 font-serif text-4xl font-semibold tracking-tight md:text-5xl"
                  data-testid="text-hero-title"
                >
                  Pho Viet – Authentic Vietnamese Cuisine
                </h1>
                <p
                  className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg pv-text-balance"
                  data-testid="text-hero-subtitle"
                >
                  Sabores que conquistan desde el primer sorbo.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    asChild
                    className="shadow-md"
                    data-testid="button-vermenu-hero"
                  >
                    <a href="#menu">Ver Menú</a>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    className="shadow-md"
                    data-testid="button-reservar-hero"
                  >
                    <a href="#reservations">Reservar Mesa</a>
                  </Button>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <div data-testid="stat-rating">
                    <div className="flex items-center gap-2">
                      <Stars rating={5} idPrefix="hero" />
                      <span className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">4.8</span> en
                        Google
                      </span>
                    </div>
                  </div>
                  <div className="h-6 w-px bg-border" aria-hidden="true" />
                  <div className="text-sm text-muted-foreground" data-testid="stat-hours">
                    <span className="font-medium text-foreground">Abierto</span> ·
                    Lun–Dom 11:00–22:00
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                className="relative"
              >
                <div
                  className="relative overflow-hidden rounded-3xl border bg-card shadow-lg"
                  data-testid="img-hero-wrap"
                >
                  <img
                    src={heroPho}
                    alt="Bowl de pho con vapor"
                    className="h-[460px] w-full object-cover md:h-[540px]"
                    data-testid="img-hero"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-background/20 to-transparent"
                    aria-hidden="true"
                  />
                </div>

                <div
                  className="absolute -bottom-6 -left-4 hidden w-[70%] rounded-2xl border bg-background/85 p-4 shadow-lg backdrop-blur md:block"
                  data-testid="card-hero-float"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl bg-secondary/15 text-secondary">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                    <div>
                      <div
                        className="text-sm font-medium"
                        data-testid="text-hero-float-title"
                      >
                        Reservas rápidas
                      </div>
                      <div
                        className="mt-0.5 text-xs text-muted-foreground"
                        data-testid="text-hero-float-sub"
                      >
                        Confirmación en minutos. Sin complicaciones.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          className="mx-auto max-w-6xl px-4 py-14 md:px-6"
          aria-label="Historia"
          data-testid="section-story"
        >
          <motion.div
            ref={story.ref}
            initial="hidden"
            animate={story.inView ? "show" : "hidden"}
            variants={SECTION_FADE}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center"
          >
            <div>
              <h2
                className="font-serif text-3xl font-semibold tracking-tight"
                data-testid="text-story-title"
              >
                Cada plato cuenta una historia de Vietnam
              </h2>
              <p
                className="mt-4 text-base leading-relaxed text-muted-foreground"
                data-testid="text-story-body"
              >
                En Pho Viet celebramos la tradición con ingredientes frescos y
                técnicas de cocción paciente. Nuestro caldo se construye capa por
                capa — para que cada sorbo sea cálido, limpio y memorable.
              </p>
              <div className="mt-6 flex flex-wrap gap-3" data-testid="story-bullets">
                {[
                  "Hierbas frescas todos los días",
                  "Caldo de cocción lenta",
                  "Recetas familiares con toque moderno",
                ].map((t, i) => (
                  <div
                    key={t}
                    className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm shadow-sm"
                    data-testid={`pill-story-${i}`}
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/12 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="relative overflow-hidden rounded-3xl border bg-card shadow-lg"
                data-testid="img-chef-wrap"
              >
                <img
                  src={chefTeam}
                  alt="Chef preparando pho"
                  className="h-[420px] w-full object-cover"
                  data-testid="img-chef"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-secondary/10"
                  aria-hidden="true"
                />
              </div>
              <div
                className="absolute -right-3 -top-3 hidden rounded-2xl border bg-background/85 px-4 py-3 shadow-lg backdrop-blur md:block"
                data-testid="badge-story-float"
              >
                <div className="text-xs text-muted-foreground">Desde</div>
                <div className="font-serif text-lg font-semibold">2014</div>
              </div>
            </div>
          </motion.div>
        </section>

        <section
          id="menu"
          className="mx-auto max-w-6xl px-4 py-14 md:px-6"
          aria-label="Menú"
          data-testid="section-menu"
        >
          <motion.div
            ref={menu.ref}
            initial="hidden"
            animate={menu.inView ? "show" : "hidden"}
            variants={SECTION_FADE}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2
                  className="font-serif text-3xl font-semibold tracking-tight"
                  data-testid="text-menu-title"
                >
                  Menú
                </h2>
                <p
                  className="mt-2 max-w-2xl text-muted-foreground"
                  data-testid="text-menu-subtitle"
                >
                  Explora por categorías. Fotos, descripciones claras y precios a
                  la vista — listo para elegir.
                </p>
              </div>
              <a
                href="#reservations"
                className="inline-flex items-center gap-2 text-sm text-secondary hover:underline"
                data-testid="link-menu-to-reservations"
              >
                Reservar ahora <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-7">
              <Tabs
                value={activeCat}
                onValueChange={(v) => setActiveCat(v as MenuCategory)}
              >
                <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
                  {(
                    [
                      "Pho",
                      "Vermicelli",
                      "Rice Platters",
                      "Appetizers",
                      "Drinks",
                    ] as MenuCategory[]
                  ).map((cat) => (
                    <TabsTrigger
                      key={cat}
                      value={cat}
                      data-testid={`tab-menu-${cat}`}
                      className="rounded-full border bg-card px-4 py-2 text-sm shadow-sm transition-colors data-[state=active]:border-secondary/60 data-[state=active]:bg-secondary/12 data-[state=active]:text-foreground"
                    >
                      {cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredMenu.map((item) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden border bg-card shadow-sm transition hover:shadow-md"
                    data-testid={`card-menu-${item.id}`}
                  >
                    <div className="flex gap-4 p-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-2xl border bg-muted/30">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
                            data-testid={`img-menu-${item.id}`}
                          />
                        ) : (
                          <div
                            className="grid h-full w-full place-items-center text-xs text-muted-foreground"
                            data-testid={`img-menu-placeholder-${item.id}`}
                          >
                            Foto
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div
                              className="truncate font-medium"
                              data-testid={`text-menu-name-${item.id}`}
                            >
                              {item.name}
                            </div>
                            <div
                              className="mt-1 line-clamp-2 text-sm text-muted-foreground"
                              data-testid={`text-menu-desc-${item.id}`}
                            >
                              {item.description}
                            </div>
                          </div>
                          <div
                            className="shrink-0 rounded-full border bg-background px-3 py-1 text-sm shadow-sm"
                            data-testid={`text-menu-price-${item.id}`}
                          >
                            {money(item.price)}
                          </div>
                        </div>
                        {item.chefPick ? (
                          <div
                            className="mt-3 inline-flex items-center gap-2 rounded-full bg-secondary/12 px-3 py-1 text-xs text-secondary"
                            data-testid={`badge-chef-${item.id}`}
                          >
                            <Star className="h-3.5 w-3.5 fill-secondary" />
                            Plato del Chef
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-10">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <h3
                      className="font-serif text-2xl font-semibold tracking-tight"
                      data-testid="text-chef-title"
                    >
                      Platos del Chef
                    </h3>
                    <p
                      className="mt-2 text-sm text-muted-foreground"
                      data-testid="text-chef-sub"
                    >
                      Los favoritos de la casa — fotos grandes y antojo inmediato.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {chefPicks.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-3xl border bg-card shadow-md"
                      data-testid={`card-chef-${item.id}`}
                    >
                      <img
                        src={item.image ?? heroPho}
                        alt={item.name}
                        className="h-[260px] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                        data-testid={`img-chef-${item.id}`}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <div
                              className="font-serif text-xl font-semibold"
                              data-testid={`text-chef-name-${item.id}`}
                            >
                              {item.name}
                            </div>
                            <div
                              className="mt-1 text-sm text-muted-foreground"
                              data-testid={`text-chef-desc-${item.id}`}
                            >
                              {item.description}
                            </div>
                          </div>
                          <div
                            className="rounded-full border bg-background/80 px-3 py-1 text-sm shadow-sm backdrop-blur"
                            data-testid={`text-chef-price-${item.id}`}
                          >
                            {money(item.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section
          id="gallery"
          className="mx-auto max-w-6xl px-4 py-14 md:px-6"
          aria-label="Galería"
          data-testid="section-gallery"
        >
          <motion.div
            ref={gallerySection.ref}
            initial="hidden"
            animate={gallerySection.inView ? "show" : "hidden"}
            variants={SECTION_FADE}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2
                  className="font-serif text-3xl font-semibold tracking-tight"
                  data-testid="text-gallery-title"
                >
                  Galería
                </h2>
                <p
                  className="mt-2 text-muted-foreground"
                  data-testid="text-gallery-subtitle"
                >
                  Visual storytelling: platos, ambiente y momentos.
                </p>
              </div>
            </div>

            <div
              className="mt-7 columns-2 gap-4 md:columns-3"
              data-testid="grid-gallery"
            >
              {gallery.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightbox(src)}
                  className="group relative mb-4 w-full overflow-hidden rounded-3xl border bg-card shadow-sm transition hover:shadow-md"
                  data-testid={`button-gallery-${idx}`}
                  aria-label="Abrir imagen"
                >
                  <img
                    src={src}
                    alt={`Galería ${idx + 1}`}
                    className="w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                    data-testid={`img-gallery-${idx}`}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        <section
          id="reservations"
          className="mx-auto max-w-6xl px-4 py-14 md:px-6"
          aria-label="Reservaciones"
          data-testid="section-reservations"
        >
          <motion.div
            ref={reservation.ref}
            initial="hidden"
            animate={reservation.inView ? "show" : "hidden"}
            variants={SECTION_FADE}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start"
          >
            <div>
              <h2
                className="font-serif text-3xl font-semibold tracking-tight"
                data-testid="text-reservations-title"
              >
                Reservaciones
              </h2>
              <p
                className="mt-2 text-muted-foreground"
                data-testid="text-reservations-subtitle"
              >
                Flujo rápido: elige fecha, hora y número de personas.
              </p>

              <div
                className="mt-6 rounded-3xl border bg-card p-6 shadow-sm"
                data-testid="card-reservations"
              >
                <form
                  className="grid gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  data-testid="form-reservation"
                >
                  <div className="grid gap-2">
                    <Label htmlFor="name" data-testid="label-name">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      data-testid="input-name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone" data-testid="label-phone">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      placeholder="(555) 123-4567"
                      data-testid="input-phone"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="date" data-testid="label-date">
                        Fecha
                      </Label>
                      <Input id="date" type="date" data-testid="input-date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time" data-testid="label-time">
                        Hora
                      </Label>
                      <Input id="time" type="time" data-testid="input-time" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="party" data-testid="label-party">
                      Personas
                    </Label>
                    <Input
                      id="party"
                      type="number"
                      min={1}
                      max={14}
                      defaultValue={2}
                      data-testid="input-party"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes" data-testid="label-notes">
                      Notas
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Alergias, ocasión especial, etc."
                      data-testid="input-notes"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="mt-2 shadow-md"
                    data-testid="button-confirmar-reserva"
                  >
                    Confirmar reservación
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    className="shadow-md"
                    onClick={() => {
                      window.location.href = "tel:+15551234567";
                    }}
                    data-testid="button-llamar-reservar"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Llamar para reservar
                  </Button>

                  <div
                    className="text-xs text-muted-foreground"
                    data-testid="text-reservation-note"
                  >
                    * Demo: la reservación no se guarda (prototipo).
                  </div>
                </form>
              </div>
            </div>

            <div className="relative">
              <div
                className="rounded-3xl border bg-card p-6 shadow-sm"
                data-testid="card-reservation-side"
              >
                <div
                  className="text-sm text-muted-foreground"
                  data-testid="text-contact"
                >
                  Contacto
                </div>
                <div
                  className="mt-2 font-serif text-2xl font-semibold"
                  data-testid="text-contact-title"
                >
                  Una mesa lista, un pho humeante
                </div>
                <p
                  className="mt-3 text-sm leading-relaxed text-muted-foreground"
                  data-testid="text-contact-body"
                >
                  Para grupos grandes o eventos, escríbenos y te ayudamos a armar
                  una experiencia a medida.
                </p>
                <div className="mt-6 grid gap-3">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center justify-between rounded-2xl border bg-background px-4 py-3 text-sm shadow-sm transition hover:shadow-md"
                    data-testid="link-maps"
                  >
                    Ver ubicación
                    <ExternalLink className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
                  </a>
                  <a
                    href="mailto:reservas@phoviet.com"
                    className="group inline-flex items-center justify-between rounded-2xl border bg-background px-4 py-3 text-sm shadow-sm transition hover:shadow-md"
                    data-testid="link-email"
                  >
                    reservas@phoviet.com
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section
          id="reviews"
          className="mx-auto max-w-6xl px-4 py-14 md:px-6"
          aria-label="Testimoniales"
          data-testid="section-reviews"
        >
          <motion.div
            ref={reviews.ref}
            initial="hidden"
            animate={reviews.inView ? "show" : "hidden"}
            variants={SECTION_FADE}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2
                  className="font-serif text-3xl font-semibold tracking-tight"
                  data-testid="text-reviews-title"
                >
                  Testimoniales
                </h2>
                <p
                  className="mt-2 text-muted-foreground"
                  data-testid="text-reviews-subtitle"
                >
                  Reseñas estilo Google — estrellas doradas y confianza.
                </p>
              </div>
            </div>

            <div
              className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3"
              data-testid="grid-reviews"
            >
              {REVIEWS.map((r) => (
                <Card
                  key={r.id}
                  className="border bg-card p-6 shadow-sm"
                  data-testid={`card-review-${r.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="font-medium"
                      data-testid={`text-review-name-${r.id}`}
                    >
                      {r.name}
                    </div>
                    <Stars rating={r.rating} idPrefix={`review-${r.id}`} />
                  </div>
                  <p
                    className="mt-4 text-sm leading-relaxed text-muted-foreground"
                    data-testid={`text-review-body-${r.id}`}
                  >
                    “{r.text}”
                  </p>
                  <div
                    className="mt-5 text-xs text-muted-foreground"
                    data-testid={`text-review-source-${r.id}`}
                  >
                    Google Reviews (visual)
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>

        <footer
          className="border-t bg-[hsl(var(--foreground))] text-[hsl(var(--background))]"
          data-testid="footer"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3" data-testid="footer-brand">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
                  <span className="font-serif text-base font-semibold">PV</span>
                </div>
                <div>
                  <div className="font-serif text-lg font-semibold">Pho Viet</div>
                  <div className="text-sm opacity-80">Authentic Vietnamese Cuisine</div>
                </div>
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed opacity-85" data-testid="text-footer-desc">
                Una experiencia sofisticada pero acogedora: tradición, frescura e
                ingredientes naturales en cada bowl.
              </p>
            </div>

            <div>
              <div className="text-sm font-medium" data-testid="text-footer-links-title">Links</div>
              <div className="mt-4 grid gap-2 text-sm opacity-85" data-testid="list-footer-links">
                <a href="#menu" className="hover:opacity-100 hover:underline" data-testid="link-footer-menu">Menú</a>
                <a href="#gallery" className="hover:opacity-100 hover:underline" data-testid="link-footer-gallery">Galería</a>
                <a href="#reservations" className="hover:opacity-100 hover:underline" data-testid="link-footer-reservations">Reservas</a>
                <a href="#reviews" className="hover:opacity-100 hover:underline" data-testid="link-footer-reviews">Reseñas</a>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium" data-testid="text-footer-news-title">Newsletter</div>
              <p className="mt-4 text-sm opacity-85" data-testid="text-footer-news-body">
                Novedades, especiales del chef y eventos.
              </p>
              <form
                className="mt-4 flex gap-2"
                onSubmit={(e) => e.preventDefault()}
                data-testid="form-newsletter"
              >
                <Input
                  placeholder="Tu email"
                  className="h-10 bg-[hsl(var(--foreground))] text-[hsl(var(--background))] placeholder:text-[hsl(var(--background))]/60"
                  data-testid="input-newsletter"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className="h-10"
                  data-testid="button-newsletter"
                >
                  Unirme
                </Button>
              </form>

              <div className="mt-6 flex items-center gap-3" data-testid="footer-social">
                {[
                  { label: "Instagram", href: "https://instagram.com" },
                  { label: "Facebook", href: "https://facebook.com" },
                  { label: "TikTok", href: "https://tiktok.com" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--background))]/20 bg-[hsl(var(--foreground))] px-3 py-1 text-xs text-[hsl(var(--background))] opacity-85 transition hover:opacity-100"
                    data-testid={`link-social-${s.label.toLowerCase()}`}
                  >
                    {s.label}
                    <ArrowRight className="h-3.5 w-3.5 opacity-70" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[hsl(var(--background))]/10">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs opacity-75 md:flex-row md:items-center md:justify-between md:px-6">
              <div data-testid="text-footer-copy">© {new Date().getFullYear()} Pho Viet Restaurant</div>
              <div className="flex items-center gap-2" data-testid="text-footer-meta">
                <span>Hecho con ingredientes frescos</span>
                <span aria-hidden="true">·</span>
                <span>Vietnam vibes</span>
              </div>
            </div>
          </div>
        </footer>

        <Dialog open={!!lightbox} onOpenChange={(o) => setLightbox(o ? lightbox : null)}>
          <DialogContent className="max-w-4xl border bg-card p-0" data-testid="dialog-lightbox">
            <DialogHeader className="px-6 pt-6">
              <DialogTitle className="font-serif" data-testid="text-lightbox-title">
                Galería
              </DialogTitle>
            </DialogHeader>
            {lightbox ? (
              <div className="px-6 pb-6">
                <div className="overflow-hidden rounded-2xl border bg-muted/20" data-testid="img-lightbox-wrap">
                  <img
                    src={lightbox}
                    alt="Imagen ampliada"
                    className="max-h-[70vh] w-full object-contain"
                    data-testid="img-lightbox"
                  />
                </div>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
