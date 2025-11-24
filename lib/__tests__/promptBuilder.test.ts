import {
  buildPrompt,
  validatePrompt,
  MAX_PROMPT_LENGTH,
  businessDescriptions,
  timeDescriptions,
  genreDescriptions,
  energyDescriptions,
} from '../promptBuilder'
import { MusicPreferences } from '@/types'

describe('promptBuilder', () => {
  describe('buildPrompt', () => {
    // Test all genre combinations stay under character limit
    describe('character limit compliance', () => {
      const allGenres = Object.keys(genreDescriptions)
      const allBusinessTypes = Object.keys(businessDescriptions)
      const allTimeOfDay = Object.keys(timeDescriptions)
      const allEnergyLevels = [1, 2, 3, 4, 5]

      it.each(allGenres)('genre "%s" stays under 450 characters for all combinations', (genre) => {
        allBusinessTypes.forEach((businessType) => {
          allTimeOfDay.forEach((timeOfDay) => {
            allEnergyLevels.forEach((energy) => {
              const preferences: MusicPreferences = {
                businessType: businessType as MusicPreferences['businessType'],
                timeOfDay: timeOfDay as MusicPreferences['timeOfDay'],
                genre: genre as MusicPreferences['genre'],
                energy,
              }

              const prompt = buildPrompt(preferences)
              const validation = validatePrompt(prompt)

              expect(validation.valid).toBe(true)
              expect(prompt.length).toBeLessThanOrEqual(MAX_PROMPT_LENGTH)
            })
          })
        })
      })
    })

    // Test prompt content structure
    describe('prompt content', () => {
      it('includes genre description', () => {
        const preferences: MusicPreferences = {
          businessType: 'cafe',
          timeOfDay: 'morning',
          genre: 'jazz',
          energy: 3,
        }

        const prompt = buildPrompt(preferences)
        expect(prompt).toContain('saxophone')
        expect(prompt).toContain('brushed drums')
      })

      it('includes energy description', () => {
        const preferences: MusicPreferences = {
          businessType: 'cafe',
          timeOfDay: 'morning',
          genre: 'jazz',
          energy: 1,
        }

        const prompt = buildPrompt(preferences)
        expect(prompt).toContain('Very calm')
        expect(prompt).toContain('slow tempo')
      })

      it('includes business type', () => {
        const preferences: MusicPreferences = {
          businessType: 'spa',
          timeOfDay: 'morning',
          genre: 'ambient',
          energy: 2,
        }

        const prompt = buildPrompt(preferences)
        expect(prompt).toContain('spa sanctuary')
      })

      it('includes time of day', () => {
        const preferences: MusicPreferences = {
          businessType: 'hotel',
          timeOfDay: 'late_night',
          genre: 'jazz',
          energy: 2,
        }

        const prompt = buildPrompt(preferences)
        expect(prompt).toContain('late night')
        expect(prompt).toContain('mellow')
      })

      it('ends with Instrumental marker', () => {
        const preferences: MusicPreferences = {
          businessType: 'restaurant',
          timeOfDay: 'dinner',
          genre: 'classical',
          energy: 3,
        }

        const prompt = buildPrompt(preferences)
        expect(prompt).toMatch(/Instrumental\.$/)
      })

      it('defaults to energy level 3 when not provided', () => {
        const preferences: MusicPreferences = {
          businessType: 'cafe',
          timeOfDay: 'morning',
          genre: 'pop',
          energy: 3,
        }

        const preferencesNoEnergy = {
          ...preferences,
          energy: undefined as unknown as number,
        }

        const prompt = buildPrompt(preferencesNoEnergy as MusicPreferences)
        expect(prompt).toContain('Moderate tempo')
      })
    })

    // Test specific genre instrumentation
    describe('genre instrumentation', () => {
      const basePrefs = {
        businessType: 'cafe' as const,
        timeOfDay: 'morning' as const,
        energy: 3,
      }

      it('jazz includes correct instruments', () => {
        const prompt = buildPrompt({ ...basePrefs, genre: 'jazz' })
        expect(prompt).toContain('saxophone')
        expect(prompt).toContain('trumpet')
        expect(prompt).toContain('piano')
      })

      it('classical includes correct instruments', () => {
        const prompt = buildPrompt({ ...basePrefs, genre: 'classical' })
        expect(prompt).toContain('piano')
        expect(prompt).toContain('strings')
        expect(prompt).toContain('woodwinds')
      })

      it('bossa_nova includes correct instruments', () => {
        const prompt = buildPrompt({ ...basePrefs, genre: 'bossa_nova' })
        expect(prompt).toContain('nylon guitar')
        expect(prompt).toContain('flute')
      })

      it('electronic includes synth elements', () => {
        const prompt = buildPrompt({ ...basePrefs, genre: 'electronic' })
        expect(prompt).toContain('synth')
        expect(prompt).toContain('beats')
      })

      it('ambient includes atmospheric elements', () => {
        const prompt = buildPrompt({ ...basePrefs, genre: 'ambient' })
        expect(prompt).toContain('pads')
        expect(prompt).toContain('reverb')
        expect(prompt).toContain('meditative')
      })
    })

    // Test energy levels
    describe('energy levels', () => {
      const basePrefs = {
        businessType: 'gym' as const,
        timeOfDay: 'morning' as const,
        genre: 'electronic' as const,
      }

      it('energy 1 is very calm', () => {
        const prompt = buildPrompt({ ...basePrefs, energy: 1 })
        expect(prompt).toContain('Very calm')
        expect(prompt).toContain('slow tempo')
      })

      it('energy 3 is moderate', () => {
        const prompt = buildPrompt({ ...basePrefs, energy: 3 })
        expect(prompt).toContain('Moderate tempo')
        expect(prompt).toContain('balanced')
      })

      it('energy 5 is energetic', () => {
        const prompt = buildPrompt({ ...basePrefs, energy: 5 })
        expect(prompt).toContain('Energetic')
        expect(prompt).toContain('quick tempo')
        expect(prompt).toContain('powerful')
      })
    })
  })

  describe('validatePrompt', () => {
    it('returns valid for prompts under limit', () => {
      const result = validatePrompt('A short prompt')
      expect(result.valid).toBe(true)
      expect(result.length).toBe(14)
      expect(result.error).toBeUndefined()
    })

    it('returns invalid for empty prompts', () => {
      const result = validatePrompt('')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('empty')
    })

    it('returns invalid for prompts over limit', () => {
      const longPrompt = 'a'.repeat(451)
      const result = validatePrompt(longPrompt)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('451')
      expect(result.error).toContain('450')
    })

    it('returns valid for prompts exactly at limit', () => {
      const exactPrompt = 'a'.repeat(450)
      const result = validatePrompt(exactPrompt)
      expect(result.valid).toBe(true)
    })
  })

  describe('exported constants', () => {
    it('MAX_PROMPT_LENGTH is 450', () => {
      expect(MAX_PROMPT_LENGTH).toBe(450)
    })

    it('all business types have descriptions', () => {
      const expectedTypes = ['restaurant', 'cafe', 'retail', 'spa', 'gym', 'hotel']
      expectedTypes.forEach((type) => {
        expect(businessDescriptions[type]).toBeDefined()
        expect(businessDescriptions[type].length).toBeGreaterThan(0)
      })
    })

    it('all time periods have descriptions', () => {
      const expectedTimes = ['morning', 'lunch', 'dinner', 'evening', 'late_night']
      expectedTimes.forEach((time) => {
        expect(timeDescriptions[time]).toBeDefined()
        expect(timeDescriptions[time].length).toBeGreaterThan(0)
      })
    })

    it('all genres have descriptions', () => {
      const expectedGenres = ['jazz', 'classical', 'acoustic', 'bossa_nova', 'ambient', 'electronic', 'pop']
      expectedGenres.forEach((genre) => {
        expect(genreDescriptions[genre]).toBeDefined()
        expect(genreDescriptions[genre].length).toBeGreaterThan(0)
      })
    })

    it('all energy levels 1-5 have descriptions', () => {
      for (let i = 1; i <= 5; i++) {
        expect(energyDescriptions[i]).toBeDefined()
        expect(energyDescriptions[i].length).toBeGreaterThan(0)
      }
    })
  })
})
