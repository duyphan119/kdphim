
type NotHomeLayoutProps = { children: React.ReactNode }

export default function NotHomeLayout({ children }: NotHomeLayoutProps) {
  return (
    <>
      <div className="h-20"></div>{children}</>
  )
}