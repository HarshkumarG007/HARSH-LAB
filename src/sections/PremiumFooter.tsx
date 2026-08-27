export default function PremiumFooter() {
  return (
    <footer className="py-8 text-center border-t border-border bg-bg-primary material-footer">
      <p className="text-text-tertiary text-sm">
        © {new Date().getFullYear()} Harsh Kumar Gupta. All rights reserved.
      </p>
      <div className="flex justify-center items-center gap-4 mt-4 text-xs text-text-muted">
        <span>Radical Transparency Portfolio</span>
        <span>•</span>
        <span>Premium Architecture</span>
      </div>
    </footer>
  )
}
