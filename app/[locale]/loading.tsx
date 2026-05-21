import { Container } from "@/components/ui/Container";

export default function LocaleLoading() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="animate-pulse">
          <div className="h-3 w-36 rounded bg-slate-950/10" />
          <div className="mt-6 h-12 w-full max-w-3xl rounded bg-slate-950/10" />
          <div className="mt-4 h-12 w-2/3 rounded bg-slate-950/10" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="h-52 rounded-3xl bg-slate-950/10" />
            <div className="h-52 rounded-3xl bg-slate-950/10" />
            <div className="h-52 rounded-3xl bg-slate-950/10" />
          </div>
        </div>
      </Container>
    </section>
  );
}


