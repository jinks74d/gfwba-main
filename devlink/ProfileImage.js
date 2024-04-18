// ProfileImage.js
import React, { useState, useEffect } from "react";
import * as _Builtin from "./_Builtin";
import { useParams, useRouter } from "next/navigation";

export function ProfileImage({ profLogo }) {
  const router = useRouter();
  const params = useParams();
  console.log(params.id);
  const [imageSrc, setImageSrc] = useState(profLogo);

  useEffect(() => {
    const fetchImageSrc = async () => {
      try {
        console.log(params.id);
        const response = await fetch(
          `/api/cron/get-contacts-image?id=${params.id}`
        );
        const data = await response.json();

        if (data.status && data.wildapricotUrl) {
          setImageSrc(data.wildapricotUrl);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImageSrc();
  }, [profLogo]);

  return (
    <_Builtin.Image
      loading="lazy"
      width="auto"
      height="auto"
      alt=""
      src={imageSrc}
    />
  );
}
