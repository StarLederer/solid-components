import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import type { Params } from '@solidjs/router'
import { useParams } from '@solidjs/router'

/** Re-renders when contents of `useParams()` update. */
export const RematchDynamic: Component<{
  component: Component
  when: (params: Params) => any
}> = (props) => {
  const params = useParams()

  return (
    <Show when={props.when(params)} keyed>
      {props.component({})}
    </Show>
  )
}
