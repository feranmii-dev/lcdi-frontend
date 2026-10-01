export function Header() {
  return (
    <header>
      <div className="flex items-center gap-3">
        <div className="w-9.5 h-9.5 rounded-[9px] bg-[linear-gradient(150deg,#0E7C86,#0A5D65)] grid place-items-center shadow-[0_4px_12px_rgba(14,124,134,0.28)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="12" rx="10" ry="6.5" stroke="#fff" strokeWidth="1.7" />
            <circle cx="12" cy="12" r="3.2" fill="#fff" />
            <circle cx="12" cy="12" r="1.2" fill="#0A5D65" />
          </svg>
        </div>
        <div>
          <h1 className="text-[16px] font-semibold">Glaucoma Screening Assistant</h1>
          <p className="text-[12px] text-[#5C6B72] font-normal">
            Legacy Clinical Data Curation Initiative · OAU Teaching Hospital
          </p>
        </div>
      </div>
    </header>
  );
}