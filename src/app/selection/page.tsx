import CardListType from "@/components/selection/CardListType";

export default function SelectedPage() {
  return (
    <main className="container bg-[#252422] h-full md:h-screen lg:h-screen ">
        <h1 className="pb-20 pt-14 text-[#ccc5b9] font-bold text-pretty text-4xl text-center">
            Selecciona un tema para poner a prueba tus conocimientos
        <p className="pt-3 text-zinc-500 font-normal text-lg">
            Realizaras un test de 5 preguntas, si respondes correctamente todas las preguntas, obtendras la mayor puntuacion.
        </p>
        </h1>
        <CardListType />
    </main>
  );
}
