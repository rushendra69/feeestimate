interface AdBannerProps {
  slot: "top" | "bottom";
}

const AD_CONFIG = {
  top: {
    href: "https://adsection.tigoy.com/ad001.html",
    src: "https://adsection.tigoy.com/001.png",
  },
  bottom: {
    href: "https://adsection.tigoy.com/ad002.html",
    src: "https://adsection.tigoy.com/002.png",
  },
};

export default function AdBanner({ slot }: AdBannerProps) {
  const ad = AD_CONFIG[slot];

  return (
    <div
      className="w-full flex justify-center py-4 bg-slate-100"
      data-ocid={`ad_banner.${slot}`}
    >
      <div className="max-w-[960px] w-full px-6">
        <a
          href={ad.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          data-ocid={`ad_banner.${slot}.link`}
        >
          <img
            src={ad.src}
            alt="Advertisement"
            width={960}
            height={200}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: 200,
              display: "block",
            }}
          />
        </a>
      </div>
    </div>
  );
}
