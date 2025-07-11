"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function NoticiaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header G1 */}
      <div className="bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">g1</h1>
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-600">
            g1 {">"} Distrito Federal {">"} Notícia
          </p>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
          Governo e DETRANs lança ao ar o programa CNH SOCIAL DIGITAL 2025 (Reprodução)
        </h1>

        {/* Subtítulo */}
        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
          Programa começou a ser disponibilizado oficialmente nesta quarta-feira (1°) em todo o país. A iniciativa tem
          como foco ampliar o acesso à CNH por meio de um sistema digital, gratuito e integrado às autoescolas
          credenciadas.
        </p>

        {/* Autor e data */}
        <div className="mb-8">
          <p className="text-gray-600">
            Por <span className="text-red-600 font-semibold">Rafael Nascimento</span>, g1 Rio
          </p>
          <p className="text-gray-500 text-sm mt-1">11/05/2025 • 14:57 Atualizado há 57 minutos</p>
        </div>

        {/* Vídeo */}
        <div className="mb-8">
          <video
            className="w-full rounded-lg shadow-lg"
            controls
            poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202025-07-03%20a%CC%80s%2013.21.42-SNsj0WeNv2Y0VcpKpEGbL7fm4BzzzM.png"
          >
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Governo%20e%20DETRANs%20lanca%20ao%20ar%20o%20programa%20CNH%20SOCIAL%20DIGITAL%202025-lBP1E77ytYkzP73WlCACWpaAaB2pYQ.mp4"
              type="video/mp4"
            />
            Seu navegador não suporta o elemento de vídeo.
          </video>
          <p className="text-sm text-gray-600 mt-2">
            Governo e DETRANs lança ao ar o programa CNH SOCIAL DIGITAL 2025 (Reprodução)
          </p>
        </div>

        {/* Conteúdo do artigo */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed mb-6">
            O Programa CNH Social Digital 2025 oferece aos brasileiros a oportunidade de obter a Carteira Nacional de
            Habilitação de forma 100% subsidiada, sem custos com autoescola e exames médicos. A iniciativa é viabilizada
            por meio de uma parceria entre o Governo Federal, os DETRANs estaduais e autoescolas credenciadas. Os
            interessados devem realizar o cadastro no site oficial e, se aprovados, recebem acesso completo ao processo
            de habilitação de forma digital, com acompanhamento e suporte até a entrega do documento.
          </p>

          {/* Botão Solicite Agora */}
          <div className="text-center my-8">
            <Link href="/">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold rounded-lg">
                SOLICITE AGORA
              </Button>
            </Link>
          </div>

          <h2 className="text-2xl font-bold mb-4">Entre os dados necessários, estão:</h2>

          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li>
              <strong>Ter CPF ativo</strong> - O programa é destinado a cidadãos com CPF regularizado, que podem estar
              em qualquer parte do Brasil.
            </li>
            <li>
              <strong>Não possuir CNH</strong> - O benefício é exclusivo para quem nunca teve uma Carteira Nacional de
              Habilitação ou, caso tenha, não pode estar com ela suspensa ou cassada.
            </li>
            <li>
              <strong>Atender a outros critérios locais</strong> - Cada estado pode definir requisitos adicionais para a
              inscrição.
            </li>
          </ul>

          <p className="text-lg leading-relaxed mb-8">
            O programa CNH Social Digital 2025 utiliza um sistema totalmente informatizado que permite o acompanhamento
            do processo de habilitação em tempo real. Após o cadastro no portal oficial, o candidato aprovado tem acesso
            às etapas obrigatórias do processo — incluindo exames, aulas e testes práticos — sem qualquer custo com
            instituições privadas. A seleção é feita de forma automática, com base em critérios de renda e situação
            socioeconômica.
          </p>

          {/* Segundo botão Solicite Agora */}
          <div className="text-center my-8">
            <Link href="/">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold rounded-lg">
                SOLICITE AGORA
              </Button>
            </Link>
          </div>

          <p className="text-lg leading-relaxed mb-8">
            Com o intuito de reduzir desigualdades e ampliar o acesso à mobilidade, o CNH Social Digital 2025 foi criado
            para beneficiar principalmente jovens e trabalhadores que não têm condições de arcar com os custos da
            habilitação. O programa já transformou a vida de milhares de brasileiros, abrindo portas para empregos
            formais, entregas por aplicativo e oportunidades que dependem de locomoção própria.
          </p>

          {/* Card de validade */}
          <div className="bg-gray-100 border-l-4 border-red-600 p-6 my-8">
            <h3 className="text-xl font-bold text-red-600 mb-3">Validade do Programa</h3>
            <p className="text-gray-800">
              O governo federal juntamente com o DETRAN, ressaltou também que o benefício estará ao ar até o dia
              29/05/2025
            </p>
          </div>

          <p className="text-lg leading-relaxed">
            O departamento de trânsito informa que foram disponibilizadas um pouco mais que 3 milhões de vagas até
            então. Vale ressaltar que mais de 3 milhões já foram preenchidas, restando apenas algumas, então não perca
            esta oportunidade e confira o site oficial.
          </p>
        </div>
      </div>
    </div>
  )
}
