import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Conteúdo principal */}
      <div className="max-w-md mx-auto px-6 py-8 text-center">
        {/* Logo CNH Social Digital */}
        <div className="mb-8">
          <img src="/images/cnh-logo-oficial.png" alt="CNH Social Digital" className="w-64 h-auto mx-auto" />
        </div>

        {/* Título principal */}
        <h1 className="text-2xl font-bold text-blue-800 mb-4">CNH Social Digital</h1>

        <h2 className="text-lg font-semibold text-blue-700 mb-6">2025: A Oportunidade de Realizar o Seu Sonho</h2>

        {/* Descrição */}
        <p className="text-gray-700 mb-8 leading-relaxed">
          O primeiro programa de inclusão social para habilitação no Brasil
        </p>

        {/* Botão principal */}
        <Link href="/login">
          <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 px-8 rounded-full text-lg font-semibold mb-6 shadow-lg">
            <User className="w-5 h-5 mr-2" />
            Entrar com o gov.br
          </Button>
        </Link>

        {/* Link informativo */}
        <Link href="/sobre" className="text-blue-600 underline text-sm mb-12 block">
          Saiba o que é o programa CNH Social Digital
        </Link>

        {/* Texto motivacional */}
        <div className="space-y-4 text-blue-800 font-medium">
          <p>Mais brasileiros dirigindo pelo país!</p>
          <p>Conseguir sua CNH não é um sonho distante!</p>
        </div>

        {/* Rodapé com ícones de veículos */}
        <div className="mt-12 -mx-6">
          <img src="/images/rodape-veiculos.png" alt="Ícones de veículos" className="w-full h-auto" />
        </div>
      </div>
    </div>
  )
}
