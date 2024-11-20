import Editor, {
  OnValidate,
  BeforeMount,
  OnChange,
  OnMount
} from '@monaco-editor/react'
import React, { ReactNode } from 'react'

export default function MonacoEditor({
  height,
  defaultLanguage,
  defaultValue,
  value,
  language,
  path,
  theme,
  line,
  loading,
  options,
  width,
  className,
  beforeMount,
  onMount,
  onChange,
  onValidate
}: {
  path?: string
  height?: string
  width?: string
  defaultLanguage?: string
  defaultValue?: string
  value?: string
  language?: string
  onchange?: OnChange
  onValidate?: OnValidate
  beforeMount?: BeforeMount
  onMount?: OnMount
  onChange?: OnChange
  className?: string
  theme?: string
  line?: number
  loading?: ReactNode
  options?: object
}) {
  return (
    <Editor
      path={path}
      height={height}
      width={width}
      value={value}
      language={language}
      onChange={onChange}
      onValidate={onValidate}
      beforeMount={beforeMount}
      onMount={onMount}
      className={className}
      theme={theme}
      line={line}
      loading={loading}
      options={options}
      defaultLanguage={defaultLanguage}
      defaultValue={defaultValue}
    />
  )
}
