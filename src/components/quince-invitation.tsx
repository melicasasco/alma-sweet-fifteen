"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPin, Clock, Shirt, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

const Sparkle = ({ delay, duration, left, top }: { delay: number; duration: number; left: string; top: string }) => (
  <div
    className="absolute h-1 w-1 rounded-full bg-white animate-sparkle"
    style={{
      left,
      top,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
)

const BokehParticle = ({
  delay,
  duration,
  left,
  size,
}: { delay: number; duration: number; left: string; size: number }) => (
  <div
    className="absolute rounded-full bg-white/40 blur-md animate-bokeh-float"
    style={{
      left,
      width: `${size}px`,
      height: `${size}px`,
      bottom: "-20px",
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
)

// Nuevos efectos festivos
const ShootingStar = ({ delay, duration, left, top }: { delay: number; duration: number; left: string; top: string }) => (
  <div
    className="absolute animate-shooting-star"
    style={{
      left,
      top,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  >
    <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-300 via-white to-transparent rounded-full" />
  </div>
)

const FloatingHeart = ({ delay, duration, left, size }: { delay: number; duration: number; left: string; size: number }) => (
  <div
    className="absolute text-pink-300 animate-heart-float"
    style={{
      left,
      bottom: "-30px",
      fontSize: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  >
    💖
  </div>
)

const Confetti = ({ delay, duration, left, top, color }: { delay: number; duration: number; left: string; top: string; color: string }) => (
  <div
    className="absolute w-2 h-2 animate-confetti-fall"
    style={{
      left,
      top,
      backgroundColor: color,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
)

const TwinklingStar = ({ delay, duration, left, top, size }: { delay: number; duration: number; left: string; top: string; size: number }) => (
  <div
    className="absolute text-yellow-300 animate-twinkle"
    style={{
      left,
      top,
      fontSize: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  >
    ✨
  </div>
)

const DiscoBall = ({ size = "large" }: { size?: "large" | "small" }) => {
  const dimensions = size === "large" ? "h-40 w-40" : "h-24 w-24"
  const facetSize = size === "large" ? "6px" : "4px"

  return (
    <div className={`relative ${dimensions} animate-rotate`}>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 opacity-60 blur-xl" />

      {/* Main sphere */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 shadow-2xl" />

      {/* Mirror facets pattern */}
      <div
        className="absolute inset-2 rounded-full overflow-hidden"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent ${facetSize}, rgba(255,255,255,0.3) ${facetSize}, rgba(0,0,0,0.2) calc(${facetSize} + 1px)),
            repeating-linear-gradient(90deg, transparent, transparent ${facetSize}, rgba(255,255,255,0.3) ${facetSize}, rgba(0,0,0,0.2) calc(${facetSize} + 1px)),
            repeating-linear-gradient(45deg, transparent, transparent ${facetSize}, rgba(255,255,255,0.2) ${facetSize}, rgba(0,0,0,0.1) calc(${facetSize} + 1px)),
            repeating-linear-gradient(-45deg, transparent, transparent ${facetSize}, rgba(255,255,255,0.2) ${facetSize}, rgba(0,0,0,0.1) calc(${facetSize} + 1px))
          `,
        }}
      />

      {/* Highlight shine */}
      <div className="absolute top-4 left-4 h-8 w-8 rounded-full bg-white/60 blur-sm animate-shimmer" />
      <div className="absolute top-6 right-8 h-4 w-4 rounded-full bg-white/40 blur-sm" />
    </div>
  )
}

export default function QuinceInvitation() {
  const [fullName, setFullName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeSection, setActiveSection] = useState("alma")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const carouselImages = [
    { url: "/images/imagen-1.png", alt: "Quinceañera elegante" },
    { url: "/images/imagen-2.png", alt: "Celebración especial" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [carouselImages.length])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFullName("")
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveSection(sectionId)
      setIsMobileMenuOpen(false) // Close mobile menu when navigating
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-between items-center">
            {/* Left side - Alma */}
            <div>
              <button
                onClick={() => scrollToSection("alma")}
                className={`text-xl font-semibold transition-all duration-300 hover:text-slate-200 hover:scale-105
                   ${
                  activeSection === "alma" 
                    ? "text-white  px-4 py-2 rounded-full shadow-lg animate-pulse-slow" 
                    : "text-slate-300 hover:bg-slate-800/30 px-4 py-2 rounded-full"
                }`}
              >
                 Alma 
              </button>
            </div>
            
            {/* Right side - Other menu items */}
            <ul className="flex gap-6">
              {[
                { id: "festejemos", label: "Festejemos" },
                { id: "te-espero", label: "Te espero" },
                { id: "asistencia", label: "Asistencia" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-lg font-medium transition-all duration-300 hover:text-slate-200 hover:scale-105 ${
                      activeSection === item.id 
                        ? "text-slate-200 bg-slate-800/30 px-3 py-1 rounded-full" 
                        : "text-slate-400 hover:bg-slate-800/20 px-3 py-1 rounded-full"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-between items-center">
            <h1 className="text-xl font-semibold text-white">Mis 15 Años</h1>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu - Vertical */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 animate-slide-down">
              <ul className="flex flex-col py-4">
                {[
                  { id: "alma", label: "Alma" },
                  { id: "festejemos", label: "Festejemos" },
                  { id: "te-espero", label: "Te espero" },
                  { id: "asistencia", label: "Asistencia" },
                ].map((item, index) => (
                  <li key={item.id} className="animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-3 text-lg font-medium transition-all duration-300 hover:text-slate-200 hover:bg-slate-800/50 hover:scale-105 ${
                        activeSection === item.id ? "text-slate-200 bg-slate-800/50" : "text-slate-400"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>

      <div
        className="absolute inset-0 opacity-30 animate-mesh-move"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px),
            repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px),
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)
          `,
          backgroundSize: "10px 10px, 10px 10px, 100% 100%, 100% 100%",
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        {/* Blurred background lights */}
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-slate-400/20 blur-3xl animate-pulse-glow" />
        <div
          className="absolute top-40 right-20 h-80 w-80 rounded-full bg-slate-300/20 blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/4 h-72 w-72 rounded-full bg-slate-400/15 blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />

        {Array.from({ length: 20 }).map((_, i) => {
          // Use fixed values to avoid hydration mismatch
          const positions = [
            { left: "10%", top: "20%", delay: 1, duration: 3 },
            { left: "30%", top: "40%", delay: 2, duration: 4 },
            { left: "50%", top: "60%", delay: 0.5, duration: 2.5 },
            { left: "70%", top: "30%", delay: 1.5, duration: 3.5 },
            { left: "90%", top: "50%", delay: 2.5, duration: 4.5 },
            { left: "15%", top: "70%", delay: 0.8, duration: 2.8 },
            { left: "35%", top: "10%", delay: 1.8, duration: 3.8 },
            { left: "55%", top: "80%", delay: 2.2, duration: 4.2 },
            { left: "75%", top: "15%", delay: 1.2, duration: 3.2 },
            { left: "25%", top: "90%", delay: 2.8, duration: 4.8 },
            { left: "45%", top: "25%", delay: 0.3, duration: 2.3 },
            { left: "65%", top: "45%", delay: 1.7, duration: 3.7 },
            { left: "85%", top: "65%", delay: 2.3, duration: 4.3 },
            { left: "5%", top: "35%", delay: 1.1, duration: 3.1 },
            { left: "95%", top: "75%", delay: 2.7, duration: 4.7 },
            { left: "20%", top: "55%", delay: 0.6, duration: 2.6 },
            { left: "40%", top: "85%", delay: 1.9, duration: 3.9 },
            { left: "60%", top: "5%", delay: 2.1, duration: 4.1 },
            { left: "80%", top: "95%", delay: 1.4, duration: 3.4 },
            { left: "12%", top: "65%", delay: 2.6, duration: 4.6 }
          ]
          const pos = positions[i % positions.length]
          return (
            <Sparkle
              key={`sparkle-${i}`}
              delay={pos.delay}
              duration={pos.duration}
              left={pos.left}
              top={pos.top}
            />
          )
        })}

        {Array.from({ length: 10 }).map((_, i) => {
          // Use fixed values for bokeh particles
          const positions = [
            { left: "20%", delay: 2, duration: 20, size: 30 },
            { left: "40%", delay: 5, duration: 25, size: 45 },
            { left: "60%", delay: 1, duration: 18, size: 35 },
            { left: "80%", delay: 8, duration: 22, size: 40 },
            { left: "10%", delay: 3, duration: 19, size: 25 },
            { left: "30%", delay: 6, duration: 24, size: 50 },
            { left: "50%", delay: 2.5, duration: 21, size: 38 },
            { left: "70%", delay: 7, duration: 23, size: 42 },
            { left: "90%", delay: 4, duration: 17, size: 28 },
            { left: "15%", delay: 9, duration: 26, size: 48 }
          ]
          const pos = positions[i % positions.length]
          return (
            <BokehParticle
              key={`bokeh-${i}`}
              delay={pos.delay}
              duration={pos.duration}
              left={pos.left}
              size={pos.size}
            />
          )
        })}
      </div>

      <div className="absolute top-32 right-8 z-10 hidden md:block">
        <DiscoBall size="large" />
      </div>

      <div className="absolute bottom-20 left-8 z-10 hidden md:block">
        <DiscoBall size="small" />
      </div>

      {/* Main content */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-4xl space-y-12 text-center animate-fade-in">
          <div className="space-y-4 pt-16 animate-slide-up">
            <h1 className="font-serif text-6xl font-normal tracking-wide text-white md:text-7xl lg:text-8xl text-balance drop-shadow-lg animate-pulse-slow">
              ¡Te invito a mis 15!
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-slate-300 to-transparent animate-expand" />
          </div>

          <div id="alma" className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600/50 overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-[500px] overflow-hidden">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image 
                      src={image.url || "/placeholder.svg"} 
                      alt={image.alt} 
                      fill
                      className="object-cover object-center" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}


              </div>
            </Card>
          </div>

          <div id="festejemos" className="grid gap-6 md:grid-cols-3 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/50 backdrop-blur-sm border-slate-500/50 p-6 space-y-3 hover:bg-gradient-to-br hover:from-slate-700/70 hover:to-slate-600/60 hover:scale-105 hover:shadow-2xl hover:shadow-slate-500/20 transition-all duration-500 animate-fade-in group" style={{ animationDelay: "0.5s" }}>
              <div className="flex justify-center">
                <MapPin className="h-8 w-8 text-slate-300 animate-bounce-slow group-hover:text-blue-400 transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-lg text-white group-hover:text-blue-200 transition-colors duration-300">📍 Lugar</h3>
              <p className="text-slate-300 leading-relaxed">
                <span className="font-semibold text-white">Salón Janos Adrogué</span>
                <br />
                <a 
                  href="https://maps.google.com/?q=Amenedo+785,+B1846DGP+Adrogué,+Provincia+de+Buenos+Aires"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-300 hover:text-blue-200 hover:underline transition-colors duration-300 cursor-pointer"
                >
                  🗺️ Amenedo 785, B1846DGP Adrogué, Provincia de Buenos Aires
                </a>
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/50 backdrop-blur-sm border-slate-500/50 p-6 space-y-3 hover:bg-gradient-to-br hover:from-slate-700/70 hover:to-slate-600/60 hover:scale-105 hover:shadow-2xl hover:shadow-slate-500/20 transition-all duration-500 animate-fade-in group" style={{ animationDelay: "0.6s" }}>
              <div className="flex justify-center">
                <Clock className="h-8 w-8 text-slate-300 animate-bounce-slow group-hover:text-purple-400 transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-lg text-white group-hover:text-purple-200 transition-colors duration-300">📅 Fecha</h3>
              <p className="text-slate-300 leading-relaxed">
                <span className="font-semibold text-white text-lg">28 de Diciembre de 2025</span>
                <br />
                <span className="text-sm bg-purple-500/20 px-2 py-1 rounded-full">🎉 Sábado</span>
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/60 to-slate-700/50 backdrop-blur-sm border-slate-500/50 p-6 space-y-3 hover:bg-gradient-to-br hover:from-slate-700/70 hover:to-slate-600/60 hover:scale-105 hover:shadow-2xl hover:shadow-slate-500/20 transition-all duration-500 animate-fade-in group" style={{ animationDelay: "0.7s" }}>
              <div className="flex justify-center">
                <Shirt className="h-8 w-8 text-slate-300 animate-bounce-slow group-hover:text-pink-400 transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-lg text-white group-hover:text-pink-200 transition-colors duration-300">👗 Dress Code</h3>
              <p className="text-slate-300 leading-relaxed">
                <span className="text-lg font-semibold text-white bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  ✨ Elegante Sport ✨
                </span>
                <br />
                <span className="text-sm text-slate-400">¡Vení hermoso/a!</span>
              </p>
            </Card>
          </div>

          <div id="te-espero" className="py-6 animate-slide-up" style={{ animationDelay: "0.8s" }}>
            <p className="font-serif text-4xl text-white md:text-5xl text-balance drop-shadow-lg animate-pulse-slow">Te espero</p>
          </div>

          <div id="asistencia" className="animate-slide-up" style={{ animationDelay: "1s" }}>
            <Card className="bg-slate-800/60 backdrop-blur-md border-slate-600/50 p-8 space-y-6 hover:scale-105 transition-transform duration-300">
              <h2 className="font-semibold text-2xl text-white md:text-3xl">Confirmá tu asistencia</h2>

              {submitted ? (
                <div className="py-8 space-y-4">
                  <div className="text-5xl">✨</div>
                  <p className="text-lg text-slate-300 font-semibold">¡Gracias por confirmar!</p>
                  <p className="text-slate-400">Te esperamos en la fiesta</p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="mt-4 border-slate-500 text-white hover:bg-slate-700"
                  >
                    Confirmar otra persona
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2 text-left">
                    <Label htmlFor="fullName" className="text-white">
                      Nombre completo
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Tu nombre y apellido"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full pointer bg-slate-300 text-slate-900 hover:bg-slate-200 font-semibold text-md py-6"
                  >
                    {isSubmitting ? "Enviando..." : "Confirmar asistencia"}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Decorative elements */}
          {/* <div className="flex justify-center gap-2 pt-4">
            <div className="h-2 w-2 rounded-full bg-slate-300 animate-pulse" />
            <div className="h-2 w-2 rounded-full bg-slate-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="h-2 w-2 rounded-full bg-slate-300 animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div> */}
        </div>
      </div>
    </div>
  )
}
