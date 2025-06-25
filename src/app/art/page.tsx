import Container from "@/app/_components/container";
import Image from "next/image";

export default function ArtPage() {
  return (
    <main className="min-h-screen bg-[var(--background-primary)]">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/blog/blog-post-covers/selina-farzaei-x2QHTVg2HqA-unsplash.jpg"
            alt="Art Hero"
            fill
            className="object-cover w-full h-full transform scale-105"
            style={{
              filter: 'brightness(0.7)'
            }}
            priority
          />
        </div>
        <div className="relative h-full flex items-center w-full mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Art
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 animate-fade-in delay-200">
              A virtual gallery of color, emotion, and story.
            </p>
          </div>
        </div>
      </div>

      <Container>
        <section className="mb-16">
          <div className="bg-neutral-100 dark:bg-slate-800 rounded-lg p-8 md:p-12 text-center shadow-lg mt-12">
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