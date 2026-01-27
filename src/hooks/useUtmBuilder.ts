import { useState, useEffect } from 'react'
import { toast } from "sonner"

export type UtmParams = {
  baseUrl: string
  source: string
  medium: string
  campaign: string
  term: string
  content: string
}

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

  // 2. Generowanie URL na żywo
  useEffect(() => {
    if (!params.baseUrl) {
      setResultUrl('')
      return
    }
    try {
      let validBase = params.baseUrl
      // UX: Dodaj https:// jeśli user zapomniał
      if (!validBase.startsWith('http')) {
        validBase = 'https://' + validBase
      }
      const url = new URL(validBase)
      
      if (params.source) url.searchParams.set('utm_source', params.source)
      if (params.medium) url.searchParams.set('utm_medium', params.medium)
      if (params.campaign) url.searchParams.set('utm_campaign', params.campaign)
      if (params.term) url.searchParams.set('utm_term', params.term)
      if (params.content) url.searchParams.set('utm_content', params.content)
      
      // Zamiana spacji na plusy (standard UTM)
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
      id: Date.now().toString(),
      name,
      params: { ...params }
    }
    
    const updatedPresets = [...presets, newPreset]
    setPresets(updatedPresets)
    localStorage.setItem('utm_presets', JSON.stringify(updatedPresets))
    toast.success("Szablon zapisany! 💾")
  }

  const loadPreset = (preset: Preset) => {
    setParams({
      ...preset.params,
      // Zabezpieczenie dla starych szablonów (żeby React nie krzyczał o uncontrolled input)
      term: preset.params.term || '', 
      content: preset.params.content || ''
    })
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