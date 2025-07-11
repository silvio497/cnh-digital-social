"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search, Mic, User, ChevronRight, MapPin, Home, Hash } from "lucide-react"

export default function CadastroEnderecoPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [addressData, setAddressData] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
  })
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário passou pelo questionário
    const answers = sessionStorage.getItem("questionnaire-answers")
    if (!answers) {
      router.push("/questionario")
      return
    }
    setIsAuthorized(true)
  }, [router])

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{5})(\d{3})/, "$1-$2")
  }

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value)
    if (formatted.length <= 9) {
      setAddressData((prev) => ({ ...prev, cep: formatted }))

      // Buscar endereço quando CEP estiver completo
      if (formatted.length === 9) {
        setIsLoadingCep(true)
        try {
          const cepNumbers = formatted.replace("-", "")
          const response = await fetch(`https://viacep.com.br/ws/${cepNumbers}/json/`)
          const data = await response.json()

          if (!data.erro) {
            setAddressData((prev) => ({
              ...prev,
              logradouro: data.logradouro || "",
              bairro: data.bairro || "",
              cidade: data.localidade || "",
              uf: data.uf || "",
            }))
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error)
        } finally {
          setIsLoadingCep(false)
        }
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setAddressData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    // Validar campos obrigatórios
    if (
      !addressData.cep ||
      !addressData.logradouro ||
      !addressData.numero ||
      !addressData.bairro ||
      !addressData.cidade ||
      !addressData.uf
    ) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    // Salvar endereço no sessionStorage
    sessionStorage.setItem("user-address", JSON.stringify(addressData))

    // Redirecionar para autoescola parceira
    router.push("/autoescola-parceira")
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
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Cadastro de Endereço</h1>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Para finalizar seu cadastro, precisamos do seu endereço completo. Essas informações serão usadas para
          encontrar a autoescola parceira mais próxima de você.
        </p>

        <div className="space-y-6">
          {/* CEP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CEP *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                value={addressData.cep}
                onChange={handleCepChange}
                placeholder="00000-000"
                className="pl-10 py-3"
                maxLength={9}
              />
              {isLoadingCep && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
          </div>

          {/* Logradouro */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logradouro *</label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                value={addressData.logradouro}
                onChange={(e) => handleInputChange("logradouro", e.target.value)}
                placeholder="Rua, Avenida, etc."
                className="pl-10 py-3"
              />
            </div>
          </div>

          {/* Número e Complemento */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Número *</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  value={addressData.numero}
                  onChange={(e) => handleInputChange("numero", e.target.value)}
                  placeholder="123"
                  className="pl-10 py-3"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
              <Input
                type="text"
                value={addressData.complemento}
                onChange={(e) => handleInputChange("complemento", e.target.value)}
                placeholder="Apto, Bloco..."
                className="py-3"
              />
            </div>
          </div>

          {/* Bairro */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bairro *</label>
            <Input
              type="text"
              value={addressData.bairro}
              onChange={(e) => handleInputChange("bairro", e.target.value)}
              placeholder="Nome do bairro"
              className="py-3"
            />
          </div>

          {/* Cidade e UF */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
              <Input
                type="text"
                value={addressData.cidade}
                onChange={(e) => handleInputChange("cidade", e.target.value)}
                placeholder="Nome da cidade"
                className="py-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">UF *</label>
              <Input
                type="text"
                value={addressData.uf}
                onChange={(e) => handleInputChange("uf", e.target.value.toUpperCase())}
                placeholder="SP"
                className="py-3"
                maxLength={2}
              />
            </div>
          </div>
        </div>

        {/* Informação sobre autoescola */}
        <div className="bg-blue-50 p-4 rounded-lg mt-8 mb-8">
          <p className="text-sm text-blue-700">
            <strong>Próximo passo:</strong> Com base no seu endereço, vamos encontrar a autoescola parceira mais próxima
            para realizar suas aulas práticas e exames.
          </p>
        </div>

        {/* Botão continuar */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full text-lg font-semibold"
        >
          Encontrar Autoescola Parceira
        </Button>
      </div>
    </div>
  )
}
