/**
 * # LanguageSwitchLink
 *
 * This React component is used to create language switch links for a website that supports multiple languages.
 * It is intended for use in a Static Site Generator (SSG) context.
 * It uses the Next.js `Link` component to navigate to the appropriate page with the selected language.
 * It also uses the `useRouter` hook to retrieve the current URL and modify it to include the selected language.
 *
 * ## Usage
 *
 * To use the `LanguageSwitchLink`, import it into your React component file and use it to create a language switch link.
 *
 * ```tsx
 * import LanguageSwitchLink from 'components/LanguageSwitchLink'
 *
 * function MyComponent() {
 *   return (
 *     <div>
 *       <LanguageSwitchLink locale="en" href="/">
 *         English
 *       </LanguageSwitchLink>
 *       <LanguageSwitchLink locale="es" href="/">
 *         Español
 *       </LanguageSwitchLink>
 *     </div>
 *   )
 * }
 * ```
 *
 * ## Props
 *
 * The `LanguageSwitchLink` accepts the following props:
 *
 * ```typescript
 * interface LanguageSwitchLinkProps {
 *   locale: string
 *   href?: string
 * }
 * ```
 *
 * - `locale` (required): The language/locale code for the link. This should be a string that matches the code for one of the supported languages on your website.
 * - `href`: An optional string that represents the URL that the link should navigate to. If not provided, the `LanguageSwitchLink` will use the current page URL and replace the `locale` parameter.
 *
 * ## Behavior
 *
 * When the `LanguageSwitchLink` is rendered, it checks the current URL for any query parameters and replaces any instances of `[locale]` in the URL with the selected `locale` prop.
 * If a `href` prop is provided, it appends the selected `locale` to the URL.
 * If the `href` prop is not provided, it will use the modified URL with the `locale` parameter replaced.
 * It also adds an `onClick` event handler to cache the selected language using a `languageDetector` utility function.
 *
 * ## Limitations
 *
 * The `LanguageSwitchLink` component is intended for use in a Static Site Generator (SSG) context.
 * It is not recommended for use in a server-rendered application, as it may not work correctly with dynamic routing.
 *
 * ## Example
 *
 * Here is an example of how the `LanguageSwitchLink` can be used in a Next.js application:
 *
 * ```jsx
 * import LanguageSwitchLink from 'components/LanguageSwitchLink'
 *
 * function HomePage() {
 *   return (
 *     <div>
 *       <h1>Welcome to my site!</h1>
 *       <LanguageSwitchLink locale="en" href="/">
 *         English
 *       </LanguageSwitchLink>
 *       <LanguageSwitchLink locale="es" href="/">
 *         Español
 *       </LanguageSwitchLink>
 *     </div>
 *   )
 * }
 *
 * export default HomePage
 * ```
 *
 * In this example, the `LanguageSwitchLink` is used to create links to switch between the English and Spanish versions of the website.
 * When a link is clicked, the `LanguageSwitchLink` will modify the URL to include the selected language and navigate to the appropriate page.
 */

import Link from 'next/link'
import { useRouter } from 'next/router'
import languageDetector from '../utils/languageDetector'

interface LanguageSwitchLinkProps {
  locale: string
  href?: string
}

const LanguageSwitchLink = ({ locale, ...rest }: LanguageSwitchLinkProps): JSX.Element => {
  const router = useRouter()

  let href = rest.href || router.asPath
  let pName = router.pathname
  Object.keys(router.query).forEach((k: string) => {
    if (k === 'locale') {
      pName = pName.replace(`[${k}]`, locale)
      return
    }
    pName = pName.replace(`[${k}]`, router.query[k] as string)
  })
  if (locale) {
    href = rest.href ? `/${locale}${rest.href}` : pName
  }
  if (href.indexOf(`/${locale}`) < 0) {
    href = `/${locale}${href}`
  }

  return (
    <Link href={href}>
      <button
        type="button"
        style={{
          fontSize: 'small',
        }}
        onClick={() => languageDetector.cache && languageDetector.cache(locale)}
      >
        {locale}
      </button>
    </Link>
  )
}

export default LanguageSwitchLink
