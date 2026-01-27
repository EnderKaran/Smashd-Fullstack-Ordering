// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <main className="w-full max-w-sm bg-white rounded-[40px] p-10 shadow-xl">
        <div className="w-20 h-20 relative mx-auto mb-8 overflow-hidden rounded-full border-2 border-orange-100">
          <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-iomehLUlurG4qmZ8rTUW4eNzSvHYjafsJUFqSRw1TeiCDLf0XUFb2eeJYwNFrQCxaeEkU7gZDAwot5bgaISWTJv0Kswl04-_bhWR6lT70uPFwwubKngRCbVyM95AcicYOKaj6rU4x55Tv5nR8FmUGXkrBCixZWbxJh9EJPo2UPlmiFo_Tu9bCt3HPeVtKkKYpHH5GU0Lczlmf-EIvCGvY0ZS2w9zn1_tq0nFQIR-XgPaNILkwOwhq_DsIlwThFXHNuuQZrooUv_H" alt="Logo" fill className="object-cover" />
        </div>
        
        <h1 className="text-4xl font-black mb-2 leading-tight">
          Craving a <br /> <span className="text-[#FF9F9F]">Burger?</span>
        </h1>
        
        <p className="text-gray-400 font-medium mb-10">
          Skip the line and order straight from your table.
        </p>

        <Link href="/menu">
          <button className="w-full bg-[#FF9F9F] py-5 rounded-3xl text-white font-black text-xl shadow-lg shadow-red-100 active:scale-95 transition-all">
            🍔 ORDER NOW
          </button>
        </Link>
      </main>
    </div>
  );
}