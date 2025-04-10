document.addEventListener('DOMContentLoaded', function() {

    const accessibilityBtn = document.getElementById('accessibilityBtn');
    const accessibilityPanel = document.getElementById('accessibilityPanel');
    const closeSettings = document.getElementById('closeSettings');
    const highContrastToggle = document.getElementById('highContrastToggle');
    const largeTextToggle = document.getElementById('largeTextToggle');
    const saveSettingsBtn = document.getElementById('saveSettings');
    const resetSettingsBtn = document.getElementById('resetSettings');


    if (accessibilityBtn && accessibilityPanel) {
        accessibilityBtn.addEventListener('click', function () {
            accessibilityPanel.classList.toggle('active');
        });
    }

    if (closeSettings && accessibilityPanel) {
        closeSettings.addEventListener('click', function () {
            accessibilityPanel.classList.remove('active');
        });
    }


    loadSettings();


    if (highContrastToggle) {
        highContrastToggle.addEventListener('change', toggleHighContrast);
    }

    if (largeTextToggle) {
        largeTextToggle.addEventListener('change', toggleLargeText);
    }

    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', saveSettings);
    }

    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', resetSettings);
    }

    function toggleHighContrast() {
        document.body.classList.toggle('high-contrast', this.checked);
    }

    function toggleLargeText() {
        document.body.classList.toggle('large-text', this.checked);
    }

    function toggleScreenReader() {
        if (this.checked) {
            enableScreenReaderSupport();
        } else {
            disableScreenReaderSupport();
        }
        saveScreenReaderSetting();
    }

    function loadSettings() {
        if (localStorage.getItem('highContrast') === 'true' && highContrastToggle) {
            highContrastToggle.checked = true;
            document.body.classList.add('high-contrast');
        }

        if (localStorage.getItem('largeText') === 'true' && largeTextToggle) {
            largeTextToggle.checked = true;
            document.body.classList.add('large-text');
        }
    }

    function saveSettings() {
        localStorage.setItem('highContrast', highContrastToggle.checked);
        localStorage.setItem('largeText', largeTextToggle.checked);
        alert('Settings saved!');
    }

    function resetSettings() {
        localStorage.removeItem('highContrast');
        localStorage.removeItem('largeText');
        localStorage.removeItem('muteAudio');
        localStorage.removeItem('screenReader');

        if (highContrastToggle) highContrastToggle.checked = false;
        if (largeTextToggle) largeTextToggle.checked = false;

        document.body.classList.remove('high-contrast', 'large-text');
        disableScreenReaderSupport();

        alert('Settings reset to default');
    }

    function enableScreenReaderSupport() {
        document.querySelectorAll('button, a, input, [role="button"]').forEach(el => {
            if (!el.getAttribute('aria-label')) {
                el.setAttribute('aria-label', el.textContent);
            }
        });

    }
});
