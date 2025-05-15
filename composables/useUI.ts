export const useUI = () => {
    const uiState = useState('ui-state', () => ({
        isHamMenuOpen: false
    }))

    const isMenuOpen = computed(() => uiState.value.isHamMenuOpen)
    const toggleMenuPanel = () => {
        uiState.value.isHamMenuOpen = !uiState.value.isHamMenuOpen
    }

    return {
        isMenuOpen,
        toggleMenuPanel
    }
}