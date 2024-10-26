'use client'

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import Link from 'next/link'
import Image from 'next/image'
import { PawPrint } from 'lucide-react'

const questions = [
  "Does your dog prefer to observe from a distance before joining in?",
  "Is your dog protective of you or your family members?",
  "Does your dog have a favorite toy they always keep nearby?",
  "Is your dog quick to investigate new objects or areas?",
  "Does your dog remain relaxed during thunderstorms or fireworks?",
  "Is your dog always excited to meet new people?",
  "Does your dog seem to understand and respond to your emotions?",
  "Is your dog always ready for a game or playtime?",
  "Does your dog enjoy cuddling and physical affection?",
  "Does your dog often pause to think before reacting to new situations?"
]

export default function SecondPage() {
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
            href="/results" 
            className="bg-[#5263E0] text-white px-8 py-3 rounded-full font-semibold text-lg uppercase tracking-wide hover:bg-[#3C5D99] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Submit Quiz
          </Link>
        </div>
      </div>
    </div>
  )
}