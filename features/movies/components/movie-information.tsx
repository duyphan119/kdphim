

import { Badge } from "@/components/ui/badge";

type MovieInformationProps = {
  movie: T_Movie;
}

// export default function MovieInformation({ movie }: MovieInformationProps) {
export default function MovieInformation() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-black text-white">
          Information
        </h2>

        <div className="border-zinc-800 bg-zinc-900 p-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <InfoItem title="Original Title" value="오징어 게임" />

            <InfoItem title="Status" value="Completed" />

            <InfoItem title="Type" value="TV Series" />

            <InfoItem title="Country" value="South Korea" />

            <InfoItem title="Language" value="Korean" />

            <InfoItem title="Release Date" value="2025-09-12" />

            <InfoItem title="Episodes" value="9" />

            <InfoItem title="Runtime" value="60 minutes" />

            <InfoItem title="IMDb" value="8.3 / 10" />

            <InfoItem title="Director" value="Hwang Dong-hyuk" />

            <div>
              <p className="mb-3 text-sm text-zinc-500">
                Genres
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge>Drama</Badge>

                <Badge>Thriller</Badge>

                <Badge>Mystery</Badge>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm text-zinc-500">
                Production
              </p>

              <p className="text-white">
                Netflix
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface InfoItemProps {
  title: string;
  value: string;
}

function InfoItem({
  title,
  value,
}: InfoItemProps) {
  return (
    <div>
      <p className="mb-2 text-sm text-zinc-500">
        {title}
      </p>

      <p className="text-lg font-medium text-white">
        {value}
      </p>
    </div>
  );
}