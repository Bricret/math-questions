import Link from "next/link";

export const ButtonStart = ({ref}: {ref: string}) => {
  return (
    <Link 
    href={ref}
    className="shadow-[inset_0_0_0_2px_#616467] text-[#616467] px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
      Empezar
    </Link>
  );
};
