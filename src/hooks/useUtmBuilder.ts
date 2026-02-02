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

const normalizeUtmData = (data: any): UtmParams => {
  if (!data) {
    return { baseUrl: '', source: '', medium: '', campaign: '', term: '', content: '' }
  }

  return {
    baseUrl: data.baseUrl || data.url || '',
    source: data.source || data.utm_source || data.utmSource || '',
    medium: data.medium || data.utm_medium || data.utmMedium || '',
    campaign: data.campaign || data.utm_campaign || data.campaignName || '',
    term: data.term || data.utm_term || '',
    content: data.content || data.utm_content || '',
  }
}

export function useUtmBuilder() {
  const [params, setParams] = useState<UtmParams>({
    baseUrl: '', source: '', medium: '', campaign: '', term: '', content: ''
  })
  
  const [presets, setPresets] = useState<Preset[]>([])
  const [resultUrl, setResultUrl] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('utm_presets')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const normalizedPresets = Array.isArray(parsed) 
          ? parsed.map((p: any) => ({
              ...p,
              params: normalizeUtmData(p.params)
            }))
          : []
          
        setPresets(normalizedPresets)
      } catch (e) {
        console.error("Błąd odczytu localStorage", e)
      }
    }
  }, [])

  useEffect(() => {
    if (!params.baseUrl) {
      setResultUrl('')
      return
    }
    try {
      let validBase = params.baseUrl.trim()
      if (!validBase.match(/^https?:\/\//)) {
        validBase = 'https://' + validBase
      }
      const url = new URL(validBase)
      
      if (params.source) url.searchParams.set('utm_source', params.source)
      if (params.medium) url.searchParams.set('utm_medium', params.medium)
      if (params.campaign) url.searchParams.set('utm_campaign', params.campaign)
      if (params.term) url.searchParams.set('utm_term', params.term)
      if (params.content) url.searchParams.set('utm_content', params.content)
      
      setResultUrl(url.toString().replace(/%20/g, '+'))
    } catch (e) {
      setResultUrl('')
    }
  }, [params])

  const updateField = (field: keyof UtmParams, value: string) => {
    setParams(prev => ({ ...prev, [field]: value }))
  }

  const reset = () => {
    setParams({ baseUrl: '', source: '', medium: '', campaign: '', term: '', content: '' })
  }

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
    const cleanParams = normalizeUtmData(preset.params)
    setParams(cleanParams)
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