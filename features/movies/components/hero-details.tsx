import Image from "next/image";
import Link from "next/link";

import {
  FavouriteIcon,
  PlayCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HeroDetails() {
  return (
    <section className="relative overflow-hidden">
      {/* Backdrop */}
      <div className="absolute top-0 left-0 right-0 aspect-[754/424]">
        <Image
          src="https://image.tmdb.org/t/p/original/vD7ef6LSWbpH4sCNmPOMHSMZGiq.jpg"
          alt="Backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-16 pt-24">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          {/* Poster */}
          <div>
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/posters/1.png"
                alt="Squid Game"
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <Badge className="mb-4 w-fit bg-red-600 hover:bg-red-600">
              #1 Trending
            </Badge>

            <h1 className="text-5xl font-black text-white">
              Squid Game
            </h1>

            <p className="mt-2 text-lg text-zinc-400">
              오징어 게임
            </p>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge className="bg-yellow-500 text-black hover:bg-yellow-500">
                ⭐ 8.3 IMDb
              </Badge>

              <Badge variant="secondary">2025</Badge>

              <Badge variant="secondary">TV Series</Badge>

              <Badge variant="secondary">South Korea</Badge>

              <Badge variant="secondary">Drama</Badge>

              <Badge variant="secondary">Thriller</Badge>

              <Badge variant="secondary">Mystery</Badge>

              <Badge variant="secondary">16+</Badge>
            </div>

            {/* Description */}
            <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-300">
              Hundreds of contestants burdened with debt accept a mysterious
              invitation to compete in children's games. Inside, an enormous
              cash prize awaits, but losing comes with deadly consequences.
              Every decision tests courage, trust, and the value of survival.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-red-600 px-8 hover:bg-red-700"
              >
                <Link href="/watch/squid-game">
                  <HugeiconsIcon
                    icon={PlayCircleIcon}
                    size={22}
                    className="mr-2"
                  />
                  Watch Now
                </Link>
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="bg-white/10 px-8 text-white backdrop-blur hover:bg-white/20"
              >
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  size={20}
                  className="mr-2"
                />
                Favorite
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-zinc-800 pt-8 md:grid-cols-4">
              <div>
                <p className="text-sm text-zinc-500">
                  Episodes
                </p>

                <p className="mt-2 text-xl font-semibold text-white">
                  9
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Duration
                </p>

                <p className="mt-2 text-xl font-semibold text-white">
                  60 min
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Language
                </p>

                <p className="mt-2 text-xl font-semibold text-white">
                  Korean
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Status
                </p>

                <p className="mt-2 text-xl font-semibold text-green-400">
                  Completed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}