'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PawPrint } from 'lucide-react'

type Trait = 'Bravery' | 'Affection' | 'Curiosity' | 'Calmness' | 'Sociability' | 'Thoughtfulness'
type Personality = 'Warrior' | 'Baby' | 'Adventurer' | 'Snoozer' | 'Socialite' | 'Thinker'

interface PersonalityDetails {
  name: Personality
  strength: string
  weakness: string
  traits: string
  lovable: string
  quirks: string
  bestie: string
}

const personalityDetails: Record<Personality, PersonalityDetails> = {
  Warrior: {
    name: 'Warrior',
    strength: 'Brave, protective, and loyal, this dog is a natural guardian, keeping an eye out for potential threats (even if it\'s just the mailman).',
    weakness: 'Sometimes a bit too serious or wary, they can take time to warm up to new people or places.',
    traits: 'Loyal, dependable, vigilant.',
    lovable: 'The Warrior will always be by your side, come what may. They have a soft spot for you and your family, often showing their affection by staying close and standing guard.',
    quirks: 'Known for their intense "watchdog stance" and that "I\'m on duty" look, Warriors may see the world as a place full of mysteries to solve and threats to guard against.',
    bestie: 'The Socialite – This outgoing friend shows the Warrior how to let loose and have fun. The Socialite\'s sunny outlook helps balance the Warrior\'s vigilant nature.'
  },
  Baby: {
    name: 'Baby',
    strength: 'Incredibly affectionate, always ready for cuddles, and happiest snuggled up on the couch or bed.',
    weakness: 'Can be clingy, often following you around and needing constant reassurance.',
    traits: 'Loving, devoted, cozy.',
    lovable: 'The Baby is the quintessential cuddle bug, making you feel like the center of their world. There\'s no such thing as "too much affection" for this pup, and they\'ll always find a way to snuggle up close.',
    quirks: 'Has a knack for staring lovingly at you for extended periods, perhaps even using those puppy eyes to guilt you into a treat or an extra-long cuddle session.',
    bestie: 'The Snoozer – A fellow laid-back soul, the Snoozer enjoys taking it easy, making for a peaceful friendship where both are happy just to lounge and be close.'
  },
  Adventurer: {
    name: 'Adventurer',
    strength: 'This dog\'s motto is "try everything once!" They\'re curious, full of energy, and always ready for an adventure, whether it\'s in the backyard or a brand-new hiking trail.',
    weakness: 'Easily distracted and sometimes a bit too eager to wander off, they can be tough to rein in.',
    traits: 'Curious, fearless, energetic.',
    lovable: 'The Adventurer is the embodiment of "life\'s a journey." They bring excitement to every day, with new discoveries and enthusiasm for just about anything.',
    quirks: 'Known for pulling on the leash, sniffing every scent, and always having their tail wagging in excitement for what\'s next.',
    bestie: 'The Thinker – The Thinker\'s cautious and observant nature keeps the Adventurer from getting too ahead of themselves, offering a balance of safety and spontaneity.'
  },
  Snoozer: {
    name: 'Snoozer',
    strength: 'Calm and relaxed, Snoozers can make any environment feel serene. They\'re the masters of chilling out and know how to enjoy the little things.',
    weakness: 'Can be a little too comfortable; they might resist exercise or become a bit lazy.',
    traits: 'Laid-back, gentle, content.',
    lovable: 'The Snoozer\'s mellow vibe is contagious. They\'re the perfect companion for movie nights and lazy afternoons, reminding you that rest is essential.',
    quirks: 'Has a knack for finding the coziest spot in the house, often dragging blankets or cushions into a perfect napping pile.',
    bestie: 'The Baby – Together, they\'re a match made in nap-heaven, sharing a love for rest, comfort, and quality time spent side-by-side.'
  },
  Socialite: {
    name: 'Socialite',
    strength: 'Friendly, confident, and the life of the party—this dog loves meeting new people and making friends wherever they go.',
    weakness: 'Sometimes a bit too enthusiastic, they might overwhelm shy dogs or be oblivious to personal space.',
    traits: 'Outgoing, cheerful, charming.',
    lovable: 'The Socialite makes every day feel festive! Their positive energy and willingness to share their joy light up any room.',
    quirks: 'Known for the "full body wag" when they\'re excited, or running from one person to the next to greet everyone as if they\'re hosting a party.',
    bestie: 'The Warrior – The Warrior\'s steady presence keeps the Socialite grounded, and the Socialite\'s friendliness encourages the Warrior to let loose and make friends.'
  },
  Thinker: {
    name: 'Thinker',
    strength: 'Observant and intelligent, this dog carefully considers situations before diving in, always thinking things through.',
    weakness: 'Can be a bit shy or overly cautious, needing extra time to feel comfortable in new surroundings.',
    traits: 'Thoughtful, patient, attentive.',
    lovable: 'The Thinker has a refined, almost "wise" nature, with an ability to read the room and observe from a calm perspective.',
    quirks: 'Known for their head tilts, slow approaches, and the "pause to listen" stance, Thinkers often analyze everything with great care.',
    bestie: 'The Adventurer – The Adventurer\'s excitement encourages the Thinker to step out of their comfort zone, while the Thinker helps the Adventurer slow down and stay focused.'
  }
}

const traitQuestionMap: Record<number, Trait[]> = {
  1: ['Bravery', 'Affection'],
  2: ['Bravery'],
  3: ['Sociability'],
  4: ['Curiosity', 'Sociability'],
  5: ['Affection'],
  6: ['Curiosity'],
  7: ['Curiosity', 'Thoughtfulness'],
  8: ['Affection', 'Calmness'],
  9: ['Sociability', 'Curiosity'],
  10: ['Calmness', 'Thoughtfulness'],
  11: ['Bravery'],
  12: ['Thoughtfulness'],
  13: ['Curiosity'],
  14: ['Calmness'],
  15: ['Curiosity', 'Sociability'],
  16: ['Affection'],
  17:  ['Thoughtfulness'],
  18: ['Sociability'],
  19: ['Affection', 'Sociability'],
  20: ['Thoughtfulness']
}

const traitToPersonalityMap: Record<Trait, Personality> = {
  Bravery: 'Warrior',
  Affection: 'Baby',
  Curiosity: 'Adventurer',
  Calmness: 'Snoozer',
  Sociability: 'Socialite',
  Thoughtfulness: 'Thinker'
}

export default function ResultsPage() {
  const [personality, setPersonality] = useState<PersonalityDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const calculatePersonality = () => {
      try {
        // Simulating the calculation of personality based on quiz answers
        const simulatedAnswers = Array(20).fill(0).map(() => Math.floor(Math.random() * 4))
        const traitScores: Record<Trait, number> = {
          Bravery: 0,
          Affection: 0,
          Curiosity: 0,
          Calmness: 0,
          Sociability: 0,
          Thoughtfulness: 0
        }

        simulatedAnswers.forEach((answer, index) => {
          const traits = traitQuestionMap[index + 1]
          if (!traits) {
            console.error(`No traits found for question ${index + 1}`)
            return
          }
          traits.forEach(trait => {
            if (trait in traitScores) {
              traitScores[trait] += answer
            } else {
              console.error(`Invalid trait: ${trait}`)
            }
          })
        })

        console.log('Trait Scores:', traitScores)

        const sortedTraits = Object.entries(traitScores).sort((a, b) => b[1] - a[1])
        console.log('Sorted Traits:', sortedTraits)

        if (sortedTraits.length === 0) {
          throw new Error('No valid traits found')
        }

        const topTrait = sortedTraits[0][0] as Trait
        console.log('Top Trait:', topTrait)

        const personalityType = traitToPersonalityMap[topTrait]
        if (!personalityType) {
          throw new Error(`Invalid personality type for trait: ${topTrait}`)
        }

        const result = personalityDetails[personalityType]
        if (!result) {
          throw new Error(`Invalid personality type: ${personalityType}`)
        }
        setPersonality(result)
      } catch (err) {
        console.error('Error calculating personality:', err)
        setError(`An error occurred while calculating the personality: ${err.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    calculatePersonality()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <PawPrint className="w-12 h-12 text-[#5263E0] animate-bounce mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-600">Fetching your dog's pawsonality...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-600 mb-4">{error}</p>
          <Link 
            href="/" 
            className="bg-[#5263E0] text-white px-6 py-2 rounded-full font-semibold text-lg uppercase tracking-wide hover:bg-[#3C5D99] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Try Again
          </Link>
        </div>
      </div>
    )
  }

  if (!personality) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-600 mb-4">No personality data available. Please retake the quiz.</p>
          <Link 
            href="/" 
            className="bg-[#5263E0] text-white px-6 py-2 rounded-full font-semibold text-lg uppercase tracking-wide hover:bg-[#3C5D99] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    )
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
          <h1 className="text-4xl font-bold text-[#5263E0] mb-4">Your Dog's Pawsonality: {personality.name}</h1>
          <h2 className="text-2xl text-gray-600 mb-8">Unleash the Woof Within: Your Dog's Unique Personality Type!</h2>
          <div className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg"
              alt={`${personality.name} dog`}
              width={160}
              height={160}
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2 text-[#5263E0]">Strength</h3>
            <p>{personality.strength}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2 text-[#5263E0]">Weakness</h3>
            <p>{personality.weakness}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2 text-[#5263E0]">Traits</h3>
            <p>{personality.traits}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2 text-[#5263E0]">What Makes Them Lovable</h3>
            <p>{personality.lovable}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2 text-[#5263E0]">Quirks</h3>
            <p>{personality.quirks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-2 text-[#5263E0]">Bestie</h3>
            <p>{personality.bestie}</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="bg-[#5263E0] text-white px-8 py-3 rounded-full font-semibold text-lg uppercase tracking-wide hover:bg-[#3C5D99] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Take the Quiz Again
          </Link>
        </div>
      </div>
    </div>
  )
}