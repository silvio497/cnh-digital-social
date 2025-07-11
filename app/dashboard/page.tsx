"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Menu,
  Search,
  Mic,
  User,
  ChevronRight,
  FileText,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react"

export default function DashboardPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está logado
    const userLogged = sessionStorage.getItem("user-logged")
    if (!userLogged) {
      router.push("/login")
      return
    }

    // Carregar dados do usuário se existirem
    const data = sessionStorage.getItem("user-data")
    if (data) {
      setUserData(JSON.parse(data))
    }

    setIsAuthorized(true)
  }, [router])

  const handleLogout = () => {
    // Limpar dados da sessão
    sessionStorage.clear()
    router.push("/")
  }

  const getProcessStatus = () => {
    const verificationCompleted = sessionStorage.getItem("verification-completed")
    const questionnaireAnswers = sessionStorage.getItem("questionnaire-answers")
    const userAddress = sessionStorage.getItem("user-address")
    const autoescolaSelecionada = sessionStorage.getItem("autoescola-selecionada")
    const examesAgendados = sessionStorage.getItem("exames-agendados")

    if (examesAgendados) return "Processo Finalizado"
    if (autoescolaSelecionada) return "Autoescola Selecionada"
    if (userAddress) return "Endereço Cadastrado"
    if (questionnaireAnswers) return "Questionário Respondido"
    if (verificationCompleted) return "Dados Verificados"
    if (userData) return "Dados Cadastrados"
    return "Cadastro Inicial"
  }

  const getNextStep = () => {
    const verificationCompleted = sessionStorage.getItem("verification-completed")
    const questionnaireAnswers = sessionStorage.getItem("questionnaire-answers")
    const userAddress = sessionStorage.getItem("user-address")
    const autoescolaSelecionada = sessionStorage.getItem("autoescola-selecionada")
    const examesAgendados = sessionStorage.getItem("exames-agendados")

    if (examesAgendados) return { text: "Processo concluído!", link: "/dados-aprovados" }
    if (autoescolaSelecionada) return { text: "Finalizar processo", link: "/dados-aprovados" }
    if (userAddress) return { text: "Selecionar autoescola", link: "/autoescola-parceira" }
    if (questionnaireAnswers) return { text: "Cadastrar endereço", link: "/cadastro-endereco" }
    if (verificationCompleted) return { text: "Responder questionário", link: "/questionario" }
    if (userData) return { text: "Verificar dados", link: "/verificacao" }
    return { text: "Cadastrar dados", link: "/verificacao-dados" }
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

  const nextStep = getNextStep()

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
        {/* Banner promocional */}
        <div className="mb-8">
          <img src="/images/cnh-social-banner.png" alt="CNH Social 2025" className="w-full h-auto rounded-lg" />
        </div>

        {/* Boas-vindas */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Olá, Arthur!</h1>
          <p className="text-gray-700">Bem-vindo ao seu painel do CNH Social Digital</p>
        </div>

        {/* Status do processo */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Status do seu processo</h2>

          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
            <span className="font-medium text-blue-800">{getProcessStatus()}</span>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-blue-700 text-sm">
              Seu processo está em andamento. Continue seguindo os passos para completar sua solicitação.
            </p>
          </div>

          <Link href={nextStep.link}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold">
              {nextStep.text}
            </Button>
          </Link>
        </div>

        {/* Dados pessoais */}
        {userData && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Seus dados</h2>

            <div className="space-y-3">
              <div className="flex items-center">
                <User className="w-4 h-4 text-gray-500 mr-3" />
                <span className="text-gray-700">{userData.nomeCompleto}</span>
              </div>

              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-500 mr-3" />
                <span className="text-gray-700">{userData.dataNascimento}</span>
              </div>

              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-500 mr-3" />
                <span className="text-gray-700">{userData.email}</span>
              </div>

              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gray-500 mr-3" />
                <span className="text-gray-700">{userData.telefone}</span>
              </div>

              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-gray-500 mr-3 mt-1" />
                <span className="text-gray-700">{userData.endereco}</span>
              </div>
            </div>
          </div>
        )}

        {/* Ações rápidas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ações rápidas</h2>

          <div className="space-y-3">
            <Link href="/verificacao-dados">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="w-4 h-4 mr-3" />
                Atualizar dados pessoais
              </Button>
            </Link>

            <Link href="/questionario">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <CheckCircle className="w-4 h-4 mr-3" />
                Revisar questionário
              </Button>
            </Link>

            <Link href="/sobre">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="w-4 h-4 mr-3" />
                Sobre o programa
              </Button>
            </Link>
          </div>
        </div>

        {/* Informações importantes */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h3 className="font-semibold text-blue-800 mb-3">Informações importantes</h3>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• Mantenha seus dados sempre atualizados</li>
            <li>• Acompanhe o status do seu processo regularmente</li>
            <li>• Em caso de dúvidas, entre em contato conosco</li>
            <li>• O processo é 100% gratuito através do programa</li>
          </ul>
        </div>

        {/* Botão sair */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
        >
          Sair da conta
        </Button>
      </div>
    </div>
  )
}
