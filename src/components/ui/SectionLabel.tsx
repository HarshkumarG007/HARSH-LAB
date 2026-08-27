interface SectionLabelProps {
  number: string
  label: string
}

export default function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="text-neon-cyan font-mono text-sm">{number}</span>
      <div className="w-12 h-[1px] bg-neon-cyan/30" />
      <span className="text-secondary font-mono text-xs tracking-[0.2em] uppercase">{label}</span>
    </div>
  )
}
