import { describe, expect, it } from 'vitest'
import { useUI } from '../useUI'

describe('useUI', () => {
  it('works in Nuxt environment', () => {
    const { isMenuOpen, toggleMenuPanel } = useUI()
    
    expect(isMenuOpen.value).toBe(false)
    
    toggleMenuPanel()
    expect(isMenuOpen.value).toBe(true)
    
    toggleMenuPanel()
    expect(isMenuOpen.value).toBe(false)
  })
})