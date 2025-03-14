import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Image from "next/image";

export default function ArtPage() {
  return (
    <main>
      <Container>
        <Header />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
          Art
        </h1>
        
        <section className="mb-16">
          <div className="bg-neutral-100 dark:bg-slate-800 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Coming Soon!</h2>
            <p className="text-lg mb-6">
              This space will soon be filled with my artwork! While I slowly make my art available for viewing, 
              imagine a virtual gallery filled with colors, emotions, and stories waiting to be told.
            </p>
            <p className="text-lg">
              In the meantime, stay tuned for updates and maybe a few surprises along the way!
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
