"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, MapPin, Plus, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Selection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const [tripType, setTripType] = useState("one-way")
  const [currency, setCurrency] = useState("USD")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [passengers, setPassengers] = useState("2")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("09:00")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const dateLabel = useMemo(() => {
    if (!date) return "Select date"
    return format(date, "EEE, dd MMM")
  }, [date])

  return (
    <section
      id="selection"
      ref={sectionRef}
      className="relative z-20 mt-16 md:mt-24 lg:mt-32 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Main Card */}
          <div className="relative bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 md:px-8 md:py-6 border-b border-border bg-muted/30">
              <div className="flex flex-wrap items-center gap-3">
                <Select value={tripType} onValueChange={setTripType}>
                  <SelectTrigger className="w-[140px] bg-background border-input text-foreground font-medium rounded-lg focus:ring-2 focus:ring-ring">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-border bg-popover">
                    <SelectItem value="one-way" className="rounded-md focus:bg-accent">One way</SelectItem>
                    <SelectItem value="round-trip" className="rounded-md focus:bg-accent">Round trip</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:block h-6 w-px bg-border" />

                <p className="text-muted-foreground text-sm font-medium tracking-wide">
                  Private charter request
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3">
                <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase font-semibold">
                  Currency
                </p>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-[100px] bg-background border-input text-foreground font-medium rounded-lg focus:ring-2 focus:ring-ring">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-border bg-popover">
                    {["USD", "EUR", "GBP", "AED"].map((curr) => (
                      <SelectItem key={curr} value={curr} className="rounded-md focus:bg-accent font-medium">
                        {curr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-8">
              {/* Grid Layout - Fixed overlap issue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                
                {/* From */}
                <div className="group sm:col-span-2 lg:col-span-1 xl:col-span-2">
                  <div className="h-full bg-background border border-input rounded-xl px-4 py-3 transition-all duration-200 hover:border-ring focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs tracking-wider uppercase font-semibold mb-1.5">
                      <MapPin className="w-4 h-4 text-primary" />
                      Leaving from
                    </div>
                    <Input
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="City or airport"
                      className="h-9 border-0 bg-transparent shadow-none px-0 text-foreground text-base font-medium placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                {/* To */}
                <div className="group sm:col-span-2 lg:col-span-1 xl:col-span-2">
                  <div className="h-full bg-background border border-input rounded-xl px-4 py-3 transition-all duration-200 hover:border-ring focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs tracking-wider uppercase font-semibold mb-1.5">
                      <MapPin className="w-4 h-4 text-primary" />
                      Going to
                    </div>
                    <Input
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="City or airport"
                      className="h-9 border-0 bg-transparent shadow-none px-0 text-foreground text-base font-medium placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                {/* Passengers */}
                <div className="sm:col-span-1">
                  <div className="h-full bg-background border border-input rounded-xl px-4 py-3 transition-all duration-200 hover:border-ring">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs tracking-wider uppercase font-semibold mb-1.5">
                      <Users className="w-4 h-4 text-primary" />
                      Passengers
                    </div>
                    <Select value={passengers} onValueChange={setPassengers}>
                      <SelectTrigger className="h-9 w-full bg-transparent border-0 px-0 shadow-none text-foreground text-base font-medium focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border-border bg-popover">
                        {Array.from({ length: 8 }, (_, i) => String(i + 1)).map((n) => (
                          <SelectItem key={n} value={n} className="rounded-md focus:bg-accent">
                            {n}
                          </SelectItem>
                        ))}
                        <SelectItem value="9+" className="rounded-md focus:bg-accent">9+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Date */}
                <div className="sm:col-span-1">
                  <div className="h-full bg-background border border-input rounded-xl px-4 py-3 transition-all duration-200 hover:border-ring">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs tracking-wider uppercase font-semibold mb-1.5">
                      <CalendarIcon className="w-4 h-4 text-primary" />
                      Date
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="h-9 w-full text-left text-foreground font-medium text-base hover:text-primary transition-colors"
                        >
                          {dateLabel}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 rounded-xl border-border bg-popover" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="rounded-xl"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Time */}
                <div className="sm:col-span-1">
                  <div className="h-full bg-background border border-input rounded-xl px-4 py-3 transition-all duration-200 hover:border-ring">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs tracking-wider uppercase font-semibold mb-1.5">
                      <div className="w-4" />
                      Time
                    </div>
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="h-9 border-0 bg-transparent shadow-none px-0 text-foreground text-base font-medium focus-visible:ring-0 focus-visible:ring-offset-0 [color-scheme:light] dark:[color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons - Separated below grid to prevent overlap */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
                <Button 
                  variant="outline"
                  className="h-12 px-6 border-input hover:bg-accent hover:text-accent-foreground text-foreground font-medium rounded-lg transition-all duration-200 order-2 sm:order-1"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add stop
                </Button>
                <Button 
                  className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-lg transition-all duration-200 shadow-lg shadow-primary/20 order-1 sm:order-2"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Flights
                </Button>
              </div>

              {/* Trust Row */}
              <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-chart-2 animate-pulse" />
                  <span>Typical response time: <span className="text-foreground font-semibold">under 10 minutes</span></span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-foreground font-bold">4.9</span>
                  <span className="text-xs">/ 5</span>
                  <span className="mx-1">•</span>
                  <span>1,000+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}