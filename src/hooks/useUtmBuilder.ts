import { useState, useEffect } from 'react'
import { toast } from "sonner"

// Definicja typu dla naszych parametrów
export type UtmParams = {
  baseUrl: string
  source: string
  medium: string
  campaign: string
  term: string
  content: string
}

// Definicja szablonu (Preset)
export type Preset = {
  id: string
  name: string
  params: UtmParams
}

export function useUtmBuilder() {
  const [params, setParams] = useState<UtmParams>({
    baseUrl: '', source: '', medium: '', campaign: '', term: '', content: ''
  })
  
  const [presets, setPresets] = useState<Preset[]>([])
  const [resultUrl, setResultUrl] = useState('')

  // 1. Ładowanie szablonów z LocalStorage przy starcie
  useEffect(() => {
    const saved = localStorage.getItem('utm_presets')
    if (saved) {
      try {
        setPresets(JSON.parse(saved))
      } catch (e) {
        console.error("Błąd odczytu localStorage", e)
      }
    }
  }, [])

  // 2. Generowanie URL (tak jak wcześniej)
  useEffect(() => {
    if (!params.baseUrl) {
      setResultUrl('')
      return
    }
    try {
      let validBase = params.baseUrl
      if (!validBase.startsWith('http')) {
        validBase = 'https://' + validBase
      }
      const url = new URL(validBase)
      if (params.source) url.searchParams.set('utm_source', params.source)
      if (params.medium) url.searchParams.set('utm_medium', params.medium)
      if (params.campaign) url.searchParams.set('utm_campaign', params.campaign)
      
      setResultUrl(url.toString().replace(/%20/g, '+'))
    } catch (e) {
      setResultUrl('')
    }
  }, [params])

  // Funkcje pomocnicze
  const updateField = (field: keyof UtmParams, value: string) => {
    setParams(prev => ({ ...prev, [field]: value }))
  }

  const reset = () => {
    setParams({ baseUrl: '', source: '', medium: '', campaign: '', term: '', content: '' })
  }

  // --- LOGIKA PRESETÓW ---

  const savePreset = (name: string) => {
    const newPreset: Preset = {
      id: Date.now().toString(), // Proste ID na bazie czasu
      name,
      params: { ...params } // Kopia aktualnych parametrów
    }
    
    const updatedPresets = [...presets, newPreset]
    setPresets(updatedPresets)
    localStorage.setItem('utm_presets', JSON.stringify(updatedPresets))
    toast.success("Szablon zapisany! 💾")
  }

  const loadPreset = (preset: Preset) => {
    setParams(preset.params)
    toast.info(`Wczytano szablon: ${preset.name}`)
  }

  const deletePreset = (id: string) => {
    const updated = presets.filter(p => p.id !== id)
    setPresets(updated)
    localStorage.setItem('utm_presets', JSON.stringify(updated))
    toast.error("Szablon usunięty 🗑️")
  }

  return { params, updateField, resultUrl, reset, presets, savePreset, loadPreset, deletePreset }
}