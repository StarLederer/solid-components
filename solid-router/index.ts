import type { Component, JSXElement } from 'solid-js'
import { createEffect, createSignal, on } from 'solid-js'
import type { Params } from '@solidjs/router'
import { useParams } from '@solidjs/router'

/** Re-renders when contents of `useParams()` update. */
const RematchDynamic: Component<{
  component: Component
  on?: (params: Params) => any
}> = (props) => {
  const params = useParams()
  const [page, setPage] = createSignal<JSXElement>(props.component({}))

  const paramSignal = () => props.on ? props.on(params) : Object.values(params)

  createEffect(on(paramSignal, () => {
    setPage(() => props.component({}))
  }))

  return page
}

export {
  RematchDynamic,
}
