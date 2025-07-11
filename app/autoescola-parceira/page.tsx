"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Search, Mic, User, ChevronRight, MapPin, Phone, Clock, Star, CheckCircle } from "lucide-react"

export default function AutoescolaParceiraPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [addressData, setAddressData] = useState<any>(null)
  const [autoescola, setAutoescola] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário cadastrou endereço
    const address = sessionStorage.getItem("user-address")
    if (!address) {
      router.push("/cadastro-endereco")
      return
    }

    const parsedAddress = JSON.parse(address)
    setAddressData(parsedAddress)

    // Simular busca de autoescola baseada no endereço
    const simulatedAutoescola = {
      nome: "Auto Escola Direção Segura",
      endereco: `Rua das Palmeiras, 456 - ${parsedAddress.bairro}, ${parsedAddress.cidade}/${parsedAddress.uf}`,
      telefone: "(11) 3456-7890",
      distancia: "2.3 km",
      avaliacao: 4.8,
      horarioFuncionamento: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 12h",
      especialidades: ["Categoria B", "Categoria A", "Reciclagem"],
      credenciamento: "DETRAN-SP #12345",
    }

    setAutoescola(simulatedAutoescola)
    setIsAuthorized(true)
  }, [router])

  const handleSelecionarAutoescola = () => {
    // Salvar seleção da autoescola
    sessionStorage.setItem("autoescola-selecionada", JSON.stringify(autoescola))

    // Redirecionar para dados aprovados
    router.push("/dados-aprovados")
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header gov.br logado */}
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/images/govbr-logo.png" alt="gov.br" className="h-8" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
              <img src="/images/header-icons.png" alt="Ícones do cabeçalho" className="h-6" />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
                <User className="w-4 h-4 mr-2" />
                Arthur
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Header do Departamento */}
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="w-5 h-5 text-blue-600" />
              </Button>
              <h1 className="text-lg font-semibold text-gray-800">Departamento Estadual de Trânsito</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Mic className="w-5 h-5 text-blue-600" />
              </Button>
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5 text-blue-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center text-sm text-blue-600">
          <Link href="/" className="hover:underline">
            Início
          </Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <Link href="/servicos" className="hover:underline">
            Serviços
          </Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <Link href="/cnh" className="hover:underline">
            CNH
          </Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-600">CNH Social Digital</span>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-md mx-auto px-4 pb-8">
        {/* Título com logo DETRAN */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Autoescola</h1>
            <h2 className="text-3xl font-bold text-blue-900">Parceira</h2>
          </div>
          <div className="flex-shrink-0">
            <img src="/images/detran-logo.png" alt="DETRAN" className="h-12" />
          </div>
        </div>

        {/* Endereço do usuário */}
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <h3 className="font-semibold text-blue-800 mb-2">Seu endereço cadastrado:</h3>
          <p className="text-blue-700">
            {addressData?.logradouro}, {addressData?.numero}
            {addressData?.complemento && ` - ${addressData.complemento}`}
            <br />
            {addressData?.bairro}, {addressData?.cidade}/{addressData?.uf}
            <br />
            CEP: {addressData?.cep}
          </p>
        </div>

        {/* Card da autoescola */}
        {autoescola && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{autoescola.nome}</h3>
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-gray-600">
                    {autoescola.avaliacao} • {autoescola.distancia}
                  </span>
                </div>
              </div>
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <span className="text-green-800 text-sm font-semibold">Credenciada</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{autoescola.endereco}</span>
              </div>

              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-gray-700 text-sm">{autoescola.telefone}</span>
              </div>

              <div className="flex items-start">
                <Clock className="w-4 h-4 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{autoescola.horarioFuncionamento}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">Especialidades:</h4>
              <div className="flex flex-wrap gap-2">
                {autoescola.especialidades.map((especialidade: string, index: number) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {especialidade}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-6">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">Credenciamento: {autoescola.credenciamento}</span>
              </div>
            </div>
          </div>
        )}

        {/* Informações sobre o processo */}
        <div className="bg-blue-50 p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">O que acontece agora?</h3>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm">Você será direcionado para esta autoescola parceira</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm">Todas as aulas práticas serão realizadas aqui</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm">Os exames práticos também acontecerão neste local</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm">Todo o processo é 100% gratuito através do programa</span>
            </li>
          </ul>
        </div>

        {/* Botão confirmar */}
        <Button
          onClick={handleSelecionarAutoescola}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full text-lg font-semibold"
        >
          Confirmar Autoescola Parceira
        </Button>
      </div>
    </div>
  )
}
