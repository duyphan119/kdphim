"use client";

import Artplayer from "artplayer";
import Hls from "hls.js";
import { useEffect, useRef } from "react";
import artplayerPluginHlsControl from "artplayer-plugin-hls-control";

type Props = {
  src: string;
};

function Player({ option, getInstance, ...rest }: any) {
  const $container = useRef<any>(null);

  useEffect(() => {
    const art = new Artplayer({
      ...option,
      container: $container.current,
    });

    if (typeof getInstance === "function") {
      getInstance(art);
    }

    return () => art.destroy(false);
  }, []);

  return <div ref={$container} {...rest}></div>;
}
export default function VideoPlayer({ src }: Props) {
  return (
    <div>
      <Player
        option={{
          url: src,
          setting: true,
          plugins: [
            artplayerPluginHlsControl({
              quality: {
                // Show qualitys in control
                control: true,
                // Show qualitys in setting
                setting: true,
                // Get the quality name from level
                getName: (level: any) => `${level.height}P`,
                // I18n
                title: "Quality",
                auto: "Auto",
              },
              audio: {
                // Show audios in control
                control: true,
                // Show audios in setting
                setting: true,
                // Get the audio name from track
                getName: (track: any) => track.name,
                // I18n
                title: "Audio",
                auto: "Auto",
              },
            }),
          ],
          customType: {
            m3u8: function playM3u8(video: any, url: any, art: any) {
              if (Hls.isSupported()) {
                if (art.hls) art.hls.destroy();
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);
                art.hls = hls;
                art.on("destroy", () => hls.destroy());
              } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = url;
              } else {
                art.notice.show = "Unsupported playback format: m3u8";
              }
            },
          },
        }}
        style={{
          width: "600px",
          height: "400px",
          margin: "60px auto 0",
        }}
        getInstance={(art: any) => console.log(art)}
      />
    </div>
  );
}
