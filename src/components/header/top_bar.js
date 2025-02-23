export default function Top({ title = "title", subtitle = "subtitle" }) {
  return (
    <header className="!bg-slate-600 text-white py-4 shadow-md z-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-lg mt-2">{subtitle}</p>}
      </div>
    </header>
  );
}
