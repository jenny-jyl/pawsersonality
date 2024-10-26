'use client'

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import Link from 'next/link'
import Image from 'next/image'
import { PawPrint } from 'lucide-react'

const questions = [
  "Does your dog come to your rescue when you're feeling down?",
  "Is your dog quick to bark when someone new approaches the house?",
  "Does your dog enjoy meeting and playing with new dogs?",
  "Does your dog often pull on the leash or try to lead the way during walks?",
  "Is your dog always at your side, following you around the house?",
  "Does your dog seem excited by new toys or games?",
  "Is your dog easily distracted by smells or sounds?",
  "Will your dog sleep on your lap or as close as possible to you?",
  "Does your dog bring you toys or sticks to initiate playtime?",
  "Does your dog stay calm and collected in new environments?"
]

export default function HomePage() {
  const [answers, setAnswers] = useState(Array(10).fill(0))

  const handleSliderChange = (index: number, value: number[]) => {
    const newAnswers = [...answers]
    newAnswers[index] = value[0]
    setAnswers(newAnswers)
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <nav className="bg-[#5263E0] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Pawsonality</Link>
          <PawPrint className="w-6 h-6" />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#5263E0] mb-4">Pawsonality Quiz</h1>
          <h2 className="text-2xl text-gray-600 mb-8">Unleash the Woof Within: Find Your Dog's Personality Type!</h2>
          <div className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg"
              alt="Cute dog"
              width={160}
              height={160}
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="space-y-8">
          {questions.map((question, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
              <p className="mb-4 text-lg font-semibold flex items-center">
                <PawPrint className="w-5 h-5 mr-2 text-[#5263E0]" />
                {question}
              </p>
              <Slider
                min={0}
                max={3}
                step={1}
                value={[answers[index]]}
                onValueChange={(value) => handleSliderChange(index, value)}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Never</span>
                <span>Rarely</span>
                <span>Sometimes</span>
                <span>Always</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/second-page" 
            className="bg-[#5263E0] text-white px-8 py-3 rounded-full font-semibold text-lg uppercase tracking-wide hover:bg-[#3C5D99] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}