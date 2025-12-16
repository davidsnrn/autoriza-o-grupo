import React, { useMemo } from 'react';
import { Student } from '../types';
import { IFRNLogo } from './IFRNLogo';
import { getFormattedDate } from '../utils';

interface DocumentProps {
  students: Student[];
}

export const Document: React.FC<DocumentProps> = ({ students }) => {
  const formattedDate = useMemo(() => getFormattedDate(), []);

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] px-[15mm] py-[20mm] mx-auto shadow-xl print:shadow-none print:w-full print:m-0 print:p-[10mm] relative flex flex-col box-border">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="flex-shrink-0 mr-4">
          <IFRNLogo className="w-[50px] h-[65px]" />
        </div>
        <div className="flex-grow text-sm leading-tight text-black font-normal">
          <p>Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte</p>
          <p className="font-bold">CAMPUS NOVA CRUZ</p>
          <p>Coordenação de Apoio Acadêmico (COAPAC)</p>
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center mb-6">
        <h1 className="text-[18px] font-bold uppercase border-b-2 border-black inline-block pb-1 mb-1">
          Autorização para Entrada em Sala de Aula
        </h1>
        <h2 className="text-[18px] font-bold uppercase">
          Cadastro em Grupo
        </h2>
      </div>

      {/* Authorization Text */}
      <div className="bg-gray-50 border border-gray-300 p-3 mb-5 text-center text-sm font-bold print:bg-transparent print:border-gray-400">
        Informo que os alunos listados abaixo compareceram à COAPAC para apresentar suas justificativas, as quais já foram verificadas e devidamente registradas.
      </div>

      {/* Table */}
      <div className="w-full">
        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr className="bg-gray-100 print:bg-gray-100">
              <th className="border border-black px-2 py-2 w-[5%] text-center uppercase">Nº</th>
              <th className="border border-black px-2 py-2 w-[25%] text-center uppercase">Matrícula</th>
              <th className="border border-black px-2 py-2 w-[70%] text-left uppercase">Aluno(a)</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="break-inside-avoid">
                <td className="border border-black px-2 py-2 text-center">
                  {student.name || student.id ? index + 1 : 1}
                </td>
                <td className="border border-black px-2 py-2 text-center font-mono text-[13px]">
                  {student.id}
                </td>
                <td className="border border-black px-2 py-2 text-left uppercase">
                  {student.name || <span className="opacity-0">&nbsp;</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-12 break-inside-avoid">
        {/* Date */}
        <div className="text-center italic text-sm mb-12">
          {formattedDate}
        </div>

        {/* Signature */}
        <div className="flex justify-center">
          <div className="w-1/2 text-center border-t border-black pt-2 text-sm">
            Assistente de Alunos
          </div>
        </div>
      </div>
      
      {/* Page numbers (Print only usually handled by browser, but we can add css counter) */}
      <style>
        {`
          @page {
            @bottom-right {
              content: "Página " counter(page) " de " counter(pages);
              font-size: 10pt;
              color: #555;
            }
          }
        `}
      </style>
    </div>
  );
};
