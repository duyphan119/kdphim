import { Button } from "@/components/ui/button";

export default function Episodes() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-white">
            Episodes
          </h2>

          <span className="text-zinc-400">
            24 Episodes
          </span>
        </div>

        {/* Server */}
        <div className="mt-8">
          <h3 className="mb-4 font-semibold text-white">
            Server
          </h3>

          <div className="flex flex-wrap gap-3">
            <Button>
              VIP
            </Button>

            <Button variant="secondary">
              Server #1
            </Button>

            <Button variant="secondary">
              Server #2
            </Button>
          </div>
        </div>

        {/* Episodes */}
        <div className="mt-10">
          <h3 className="mb-4 font-semibold text-white">
            Episode List
          </h3>

          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
            <EpisodeButton active>
              Episode 1
            </EpisodeButton>

            <EpisodeButton>
              Episode 2
            </EpisodeButton>

            <EpisodeButton>
              Episode 3
            </EpisodeButton>

            <EpisodeButton>
              Episode 4
            </EpisodeButton>

            <EpisodeButton>
              Episode 5
            </EpisodeButton>

            <EpisodeButton>
              Episode 6
            </EpisodeButton>

            <EpisodeButton>
              Episode 7
            </EpisodeButton>

            <EpisodeButton>
              Episode 8
            </EpisodeButton>

            <EpisodeButton>
              Episode 9
            </EpisodeButton>

            <EpisodeButton>
              Episode 10
            </EpisodeButton>
          </div>
        </div>
      </div>
    </section>
  );
}

interface EpisodeButtonProps {
  children: React.ReactNode;
  active?: boolean;
}

function EpisodeButton({
  children,
  active,
}: EpisodeButtonProps) {
  return (
    <Button
      variant={active ? "default" : "secondary"}
      className="h-11 w-full"
    >
      {children}
    </Button>
  );
}