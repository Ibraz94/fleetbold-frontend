import { lazy, Suspense, useState, useEffect } from 'react'

// Dynamically import the syntax highlighter to reduce bundle size
const PrismSyntaxHighlighter = lazy(() => 
  import('react-syntax-highlighter').then(module => ({
    default: module.Prism
  }))
)

const SyntaxHighlighter = (props) => {
    const { children, ...rest } = props
    const [style, setStyle] = useState(null)

    useEffect(() => {
        // Dynamically import the style
        import('react-syntax-highlighter/dist/esm/styles/prism').then(module => {
            setStyle(module.oneDark)
        })
    }, [])

    return (
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-20 rounded"></div>}>
            <PrismSyntaxHighlighter 
                style={style} 
                className="not-prose text-sm" 
                {...rest}
            >
                {children}
            </PrismSyntaxHighlighter>
        </Suspense>
    )
}

export default SyntaxHighlighter
