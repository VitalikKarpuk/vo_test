export default function SectionHeading({ label }: { label: string }) {
  return (
    <h2 className="mb-8 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:mb-10">
      {label}
    </h2>
  )
}
