export default function ContactUsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div
      id="
      contact-us-layout"
      className="overflow-auto w-full h-full flex flex-col justify-center items-center"
    >
      {children}
    </div>
  )
}
