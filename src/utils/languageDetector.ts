import languageDetector from 'next-language-detector'
import i18nextConfig from '../../next-i18next.config'

/**
 *
 * This is a function that creates a language detector object for use with the `next-i18next` localization library in a Next.js application.
 * It is intended for use in a Static Site Generator (SSG) context.
 *
 * ## Usage
 *
 * To use the `languageDetector` function, import it into your Next.js application and invoke it with the appropriate configuration options.
 *
 * ```typescript
 * import languageDetector from 'utils/languageDetector'
 * ```
 *
 * ## Configuration Options
 *
 * The `languageDetector` function accepts the following configuration options:
 *
 * - `fallbackLng`: A string indicating the default language/locale to use when no other language is specified. This should match the default language/locale in your `i18next` configuration.
 * - `supportedLngs`: An array of strings indicating the supported languages/locales on your website. This should match the list of supported languages/locales in your `i18next` configuration.
 *
 * ## Behavior
 *
 * The `languageDetector` function creates a language detector object that can be used with the `next-i18next` localization library to automatically detect and set the user's preferred language based on their browser settings.
 * It uses the `fallbackLng` and `supportedLngs` options to determine the default and supported languages/locales for the website.
 *
 * ## Limitations
 *
 * The `languageDetector` function is intended for use in a Static Site Generator (SSG) context. It may not work correctly with server-side rendering or client-side rendering.
 *
 * ## Example
 *
 * Here is an example of how the `languageDetector` function can be used in a Next.js application with `next-i18next`:
 *
 * ```typescript
 * import languageDetector from 'utils/languageDetector'
 * ```
 *
 * `languageDetector` function is invoked with the `fallbackLng` and `supportedLngs` options, using the configuration options from the `i18nextConfig` object.
 * This creates a language detector object that can be used with `next-i18next` to automatically detect and set the user's preferred language.
 */
export default languageDetector({
  fallbackLng: i18nextConfig.i18n.defaultLocale,
  supportedLngs: i18nextConfig.i18n.locales,
})
