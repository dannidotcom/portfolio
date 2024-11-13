export const useUtils = () => {
    // Supprime le dernier slash de l'URL de base importée depuis l'environnement
    const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, '')

    // Tableau de couleurs aléatoires en format RGB
    const RANDOM_COLOR_ARRAY = [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(197,176,255)',
        'rgb(142, 227, 197)',
        'rgb(238, 183, 154)',
        'rgb(164,205,253)',
        'rgb(246,169,255)',
        'rgb(171, 235, 198)',
        'rgb(255, 201, 214)',
        'rgb(209, 247, 200)',
        'rgb(235, 214, 169)',
        'rgb(174, 229, 248)',
        'rgb(246, 224, 196)',
        'rgb(255, 217, 232)'
    ]

    /**
     * Ajoute une classe CSS au body de la page
     * @param {String} className - Le nom de la classe à ajouter
     */
    const addClassToBody = (className) => {
        document.body.classList.add(className)
    }

    /**
     * Supprime une classe CSS du body de la page
     * @param {String} className - Le nom de la classe à supprimer
     */
    const removeClassFromBody = (className) => {
        document.body.classList.remove(className)
    }

    /**
     * Limite une valeur entre un minimum et un maximum
     * @param {number} value - La valeur à limiter
     * @param {number} min - La valeur minimale
     * @param {number} max - La valeur maximale
     * @return {number} - La valeur limitée
     */
    const clamp = (value, min, max) => {
        return Math.min(Math.max(value, min), max)
    }

    /**
     * Récupère la valeur d'une couleur Bootstrap définie en CSS
     * @param {string} colorName - Le nom de la couleur Bootstrap
     * @return {string} - La valeur de la couleur
     */
    const getBootstrapColor = (colorName) => {
        const root = document.documentElement
        return getComputedStyle(root).getPropertyValue('--bs-' + colorName).trim()
    }

    /**
     * Récupère la valeur d'une variable SCSS personnalisée définie en CSS
     * @param {string} colorName - Le nom de la variable SCSS
     * @return {string} - La valeur de la variable
     */
    const getRootSCSSVariable = (colorName) => {
        const root = document.documentElement
        return getComputedStyle(root).getPropertyValue('--' + colorName).trim()
    }

    /**
     * Génère un chemin complet basé sur l'URL de base et le chemin fourni
     * @param {string} path - Le chemin relatif
     * @return {string|null} - Le chemin complet ou null si invalide
     */
    const resolvePath = (path) => {
        if (!path) {
            return null
        }

        if (path.charAt(0) !== '/') {
            path = '/' + path
        }

        return BASE_URL + path
    }

    /**
     * Retourne une chaîne de caractères si la condition est vraie
     * @param {boolean} condition - La condition à vérifier
     * @param {string} string - La chaîne à retourner si la condition est vraie
     * @return {string|*} - La chaîne ou une chaîne vide
     */
    const strIf = (condition, string) => {
        if (condition)
            return string
        return ''
    }

    /**
     * Génère une étiquette aléatoire avec un préfixe et un identifiant unique
     * @param {string} prefix - Le préfixe de l'étiquette
     * @return {string} - L'étiquette générée
     */
    const randomTag = (prefix) => {
        return prefix + new Date().getTime() + '-r-' + Math.random().toFixed(3).replace('.', '')
    }

    /**
     * Vérifie si un élément est en dehors des limites de la fenêtre d'affichage
     * @param {HTMLElement} element - L'élément à vérifier
     * @param {number} [offset=0] - L'offset à considérer
     * @return {boolean} - Vrai si l'élément est en dehors des limites, sinon faux
     */
    const isElementOutsideBounds = (element, offset) => {
        offset = offset || 0
        if (!element)
            return true

        const rect = element.getBoundingClientRect()
        if (!rect)
            return true

        return (
            rect.bottom + offset < 0 ||
            rect.right + offset < 0 ||
            rect.left - offset > window.innerWidth ||
            rect.top - offset > window.innerHeight
        )
    }

    /**
     * Vérifie si l'appareil est sous Android
     * @return {boolean} - Vrai si Android, sinon faux
     */
    const isAndroid = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /android/.test(userAgent);
    }

    /**
     * Vérifie si l'appareil est sous iOS
     * @return {boolean} - Vrai si iOS, sinon faux
     */
    const isIOS = () => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /iphone|ipad|ipod/.test(userAgent)
    }

    /**
     * Vérifie si l'appareil est un iPad
     * @return {boolean} - Vrai si iPad, sinon faux
     */
    const isIPad = () => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /ipad/.test(userAgent)
    }

    /**
     * Vérifie si l'appareil est un appareil tactile
     * @return {boolean} - Vrai si appareil tactile, sinon faux
     */
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0))
    }

    /**
     * Vérifie si le navigateur est Chrome
     * @return {boolean} - Vrai si Chrome, sinon faux
     */
    const isChrome = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera
        return /CriOS/.test(userAgent)
    }

    /**
     * Vérifie si le navigateur est Firefox
     * @return {boolean} - Vrai si Firefox, sinon faux
     */
    const isFirefox = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return /Firefox/.test(userAgent);
    }

    /**
     * Vérifie si le navigateur est Safari
     * @return {boolean} - Vrai si Safari, sinon faux
     */
    const isSafari = () => {
        const userAgent = navigator.userAgent;
        return /^((?!chrome|android).)*safari/i.test(userAgent);
    }

    /**
     * Parse une chaîne de texte JSON en ajoutant une mise en forme personnalisée
     * @param {string} text - Le texte à parser
     * @return {string} - Le texte parsé avec mise en forme
     */
    const parseJsonText = (text) => {
        if (typeof text !== 'string')
            return text

        let parsed = text
        parsed = parsed.replace(/\*\*(.*?)\*\*/g, `<span class="text-highlight">$1</span>`)
        return parsed
    }

    /**
     * Limite la taille d'une chaîne de caractères
     * @param {string} string - La chaîne à limiter
     * @param {number} maxChars - Le nombre maximum de caractères
     * @return {string} - La chaîne limitée avec une indication de coupure
     */
    const limitTextSize = (string, maxChars) => {
        if (string.length <= maxChars) {
            return string
        }

        return string.substring(0, maxChars - 5) + '(...)'
    }

    /**
     * Vérifie si toutes les images sélectionnées par un sélecteur sont chargées
     * @param {string} querySelector - Le sélecteur CSS pour les images
     * @return {boolean} - Vrai si toutes les images sont chargées, sinon faux
     */
    const didLoadAllImages = (querySelector) => {
        const images = document.querySelectorAll(querySelector || 'img')
        let allLoaded = true

        images.forEach((img) => {
            if (!img.complete || img.naturalHeight === 0) {
                allLoaded = false;
            }
        })

        return allLoaded
    }

    /**
     * Formate une date avec des options spécifiques
     * @param {string} rawDate - La date brute sous forme de chaîne
     * @param {string} languageId - L'identifiant de la langue (ex: 'fr-FR')
     * @param {boolean} displayMonthAsString - Affiche le mois en tant que chaîne si vrai
     * @param {boolean} hideDay - Cache le jour si vrai
     * @return {string|null} - La date formatée ou null si invalide
     */
    const formatDate = (rawDate, languageId, displayMonthAsString, hideDay) => {
        if (!rawDate || rawDate === '')
            return ''

        if (!rawDate.includes('/'))
            return rawDate

        const options = {
            'year': 'numeric',
            'month': displayMonthAsString ? 'short' : 'numeric',
            'day': !hideDay ? 'numeric' : undefined
        }

        const date = new Date(rawDate)
        date.setDate(date.getDate() + 1)

        let localization = date.toLocaleString(languageId, options)
        localization = localization.charAt(0).toUpperCase() + localization.slice(1)
        return localization
    }

    /**
     * Formate un intervalle de dates
     * @param {string} rawDateStart - Date de début
     * @param {string} rawDateEnd - Date de fin
     * @param {string} languageId - L'identifiant de la langue
     * @param {boolean} displayMonthAsString - Affiche le mois en tant que chaîne si vrai
     * @param {boolean} hideDay - Cache le jour si vrai
     * @return {string|null} - L'intervalle formaté ou null si invalide
     */
    const formatDateInterval = (rawDateStart, rawDateEnd, languageId, displayMonthAsString, hideDay) => {
        let str = ''
        const formattedStart = formatDate(rawDateStart, languageId, displayMonthAsString, hideDay)
        const formattedEnd = formatDate(rawDateEnd, languageId, displayMonthAsString, hideDay)

        if (formattedStart !== '') {
            str += formattedStart
        }

        if (formattedEnd !== '') {
            if (str.length !== 0) {
                str += ' ➔ '
            }

            str += formattedEnd
        }

        return str
    }

    /**
     * Calcule le nombre d'années écoulées depuis une date donnée
     * @param {string} rawDate - La date de départ
     * @return {Number} - Le nombre d'années écoulées
     */
    const getYearsPassedSince = (rawDate) => {
        if (!rawDate)
            return 0

        const pastDate = new Date(rawDate)
        const currentDate = new Date()
        const differenceInMilliseconds = currentDate - pastDate
        const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000

        return differenceInMilliseconds / millisecondsPerYear
    }

    /**
     * Vérifie si une URL est externe
     * @param {string} url - L'URL à vérifier
     * @return {boolean} - Vrai si l'URL est externe, sinon faux
     */
    const isUrlExternal = (url) => {
        const link = document.createElement('a')
        link.href = url
        return link.hostname !== window.location.hostname;
    }

    /**
     * Active ou désactive le défilement de la page
     * @param {Boolean} enabled - Indique si le défilement est activé ou non
     */
    const setPageScrollingEnabled = (enabled) => {
        const body = document.body

        if (!enabled) {
            window.savedScrollY = window.scrollY
            body.classList.add(`body-no-scroll`)
            if (isIOS()) {
                body.classList.add(`position-fixed`)
            }
        }
        else {
            body.classList.remove(`body-no-scroll`)
            body.classList.remove(`position-fixed`)

            if (window.savedScrollY) {
                window.scrollTo(0, window.savedScrollY)
                window.savedScrollY = null
            }
        }
    }

    /**
     * Récupère une couleur pour un graphique en fonction de son identifiant
     * @param {number} colorId - L'identifiant de la couleur
     * @return {string} - La couleur correspondante
     */
    const getColorForChart = (colorId) => {
        return RANDOM_COLOR_ARRAY[colorId]
    }

    // Retourne toutes les fonctions utilitaires pour utilisation
    return {
        addClassToBody,
        removeClassFromBody,
        clamp,
        getBootstrapColor,
        getRootSCSSVariable,
        resolvePath,
        strIf,
        randomTag,
        isElementOutsideBounds,
        isAndroid,
        isIOS,
        isIPad,
        isTouchDevice,
        isChrome,
        isFirefox,
        isSafari,
        parseJsonText,
        limitTextSize,
        didLoadAllImages,
        formatDate,
        formatDateInterval,
        getYearsPassedSince,
        isUrlExternal,
        setPageScrollingEnabled,
        getColorForChart
    }
}
