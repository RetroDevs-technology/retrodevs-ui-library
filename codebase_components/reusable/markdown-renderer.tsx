import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import type { ComponentPropsWithoutRef } from "react"

interface MarkdownRendererProps extends ComponentPropsWithoutRef<"div"> {
  content: string
}

export function MarkdownRenderer({ content, className, ...props }: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        "prose prose-slate max-w-none dark:prose-invert",
        "prose-headings:font-semibold prose-headings:text-foreground",
        "prose-h1:text-2xl md:prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-6 md:prose-h1:mt-8 prose-h1:break-words",
        "prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-5 md:prose-h2:mt-6 prose-h2:border-b prose-h2:border-border prose-h2:pb-2 prose-h2:break-words",
        "prose-h3:text-lg md:prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4 prose-h3:break-words",
        "prose-h4:text-base md:prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-3 prose-h4:break-words",
        "prose-p:text-foreground prose-p:leading-7 prose-p:mb-4 prose-p:break-words",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:break-words",
        "prose-strong:text-foreground prose-strong:font-semibold",
        "prose-em:text-foreground",
        "prose-ul:list-disc prose-ul:pl-5 md:prose-ul:pl-6 prose-ul:mb-4 prose-ul:space-y-1",
        "prose-ol:list-decimal prose-ol:pl-5 md:prose-ol:pl-6 prose-ol:mb-4 prose-ol:space-y-1",
        "prose-li:mb-1 prose-li:text-foreground prose-li:break-words",
        "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:my-4",
        "prose-code:text-xs md:prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-foreground prose-code:break-all",
        "prose-pre:bg-muted prose-pre:p-3 md:prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-4",
        "prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:break-normal",
        "prose-hr:border-border prose-hr:my-6 md:prose-hr:my-8",
        "prose-table:w-full prose-table:border-collapse prose-table:mb-4 prose-table:overflow-x-auto prose-table:block md:prose-table:table",
        "prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-2 prose-th:text-left prose-th:font-semibold prose-th:text-sm",
        "prose-td:border prose-td:border-border prose-td:p-2 prose-td:text-sm prose-td:break-words",
        "prose-img:rounded-lg prose-img:my-4 prose-img:max-w-full prose-img:h-auto",
        "overflow-wrap-anywhere",
        className,
      )}
      {...props}>
      <ReactMarkdown
        components={{
          h1: ({ children, ...props }) => (
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4 mt-8" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3 mt-6 border-b border-border pb-2"
              {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2 mt-4" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mb-2 mt-3" {...props}>
              {children}
            </h4>
          ),
          p: ({ children, ...props }) => (
            <p className="leading-7 mb-4 text-foreground" {...props}>
              {children}
            </p>
          ),
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              className="text-primary underline-offset-4 hover:underline"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              {...props}>
              {children}
            </a>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className
            return isInline ? (
              <code
                className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground"
                {...props}>
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          pre: ({ children, ...props }) => (
            <pre
              className="mb-4 mt-4 overflow-x-auto rounded-lg bg-muted p-4"
              {...props}>
              {children}
            </pre>
          ),
          ul: ({ children, ...props }) => (
            <ul className="my-4 ml-6 list-disc [&>li]:mt-2" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="my-4 ml-6 list-decimal [&>li]:mt-2" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-foreground" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="mt-6 border-l-4 border-primary pl-4 italic text-muted-foreground"
              {...props}>
              {children}
            </blockquote>
          ),
          hr: ({ ...props }) => <hr className="my-6 md:my-8 border-border" {...props} />,
          table: ({ children, ...props }) => (
            <div className="my-4 md:my-6 w-full overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
              <div className="min-w-full inline-block">
                <table className="w-full border-collapse min-w-[500px]" {...props}>
                  {children}
                </table>
              </div>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="border border-border bg-muted p-2 text-left font-semibold"
              {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-border p-2" {...props}>
              {children}
            </td>
          ),
          img: ({ src, alt, ...props }) => {
            const imageAlt: string = alt ?? "Documentation image"
            return (
              <img
                {...props}
                src={src}
                alt={imageAlt}
                className="my-4 rounded-lg max-w-full h-auto"
              />
            )
          },
        }}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
