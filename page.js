'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  Phone, MessageCircle, Menu, X, ChevronRight, ChevronUp, Leaf, Heart, Sparkles,
  Hand, Footprints, Flower2, Dumbbell, Bone, Brain, Wind, Circle, Palette, Sprout,
  MapPin, Mail, Clock, Award, Users, Home as HomeIcon, Star, ArrowRight, Calendar,
  Zap, Moon, Activity, Shield, CheckCircle2, Quote, Instagram, Facebook, Youtube, Linkedin,
  ShieldCheck, ThumbsUp, Handshake, Wallet, Building2, Sun,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const PHONE_PRIMARY = '+918851317276'
const PHONE_SECONDARY = '+918726523902'
const WHATSAPP = '918851317276'
const EMAIL = 'shashwatholistichealth@gmail.com'

const IMG = {
  hero: 'https://images.pexels.com/photos/3059892/pexels-photo-3059892.jpeg',
  therapist: 'https://images.pexels.com/photos/9463223/pexels-photo-9463223.jpeg',
  massage: 'https://images.pexels.com/photos/19641818/pexels-photo-19641818.jpeg',
  acupressure: 'https://images.pexels.com/photos/5240734/pexels-photo-5240734.jpeg',
  meditation: 'https://images.pexels.com/photos/14203457/pexels-photo-14203457.jpeg',
  wellness: 'https://images.pexels.com/photos/37719540/pexels-photo-37719540.jpeg',
  clinic: 'https://images.pexels.com/photos/37719545/pexels-photo-37719545.jpeg',
  nature: 'https://images.pexels.com/photos/32628972/pexels-photo-32628972.jpeg',
}

const services = [
  { icon: Sparkles, name: 'Drugless Therapy', desc: 'Complete healing without medicines or side effects.', duration: '60 min' },
  { icon: Hand, name: 'Acupressure Therapy', desc: 'Ancient pressure-point healing for pain and balance.', duration: '45 min' },
  { icon: Footprints, name: 'Reflexology Therapy', desc: 'Foot & hand reflex healing for whole body wellness.', duration: '45 min' },
  { icon: Flower2, name: 'Massage Therapy', desc: 'Therapeutic massage for muscle tension and stress.', duration: '60 min' },
  { icon: Dumbbell, name: 'Yoga Therapy', desc: 'Personalized yoga sessions for pain and flexibility.', duration: '60 min' },
  { icon: Bone, name: 'Chiro Therapy', desc: 'Gentle spine and joint alignment corrections.', duration: '30 min' },
  { icon: Brain, name: 'Meditation Therapy', desc: 'Guided meditation for mental peace and focus.', duration: '30 min' },
  { icon: Wind, name: 'Cupping Therapy', desc: 'Traditional cupping for detox and pain relief.', duration: '45 min' },
  { icon: Circle, name: 'Seed Therapy', desc: 'Sujok seed pressure therapy for chronic pain.', duration: '30 min' },
  { icon: Palette, name: 'Colour Therapy', desc: 'Chromotherapy for emotional and energy balance.', duration: '30 min' },
  { icon: Sprout, name: 'Naturopathy Therapy', desc: 'Natural lifestyle & diet-based holistic care.', duration: '60 min' },
]

const conditions = [
  'Back Pain', 'Neck Pain', 'Shoulder Pain', 'Knee Pain', 'Sciatica', 'Migraine',
  'Headache', 'Stress', 'Anxiety', 'Sleep Problems', 'Fatigue', 'Muscle Stiffness',
  'Frozen Shoulder', 'Lifestyle Disorders', 'Body Detox',
]

const whyUs = [
  { icon: Leaf, title: 'Natural Healing', desc: 'Pure therapies rooted in nature.' },
  { icon: Shield, title: 'No Surgery', desc: 'Non-invasive, gentle procedures.' },
  { icon: Sprout, title: 'No Medicines', desc: 'Zero side effects, 100% drug-free.' },
  { icon: Heart, title: 'Personalized Care', desc: 'Every plan tailored to you.' },
  { icon: HomeIcon, title: 'Home Visit', desc: 'Therapy at your doorstep.' },
  { icon: Award, title: 'Experienced Therapist', desc: '15+ years of hands-on healing.' },
  { icon: Sun, title: 'Relaxing Environment', desc: 'Calm, hygienic wellness space.' },
  { icon: Wallet, title: 'Affordable Care', desc: 'Premium care at fair prices.' },
  { icon: ThumbsUp, title: 'Trusted by Patients', desc: '2000+ satisfied wellness stories.' },
]

const benefits = [
  { icon: Activity, label: 'Pain Relief' },
  { icon: Wind, label: 'Stress Relief' },
  { icon: Moon, label: 'Better Sleep' },
  { icon: Heart, label: 'Blood Circulation' },
  { icon: Sprout, label: 'Body Detox' },
  { icon: Zap, label: 'Energy Boost' },
  { icon: Brain, label: 'Mental Wellness' },
  { icon: Dumbbell, label: 'Improved Flexibility' },
]

const testimonials = [
  { name: 'Priya Sharma', location: 'Borivali West', rating: 5, text: 'My chronic back pain vanished after 8 sessions with Jawahar sir. No medicines, just pure natural healing. Life-changing experience.' },
  { name: 'Rajesh Kulkarni', location: 'Kandivali', rating: 5, text: 'I struggled with migraines for years. The acupressure therapy at Shashwat Holistic Health has given me a new life. Highly recommend!' },
  { name: 'Anjali Mehta', location: 'Malad', rating: 5, text: 'Home visit service is a blessing. The therapist is punctual, professional, and truly caring. My frozen shoulder is 90% better.' },
  { name: 'Vikram Patel', location: 'Goregaon', rating: 5, text: 'Excellent reflexology sessions. My sleep and energy levels are dramatically improved. Genuinely holistic approach.' },
  { name: 'Sunita Iyer', location: 'Bhayandar', rating: 5, text: 'The yoga therapy plan designed for my sciatica worked wonders. Kind, knowledgeable, and effective. Best decision I made.' },
]

const faqs = [
  { q: 'What is Acupressure?', a: 'Acupressure is an ancient healing technique that applies gentle pressure on specific points on the body to relieve pain, reduce stress, and improve energy flow. It is completely safe and drug-free.' },
  { q: 'Is the treatment painful?', a: 'Not at all. Our therapies are gentle, relaxing, and comfortable. Some deep-tissue work may feel intense briefly, but it is never painful. Your comfort is our priority.' },
  { q: 'How many sessions are needed?', a: 'The number of sessions depends on your condition and body response. Most patients notice improvement within 4-6 sessions, while chronic issues may need 10-15 sessions.' },
  { q: 'Can I book home visits?', a: 'Yes! We offer home visit therapy across Mumbai. Simply book an appointment and our certified therapist will arrive with all required equipment at your convenience.' },
  { q: 'Do you use medicines?', a: 'No. Shashwat Holistic Health is a 100% drug-free wellness center. All our therapies are natural, non-invasive, and free from side effects.' },
  { q: 'Are the therapists qualified?', a: 'Absolutely. Our lead therapist Jawahar Singh Shakya is certified with 15+ years of experience in acupressure, reflexology, and naturopathy.' },
]

// ---------------- Reusable helpers ----------------

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.05 } }),
}

function Counter({ to, suffix = '', label, icon: Icon }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1500
    const startTime = performance.now()
    const tick = (t) => {
      const p = Math.min((t - startTime) / duration, 1)
      setValue(Math.floor(start + (to - start) * (1 - Math.pow(1 - p, 3))))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to])
  return (
    <div ref={ref} className="flex flex-col items-center text-center px-4 py-6 rounded-2xl glass shadow-soft">
      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mb-3 shadow-glow">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="font-serif text-4xl md:text-5xl font-bold text-primary">
        {value}{suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground mt-1">{label}</div>
    </div>
  )
}

function SectionTitle({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-12`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
          <Leaf className="w-3.5 h-3.5" /> {eyebrow}
        </div>
      )}
      <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base md:text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  )
}

// ---------------- Main Component ----------------

const App = () => {
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [showAppointmentPopup, setShowAppointmentPopup] = useState(false)
  const [popupShown, setPopupShown] = useState(false)
  const [loading, setLoading] = useState(true)
  const [testimonialIdx, setTestimonialIdx] = useState(0)

  const { scrollYProgress } = useScroll()
  const progressWidth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    setMounted(true)
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 500)
      if (!popupShown && window.scrollY > 1200) {
        setShowAppointmentPopup(true)
        setPopupShown(true)
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [popupShown])

  useEffect(() => {
    const i = setInterval(() => setTestimonialIdx((v) => (v + 1) % testimonials.length), 6000)
    return () => clearInterval(i)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Conditions', id: 'conditions' },
    { label: 'Home Visit', id: 'home-visit' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ]

  if (!mounted) return null

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gradient-hero"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
              <Leaf className="w-16 h-16 text-primary" />
            </motion.div>
            <div className="mt-6 font-serif text-2xl text-primary font-semibold">Shashwat Holistic Health</div>
            <div className="text-sm text-muted-foreground mt-1">Heal Naturally • Live Happily</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 gradient-gold z-[80] origin-left"
        style={{ scaleX: progressWidth }}
      />

      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg bg-white/80 border-b border-brand-100/60 shadow-sm">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-glow group-hover:scale-105 transition">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block leading-tight text-left">
              <div className="font-serif font-bold text-primary text-lg">Shashwat Holistic</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Health Mumbai</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-brand-50 rounded-lg transition"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={`tel:${PHONE_PRIMARY}`} className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
              <Phone className="w-4 h-4" /> {PHONE_PRIMARY.replace('+91', '+91 ')}
            </a>
            <Button onClick={() => scrollTo('book')} className="gradient-primary text-white shadow-glow hover:opacity-95 hidden sm:inline-flex">
              Book Appointment
            </Button>
            <button className="lg:hidden p-2 rounded-lg hover:bg-brand-50" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-brand-100 overflow-hidden"
            >
              <div className="container py-4 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="px-3 py-3 text-left rounded-lg hover:bg-brand-50 text-foreground/80 hover:text-primary font-medium"
                  >
                    {l.label}
                  </button>
                ))}
                <Button onClick={() => scrollTo('book')} className="gradient-primary text-white mt-2">Book Appointment</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============ HERO ============ */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.hero} alt="Peaceful meditation in nature" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        {/* floating decorative leaves */}
        <motion.div className="absolute top-24 right-10 opacity-30" animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity }}>
          <Leaf className="w-24 h-24 text-primary" />
        </motion.div>
        <motion.div className="absolute bottom-32 left-8 opacity-20" animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }} transition={{ duration: 10, repeat: Infinity }}>
          <Flower2 className="w-32 h-32 text-secondary" />
        </motion.div>

        <div className="container relative z-10 py-16 md:py-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-brand-200 text-primary text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
              Heal Naturally • Live Happily • Stay Healthy
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] text-foreground">
              Natural Healing for <span className="text-gradient-primary">Body, Mind</span> &amp; <span className="text-gradient-gold">Energy</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Experience drug-free holistic therapies for pain relief, stress management, better sleep and overall wellness — at our Borivali West center or in the comfort of your home across Mumbai.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => scrollTo('book')} size="lg" className="gradient-primary text-white shadow-glow hover:opacity-95 h-12 px-6 text-base">
                <Calendar className="w-5 h-5 mr-2" /> Book Appointment
              </Button>
              <a href={`tel:${PHONE_PRIMARY}`}>
                <Button size="lg" variant="outline" className="h-12 px-6 text-base border-primary text-primary hover:bg-primary hover:text-white">
                  <Phone className="w-5 h-5 mr-2" /> Call Now
                </Button>
              </a>
              <a href={`https://wa.me/${WHATSAPP}?text=Hi%20Shashwat%20Holistic%20Health%2C%20I%20would%20like%20to%20know%20more.`} target="_blank" rel="noreferrer">
                <Button size="lg" className="h-12 px-6 text-base bg-[#25D366] hover:bg-[#20BD5A] text-white">
                  <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
                </Button>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary" /> 100% Drug-Free</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary" /> Certified Therapist</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-secondary" /> Home Visits Mumbai</div>
            </div>
          </motion.div>

          {/* scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-primary"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-1">
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-2 bg-primary rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ COUNTERS ============ */}
      <section className="py-16 bg-gradient-to-b from-white to-brand-50">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Counter to={15} suffix="+" label="Years Experience" icon={Award} />
          <Counter to={2000} suffix="+" label="Happy Patients" icon={Users} />
          <Counter to={11} suffix="+" label="Therapies Offered" icon={Sparkles} />
          <Counter to={500} suffix="+" label="Home Visits" icon={HomeIcon} />
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="py-20 md:py-28 bg-white">
        <div className="container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-3xl gradient-gold opacity-20 blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-soft aspect-[4/5]">
              <img src={IMG.therapist} alt="Certified holistic therapist" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl px-5 py-4 shadow-soft border border-brand-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-serif font-bold text-primary text-xl">15+ Years</div>
                  <div className="text-xs text-muted-foreground">Certified Experience</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionTitle eyebrow="About Us" title="Where ancient wisdom meets modern wellness" center={false}
              subtitle="At Shashwat Holistic Health Mumbai, we believe true healing comes from within. Our drug-free therapies restore balance to your body, mind, and energy — helping you live a happier, healthier life." />

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Heart, title: 'Mission', desc: 'Deliver natural healing accessible to every home.' },
                { icon: Sparkles, title: 'Vision', desc: 'A drug-free, healthier Mumbai — one patient at a time.' },
                { icon: ShieldCheck, title: 'Values', desc: 'Trust, empathy, purity and personalized care.' },
              ].map((v, i) => (
                <div key={i} className="p-5 rounded-2xl bg-brand-50 border border-brand-100">
                  <v.icon className="w-6 h-6 text-primary mb-2" />
                  <div className="font-serif font-bold text-primary">{v.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{v.desc}</div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-secondary font-semibold">Meet Your Therapist</div>
                  <h3 className="font-serif text-2xl font-bold text-primary mt-1">Jawahar Singh Shakya</h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                    A certified holistic health practitioner with 15+ years of experience in acupressure, reflexology,
                    naturopathy and drugless therapy. Dedicated to guiding patients back to natural, vibrant health.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <Button onClick={() => scrollTo('book')} className="gradient-primary text-white">Book with Jawahar Sir</Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section id="services" className="py-20 md:py-28 bg-gradient-to-b from-brand-50 via-white to-brand-50">
        <div className="container">
          <SectionTitle eyebrow="Our Services" title="Holistic therapies that heal you naturally"
            subtitle="A complete range of drug-free wellness therapies — personalized to your body, condition and goals." />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <motion.div key={s.name} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} custom={i} variants={fadeUp}>
                <Card className="group h-full border-brand-100 hover:border-secondary hover:shadow-glow transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-50 group-hover:gradient-primary flex items-center justify-center mb-4 transition-all">
                      <s.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition">{s.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.duration}</span>
                      <button onClick={() => scrollTo('book')} className="text-sm font-semibold text-primary hover:text-secondary flex items-center gap-1">
                        Book <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONDITIONS ============ */}
      <section id="conditions" className="py-20 md:py-28 bg-white">
        <div className="container">
          <SectionTitle eyebrow="Conditions We Treat" title="Real relief for real conditions"
            subtitle="From chronic pain to modern lifestyle disorders — we treat the root cause, not just the symptom." />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {conditions.map((c, i) => (
              <motion.button
                key={c}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                whileHover={{ y: -4 }}
                onClick={() => scrollTo('book')}
                className="group p-4 md:p-5 rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50 hover:border-secondary hover:shadow-glow text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-100 group-hover:gradient-primary flex items-center justify-center mb-3 transition">
                  <Activity className="w-4 h-4 text-primary group-hover:text-white transition" />
                </div>
                <div className="font-semibold text-foreground text-sm md:text-base group-hover:text-primary">{c}</div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">Treat naturally <ChevronRight className="w-3 h-3" /></div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section id="why-us" className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container relative">
          <SectionTitle eyebrow="Why Choose Us" title="Trusted healing, delivered with heart"
            subtitle="Every session is personalized, every therapy is natural, every patient is family." />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-2xl glass border border-white/60 hover:shadow-glow transition"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <w.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-lg font-bold text-primary">{w.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BENEFITS ============ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <SectionTitle eyebrow="Benefits" title="How you'll feel after your therapy"
            subtitle="Real, measurable improvements to your body, mind and daily energy." />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-brand-50 to-white border border-brand-100 hover:shadow-glow transition"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4 shadow-glow"
                >
                  <b.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="font-serif font-bold text-primary text-lg">{b.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOME VISIT ============ */}
      <section id="home-visit" className="py-20 md:py-28 bg-gradient-to-br from-primary via-primary/95 to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMG.wellness} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-primary text-xs font-bold uppercase tracking-widest mb-4">
              <HomeIcon className="w-3.5 h-3.5" /> Home Visit Service
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight">Therapy that comes home to you</h2>
            <p className="mt-4 text-white/90 text-lg">
              Skip the traffic. Enjoy premium holistic therapy in the comfort and privacy of your home — anywhere in Mumbai.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {[
                { icon: Calendar, t: 'Simple Booking', d: 'Call, WhatsApp or fill form.' },
                { icon: MapPin, t: 'All of Mumbai', d: 'Borivali, Malad, Andheri & more.' },
                { icon: ShieldCheck, t: '100% Safe', d: 'Sanitized equipment, trained therapist.' },
                { icon: Sparkles, t: 'Total Comfort', d: 'Relax at home, we take care of the rest.' },
              ].map((v, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/20">
                  <v.icon className="w-6 h-6 text-accent-gold mb-2" />
                  <div className="font-serif font-bold">{v.t}</div>
                  <div className="text-sm text-white/80">{v.d}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Button onClick={() => scrollTo('book')} size="lg" className="bg-accent text-primary hover:bg-accent/90 font-bold">
                Book Home Visit <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a href={`tel:${PHONE_PRIMARY}`}>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  <Phone className="w-4 h-4 mr-2" /> Call Directly
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-square">
              <img src={IMG.massage} alt="Home massage therapy service" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section id="testimonials" className="py-20 md:py-28 bg-white">
        <div className="container">
          <SectionTitle eyebrow="Testimonials" title="Loved by patients across Mumbai"
            subtitle="Real stories, real healing. Here's what our patients say about their journey." />

          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12 rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white relative"
              >
                <Quote className="absolute top-6 left-6 w-14 h-14 text-accent-gold/30" />
                <div className="flex gap-1 mb-4 justify-center">
                  {Array.from({ length: testimonials[testimonialIdx].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-gold text-accent-gold" />
                  ))}
                </div>
                <p className="text-center text-lg md:text-xl text-foreground/90 leading-relaxed italic font-serif">
                  “{testimonials[testimonialIdx].text}”
                </p>
                <div className="mt-6 text-center">
                  <div className="font-serif font-bold text-primary text-lg">{testimonials[testimonialIdx].name}</div>
                  <div className="text-sm text-muted-foreground">{testimonials[testimonialIdx].location}, Mumbai</div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className={`h-2 rounded-full transition-all ${i === testimonialIdx ? 'w-8 bg-primary' : 'w-2 bg-brand-200'}`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />)}</div>
                <span className="font-semibold text-foreground">4.9/5</span> on Google
              </div>
              <a href={`https://www.google.com/maps/search/?api=1&query=Shashwat+Holistic+Health+Mumbai`} target="_blank" rel="noreferrer" className="text-primary font-semibold hover:underline">
                Read all Google Reviews →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section id="gallery" className="py-20 md:py-28 bg-brand-50">
        <div className="container">
          <SectionTitle eyebrow="Gallery" title="A peek into our wellness space"
            subtitle="Clinic, therapies, certificates and more." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[IMG.acupressure, IMG.massage, IMG.meditation, IMG.wellness, IMG.clinic, IMG.nature, IMG.therapist, IMG.hero].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative overflow-hidden rounded-2xl shadow-soft ${i % 5 === 0 ? 'row-span-2' : ''}`}
              >
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover aspect-square hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 hover:opacity-100 transition" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="py-20 md:py-28 bg-white">
        <div className="container max-w-3xl">
          <SectionTitle eyebrow="FAQ" title="Frequently asked questions"
            subtitle="Everything you need to know before starting your healing journey." />
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-brand-100">
                <AccordionTrigger className="text-left font-serif text-lg text-foreground hover:text-primary hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ============ BOOK APPOINTMENT ============ */}
      <section id="book" className="py-20 md:py-28 bg-gradient-to-br from-brand-50 to-white">
        <div className="container grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <SectionTitle eyebrow="Book Appointment" title="Start your healing journey today" center={false}
              subtitle="Fill in the form and our team will confirm your booking within 2 hours. Home visits available across Mumbai." />
            <div className="space-y-4 mt-8">
              <ContactBlock icon={Phone} title="Call Us" lines={[PHONE_PRIMARY, PHONE_SECONDARY]} href={`tel:${PHONE_PRIMARY}`} />
              <ContactBlock icon={MessageCircle} title="WhatsApp" lines={['Quick booking on WhatsApp']} href={`https://wa.me/${WHATSAPP}`} />
              <ContactBlock icon={Mail} title="Email" lines={[EMAIL]} href={`mailto:${EMAIL}`} />
              <ContactBlock icon={MapPin} title="Visit Us" lines={['Borivali West, Mumbai']} />
              <ContactBlock icon={Clock} title="Business Hours" lines={['Mon – Sat: 9:00 AM – 8:00 PM', 'Sun: On Appointment']} />
            </div>
          </div>
          <div className="lg:col-span-3">
            <AppointmentForm />
          </div>
        </div>
      </section>

      {/* ============ CONTACT / MAP ============ */}
      <section id="contact" className="py-20 md:py-28 bg-white">
        <div className="container">
          <SectionTitle eyebrow="Contact" title="Find us in Borivali West" subtitle="Visit our wellness center or book a home visit anywhere in Mumbai." />
          <div className="rounded-3xl overflow-hidden shadow-soft border border-brand-100 aspect-video max-w-5xl mx-auto">
            <iframe
              title="Shashwat Holistic Health Mumbai Location"
              src="https://www.google.com/maps?q=Borivali%20West%20Mumbai&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-primary text-white pt-16 pb-8">
        <div className="container grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-serif font-bold text-xl">Shashwat Holistic Health</div>
                <div className="text-xs uppercase tracking-widest opacity-80">Mumbai</div>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed max-w-md">
              Heal Naturally • Live Happily • Stay Healthy. Premium drug-free holistic therapy at our
              Borivali West center or in the comfort of your home across Mumbai.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Facebook, Youtube, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent hover:text-primary flex items-center justify-center transition" aria-label="Social link">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-serif font-bold mb-4">Quick Links</div>
            <ul className="space-y-2 text-sm text-white/80">
              {navLinks.map((l) => (
                <li key={l.id}><button onClick={() => scrollTo(l.id)} className="hover:text-accent-gold">{l.label}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-serif font-bold mb-4">Services</div>
            <ul className="space-y-2 text-sm text-white/80">
              {services.slice(0, 6).map((s) => (
                <li key={s.name}><button onClick={() => scrollTo('services')} className="hover:text-accent-gold">{s.name}</button></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container mt-10 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/70">
          <div>© {new Date().getFullYear()} Shashwat Holistic Health Mumbai. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent-gold">Privacy Policy</a>
            <a href="#" className="hover:text-accent-gold">Terms</a>
            <a href={`https://www.google.com/maps/search/?api=1&query=Shashwat+Holistic+Health+Mumbai`} target="_blank" rel="noreferrer" className="hover:text-accent-gold">Google Maps</a>
          </div>
        </div>
      </footer>

      {/* ============ FLOATING BUTTONS ============ */}
      <div className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-40 flex flex-col gap-3">
        <motion.a
          href={`https://wa.me/${WHATSAPP}?text=Hi%20Shashwat%20Holistic%20Health`}
          target="_blank" rel="noreferrer"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-glow"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.a>
        <motion.a
          href={`tel:${PHONE_PRIMARY}`}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 rounded-full gradient-primary text-white flex items-center justify-center shadow-glow"
          aria-label="Call now"
        >
          <Phone className="w-6 h-6" />
        </motion.a>
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed left-4 md:left-6 bottom-4 md:bottom-6 z-40 w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-glow hover:bg-primary/90"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Appointment popup */}
      <Dialog open={showAppointmentPopup} onOpenChange={setShowAppointmentPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mb-3 mx-auto">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <DialogTitle className="font-serif text-2xl text-center text-primary">Ready to heal naturally?</DialogTitle>
            <DialogDescription className="text-center">
              Book your first consultation today and take the first step toward a healthier, happier you.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-2">
            <Button onClick={() => { setShowAppointmentPopup(false); scrollTo('book') }} className="gradient-primary text-white">
              Book Appointment
            </Button>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">
              <Button variant="outline" className="w-full bg-[#25D366] text-white hover:bg-[#20BD5A] border-0">
                <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us Instead
              </Button>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ---------------- Sub components ----------------

function ContactBlock({ icon: Icon, title, lines, href }) {
  const content = (
    <div className="flex items-start gap-4 p-4 rounded-2xl border border-brand-100 bg-white hover:border-secondary hover:shadow-soft transition">
      <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="font-serif font-bold text-primary">{title}</div>
        {lines.map((l, i) => (<div key={i} className="text-sm text-muted-foreground">{l}</div>))}
      </div>
    </div>
  )
  return href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{content}</a> : content
}

function AppointmentForm() {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { name: '', phone: '', email: '', therapy: '', date: '', time: '', message: '' },
  })
  const therapy = watch('therapy')
  const time = watch('time')

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed')
      toast.success('Appointment received!', { description: 'We will confirm on WhatsApp / call within 2 hours.' })
      reset()
    } catch (e) {
      toast.error('Could not book appointment', { description: e.message })
    }
  }

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM']

  return (
    <Card className="border-brand-100 shadow-soft">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" placeholder="Your full name" {...register('name', { required: true })} className="mt-1.5" />
            {errors.name && <p className="text-xs text-destructive mt-1">Name is required</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input id="phone" placeholder="+91 98765 43210" {...register('phone', { required: true })} className="mt-1.5" />
            {errors.phone && <p className="text-xs text-destructive mt-1">Phone is required</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register('email')} className="mt-1.5" />
          </div>
          <div>
            <Label>Preferred Therapy</Label>
            <Select value={therapy} onValueChange={(v) => setValue('therapy', v)}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select a therapy" /></SelectTrigger>
              <SelectContent>
                {services.map((s) => <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>)}
                <SelectItem value="Not Sure">Not Sure – Recommend for me</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Preferred Date</Label>
            <Input id="date" type="date" {...register('date')} className="mt-1.5" />
          </div>
          <div>
            <Label>Preferred Time</Label>
            <Select value={time} onValueChange={(v) => setValue('time', v)}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select a time slot" /></SelectTrigger>
              <SelectContent>
                {timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="message">Message / Condition</Label>
            <Textarea id="message" rows={4} placeholder="Briefly describe your condition or any preferences..." {...register('message')} className="mt-1.5" />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={isSubmitting} className="w-full gradient-primary text-white h-12 text-base shadow-glow hover:opacity-95">
              {isSubmitting ? 'Booking...' : (<><Calendar className="w-5 h-5 mr-2" /> Confirm Appointment</>)}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-3">
              Your details are safe. We will confirm on WhatsApp or call within 2 hours.
            </p>
          </div>
                    <div className="text-center md:text-left">
            <div>© {new Date().getFullYear()} Shashwat Holistic Health Mumbai. All Rights Reserved.</div>
            <div className="mt-1">
              Designed &amp; Developed by{' '}
              <a
                href="#"
                className="text-accent-gold hover:text-accent-gold/80 font-semibold"
              >
                Prashil Jivtode
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default App
