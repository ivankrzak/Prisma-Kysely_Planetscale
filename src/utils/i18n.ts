/**
 * This is a utility function that is used in a Next.js application with the next-i18next localization library. It is intended for use in a server-side rendering (SSR) context.
 *
 * ## Usage
 *
 * To use the `serverSideTranslations` function, import it into your server-side rendering code and use it to generate server-side translations for the appropriate page.
 *
 * ```typescript
 * import { serverSideTranslations } from 'utils/translations'
 *
 * export const getServerSideProps = async ({ locale }) => {
 *   return {
 *     props: {
 *       ...(await serverSideTranslations({ locale })),
 *     },
 *   }
 * }
 * ```
 *
 * The `serverSideTranslations` function is called with the `locale` and `namespacesRequired` parameters.
 * `locale` represents the current locale for the website, while `namespacesRequired` represents an array of the namespaces required for the current page.
 *
 * ## Limitations
 *
 * The `serverSideTranslations` function is intended for use in a server-side rendering (SSR) context. It may not work correctly with client-side rendering or static site generation.
 */
import { Namespace } from 'i18next'
import { serverSideTranslations as sst } from 'next-i18next/serverSideTranslations'

type ArrayElementOrSelf<T> = T extends Array<infer U> ? U[] : T

/**
 * The `serverSideTranslations` function is a wrapper for the `serverSideTranslations` function provided by the `next-i18next` library.
 * It takes in a `locale` parameter, which represents the current locale for the website, and an optional `namespacesRequired` parameter, which represents an array of the namespaces required for the current page.
 *
 * The function returns a Promise that resolves to an object containing the translations for the page.
 *
 * @param locale (optional): A string that represents the current locale for the website. If not provided, the function will default to the `'en'` locale.
 * @param namespacesRequired (optional): An array of strings that represents the namespaces required for the current page.
 */
export const serverSideTranslations = (
  { locale }: { locale?: string },
  namespacesRequired?: ArrayElementOrSelf<Namespace> | undefined,
) => sst(locale ?? 'en', namespacesRequired as string[])
