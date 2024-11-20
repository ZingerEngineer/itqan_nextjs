export default function SignInLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div
      id="contact-us-layout"
      className="w-full h-full bg-tertiary-light-500 flex justify-center items-center"
    >
      {children}
    </div>
  )
}
