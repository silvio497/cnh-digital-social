"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ValidacaoQuestionarioPage() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário respondeu o questionário
    const answers = sessionStorage.getItem("questionnaire-answers")
    if (!answers) {
      router.push("/questionario")
      return
    }

    // Simular validação das respostas
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          return 100
        }
        return prev + 3
      })
    }, 100)

    return () => clearInterval(interval)
  }, [router])

  const handleContinue = () => {
    router.push("/cadastro-endereco")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 py-8 text-center">
        {/* Logo */}
        <div className="mb-8">
          <img src="/images/cnh-logo-oficial.png" alt="CNH Social Digital" className="w-48 h-auto mx-auto" />
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-blue-800 mb-4">
          {isComplete ? "Parabéns!" : "Analisando suas respostas"}
        </h1>

        <p className="text-gray-600 mb-8">
          {isComplete
            ? "Você atende aos critérios do programa CNH Social Digital!"
            : "Estamos verificando se você atende aos critérios do programa..."}
        </p>

        {!isComplete && (
          <>
            {/* Barra de progresso */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="text-blue-600 font-semibold text-lg mb-8">{progress}% analisado</p>
          </>
        )}

        {isComplete && (
          <>
            <div className="flex items-center justify-center text-green-600 mb-6">
              <CheckCircle className="w-12 h-12 mr-3" />
              <span className="text-2xl font-bold">Aprovado!</span>
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Você foi pré-aprovado para o programa!</h3>
              <p className="text-green-700">
                Com base nas suas respostas, você atende aos critérios de elegibilidade do CNH Social Digital. Agora
                vamos prosseguir com o cadastro do seu endereço.
              </p>
            </div>

            <Button
              onClick={handleContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full text-lg font-semibold"
            >
              Continuar Cadastro
            </Button>
          </>
        )}

        {!isComplete && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              Aguarde enquanto analisamos suas respostas para verificar a elegibilidade no programa CNH Social Digital.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
