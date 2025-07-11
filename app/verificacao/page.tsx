"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Search, Mic, User, ChevronRight, AlertCircle } from "lucide-react"

const questions = [
  {
    question: "Qual é a sua data de nascimento?",
    correctAnswer: 3, // Sempre "Nenhuma das alternativas"
    options: ["15/03/1990", "22/07/1985", "08/12/1992", "Nenhuma das alternativas"],
  },
  {
    question: "Em que cidade você nasceu?",
    correctAnswer: 3,
    options: ["São Paulo - SP", "Rio de Janeiro - RJ", "Belo Horizonte - MG", "Nenhuma das alternativas"],
  },
  {
    question: "Qual é o nome completo da sua mãe?",
    correctAnswer: 3,
    options: ["Maria Silva Santos", "Ana Paula Oliveira", "Fernanda Costa Lima", "Nenhuma das alternativas"],
  },
]

export default function VerificacaoPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário tem dados salvos
    const data = sessionStorage.getItem("user-data")
    if (!data) {
      router.push("/verificacao-dados")
      return
    }

    const parsedData = JSON.parse(data)
    setUserData(parsedData)
    setIsAuthorized(true)
  }, [router])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === null) {
      alert("Por favor, selecione uma resposta")
      return
    }

    // Verificar se a resposta está correta (sempre deve ser "Nenhuma das alternativas")
    if (selectedAnswer !== questions[currentQuestion].correctAnswer) {
      alert("Resposta incorreta. Tente novamente.")
      setSelectedAnswer(null)
      return
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      // Verificação concluída com sucesso
      sessionStorage.setItem("verification-completed", "true")
      router.push("/validacao")
    }
  }

  // Formatar data de nascimento para DD/MM/YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return ""

    // Se já está no formato DD/MM/YYYY, retorna como está
    if (dateString.includes("/")) {
      return dateString
    }

    // Se está em outro formato, tenta converter
    const date = new Date(dateString)
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString("pt-BR")
    }

    return dateString
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
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Verificação de Segurança</h1>

        {/* Dados do usuário */}
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <h3 className="font-semibold text-blue-800 mb-3">Dados a serem verificados:</h3>
          <div className="space-y-2 text-blue-700">
            <p>
              <strong>Nome:</strong> {userData?.nomeCompleto}
            </p>
            <p>
              <strong>Data de Nascimento:</strong> {formatDate(userData?.dataNascimento)}
            </p>
            <p>
              <strong>Nome da Mãe:</strong> {userData?.nomeMae}
            </p>
          </div>
        </div>

        {/* Pergunta atual */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
            <span className="text-sm text-gray-600">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-6">{questions[currentQuestion].question}</h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? "border-blue-600 bg-blue-50 text-blue-800"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      selectedAnswer === index ? "border-blue-600 bg-blue-600" : "border-gray-300"
                    }`}
                  >
                    {selectedAnswer === index && <div className="w-full h-full rounded-full bg-white scale-50"></div>}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Aviso de segurança */}
        <div className="bg-orange-50 p-4 rounded-lg mb-8">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-orange-700">
                <strong>Verificação de Segurança:</strong> Estas perguntas são para confirmar sua identidade. Selecione
                a resposta correta baseada nos dados que você forneceu anteriormente.
              </p>
            </div>
          </div>
        </div>

        {/* Botão continuar */}
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className={`w-full py-4 rounded-full text-lg font-semibold ${
            selectedAnswer === null
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {currentQuestion === questions.length - 1 ? "Finalizar Verificação" : "Próxima Pergunta"}
        </Button>
      </div>
    </div>
  )
}
