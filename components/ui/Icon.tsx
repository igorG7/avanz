import type { ReactElement, SVGProps } from "react";

export type IconName =
  | "whatsapp"
  | "compass"
  | "wallet"
  | "map"
  | "headset"
  | "check"
  | "arrow-right"
  | "instagram"
  | "facebook"
  | "phone"
  | "route"
  | "trending-up"
  | "leaf"
  | "road"
  | "shield"
  | "mountain"
  | "eye"
  | "file-check"
  | "building"
  | "bolt"
  | "droplet"
  | "wifi"
  | "users"
  | "key"
  | "mail"
  | "sliders"
  | "share"
  | "close"
  | "calendar";

const paths: Record<IconName, ReactElement> = {
  whatsapp: (
    <path d="M16.001 3C9.374 3 4 8.373 4 14.998c0 2.205.575 4.299 1.665 6.16L4 29l8.022-1.616a11.95 11.95 0 0 0 5.978 1.611h.005c6.627 0 12-5.373 12-11.998 0-3.205-1.247-6.218-3.514-8.486A11.92 11.92 0 0 0 16.001 3zm0 21.949h-.004a9.95 9.95 0 0 1-5.07-1.388l-.364-.216-4.762.96.967-4.642-.236-.378A9.95 9.95 0 0 1 6 14.998C6 9.477 10.479 5 16.005 5a9.93 9.93 0 0 1 7.075 2.93 9.94 9.94 0 0 1 2.93 7.075c0 5.526-4.479 10.005-10.009 10.005zm5.481-7.491c-.3-.15-1.776-.876-2.05-.976-.275-.1-.475-.15-.675.15-.2.3-.776.976-.95 1.176-.176.2-.35.225-.65.075-.3-.15-1.265-.466-2.41-1.487-.892-.795-1.494-1.776-1.669-2.076-.176-.3-.019-.461.131-.611.135-.135.3-.35.45-.526.149-.175.2-.3.3-.5.1-.2.05-.376-.025-.526-.075-.15-.675-1.626-.925-2.226-.243-.585-.491-.506-.675-.515l-.575-.01a1.1 1.1 0 0 0-.8.376c-.275.3-1.05 1.026-1.05 2.502 0 1.476 1.075 2.902 1.225 3.102.15.2 2.114 3.226 5.122 4.527.715.309 1.273.494 1.708.633.717.228 1.37.196 1.886.119.575-.087 1.776-.726 2.026-1.426.25-.7.25-1.301.175-1.426-.075-.125-.275-.2-.575-.35z" />
  ),
  compass: (
    <>
      <circle cx="16" cy="16" r="12" />
      <path d="m21 11-2 7-7 2 2-7 7-2z" />
    </>
  ),
  wallet: (
    <>
      <path d="M5 8a3 3 0 0 1 3-3h17v5" />
      <path d="M5 8v15a3 3 0 0 0 3 3h19V13H8a3 3 0 0 1-3-3" />
      <path d="M22 18.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3" />
    </>
  ),
  map: (
    <>
      <path d="m4 8 8-3 8 3 8-3v19l-8 3-8-3-8 3z" />
      <path d="M12 5v22M20 8v19" />
    </>
  ),
  headset: (
    <>
      <path d="M5 21v-5a11 11 0 0 1 22 0v5" />
      <path d="M27 21v4a3 3 0 0 1-3 3h-2v-9h2a3 3 0 0 1 3 3M5 21v4a3 3 0 0 0 3 3h2v-9H8a3 3 0 0 0-3 3" />
    </>
  ),
  check: <path d="m6 16 6 6L26 8" />,
  "arrow-right": <path d="M6 16h20m-7-7 7 7-7 7" />,
  instagram: (
    <>
      <rect x="4" y="4" width="24" height="24" rx="6" />
      <circle cx="16" cy="16" r="5" />
      <circle cx="22.5" cy="9.5" r="1.2" fill="currentColor" />
    </>
  ),
  facebook: (
    <path d="M18 28v-9h3l1-4h-4v-2.5c0-1.1.5-2 2-2h2V7s-2-.3-3.7-.3C15.6 6.7 14 8.4 14 11v4h-3v4h3v9z" />
  ),
  phone: (
    <path d="M9 5h4l2 5-3 2a14 14 0 0 0 8 8l2-3 5 2v4a3 3 0 0 1-3 3A20 20 0 0 1 6 8a3 3 0 0 1 3-3z" />
  ),
  route: (
    <>
      <circle cx="7" cy="7" r="3" />
      <circle cx="25" cy="25" r="3" />
      <path d="M10 7h6a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5h-2a5 5 0 0 0-5 5v0a5 5 0 0 0 5 5h6" />
    </>
  ),
  "trending-up": (
    <>
      <path d="m4 22 8-8 5 5 11-11" />
      <path d="M21 8h7v7" />
    </>
  ),
  leaf: (
    <>
      <path d="M27 5c0 14-9 22-22 22 0-13 9-22 22-22z" />
      <path d="M5 27 17 15" />
    </>
  ),
  road: (
    <>
      <path d="m9 4-4 24h22L23 4z" />
      <path d="M16 4v4M16 14v4M16 24v4" />
    </>
  ),
  shield: (
    <path d="M16 4 6 8v8c0 6.5 4.5 11 10 12 5.5-1 10-5.5 10-12V8z" />
  ),
  mountain: (
    <path d="m4 25 8-13 5 8 4-5 7 10z" />
  ),
  eye: (
    <>
      <path d="M3 16s5-9 13-9 13 9 13 9-5 9-13 9S3 16 3 16z" />
      <circle cx="16" cy="16" r="3.5" />
    </>
  ),
  "file-check": (
    <>
      <path d="M19 4H8a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V11z" />
      <path d="M19 4v7h7" />
      <path d="m12 19 3 3 6-6" />
    </>
  ),
  building: (
    <>
      <path d="M6 28V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v20" />
      <path d="M3 28h26" />
      <path d="M11 12h2M11 18h2M11 24h2M19 12h2M19 18h2M19 24h2" />
    </>
  ),
  bolt: (
    <path d="M18 3 6 18h8l-2 11 12-15h-8z" />
  ),
  droplet: (
    <>
      <path d="M16 4s-9 11-9 17a9 9 0 0 0 18 0c0-6-9-17-9-17z" />
      <path d="M11 19a5 5 0 0 0 5 5" />
    </>
  ),
  wifi: (
    <>
      <path d="M3 13a20 20 0 0 1 26 0" />
      <path d="M7 18a13 13 0 0 1 18 0" />
      <path d="M11 23a7 7 0 0 1 10 0" />
      <circle cx="16" cy="27.5" r="1.4" fill="currentColor" />
    </>
  ),
  users: (
    <>
      <circle cx="12" cy="11" r="4" />
      <path d="M4 27v-1.5A6.5 6.5 0 0 1 10.5 19h3a6.5 6.5 0 0 1 6.5 6.5V27" />
      <circle cx="22.5" cy="13.5" r="3" />
      <path d="M20 19.5h2.5a5.5 5.5 0 0 1 5.5 5.5V27" />
    </>
  ),
  key: (
    <>
      <circle cx="11" cy="11" r="5" />
      <path d="M14.5 14.5 28 28" />
      <path d="M22 22l-3 3" />
      <path d="M25 25l-2 2" />
    </>
  ),
  mail: (
    <>
      <rect x="4" y="7" width="24" height="18" rx="2.5" />
      <path d="m4 10 12 8 12-8" />
    </>
  ),
  sliders: (
    <>
      <line x1="5" y1="10" x2="17" y2="10" />
      <line x1="23" y1="10" x2="27" y2="10" />
      <circle cx="20" cy="10" r="2.8" />
      <line x1="5" y1="16" x2="9" y2="16" />
      <line x1="15" y1="16" x2="27" y2="16" />
      <circle cx="12" cy="16" r="2.8" />
      <line x1="5" y1="22" x2="20" y2="22" />
      <line x1="26" y1="22" x2="27" y2="22" />
      <circle cx="23" cy="22" r="2.8" />
    </>
  ),
  close: (
    <>
      <line x1="8" y1="8" x2="24" y2="24" />
      <line x1="24" y1="8" x2="8" y2="24" />
    </>
  ),
  share: (
    <>
      <circle cx="9" cy="16" r="3" />
      <circle cx="23" cy="8" r="3" />
      <circle cx="23" cy="24" r="3" />
      <line x1="11.6" y1="14.6" x2="20.4" y2="9.4" />
      <line x1="11.6" y1="17.4" x2="20.4" y2="22.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="5" y="7" width="22" height="20" rx="2.5" />
      <line x1="10" y1="4" x2="10" y2="9" />
      <line x1="22" y1="4" x2="22" y2="9" />
      <line x1="5" y1="13" x2="27" y2="13" />
    </>
  ),
};

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 24, className, ...rest }: Props) {
  const isFilled = name === "whatsapp" || name === "facebook" || name === "phone";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={isFilled ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
