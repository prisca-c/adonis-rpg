import React from 'react'

import { BgColors } from '@/enums/tailwind'

type ContainerProps = {
  children: React.ReactNode
  className?: string
  rounded?: boolean
  layout?: 'flex' | 'grid'
  align?: 'center' | 'start' | 'end'
  justify?: 'center' | 'start' | 'end'
  gap?: string
  direction?: 'row' | 'col'
  bg?: keyof typeof BgColors
}

export const Container = ({
  children,
  className = '',
  rounded = false,
  layout,
  align = 'center',
  justify = 'center',
  gap = '0',
  direction = 'row',
  bg,
}: ContainerProps) => {
  const classList: string[] = []
  if (layout === 'flex') {
    classList.push('flex')
    classList.push(`flex-${direction}`)
    classList.push(`justify-${justify}`)
    classList.push(`items-${align}`)
    classList.push(`gap-${gap}`)
  }
  if (layout === 'grid') {
    classList.push('grid')
    classList.push(`gap-${gap}`)
  }
  if (bg) {
    const bgColors = BgColors[bg]
    classList.push(bgColors)
  }
  if (rounded) classList.push('rounded-md')
  if (className) classList.push(className)

  const classString = classList.join(' ')

  return <div className={classString}>{children}</div>
}
