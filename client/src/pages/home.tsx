import { useState, useMemo, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ExternalLink,
  Phone,
  Star,
  BookOpen,
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SECTION_FADE = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function useSectionInView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  return { ref, inView };
}

export default function Home() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const gallery = [heroPho, menuSpringrolls, galleryInterior, chefTeam, menuBun, menuRice];

  const hero = useSectionInView();
  const story = useSectionInView();
  const gallerySection = useSectionInView();
  const reservation = useSectionInView();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/72 backdrop-blur shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-pho.jpg" alt="Pho Viet Restaurant Logo" className="h-10 w-10 object-contain rounded-lg border bg-white shadow-sm" />
            <div className="leading-tight">
              <div className="font-serif text-sm font-bold tracking-tight">Pho Viet Restaurant</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/menu" className="hover:text-primary transition-colors">Menú</Link>
            <a href="#gallery" className="hover:text-primary transition-colors">Galería</a>
            <a href="#reservations" className="hover:text-primary transition-colors">Reservas</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex"><a href="tel:+15551234567">Llamar</a></Button>
            <Button size="sm" asChild><Link href="/menu">Ver Menú</Link></Button>
          </div>
        </div>
      </header>

      <main id="main">
        <section id="top" className="pv-hero-grid py-12 md:py-20 px-4 md:px-6">
          <motion.div ref={hero.ref} initial="hidden" animate={hero.inView ? "show" : "hidden"} variants={SECTION_FADE} className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="mt-6 font-serif text-4xl md:text-6xl font-bold leading-[1.1]">Sabores que conquistan desde el primer sorbo en Pho Viet Restaurant.</h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">Pho Viet Restaurant trae el alma de Vietnam a tu mesa con caldos de 12 horas y los ingredientes más frescos.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild><Link href="/menu">Ver Menú Completo</Link></Button>
                <Button variant="secondary" size="lg" asChild><a href="#reservations">Reservar Mesa</a></Button>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-secondary/20 rounded-[2rem] blur-3xl group-hover:bg-secondary/30 transition-colors" />
              <img src={heroPho} alt="Pho" className="relative rounded-[2rem] border shadow-2xl object-cover aspect-[4/5] w-full" />
            </div>
          </motion.div>
        </section>

        <section className="py-20 px-4 md:px-6 bg-card/30">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-8">
              <BookOpen className="h-10 w-10" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Explora nuestra carta</h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Hemos preparado una sección especial donde podrás consultar todos nuestros platos,
              especialidades y extras sin distracciones.
            </p>
            <Button size="lg" className="h-14 px-10 text-lg rounded-2xl shadow-xl" asChild>
              <Link href="/menu">Abrir Menú Completo</Link>
            </Button>
          </div>
        </section>

        <section id="reviews" className="py-20 px-4 md:px-6 bg-background">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={SECTION_FADE} className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Lo que dicen nuestros clientes</h2>
              <div className="mt-4 flex justify-center gap-1 text-secondary">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="mt-4 text-muted-foreground font-medium">98% recomendado (48 reseñas)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Stephen Brooks",
                  date: "Oct 3, 2025",
                  content: "Very good food and the server shay was very nice and helpful with recommending what to get since it was my first time!",
                  avatar: "SB",
                  stars: 5
                },
                {
                  name: "Merick Summers",
                  date: "Aug 6, 2023",
                  content: "Absolutely delicious! The dumplings were so good and the broth for our Pho was outstanding! You can tell they take pride in what they do.",
                  avatar: "MS",
                  stars: 5
                },
                {
                  name: "Jackie Conley",
                  date: "Feb 24, 2023",
                  content: "my family and I are regulars at this point. our waitress knows what we want every time and she is always on point!! love this place!",
                  avatar: "JC",
                  stars: 5
                },
                {
                  name: "Carrie Willison",
                  date: "Jan 27, 2023",
                  content: "Wonderful experience here! Food was delicious! Staff and customer service was 10/10!",
                  avatar: "CW",
                  stars: 5
                },
                {
                  name: "Gary Lescalleet",
                  date: "Feb 26, 2021",
                  content: "first time eating there. loved it",
                  avatar: "GL",
                  stars: 4
                },
                {
                  name: "Denny Seeds Sierra",
                  date: "Feb 5, 2021",
                  content: "First time going after a recommendation from a good friend, let's just say it won't be my LAST visit!",
                  avatar: "DS",
                  stars: 4
                },
                {
                  name: "Jenna Hoffman",
                  date: "Nov 28, 2020",
                  content: "We were blown away with the flavors of each dish. The soups were absolutely amazing. 10/10! We will definitely be back!",
                  avatar: "JH",
                  stars: 5
                },
                {
                  name: "Alejandro Sicardo",
                  date: "Oct 18, 2020",
                  content: "Very good food, service and prices great !!!",
                  avatar: "AS",
                  stars: 4
                },
                {
                  name: "Carol Watts",
                  date: "Sep 20, 2020",
                  content: "EXCELLENT FOOD AND SERVICE!!!!!",
                  avatar: "CW",
                  stars: 5
                }
              ].map((review, i) => (
                <Card key={i} className="p-6 bg-card border shadow-sm rounded-3xl hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs border border-primary/20">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{review.name}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{review.date}</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground italic">"{review.content}"</p>
                  <div className="mt-4 flex gap-1 text-secondary/60">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < review.stars ? "fill-current" : "opacity-30"}`} />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="gallery" className="py-20 px-4 md:px-6">
          <motion.div ref={gallerySection.ref} initial="hidden" animate={gallerySection.inView ? "show" : "hidden"} variants={SECTION_FADE} className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-12">Galería de Pho Viet Restaurant</h2>
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
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Contáctenos</h2>
              <p className="mt-6 text-background/70 leading-relaxed font-bold italic">¡Mejor aún, visítenos en persona!</p>
              <p className="mt-2 text-background/60 leading-relaxed text-sm">Amamos a nuestros clientes, así que no dudes en visitarnos durante el horario comercial normal.</p>
              
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0"><ExternalLink className="h-5 w-5 text-primary" /></div>
                  <div>
                    <div className="text-xs uppercase font-bold tracking-widest text-background/50 mb-1">Dirección</div>
                    <a href="https://maps.google.com/?q=1441+Wesel+Blvd,+Hagerstown,+MD+21740" target="_blank" rel="noreferrer" className="text-base font-medium hover:text-primary transition-colors">
                      1441 Wesel Blvd, Hagerstown, MD 21740, Estados Unidos
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0"><Phone className="h-5 w-5 text-primary" /></div>
                  <div>
                    <div className="text-xs uppercase font-bold tracking-widest text-background/50 mb-1">Llámanos</div>
                    <a href="tel:+13017455030" className="text-xl font-bold hover:text-primary transition-colors">(301) 745-5030</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0"><CalendarDays className="h-5 w-5 text-primary" /></div>
                  <div>
                    <div className="text-xs uppercase font-bold tracking-widest text-background/50 mb-1">Horas</div>
                    <p className="text-base font-medium">De 11 a 20 horas de domingo a lunes.</p>
                    <p className="text-sm text-secondary font-bold mt-1">Cerrado los martes.</p>
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

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mx-auto max-w-6xl mt-12 overflow-hidden rounded-[2rem] border-4 border-background shadow-2xl h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3080.354228956973!2d-77.7554!3d39.6433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c99307a68e8e77%3A0x7d9f7d4c8e8e8e77!2s1441%20Wesel%20Blvd%2C%20Hagerstown%2C%20MD%2021740!5e0!3m2!1ses!2sus!4v1706800000000!5m2!1ses!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Pho Viet Restaurant"
            ></iframe>
          </motion.div>
        </section>
      </main>

      <footer className="py-12 px-4 md:px-6 border-t bg-card/50">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="font-serif text-2xl font-bold">Pho Viet Restaurant</div>
            <p className="mt-2 text-sm text-muted-foreground">Copyright © 2026 Pho Viet Restaurant - Todos los derechos reservados.</p>
            <p className="mt-1 text-xs text-primary font-bold uppercase tracking-wider">Gracias por su visita</p>
          </div>
          <div className="flex gap-6 text-sm font-bold uppercase tracking-widest">
            <Link href="/menu" className="hover:text-primary">Menú</Link>
            <a href="#gallery" className="hover:text-primary">Galería</a>
            <a href="#reservations" className="hover:text-primary">Contacto</a>
          </div>
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

      <Dialog open={!!lightbox} onOpenChange={(o) => setLightbox(o ? lightbox : null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none">
          {lightbox && <img src={lightbox} className="w-full h-auto rounded-3xl" alt="Lightbox" />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
