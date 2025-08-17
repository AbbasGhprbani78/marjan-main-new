import Image from "next/image";

export function ImageIcon({ text, lenght }) {
  return (
    <Image
      src={`/icons/${text}.png`}
      alt={`${text} icon`}
      className={`w-${lenght} h-${lenght} object-cover invert`}
      width={lenght}
      height={lenght}
    />
  );
}
