import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 px-2">
      <Image src="/images/logo-black.svg" alt="Logo" width={179} height={120} />
      <h1 className="mt-8 text-2xl font-bold text-red-500 sm:text-3xl">
        404 - Страница не найдена
      </h1>
      <p className="text-lg text-gray-700 mt-4">
        К сожалению, страница, которую вы ищете, не существует.
      </p>
      <a
        href="/"
        className="mt-4 font-normal text-sm py-2 px-2 bg-main border border-transparent flex items-center text-black hover:border-main hover:bg-white rounded-xl transition-all duration-200 sm:font-medium sm:text-base"
      >
        Вернуться на главную страницу
      </a>
    </div>
  );
}
