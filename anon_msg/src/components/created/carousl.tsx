"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  ShieldAlert,
  UserX,
  Ghost,
  Lock,
  MessageCircle,
  Zap
} from "lucide-react"

export function ThemedAutoCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()

  // Auto-scroll effect
  React.useEffect(() => {
    if (!api) return

    const intervalId = setInterval(() => {
      api.scrollNext()
    }, 3000)

    return () => clearInterval(intervalId)
  }, [api])

  const items = [
    {
      title: "Truly Anonymous",
      desc: "No phone, no ID, just pure privacy.",
      icon: <Ghost className="text-brand w-16 h-16 mb-4" />,
      bg: "bg-brand-muted"
    },
    {
      title: "End-to-End Encryption",
      desc: "Only you and your recipient can read messages.",
      icon: <Lock className="text-brand w-16 h-16 mb-4" />,
      bg: "bg-surface-muted"
    },
    {
      title: "No Tracking",
      desc: "We never log or track your activity.",
      icon: <ShieldAlert className="text-brand w-16 h-16 mb-4" />,
      bg: "bg-brand-muted"
    },
    {
      title: "Instant Vanish",
      desc: "Messages disappear after being read.",
      icon: <UserX className="text-brand w-16 h-16 mb-4" />,
      bg: "bg-surface-muted"
    },
    {
      title: "Lightning Fast",
      desc: "Real-time delivery without delays.",
      icon: <Zap className="text-brand w-16 h-16 mb-4" />,
      bg: "bg-brand-muted"
    },
    {
      title: "No Signup Needed",
      desc: "Jump in and chat instantly.",
      icon: <MessageCircle className="text-brand w-16 h-16 mb-4" />,
      bg: "bg-surface-muted"
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4 md:px-0">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {items.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
              <div className="p-1">
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow h-full p-3 bg-surface">
                  <CardContent className={`flex flex-col items-center justify-center p-8 text-center aspect-square ${item.bg} rounded-xl h-full transition-colors`}>
                    {item.icon}
                    <h3 className="text-2xl font-bold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-text-secondary">{item.desc}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  )
}
