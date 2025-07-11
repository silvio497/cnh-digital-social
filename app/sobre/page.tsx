import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Botão voltar */}
        <Link href="/">
          <Button variant="ghost" className="mb-6 p-0 h-auto text-blue-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        {/* Logo */}
        <div className="mb-8 text-center">
          <img src="/images/cnh-logo-oficial.png" alt="CNH Social Digital" className="w-48 h-auto mx-auto" />
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Sobre o CNH Social Digital</h1>

        {/* Conteúdo */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            O <strong>CNH Social Digital</strong> é o primeiro programa de inclusão social para habilitação no Brasil,
            criado para democratizar o acesso à Carteira Nacional de Habilitação.
          </p>

          <p>
            Este programa revolucionário oferece a oportunidade para milhares de brasileiros obterem sua CNH de forma
            gratuita e digital, eliminando barreiras financeiras que impedem o acesso à mobilidade.
          </p>

          <h2 className="text-xl font-semibold text-blue-700 mt-8 mb-4">Principais Benefícios:</h2>

          <ul className="list-disc list-inside space-y-2">
            <li>Processo 100% digital e gratuito</li>
            <li>Aulas teóricas online</li>
            <li>Aulas práticas em autoescolas credenciadas</li>
            <li>Exames médicos e psicotécnicos inclusos</li>
            <li>Acompanhamento em tempo real do processo</li>
            <li>Suporte especializado durante todo o processo</li>
          </ul>

          <h2 className="text-xl font-semibold text-blue-700 mt-8 mb-4">Como Funciona:</h2>

          <ol className="list-decimal list-inside space-y-2">
            <li>Cadastro online no portal oficial</li>
            <li>Verificação de dados e documentos</li>
            <li>Aprovação no sistema</li>
            <li>Agendamento de exames médicos</li>
            <li>Início das aulas teóricas</li>
            <li>Aulas práticas na autoescola parceira</li>
            <li>Realização dos exames finais</li>
            <li>Emissão da CNH Digital</li>
          </ol>

          <div className="bg-blue-50 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Transformando Vidas</h3>
            <p className="text-blue-700">
              Mais do que um programa governamental, o CNH Social Digital representa uma oportunidade única de
              transformação social, oferecendo mobilidade e novas perspectivas de emprego para milhões de brasileiros.
            </p>
          </div>
        </div>

        {/* Botão de ação */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 px-8 rounded-full text-lg font-semibold">
              Começar Agora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
