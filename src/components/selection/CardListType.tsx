import { GlareCard } from "@/components/ui/glare-card";
import Link from "next/link";

export default function CardListType() {
  return (
    <div className="flex gap-4 justify-between items-center">
      <Link href={"/selection/logaritmos"}>
        <GlareCard className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48" // Duplicado de 24 a 48
            height="48" // Duplicado de 24 a 48
            viewBox="0 0 24 24"
            fill="none"
            stroke="white" // Cambiado a blanco
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-square-function"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" />
            <path d="M9 11.2h5.7" />
          </svg>
          <p className="text-white font-bold text-xl mt-4">Logaritmos</p>
        </GlareCard>
      </Link>
      <Link href={"/selection/ecuaciones_de_potencia"}>
        <GlareCard className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48" // Duplicado de 24 a 48
            height="48" // Duplicado de 24 a 48
            viewBox="0 0 24 24"
            fill="none"
            stroke="white" // Cambiado a blanco
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-superscript"
          >
            <path d="m4 19 8-8" />
            <path d="m12 19-8-8" />
            <path d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06" />
          </svg>
          <p className="text-white font-bold text-xl mt-4">
            Ecuaciones de Potencia
          </p>
        </GlareCard>
      </Link>
      <Link href={"/selection/exponenciales"}>
        <GlareCard className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48" // Duplicado de 24 a 48
            height="48" // Duplicado de 24 a 48
            viewBox="0 0 24 24"
            fill="none"
            stroke="white" // Cambiado a blanco
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trending-up"
          >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
          <p className="text-white font-bold text-xl mt-4">Exponenciales</p>
        </GlareCard>
      </Link>
    </div>
  );
}
