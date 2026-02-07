import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const CustomPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#fde7ec',
            100: '#f9c2ce',
            200: '#f39aac',
            300: '#ed728a',
            400: '#e64d6b',
            500: '#E0345E', // 🎯 TU COLOR PRINCIPAL
            600: '#cc2f55',
            700: '#b0284a',
            800: '#94213f',
            900: '#781a34'
        }
    },

    components: {
        button: {
            colorScheme: {
                light: {
                    root: {                        
                        borderRadius: '24px'
                    }
                }
            }
        },

        dialog: {
            colorScheme: {
                light: {
                    root: {
                        borderRadius: '18px'
                    }
                }
            }
        },

        formField: {
            colorScheme: {
                light: {
                    root: {
                        borderRadius: '12px'
                    }
                }
            }
        }
    }
});

export default CustomPreset;
