"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Search, Mic, User, ChevronRight, ChevronLeft, ChevronRightIcon } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "Qual é a sua situação de renda familiar?",
    options: [
      "Até 1 salário mínimo",
      "De 1 a 2 salários mínimos",
      "De 2 a 3 salários mínimos",
      "Acima de 3 salários mínimos",
    ],
  },
  {
    id: 2,
    question: "Você está inscrito em algum programa social do governo?",
    options: ["Bolsa Família", "Auxílio Brasil", "CadÚnico", "Não estou inscrito"],
  },
  {
    id: 3,
    question: "Qual é o seu nível de escolaridade?",
    options: [
      "Ensino Fundamental Incompleto",
      "Ensino Fundamental Completo",
      "Ensino Médio Incompleto",
      "Ensino Médio Completo ou Superior",
    ],
  },
  {
    id: 4,
    question: "Você já tentou tirar a CNH antes?",
    options: [
      "Nunca tentei",
      "Tentei mas não consegui pagar",
      "Tentei mas reprovei nos exames",
      "Tentei mas desisti no meio do processo",
    ],
  },
  {
    id: 5,
    question: "Qual é a sua principal motivação para obter a CNH?",
    options: [
      "Conseguir um emprego melhor",
      "Facilitar o transporte diário",
      "Independência pessoal",
      "Necessidade profissional",
    ],
  },
]

export default function QuestionarioPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário passou pela validação
    const userData = sessionStorage.getItem("user-data")
    if (!userData) {
      router.push("/verificacao-dados")
      return
    }
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

    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(newAnswers[currentQuestion + 1] ?? null)
    } else {
      // Salvar respostas e ir para validação
      sessionStorage.setItem("questionnaire-answers", JSON.stringify(newAnswers))
      router.push("/validacao-questionario")
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] ?? null)
    }
  }

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100

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
        {/* Título e progresso */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Questionário de Elegibilidade</h1>

          {/* Barra de progresso */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Pergunta atual */}
        <div className="mb-8">
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

        {/* Botões de navegação */}
        <div className="flex gap-4">
          {currentQuestion > 0 && (
            <Button onClick={handlePrevious} variant="outline" className="flex-1 py-3 rounded-full bg-transparent">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
          )}

          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`flex-1 py-3 rounded-full ${currentQuestion === 0 ? "w-full" : ""} ${
              selectedAnswer === null
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"}
            {currentQuestion < questions.length - 1 && <ChevronRightIcon className="w-4 h-4 ml-2" />}
          </Button>
        </div>

        {/* Informação sobre o questionário */}
        <div className="bg-blue-50 p-4 rounded-lg mt-8">
          <p className="text-sm text-blue-700">
            <strong>Importante:</strong> Este questionário nos ajuda a verificar se você atende aos critérios do
            programa CNH Social Digital. Responda com sinceridade para garantir uma avaliação precisa.
          </p>
        </div>
      </div>
    </div>
  )
}
