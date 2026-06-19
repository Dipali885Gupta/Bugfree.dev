declare module "splitting" {
  interface SplittingOptions {
    target?: string | Element | NodeListOf<Element> | Element[]
    by?: string
    key?: string | null
    whitespace?: boolean
  }

  function Splitting(options?: SplittingOptions): unknown[]

  export default Splitting
}

declare module "splitting/dist/splitting.css"
